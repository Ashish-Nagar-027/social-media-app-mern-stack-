const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: String,
  imageUrl: {
    public_Id: String,
    url: String,
  },
  owner: {
    name: String,
    userId: mongoose.Schema.Types.ObjectId,
    avtar: {
      public_id: String,
      url: String,
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
