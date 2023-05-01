const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
} = require("../controller/userController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);

// get user
router.route("/:id").get(getUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// follow user
router.put("/:id/follow", verifyToken, follow);

// unfollow user
router.put("/:id/unfollow", verifyToken, unfollow);

module.exports = router;
