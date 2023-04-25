const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const owner = req.user.id;

    const post = await Post.create({
      caption,
      owner,
    });

    const user = await User.updateOne({
      $push: { posts: post.id },
    });

    res.status(200).json({ post, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body.params;
    const post = await Post.findById(postId);

    if (post.user.id === req.user.id) {
      const postDelete = await Post.deleteOne(postId);
      res.status(200).json("post has been deleted");
    } else {
      throw Error({ message: "something is wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
};
