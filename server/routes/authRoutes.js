const express = require("express");
const { register, login, logout, getCurrentUser } = require("../controller/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUser", getCurrentUser);

module.exports = router;
