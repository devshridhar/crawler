const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/entity_data.db');

// Create Tables
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS entity_data (
                                                   id INTEGER PRIMARY KEY AUTOINCREMENT, -- Add a primary key for better handling
                                                   name TEXT,
                                                   contact_info TEXT, -- Email or Phone
                                                   images TEXT,
                                                   occupation TEXT,
                                                   family_details TEXT,
                                                   political_party TEXT,
                                                   source_url TEXT UNIQUE -- Define source_url as UNIQUE for ON CONFLICT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS visited_urls (
                                                    url TEXT UNIQUE
        )
    `);
});

// Check if URL is Visited
function isUrlVisited(url) {
    return new Promise((resolve) => {
        db.get(`SELECT 1 FROM visited_urls WHERE url = ?`, [url], (err, row) => {
            if (err) {
                console.error('Error checking visited URL:', err.message);
                resolve(false);
            } else {
                resolve(!!row);
            }
        });
    });
}

// Mark URL as Visited
function markUrlAsVisited(url) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO visited_urls (url) VALUES (?)`, [url], (err) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    console.log(`URL already marked as visited: ${url}`);
                    resolve();
                } else {
                    reject(err);
                }
            } else {
                resolve();
            }
        });
    });
}

// Save or Update Data
function saveOrUpdateData(data) {
    const stmt = db.prepare(`
        INSERT INTO entity_data (name, contact_info, images, occupation, family_details, political_party, source_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(source_url) DO UPDATE SET
            name = excluded.name,
            contact_info = excluded.contact_info,
            images = excluded.images,
            occupation = excluded.occupation,
            family_details = excluded.family_details,
            political_party = excluded.political_party
    `);

    data.forEach((item) => {
        stmt.run(
            item.name || '',
            item.contact_info || '',
            JSON.stringify(item.images || []),
            item.occupation || '',
            item.family_details || '',
            item.political_party || '',
            item.source_url || ''
        );
    });

    stmt.finalize();
}

module.exports = {
    db,
    isUrlVisited,
    markUrlAsVisited,
    saveOrUpdateData,
};
