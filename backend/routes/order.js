const express = require("express");
const router = express.Router();
const Order = require("../model/order");

// GET /Orders
router.get("/", (request, response) => {
  Order.find()
    .populate("items.product")
    .exec((error, orders) => {
      if (error) {
        return response.status(400).json({ error: error });
      }
      response.status(200).json(orders);
    });
});

// GET /Orders by user
router.get("/:id", (request, response) => {
  Order.find({ user: request.params.id })
    .populate("items.product")
    .exec((error, orders) => {
      if (error) {
        return response.status(400).json({ error: error });
      }
      response.status(200).json(orders);
    });
});

// POST /Orders
router.post("/", (request, response) => {
  let requestOrder = request.body;

  let newOrder = new Order({
    items: requestOrder.items,
    user: requestOrder.user,
  });

  newOrder.save((error, order) => {
    if (error) {
      response.status(400).json({ error: error });
    } else {
      response.status(201).json(order);
    }
  });
});

module.exports = router;
