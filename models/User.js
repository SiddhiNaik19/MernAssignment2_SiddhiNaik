const mongoose = require("../config/db");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  files: {
    type: [String],
    required: true,
  },
});

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;