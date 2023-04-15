const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

//importing routes
const authRoutes = require("./routes/authRoutes");

//
app.use(cors());
app.use(morgan("tiny"));

//
app.get("/", (req, res) => {
  res.send("home");
});

// using routes
app.use("/api/v1/auth", authRoutes);

module.exports = app;
