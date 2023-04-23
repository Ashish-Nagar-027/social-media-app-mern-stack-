const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  follow,
} = require("../controller/userController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//update user
router.patch("/:id", verifyToken, updateUser);

// get user
router.route("/find/:id").get(getUser);

// delete user
router.delete("/find/:id", verifyToken, deleteUser);

// follow user
router.put("/follow/:id", verifyToken, follow);

module.exports = router;
