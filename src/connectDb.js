const { Pool } = require("pg");

const pool = new Pool({
  user: "hesam", // your PostgreSQL user
  host: "156.236.31.234", // your VPS IP or localhost
  database: "carpet", // your database name
  password: "WebBuilding", // your DB password
  port: 5432, // PostgreSQL default port
});

pool.on("connect", () => {
  console.log("Connected to DB !");
});

module.exports = pool;
