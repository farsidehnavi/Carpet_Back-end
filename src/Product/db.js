const pool = require("../connectDb");

const ConnectDBProduct = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Product (
      id SERIAL PRIMARY KEY,
      name TEXT,
      image_url TEXT[] NOT NULL,
      description TEXT,
      price NUMERIC,
      parent_Id INT REFERENCES category(id) ON DELETE CASCADE
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

const AllProductsFront = async () => {
  try {
    const query = "Select * FROM Product";
    const res = await pool.query(query);
    return res.rows.length ? res.rows : null;
  } catch (error) {
    console.error("AllProductsFront error:", error.message);
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

const UpdateProduct = async (
  id,
  name = null,
  image_url = null,
  price = null,
  description = null
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
    if (price !== null) {
      fields.push(`price = $${i}`);
      values.push(price);
      i++;
    }
    if (description !== null) {
      fields.push(`description = $${i}`);
      values.push(description);
      i++;
    }

    // If no fields provided, stop
    if (fields.length === 0) {
      throw new Error("Nothing to update");
    }

    const query = `
      UPDATE product
      SET ${fields.join(", ")}
      WHERE id = $1
    `;

    await pool.query(query, values);
  } catch (error) {
    console.error("UpdateProduct error:", error);
    throw error;
  }
};

const DropProduct = async (id) => {
  try {
    if (id) {
      const query = "DELETE FROM product WHERE id = $1";
      const values = [id];
      const res = await pool.query(query,values);
      return res.rowCount > 0
        ? "Product deleted successfully!"
        : "No category found with that id.";
    } else return "id not found !";
  } catch (error) {
    console.error("DropCategory error:", error.message);
    throw error;
  }
};

const AddImage = async (image_owner_id, url) => {
  const query = `
    UPDATE product
    SET image_url = array_append(image_url, $2)
    WHERE id = $1
  `;

  try {
    console.log(await pool.query(query, [image_owner_id, url]));
  } catch (error) {
    console.error("Add image to a Product error:", error);
    throw error;
  }
};

const DeleteImage = async (image_owner_id, url) => {
  const query = `
    UPDATE product
    SET image_url = array_remove(image_url, $2)
    WHERE id = $1
  `;

  try {
    console.log(await pool.query(query, [image_owner_id, url]));
  } catch (error) {
    console.error("Delete Image from a Product error:", error);
    throw error;
  }
};

module.exports = {
  AllProducts,
  AllProductsFront,
  ConnectDBProduct,
  DropProduct,
  AddProduct,
  UpdateProduct,
  AddImage,
  DeleteImage,
};
