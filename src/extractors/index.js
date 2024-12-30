const { extractName } = require('./nameExtractor');
const { extractEmail, extractPhone } = require('./contactExtractor');
const { extractOccupation } = require('./occupationExtractor');
const { extractPoliticalParty } = require('./politicalPartyExtractor');
const { extractImages } = require('./imageExtractor');

function extractData(htmlContent) {
    return {
        name: extractName(htmlContent),
        email: extractEmail(htmlContent),
        phone: extractPhone(htmlContent),
        occupation: extractOccupation(htmlContent),
        politicalParty: extractPoliticalParty(htmlContent),
        image: extractImages(htmlContent),
    };
}

module.exports = { extractData };
