const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  username: {
    type: String,
    required: [true, "Please enter a user"],
    unique: [true, "username already exits"],
  },
  email: {
    type: String,
    required: [true, "username already exits"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avtar: {
    public_id: String,
    url: String,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

mongoose.exports = mongoose.model("User", userSchema);
