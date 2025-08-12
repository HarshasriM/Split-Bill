export const UsersTable = `CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT UNIQUE NULL,
phone TEXT NOT NULL UNIQUE,
password TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
is_registered INTEGER DEFAULT 0
);`;

// alter commands, delete, index

// export const alterTableUsers = `ALTER TABLE users ADD column passwprd TEXT NOT NULL`;
// export const tableDefUsers =  `pragma table_info(users)`