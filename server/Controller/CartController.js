const { response } = require("express");
const Cart = require("../model/Cart");
const Item = require("../model/Itemmodel");

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.id;
    let cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {}
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    let item = await Item.findOne({ _id: productId });

    if (!item) {
      res.status(400).send("Item not found");
    }

    const price = item.price;
    const name = item.title;

    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.productId === productId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push[{ productId, name, quantity, price }];
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //if no cart exist
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    res.status(500).send("something went wrong ");
  }
};

exports.deleteCartitem = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;

  try {
    const cart = await Cart.findOne({ userId });
    const itemIndex = cart.items.findIndex((p) => p.productId === productId);

    if (itemIndex > -1) {
      let productItem = cart.item[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
