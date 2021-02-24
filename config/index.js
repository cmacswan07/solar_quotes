const { Pool, Client } = require('node-postgres');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

module.exports = {
    port: process.env.PORT || 8080,
    pool: pool
}