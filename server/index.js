const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//importing routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require('./routes/conversationsRoutes')
const messagesRoutes = require('./routes/messagesRoutes')

//middlewares
app.use(
  cors({
    origin: ["http://localhost:3001","https://social-media-app-mern-stack.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.get("/", (req, res) => {
  res.send("server is working");
});

// using routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messagesRoutes);

module.exports = app;
