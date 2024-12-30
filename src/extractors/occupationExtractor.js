const { normalizeText, matchRegex } = require('./utils');

function extractOccupation(htmlContent) {
    const occupationPatterns = [
        /(?:Occupation|Position|Role|Title|Job)\s*:\s*(.+?)(?:<|$)/i,
        /(?:Chairman|Manager|Director|Leader|Chief)\b.*?/i,
    ];

    for (const pattern of occupationPatterns) {
        const match = matchRegex(htmlContent, pattern);
        if (match) return normalizeText(match);
    }

    return null;
}

module.exports = { extractOccupation };
