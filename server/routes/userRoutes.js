const express = require("express");
const { getUser, updateUser } = require("../controller/userController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//update user
router.patch("/:id", verifyToken, updateUser);

// get user
router.route("/find/:id").get(getUser);

module.exports = router;
