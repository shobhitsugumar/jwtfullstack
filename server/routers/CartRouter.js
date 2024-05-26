const express = require("express");
const router = express.Router();
const CartController = require("../Controller/CartController");

router.get("/cart/:id", CartController.getCart);
router.post("/cart/:id", CartController.addToCart);
router.delete("/cart/:userId/:itemId", CartController.deleteCartitem);

module.exports = router;
