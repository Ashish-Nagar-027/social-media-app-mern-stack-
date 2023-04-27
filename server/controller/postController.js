const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const userInfo = await User.findById(req.user.id);
    const owner = {
      userId: userInfo.id,
      name: userInfo.name,
    };

    const post = await Post.create({
      caption,
      owner,
    });

    const user = await User.updateOne(
      { _id: userInfo.id },
      {
        $push: { posts: post.id },
      }
    );

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (post.owner.toString() === req.user.id) {
      const postDelete = await Post.deleteOne({ postId });

      const user = await User.updateOne(
        { _id: req.user.id },
        {
          $pull: { posts: post.id },
        }
      );

      res.status(200).json("post has been deleted");
    } else {
      throw Error({ message: "something is wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeOrUnlike = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    let message;

    if (!post.likes.includes(post.id)) {
      const postLikeOrUnlike = await Post.updateOne({
        $push: { posts: req.user.id },
      });
      message = "your like added";
    } else {
      const postLikeOrUnlike = await Post.updateOne({
        $pull: { posts: req.user.id },
      });
      message = "your like removed";
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const timeLinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const userPosts = await Post.find({ owner: currentUser.id });

    const followersPosts = await Promise.all(
      currentUser.followings.map((followerId) => {
        return Post.find({ owner: followerId });
      })
    );
    res.status(200).json(userPosts.concat(...followersPosts));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const userPosts = await Post.find({ owner: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  likeOrUnlike,
  timeLinePosts,
  getUserPosts,
  getAllPosts,
};
