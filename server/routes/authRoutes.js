const express = require("express");
const { register, login, logout, getCurrentUser, loginAsGuest,  } = require("../controller/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUser", getCurrentUser);
router.get("/guestlogin", loginAsGuest);

module.exports = router;
