const connectDB = require("./db/connect");
const app = require("./index");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

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
