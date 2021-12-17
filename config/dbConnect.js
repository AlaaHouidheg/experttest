const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let response = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
