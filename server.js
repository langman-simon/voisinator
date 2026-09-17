import express from "express";
const app = express();
const port = 3001;

app.use(express.json());

import * as productModel from "./model/product.js";

app.get("/", (req, res) => {
  res.send("Hello !");
});

app.get("/product/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    try {
      const product = productModel.readProduct(id);
      res.json(product);
    } catch (error) {
      res.sendStatus(404);
    }
  }
});

app.post("/product", (req, res) => {
  const { id, name, price } = req.body;
  const response = productModel.createProduct(id, name, price);
  if (response) {
    res.sendStatus(201);
  } else {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
