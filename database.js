const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

async function init() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS tasks (taskId INTEGER PRIMARY KEY, taskPrior INTEGER, taskText TEXT)');
            resolve();
        });
    });
}

async function query(sql, params = []) {
    console.log('starting promise')
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    init,
    query
}