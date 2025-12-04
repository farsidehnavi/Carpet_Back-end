const express = require("express");
const router = express.Router();

const {
  AllProducts,
  ConnectDBProduct,
  AddProduct,
  DropProduct,
  UpdateProduct,
  AddImage,
  DeleteImage,
} = require("./db");

router.get("/load", async (req, res) => {
  await ConnectDBProduct();
  res.send({
    Status: 200,
  });
});

router.get("/all", async (req, res) => {
  if (req?.query?.parent_id) {
    const Resault = await AllProducts(req.query.parent_id);
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
  } else {
    res.send({
      Status: 400,
      Error: "parent_id missing",
    });
  }
});

router.post("/add", async (req, res) => {
  if (req?.body?.id) {
    const Result = UpdateProduct(
      req?.body?.id,
      req?.body?.name,
      req?.body?.image_url,
      req?.body?.price,
      req?.body?.description
    );
    res.send({
      Status: 200,
      Data: Result,
    });
  } else {
    const Result = AddProduct(
      req?.body?.name,
      req?.body?.image_url,
      req?.body?.parent_id,
      req?.body?.price,
      req?.body?.description
    );
    res.send({
      Status: 200,
      Data: Result,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  if (req?.params?.id) {
    const Result = await DropProduct(parseInt(req?.params?.id));
    res.send({
      Status: 200,
      Data: Result,
    });
  } else
    res.send({
      Status: 400,
    });
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
