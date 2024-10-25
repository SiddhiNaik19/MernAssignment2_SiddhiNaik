const mongoose = require("../config/db");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  sem: Number,
  dob: Date,
});

module.exports = mongoose.model("Student", StudentSchema, "students");
