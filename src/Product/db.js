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

const AllProducts = async (parent_id) => {
  try {
    if (parent_id) {
      const query = "SELECT * FROM Product WHERE parent_id = $1";
      const values = [parent_id];
      const res = await pool.query(query, values);
      return res.rows.length ? res.rows : null;
    } else {
      const query = "SELECT * FROM Product WHERE parent_id IS NULL";
      const res = await pool.query(query);
      return res.rows.length ? res.rows : null;
    }
  } catch (error) {
    console.error("AllProducts error:", error.message);
    throw error;
  }
};

module.exports = { AllProducts, ConnectDBProduct };
