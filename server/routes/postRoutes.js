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
  getPost,
  updatePost,
  addComment,
} = require("../controller/postController");

// create post
router.post("/", verifyToken, createPost);

// get post
router.get("/:id", verifyToken, getPost);

// update post
router.put("/:id", verifyToken, updatePost);

// delete post
router.delete("/:id", verifyToken, deletePost);

// like or unlike post
router.put("/:id/like", verifyToken, likeOrUnlike);

// timeline posts
router.get("/:id/timeline", verifyToken, timeLinePosts);

// get user posts
router.get("/:id/user", verifyToken, getUserPosts);

// get all posts
router.get("/explore", verifyToken, getAllPosts);

// add comment
router.put("/:id/comment", verifyToken, addComment);

module.exports = router;
