const { normalizeText, matchRegex } = require('./utils');

function extractName(htmlContent) {
    const namePatterns = [
        /\b(Mr\.|Mrs\.|Hon\.|Dr\.|Ms\.|Prof\.)?\s?[A-Z][a-z]+(\s[A-Z][a-z]+)+\b/g,
        /(?:Name|Full Name|Representative)\s*:\s*([A-Za-z\s]+)/i,
        /(?:Honourable|Hon\.)\s*([A-Za-z\s]+)/i,
    ];

    for (const pattern of namePatterns) {
        const match = matchRegex(htmlContent, pattern);
        if (match) return normalizeText(match);
    }

    return null;
}

module.exports = { extractName };
