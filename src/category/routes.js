const express = require("express");
const router = express.Router();

const {
  AllCategories,
  DropCategory,
  ConnectDBCategory,
  AddCategory
} = require("./db");

router.get('/load', async (req, res) => {
  await ConnectDBCategory()
  res.send({
    Status: 200
  })
})

router.get("/all", async (req, res) => {
  const Result = await AllCategories(req.query.parent_id || null);
  if (Result) {
    res.send({
      Status: 200,
      Data: Result,
    });
  } else {
    res.send({
      Status: 400,
    });
  }
});

router.post('/drop', async (req, res) => {
  if (req?.body?.id) {
    const Result = await DropCategory(req?.body?.id)
    res.send({
      Status: 200,
      Data: Result
    })
  } else res.send({
    Status: 400
  })
})

router.post('/add', async (req, res) => {
  if (req?.body?.name) {
    const Result = AddCategory(req?.body?.name, req?.body?.parent_id)
    res.send({
      Status: 200,
      Data: Result
    })
  } else res.send({
    Status: 400
  })
})

module.exports = router;
