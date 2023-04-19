const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//==============================
//        register
//=============================
const register = async (req, res) => {
  console.log("new request");
  // console.log(req.body);
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
      console.log("new request 0");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("new request 1");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("new request 2");

    user.password = undefined;

    console.log(user);
    res.status(200).json(user);
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

    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
