const express = require("express");
const router = express.Router();

const {
  googleAuth,
  register,
  login
} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");


// Google Login
router.post("/google", googleAuth);

// Email Signup
router.post("/register", register);

// Email Login
router.post("/login", login);

// Current Logged-in User
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;