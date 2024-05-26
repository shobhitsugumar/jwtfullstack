const Order = require("../model/Ordermodel");
const Cart = require("../model/Cart");
const User = require("../model/Usermodel");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPEAPIKEY);

exports.getOrders = async (req, res) => {
  const userId = req.params.id;
  try {
    const order = await Order.find({ userId }).sort({ date_added: -1 });
    res.json(order);
  } catch (error) {
    console.log("error in getting the orders");
    res.status(500).json({ message: error.message });
  }
};
