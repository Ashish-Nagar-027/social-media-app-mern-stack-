const connectDB = require("./db/connect");
const app = require("./index");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Clodiname Configuration
cloudinary.config({
  cloud_name: process.env.ClOUDINARY_CLOUD_NAME,
  api_key: process.env.ClOUDINARY_API_KEY,
  api_secret: process.env.ClOUDINARY_API_SECRET,
});

const start = async () => {
  try {
    // connect to database
    await connectDB(process.env.MONGO_URI);

    // start the app
    app.listen(PORT, () => {
      console.log("server is listening at port " + PORT);
    });
  } catch (error) {
    console.log("DB connection failed");
    console.log(error);
    process.exit(1);
  }
};

start();
