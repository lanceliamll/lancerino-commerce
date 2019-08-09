const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    //Try to connect to the MongoDB with the Connection String
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
