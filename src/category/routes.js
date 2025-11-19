const express = require("express");
const router = express.Router();

const {
  AllCategories,
  DropCategory,
  ConnectDBCategory,
  AddCategory,
  UpdateCategory
} = require("./db");

router.get("/load", async (req, res) => {
  await ConnectDBCategory();
  res.send({
    Status: 200,
  });
});

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

router.delete("/delete/:id", async (req, res) => {
  if (req?.params?.id) {
    const Result = await DropCategory(parseInt(req?.params?.id));
    res.send({
      Status: 200,
      Data: Result,
    });
  } else
    res.send({
      Status: 400,
    });
});

router.post("/add", async (req, res) => {
  if (req?.body?.id) {
    const Result = AddCategory(
      req?.body?.name,
      req?.body?.image_url,
      req?.body?.parent_id
    );
    res.send({
      Status: 200,
      Data: Result,
    });
  } else {
    const Result = UpdateCategory(
      req?.body?.id,
      req?.body?.name,
      req?.body?.image_url
    );
    res.send({
      Status: 200,
      Data: Result,
    });
  }
});

module.exports = router;
