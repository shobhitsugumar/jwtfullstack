const express = require("express");
const router = express.Router();
const orderController = require("../Controller/OrderController");

router.get("/order/:id", orderController.getOrders);
router.post("/order/:id", orderController.OrderCheckout);

module.exports = router;
