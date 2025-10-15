const pool = require("./Connection");

const ConnectDBProduct = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Product (
      id SERIAL PRIMARY KEY,
      image_url TEXT UNIQUE,
      description TEXT,
      price NUMERIC,
      parentId NUMERIC
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log("Product table is ready");
  } catch (err) {
    console.error("Failed to create Product table:", err.message);
    throw err;
  }
};

const ConnectDBCategory = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Category (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      parent_id INT REFERENCES Category(id) ON DELETE CASCADE,
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log("Category table is ready");
  } catch (err) {
    console.error("Failed to create Category table:", err.message);
    throw err;
  }
};

module.exports = { ConnectDBCategory, ConnectDBProduct };
