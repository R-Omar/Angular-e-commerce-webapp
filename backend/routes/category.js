const express = require("express");
const router = express.Router();
const Category = require("../model/category");
// GET /Categories
router.get("/", (request, response) => {
  Category.find((error, categories) => {
    if (error) {
      return response.status(400).json({ error: error });
    }
    response.status(200).json(categories);
  });
});

// POST /Categories
router.post("/", (request, response) => {
  let requestCategory = request.body;

  let newCategory = new Category({
    name: requestCategory.name,
    icon: requestCategory.icon,
  });

  newCategory.save((error, category) => {
    if (error) {
      response.status(400).json({ error: error });
    } else {
      response.status(201).json(category);
    }
  });
});

module.exports = router;
