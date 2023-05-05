const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
  suggestUsers,
  getUserFollowers,
  getUserFollowings,
} = require("../controller/userController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);

// get user
router.route("/:id").get(getUser);

// get user followers
router.route("/:id/getfollowers").get(getUserFollowers);

// get user followings
router.route("/:id/getfollowings").get(getUserFollowings);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// follow user
router.put("/:id/follow", verifyToken, follow);

// unfollow user
router.put("/:id/unfollow", verifyToken, unfollow);

// get all users
router.route("/:id/suggestusers").get(suggestUsers);

module.exports = router;
