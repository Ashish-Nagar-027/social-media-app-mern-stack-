const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

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
    if (userData) {
      userData.password = undefined;
      res.status(200).json(userData);
    } else {
      res.status(200).json("User not found");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

///======================
///   update user details
///=====================
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!id) {
      throw Error("please send Your Valid Id ");
    }

    if (!mongoose.isValidObjectId(id)) {
      throw Error("please send valid user id");
    }

    if (req.user.id === id) {
      if (password) {
        // encrypting password
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
      }

      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      user.password = undefined;
      res.status(200).json(user);
    } else {
      res.status(403).json("Access Denied ! you can only update your profile");
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
    if (!req.params.id) {
      throw Error("please send Your Valid Id to delete");
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      throw Error("please send valid id to delete");
    }
    if (req.user.id === req.params.id) {
      const user = await User.findByIdAndDelete(req.params.id);
      const deleteUserPosts = await User.findByIdAndDelete(req.user.id);

      res.status(200).json("User Deleted SuccessFully");
    } else {
      res.status(403).json("Access Denied ! you can only delete your profile");
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
    if (!req.params.id) {
      throw Error("please send Your Valid Id of User whom you want to follow");
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      throw Error("please send valid user id");
    }

    //current user
    const currentUser = await User.findById(req.user.id);

    // user whom we want to follow (follow this user)
    const followUser = await User.findById(req.params.id);

    if (!followUser) {
      res.status(403).json("user not exist");
    }

    // restriction for self following
    if (currentUser.id === followUser) {
      res.status(403).json("Action forbidden");
    }

    // follow user now
    if (!currentUser.followings.includes(req.user.id)) {
      await currentUser.updateOne({
        $push: { followings: followUser.id },
      });
      await followUser.updateOne({
        $push: { followers: currentUser.id },
      });
      res.status(200).json("You are now following " + followUser.name);
    } else {
      res.status(403).json("You already follow this user");
    }
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
    const unfollowUser = await User.findById(req.params.id);
    if (!unfollowUser) {
      res.status(403).json("user not exist");
    }

    if (currentUser.followings.includes(req.params.id)) {
      await currentUser.updateOne({
        $pull: { followings: req.params.id },
      });

      await unfollowUser.updateOne({
        $pull: { followers: req.user.id },
      });
      res.status(200).json("unfollowing " + unfollowUser.name);
    } else {
      res.status(403).json("You do not follow this user");
    }
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
