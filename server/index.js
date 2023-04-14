const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("home");
});

module.exports = app;
