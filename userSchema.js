require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validator: [validator.isEmail, "invalid email"],
  },
  password: String,
});

userSchema.plugin(encrypt, {
  secret: process.env.SECRET,
  encryptedFields: ["password"],
});

module.exports = new mongoose.model("User", userSchema);
