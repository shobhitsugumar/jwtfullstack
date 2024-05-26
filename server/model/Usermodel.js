const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum password length must be 6 characters long "],
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(this.password, salt);
    this.password = hashpass;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
