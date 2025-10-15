const pool = require("./Connection");

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

const AllCategories = async (parent_id) => {
  try {
    if (parent_id) {
      const query = "SELECT * FROM Category WHERE parent_id = $1";
      const values = [parent_id];
      const res = await pool.query(query, values);
      return res.rows.length ? res.rows : null;
    } else {
      const query = "SELECT * FROM Category WHERE parent_id IS NULL"
      const res = await pool.query(query)
      return res.rows.length ? res.rows : null;
    }

  } catch (error) {
    console.error("AllCategories error:", error.message);
    throw error;
  }
};

module.exports = { AllProducts, AllCategories };
