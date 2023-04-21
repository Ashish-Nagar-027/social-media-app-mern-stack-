const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//==============================
//        register
//=============================
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    //
    if (!email || !name || !password) {
      throw Error("please fill all fileds ");
    }

    //checking existing
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw Error("User Already Exits");
    }

    // encrypting password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    user.password = undefined;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///====================
//         login
///=====================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //
    if (!email || !password) {
      throw Error("please fill all fileds ");
    }

    //checking existing
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("email not available , try sign up");
    }

    // compare password
    const isRealPassword = await bcrypt.compare(password, user.password);
    if (!isRealPassword) {
      throw Error("wrong password");
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    user.password = undefined;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///====================
//         logout
///=====================
const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logOut");
};

module.exports = {
  register,
  login,
  logout,
};
