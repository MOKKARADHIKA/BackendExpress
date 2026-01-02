


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    img: String,
    description: String
});



const ordersSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      img:String
    },
  ],
  totalAmount: Number,
  discount: Number,
  couponDiscount: Number,
  gstAmount: Number,
  shipping: Number,
  taxes: Number,
  netAmount: Number,
  createdAt: { type: Date, default: Date.now },
  name: String,  // user name or order name
});


// USER SCHEMA (plain password)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    address: String
});

module.exports = { productSchema, ordersSchema, userSchema };

