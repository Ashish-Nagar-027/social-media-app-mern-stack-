const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");

///======================
///   get user
///=====================
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw Error("please send user id to get user info ");
    }

    if (!mongoose.isValidObjectId(id)) {
      throw Error("please send valid user id");
    }

    const userData = await User.findById(id);
    userData.password = undefined;
    res.status(200).json(userData);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

///======================
///   update user details
///=====================
const updateUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).json(user);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

///======================
///   delete user
///=====================
const deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      const user = await User.findByIdAndDelete(req.params.id, req.body);
      const deletePost = await Post.findByIdAndDelete({ owner: req.user.id });

      res.status(200).json("user deleted ");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

///======================
///   follow user
///=====================
const follow = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const followerUser = await User.findById(req.params.id);

    if (!currentUser.followings.includes(req.user.id)) {
      await currentUser.updateOne({
        $push: { followings: followerUser.id },
      });
      await followerUser.updateOne({
        $push: { followers: currentUser.id },
      });
    } else {
      res.status(403).json("You already follow this user");
    }
    res.status(200).json("Following the use");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

///======================
///   unfollow user
///=====================
const unfollow = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    // user whom to unfollow
    const followingUser = await User.findById(req.params.id);

    if (currentUser.followings.includes(req.params.id)) {
      await currentUser.updateOne({
        $pull: { followings: req.params.id },
      });

      await followingUser.updateOne({
        $pull: { followers: req.user.id },
      });
    } else {
      res.status(403).json("You do not follow this user");
    }
    res.status(200).json("unfollowing the use");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
};
