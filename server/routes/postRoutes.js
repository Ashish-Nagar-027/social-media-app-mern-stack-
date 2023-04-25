const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const { createPost, deletePost } = require("../controller/postController");

// create post
router.post("/", verifyToken, createPost);

// delete post
router.post("/delete", verifyToken, deletePost);

module.exports = router;
