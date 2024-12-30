const { JSDOM } = require('jsdom');

function extractImages(htmlContent) {
    const dom = new JSDOM(htmlContent);
    const images = Array.from(dom.window.document.querySelectorAll('img'))
        .map((img) => img.src)
        .filter((src) => src && src.includes('.jpg' || '.png')); // Filter valid image formats
    return images.length > 0 ? images[0] : null;
}

module.exports = { extractImages };
