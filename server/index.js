const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

//importing routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

//
app.use(cors());
app.use(morgan("tiny"));

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.get("/", (req, res) => {
  res.send("home");
});

// using routes
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/post", postRoutes);

module.exports = app;
