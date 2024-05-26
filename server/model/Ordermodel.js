const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  items: [
    {
      productId: {
        type: String,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        min: [1, "Quantity can not be less than 1"],
        required: true,
      },
      price: {
        type: Number,
      },
    },
  ],
  bill: {
    type: Number,
    required: true,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
