const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//==============================
//        register
//=============================
const register = async (req, res) => {
  try {
    const { email, name, username, password } = req.body;

    //
    if (!email || !name || !username || !password) {
      throw Error("please fill all fileds ");
    }

    //checking existing
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw Error("User Already Exits");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// =====================
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
