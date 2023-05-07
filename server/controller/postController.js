const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

// create new post
const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const userInfo = await User.findById(req.user.id);

    const post = await Post.create({
      caption,
      user: {
        name: userInfo.name,
        avtar: userInfo.avtar,
        userId: userInfo.id,
      },
    });

    await userInfo.updateOne({
      $push: { posts: post.id },
    });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Post
const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw Error("please send post id to get post");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("please send valid post id to get post");
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(403).json("post not found");
    }

    if (post.userId.toString() === req.user.id) {
      res.status(200).json({ post });
    } else {
      throw Error({
        message: "Access Denied! user can only get there own posts",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update a Post
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw Error("please send post id ");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("please send valid post id to update post");
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(403).json("post not found");
    }

    if (post.user.userId.toString() === req.user.id) {
      const updatedPost = await post.updateOne({
        $set: { caption: req.body.caption, userId: post.user.userId },
      });

      res
        .status(200)
        .json({ updatedPost, message: "Post updated successfully" });
    } else {
      throw Error({
        message: "Action forbidden! Users can only update their own posts ",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw Error("please send post id to delete");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("please send valid post id to delete post");
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(403).json("post not found");
    }

    if (post.userId.toString() === req.user.id) {
      await post.deleteOne();

      await User.updateOne(
        { _id: req.user.id },
        {
          $pull: { posts: post.id },
        }
      );

      res.status(200).json("post has been deleted");
    } else {
      throw Error({
        message: "Actions forbidden ! You can only delete your own posts",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///======================
// like or unlike post
///=====================
const likeOrUnlike = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;
    if (!postId) {
      throw Error("please send post id to like in params");
    }
    if (!userId) {
      throw Error("please send user id who wants to like the post");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("post id is not valid id");
    }
    if (!mongoose.isValidObjectId(userId)) {
      throw Error("userId is not valid");
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(403).json("post not found");
    }

    let message;

    if (!post.likes.includes(userId)) {
      await post.updateOne({
        $push: { likes: userId },
      });
      message = "your like added";
    } else {
      await post.updateOne({
        $pull: { likes: userId },
      });
      message = "your like removed";
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///======================
// Get TimeLine posts
///=====================
const timeLinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    const userPosts = await Post.find({ "user.userId": currentUser.id });

    const followingsPosts = await Promise.all(
      currentUser.followings.map((followerId) => {
        return Post.find({ "user.userId": followerId });
      })
    );

    const posts = userPosts.concat(...followingsPosts).sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    const removeDuplicatePostes = posts.filter((post, index) => {
      return (
        index ===
        posts.findIndex((obj) => {
          return JSON.stringify(obj) === JSON.stringify(post);
        })
      );
    });
    console.log(removeDuplicatePostes);

    res.status(200).json(removeDuplicatePostes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///======================
// Get user all  posts
///=====================
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    const userPosts = await Promise.all(
      user.posts.map((postId) => {
        return Post.findById(postId);
      })
    );

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///======================
// Get all  posts
///=====================
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
  getPost,
  updatePost,
  deletePost,
  likeOrUnlike,
  timeLinePosts,
  getUserPosts,
  getAllPosts,
};
