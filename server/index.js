const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//importing routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.get("/", (req, res) => {
  res.send("home");
});

// using routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);

module.exports = app;
