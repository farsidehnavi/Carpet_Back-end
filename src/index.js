const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express();
const PORT = 3000;



const routerProduct = require("./Product/routes");
const routerCategory = require("./category/routes");

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser requests like curl/postman with no origin
      if (!origin) return callback(null, true);
      if (origin) {
        return callback(null, true);
      }
      return callback(null,true);
    },
  })
);

app.use(express.json());

app.use("/category", routerCategory);
app.use("/product", routerProduct);

app.use(
  "/img",
  createProxyMiddleware({
    target: "http://156.236.31.234:3000", // your VPS API base
    changeOrigin: true,
    pathRewrite: { "^/img": "" }, // remove /vps prefix if needed
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
