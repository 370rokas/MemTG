const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('user_database.db');

// Create the user table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    perms INTEGER
  )
`);

module.exports = db;
