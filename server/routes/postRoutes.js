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
  bookmarkPost,
  getUserBookmarkedPosts,
  deleteComment,
  getComments
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

// add bookmark post
router.put("/:id/bookmark", verifyToken, bookmarkPost);

// add get post
router.get("/:id/bookmarks", verifyToken,  getUserBookmarkedPosts);

// timeline posts
router.get("/:id/timeline", verifyToken, timeLinePosts);

// get user posts
router.get("/:id/user", verifyToken, getUserPosts);

// get all posts
router.get("/explore", verifyToken, getAllPosts);

// add comment
router.put("/:id/comment", verifyToken, addComment);

// get comments
router.get("/:id/comment", verifyToken, getComments);

// delete comment
router.delete("/:id/comment", verifyToken, deleteComment);

module.exports = router;
