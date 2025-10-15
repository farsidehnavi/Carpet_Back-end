const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const { AllProducts, AllCategories } = require("./DB/Funcs");
const {ConnectDBCategory,ConnectDBProduct} = require('./DB/Creation')

// Allow only http://localhost:3001 via CORS
const allowedOrigin = "http://localhost:3001";
app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests like curl/postman with no origin
    if (!origin) return callback(null, true);
    if (origin === allowedOrigin) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());

app.post("/hello", (req, res) => {
  res.send("Hello from backend !");
});

app.post("/items", async (req, res) => {
  await ConnectDBCategory();
  await ConnectDBProduct();
  const Resault = await AllProducts();

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
});

app.get('/Category', async (req, res) => {
  const Resault = await AllCategories(req.query.parent_id || null)
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 