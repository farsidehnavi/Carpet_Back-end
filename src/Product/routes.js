const express = require("express");
const router = express.Router();

const { AllProducts, ConnectDBProduct } = require("./db");

router.get('/all', async (req, res) => {
  const Resault = await AllCategories(req.query.parent_id || null);
  if (Resault) {
    res.send({
      Status: 200,
      Data: Resault,
    });
  } else {
    res.send({
      Status: 400,
    });
  }
})

module.exports = router;
