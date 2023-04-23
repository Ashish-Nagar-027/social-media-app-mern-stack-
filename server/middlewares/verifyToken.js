const jwt = require("jsonwebtoken");

const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "please send token" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    const user = await User.findById(decode.id);
    req.user = user;

    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = verifyToken;
