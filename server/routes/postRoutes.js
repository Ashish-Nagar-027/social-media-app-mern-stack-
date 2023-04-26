const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const {
  createPost,
  deletePost,
  likeOrUnlike,
  timeLinePosts,
  getUserPosts,
  getAllPosts,
} = require("../controller/postController");

// create post
router.post("/", verifyToken, createPost);

// delete post
router.delete("/delete/:id", verifyToken, deletePost);

// like or unlike post
router.put("/like/:id", verifyToken, likeOrUnlike);

// timeline posts
router.get("/timeline", verifyToken, timeLinePosts);

// get user posts
router.get("/user/all/:id", verifyToken, getUserPosts);

// get all posts
router.get("/explore", verifyToken, getAllPosts);

module.exports = router;
