const express = require("express");
const router = express.Router();
const Product = require("../model/product");

// GET /Products
router.get("/", (request, response) => {
  Product.find((error, products) => {
    if (error) {
      return response.status(400).json({ error: error });
    }
    response.status(200).json(products);
  });
});

// GET /Products/:id
router.get("/:id", (request, response) => {
  Product.findById(request.params.id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return response.status(400).json({ error: error });
      }
      response.status(200).json(product);
    });
});

//GET /Products/category/:id  get products by category
router.get("/category/:id", (request, response) => {
  Product.find({ category: request.params.id })
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return response.status(400).json({ error: error });
      }
      response.status(200).json(product);
    });
});

// POST /Products
router.post("/", (request, response) => {
  const requestProduct = request.body;
  let newProduct = new Product({
    name: requestProduct.name,
    description: requestProduct.description,
    category: requestProduct.category,
    price: requestProduct.price,
    quantity: requestProduct.quantity,
    image: requestProduct.image,
  });

  newProduct.save(function (error, product) {
    if (error) {
      response.status(400).json({ error: error });
    } else {
      response.status(200).json({ product: product });
    }
  });
});

module.exports = router;
