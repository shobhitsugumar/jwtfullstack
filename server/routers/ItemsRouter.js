const express = require("express");
const router = express.Router();
const ItemController = require("../Controller/itemController");

router.get("/items", ItemController.getItem);
router.post("/items", ItemController.addItems);
router.put("/items/:id", ItemController.updateItems);
router.delete("/items/:id", ItemController.deleteitmes);

module.exports = router;
