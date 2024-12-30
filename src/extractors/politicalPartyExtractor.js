const { normalizeText, matchRegex } = require('./utils');

function extractPoliticalParty(htmlContent) {
    const partyPatterns = [
        /(?:Party|Affiliation|Political)\s*:\s*(.+?)(?:<|$)/i,
        /\b(Labour|Conservative|Democratic|Republican|Socialist|Independent)\b/i,
    ];

    for (const pattern of partyPatterns) {
        const match = matchRegex(htmlContent, pattern);
        if (match) return normalizeText(match);
    }

    return null;
}

module.exports = { extractPoliticalParty };
