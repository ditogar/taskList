const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'tasklist.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error al conectar a la base de datos.", err.message);
    } else {
        console.log('Conectado a la base de datos.');
    }
});

module.exports = db;