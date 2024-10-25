const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Assignment2Db");

db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to Db"));

module.exports = mongoose;
