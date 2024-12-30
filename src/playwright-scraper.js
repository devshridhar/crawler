const { chromium } = require('playwright');
const { extractName } = require('./extractors/nameExtractor');
const { extractEmail, extractPhone } = require('./extractors/contactExtractor');
const { extractOccupation } = require('./extractors/occupationExtractor');
const { extractPoliticalParty } = require('./extractors/politicalPartyExtractor');
const { extractImages } = require('./extractors/imageExtractor');

async function scrapeDynamicContent(url, retries = 2) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log(`Navigating to: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for dynamic content (e.g., AJAX-loaded data)
        await page.waitForTimeout(5000);

        // Get raw HTML content
        const htmlContent = await page.content();

        // Use modular extractors
        const extractedData = {
            name: extractName(htmlContent),
            email: extractEmail(htmlContent),
            phone: extractPhone(htmlContent),
            occupation: extractOccupation(htmlContent),
            politicalParty: extractPoliticalParty(htmlContent),
            image: extractImages(htmlContent),
        };

        console.log(`Extracted data for ${url}:`, extractedData);

        return extractedData.name || extractedData.email || extractedData.phone
            ? { ...extractedData, source_url: url }
            : null;
    } catch (err) {
        if (retries > 0) {
            console.warn(`Retrying ${url} (${retries} retries left) due to error: ${err.message}`);
            return scrapeDynamicContent(url, retries - 1);
        } else {
            console.error(`Failed to fetch ${url} after retries: ${err.message}`);
            return null;
        }
    } finally {
        await browser.close();
    }
}

module.exports = { scrapeDynamicContent };
