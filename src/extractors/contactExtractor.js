const { matchRegex } = require('./utils');

function extractEmail(htmlContent) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return matchRegex(htmlContent, emailRegex);
}

function extractPhone(htmlContent) {
    const phoneRegex = /\+?[0-9]{1,4}[-.\s]?\(?[0-9]{2,3}\)?[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}/g;
    return matchRegex(htmlContent, phoneRegex);
}

module.exports = { extractEmail, extractPhone };
