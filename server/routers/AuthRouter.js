const express = require("express");
const router = express.Router();
const authcontroller = require("../Controller/AuthController");
const auth = require("../middlewares/authmiddleware");

router.post("/register", authcontroller.register);
router.post("/login", authcontroller.login);
router.get("/user", auth, authcontroller.getuser); //check the page we need auth protect to protect the route

module.exports = router;
