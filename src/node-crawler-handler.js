const Crawler = require('crawler');
const { scrapeDynamicContent } = require('./playwright-scraper');
const { isUrlVisited, markUrlAsVisited } = require('./database');

const validBaseUrlPattern = /^https?:\/\//; // Absolute URLs only

// Allowed domains
const allowedDomains = [
    'lslbc.louisiana.gov',
    'embassyofalgeria.uk',
    'parlament.mt',
    'members.parliament.uk',
    'docs.fcdo.gov.uk',
    'worldbank.org',
    'smcl.bt',
    'smv.gob.pe',
];

// Check if URL belongs to allowed domains
function isAllowedDomain(url) {
    try {
        const hostname = new URL(url).hostname;
        return allowedDomains.some((domain) => hostname.endsWith(domain));
    } catch (err) {
        console.warn(`Invalid URL skipped: ${url}`);
        return false;
    }
}

const crawler = new Crawler({
    maxConnections: 5,
    rateLimit: 1000,
    retries: 1, // Retry only once
    retryTimeout: 3000,
    callback: async function (error, res, done) {
        const saveOrUpdateData = this.saveOrUpdateData; // Access saveOrUpdateData via context

        if (error) {
            console.error(`CRAWLER Error: ${error.message}`);
            done();
            return;
        }

        const $ = res.$;
        if (!$) {
            console.error(`Failed to load page content for ${res.request.uri.href}`);
            done();
            return;
        }

        const currentUrl = res.request.uri.href;

        // Check if URL is already visited
        const alreadyVisited = await isUrlVisited(currentUrl);
        if (alreadyVisited) {
            console.log(`Skipping already crawled URL: ${currentUrl}`);
            done();
            return;
        }

        // Mark URL as visited
        await markUrlAsVisited(currentUrl);
        console.log(`Crawled: ${currentUrl}`);

        // Extract Links
        const links = $('a[href]')
            .map((_, el) => $(el).attr('href'))
            .get()
            .filter((href) => validBaseUrlPattern.test(href) && isAllowedDomain(href));

        // Queue New Links
        links.forEach((link) => {
            crawler.queue({
                uri: link,
                saveOrUpdateData, // Pass context
            });
        });

        // Extract and Save Data
        const data = await scrapeDynamicContent(currentUrl);
        if (data) {
            await saveOrUpdateData([data]);
        }

        done();
    },
});

async function recursiveCrawl(startUrl, saveOrUpdateData) {
    return new Promise((resolve) => {
        const taskCount = { active: 0 };

        // Add the first URL to the queue
        taskCount.active += 1;
        crawler.queue({
            uri: startUrl,
            saveOrUpdateData,
            callback: (err, res, done) => {
                taskCount.active -= 1;
                if (taskCount.active === 0) {
                    resolve(); // Resolve when all tasks are complete
                }
                done();
            },
        });

        crawler.on('drain', () => {
            if (taskCount.active === 0) {
                resolve();
            }
        });
    });
}

module.exports = { recursiveCrawl };
