const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

// Schema->Model->Query
// Schema design

// Product route
const productRoute = require("./routes/product.route");
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("Route is working");
});

module.exports = app;
