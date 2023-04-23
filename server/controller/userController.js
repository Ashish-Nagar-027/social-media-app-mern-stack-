const mongoose = require("mongoose");
const User = require("../models/User");

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

    if (!currentUser.followers.includes(req.user.id)) {
      await currentUser.updateOne({
        $push: { followers: followerUser.id },
      });
      await followerUser.updateOne({
        $push: { followings: currentUser.id },
      });
    } else {
      res.status(403).json("You already follow this user");
    }
    res.status(200).json("Following the use");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  follow,
};
