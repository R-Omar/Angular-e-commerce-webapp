const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  images: { type: String },
});

module.exports = mongoose.model("Product", ProductSchema);
