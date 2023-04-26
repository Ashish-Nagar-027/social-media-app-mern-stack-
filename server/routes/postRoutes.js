const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const {
  createPost,
  deletePost,
  likeOrUnlike,
  timeLinePosts,
} = require("../controller/postController");

// create post
router.post("/", verifyToken, createPost);

// delete post
router.delete("/delete/:id", verifyToken, deletePost);

// like or unlike post
router.put("/like/:id", verifyToken, likeOrUnlike);

// like or unlike post
router.get("/timeline", verifyToken, timeLinePosts);

module.exports = router;
