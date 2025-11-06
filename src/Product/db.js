const pool = require("../connectDb");



const ConnectDBProduct = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Product (
      id SERIAL PRIMARY KEY,
      name TEXT,
      image_url TEXT UNIQUE,
      description TEXT,
      price NUMERIC,
      parent_Id INT REFERENCES categories(id) ON DELETE CASCADE
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
    }
  } catch (error) {
    console.error("AllProducts error:", error.message);
    throw error;
  }
};

const AddProduct = async (name, image_url, parent_id, price, description) => {
  try {
    const query = `
      INSERT INTO product (name, parent_id, image_url, price, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, parent_id, image_url, price, description];
    const res = await pool.query(query, values);
    return res.rows[0]; // returns the new category
  } catch (error) {
    console.error("AddProduct error:", error.message);
    throw error;
  }
};

const DropProduct = async (id) => {
  try {
    if (id) {
      const query = "DELETE FROM product WHERE id = $1";
      const values = [id];
      const res = await pool.query(query, values);
      return res.rowCount > 0
        ? "Product deleted successfully!"
        : "No category found with that id.";
    } else return "id not found !";
  } catch (error) {
    console.error("DropCategory error:", error.message);
    throw error;
  }
};

module.exports = { AllProducts, ConnectDBProduct, DropProduct, AddProduct };
