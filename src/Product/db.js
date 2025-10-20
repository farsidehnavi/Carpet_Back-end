const pool = require("../connectDb");



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

const AllProducts = async () => {
  const query = "SELECT * FROM Product";
  try {
    const res = await pool.query(query);
    return res.rows || null;
  } catch (err) {
    console.error("AllUsers error:", err.message);
    throw err;
  }
};

module.exports = { AllProducts, ConnectDBProduct };
