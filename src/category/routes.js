const express = require("express");
const router = express.Router();

const {
  AllCategories,
  AllCategoriesFront,
  DropCategory,
  ConnectDBCategory,
  AddCategory,
  UpdateCategory,
  AddImage,
  DeleteImage,
} = require("./db");

const { AllProductsFront } = require("./../Product/db");

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

router.get('/allFront', async (req, res) => {
  const Result = await AllCategoriesFront();
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
})

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
    const Result = UpdateCategory(
      req?.body?.id,
      req?.body?.name,
      req?.body?.image_url
    );
    res.send({
      Status: 200,
      Data: Result,
    });
  } else {
    const Result = AddCategory(
      req?.body?.name,
      req?.body?.image_url,
      req?.body?.parent_id
    );
    res.send({
      Status: 200,
      Data: Result,
    });
  }
});

router.post("/img", async (req, res) => {
  if (req?.body?.image_owner_id && req?.body?.url) {
    AddImage(req?.body?.image_owner_id, req?.body?.url);
    res.send({
      Status: 200,
    });
  } else {
    res.send({
      Status: 400,
      Error: "image_owner_id or url missed",
    });
  }
});

router.delete("/img/:image_owner_id/:url", async (req, res) => {
  if (req?.params?.image_owner_id && req?.params?.url) {
    DeleteImage(req?.params?.image_owner_id, req?.params?.url);
    res.send({
      Status: 200,
    });
  } else {
    res.send({
      Status: 400,
      Error: "image_owner_id or url missed",
    });
  }
});

module.exports = router;
