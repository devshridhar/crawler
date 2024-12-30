function normalizeText(text) {
    return text ? text.replace(/\s+/g, ' ').trim() : '';
}

function matchRegex(htmlContent, regex) {
    const matches = htmlContent.match(regex);
    return matches ? matches[0] : null;
}

module.exports = { normalizeText, matchRegex };
