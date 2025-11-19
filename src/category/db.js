const pool = require("../connectDb");

const ConnectDBCategory = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Category (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      parent_id INT REFERENCES Category(id) ON DELETE CASCADE
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

const AllCategories = async (parent_id) => {
  try {
    if (parent_id) {
      const query = "SELECT * FROM Category WHERE parent_id = $1";
      const values = [parent_id];
      const res = await pool.query(query, values);
      return res.rows.length ? res.rows : null;
    } else {
      const query = "SELECT * FROM Category WHERE parent_id IS NULL";
      const res = await pool.query(query);
      return res.rows.length ? res.rows : null;
    }
  } catch (error) {
    console.error("AllCategories error:", error.message);
    throw error;
  }
};

const DropCategory = async (id) => {
  try {
    if (id) {
      const query = "DELETE FROM category WHERE id = $1";
      const values = [id];
      const res = await pool.query(query, values);
      return res.rowCount > 0
        ? "Category deleted successfully!"
        : "No category found with that id.";
    } else return "id not found !";
  } catch (error) {
    console.error("DropCategory error:", error.message);
    throw error;
  }
};

const AddCategory = async (name,image_url, parent_id = null) => {
  try {
    const query = `
      INSERT INTO category (name, parent_id, image_url)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, parent_id, image_url];
    const res = await pool.query(query, values);
    return res.rows[0]; // returns the new category
  } catch (error) {
    console.error("AddCategory error:", error.message);
    throw error;
  }
};


const UpdateCategory = async (
  id,
  name = null,
  image_url = null
) => {
  try {
    // Build dynamic update fields
    const fields = [];
    const values = [id];
    let i = 2;

    if (name !== null) {
      fields.push(`name = $${i}`);
      values.push(name);
      i++;
    }
    if (image_url !== null) {
      fields.push(`image_url = $${i}`);
      values.push(image_url);
      i++;
    }

    // If no fields provided, stop
    if (fields.length === 0) {
      throw new Error("Nothing to update");
    }

    const query = `
      UPDATE category
      SET ${fields.join(", ")}
      WHERE id = $1
    `;

    await pool.query(query, values);
  } catch (error) {
    console.error("UpdateCategory error:", error);
    throw error;
  }
};

module.exports = { AllCategories, DropCategory, ConnectDBCategory, AddCategory, UpdateCategory };
