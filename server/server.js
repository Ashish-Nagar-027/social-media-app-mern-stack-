const connectDB = require("./db/connect");
const cloudinary = require("cloudinary");
const app = require("./index");
const http = require('http')
const server = http.createServer(app)
require("dotenv").config();
const cors = require("cors");

const { Server }  = require('socket.io')

const io = new Server(server, {
  cors : {
    origin: "http://localhost:3001",
    methods: ["GET","POST"]
  }
})

io.on("connection", (socket) => {
    console.log(' a user connected')

    socket.on('setup',(userData) => {
      socket.join(userData._id),
       console.log(userData._id);
      socket.emit("connected")
    })
})
 



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
    server.listen(PORT, () => {
      console.log("server is listening at port " + PORT);
    });
  } catch (error) {
    console.log("DB connection failed");
    console.log(error);
    process.exit(1);
  }
};

start();


