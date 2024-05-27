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

exports.OrderCheckout = async (req, res) => {
  try {
    const userId = req.params.id;
    const { source } = req.body;
    const cart = await Cart.findOne({ userId });
    const user = await User.findOne({ _id: userId });
    const email = user.email;

    if (cart) {
      const charge = await stripe.charges.create({
        amount: cart.bill,
        currency: "inr",
        source: source,
        receipt_email: email,
      });
      if (!charge) {
        throw Error("Payment failed ");
      }
      if (charge) {
        const order = await Order.create({
          items: cart.items,
          bill: cart.bill,
        });
        const data = await Cart.findByIdAndDelete({ _id: cart.id });
        return res.status(201).send(order);
      }
    } else {
      res.status(400).send("you dont have items in the cart ");
    }
  } catch (error) {
    res.status(500).send("Something went wrong ");
  }
};
