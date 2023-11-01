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
        secure: true,    
    sameSite: 'None', 
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
    secure: true,    
    sameSite: 'None', 
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

///====================
//         get current User
///=====================
const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "please Login first" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    const user = await User.findById(decode.id);
    req.user = user;
    req.user.password = undefined
    
    res.status(200).json(user);

    
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};


module.exports = {
  getCurrentUser,
  register,
  login,
  logout,
};
