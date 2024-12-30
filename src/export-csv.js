const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const db = new sqlite3.Database('./data/entity_data.db');

const csvWriter = createObjectCsvWriter({
    path: './data/entity_data.csv',
    header: [
        { id: 'name', title: 'Name' },
        { id: 'contact_info', title: 'Contact Information' },
        { id: 'image_url', title: 'Image URL' },
        { id: 'occupation', title: 'Occupation' },
        { id: 'family_details', title: 'Family Details' },
        { id: 'political_party', title: 'Political Party' },
        { id: 'source_url', title: 'Source URL' },
    ],
});

db.all('SELECT * FROM entity_data', (err, rows) => {
    if (err) throw err;
    csvWriter.writeRecords(rows).then(() => {
        console.log('CSV file generated at ./data/entity_data.csv');
    });
});
