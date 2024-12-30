const { scrapeDynamicContent } = require('./playwright-scraper');
const { saveOrUpdateData, isUrlVisited, markUrlAsVisited } = require('./database');

const urls = [
    'https://lslbc.louisiana.gov/violations/',
    'https://embassyofalgeria.uk/the-ambassador/',
    'https://www.parlament.mt/en/14th-leg/political-groups/',
    'https://www.parlament.mt/en/14th-leg/political-groups/labour-party/abela-carmelo/',
    'https://members.parliament.uk/members/commons',
    'https://docs.fcdo.gov.uk/docs/UK-Sanctions-List.html',
    'https://www.worldbank.org/en/projects-operations/procurement/debarred-firms',
    'https://www.smcl.bt/#/',
    'https://www.smv.gob.pe/ServicioSancionesImpuestas/frm_SancionesEmpresas?data=6D9FF7643381613ADE8EEBB66B8E0CF2C6CC64BCC4',
];

(async () => {
    console.log('Starting Crawling Process...');
    const failedUrls = [];

    for (const url of urls) {
        const alreadyVisited = await isUrlVisited(url);
        if (alreadyVisited) {
            console.log(`Skipping already visited URL: ${url}`);
            continue;
        }

        console.log(`Processing URL: ${url}`);
        const data = await scrapeDynamicContent(url);

        if (data) {
            try {
                await saveOrUpdateData([data]);
                console.log(`Data saved for ${url}`);
            } catch (err) {
                console.error(`Failed to save data for ${url}:`, err.message);
                failedUrls.push(url);
            }
        } else {
            console.error(`Failed to process ${url}`);
            failedUrls.push(url);
        }

        await markUrlAsVisited(url);
    }

    console.log('Crawling Completed.');
    if (failedUrls.length) {
        console.warn('The following URLs failed and were skipped:');
        console.warn(failedUrls.join('\n'));
    }
})();
