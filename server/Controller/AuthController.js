const User = require("../model/Usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

console.log(process.env.JWT_SECRET);

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  try {
    const exsistingUser = await User.findOne({ email, password });
    if (exsistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    //generate the jwt token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    //send it back
    res.json({
      token,
      status: "success",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "enter email and  password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exsist" });
    }

    const confirmpass = await bcrypt.compare(password, user.password);
    console.log("confirmpass", confirmpass);

    if (!confirmpass) {
      return res.status(400).json({
        message: "enter valid password or email ",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getuser = async (req, res) => {
  console.log("this is req.user.id", req.user.id);
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};
