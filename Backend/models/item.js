
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  stars: Number,
  count: Number,
});

const itemSchema = new mongoose.Schema({
  id: String,
  image: String,
  company: String,
  item_name: String,
  original_price: Number,
  current_price: Number,
  discount_percentage: Number,
  return_period: Number,
  delivery_date: String,
  rating: ratingSchema,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
