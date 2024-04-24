const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
