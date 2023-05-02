const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    caption: String,
    imageUrl: {
      public_Id: String,
      url: String,
    },
    user: {
      name: {
        type: String,
        required: [true, "Please enter a name"],
      },
      avtar: {
        public_id: String,
        url: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
