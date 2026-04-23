const User = require("../models/User.model");
const generateToken = require("../utils/generateToken");
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



// ============================
// GOOGLE LOGIN
// ============================
const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const name = payload.name;
    const email = payload.email;
    const googleId = payload.sub;
    const avatar = payload.picture;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        avatar,
        authProvider: "google"
      });
    } else {
      user.name = name;
      user.avatar = avatar;
      user.googleId = googleId;
      user.authProvider = "google";
      await user.save();
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Account blocked"
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ============================
// EMAIL REGISTER
// ============================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local"
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ============================
// EMAIL LOGIN
// ============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (user.authProvider === "google") {
      return res.status(400).json({
        success: false,
        message: "Please login with Google"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Account blocked"
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



module.exports = {
  googleAuth,
  register,
  login
};