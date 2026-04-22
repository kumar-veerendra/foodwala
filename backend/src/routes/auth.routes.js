const express = require("express");
const router = express.Router();

const { googleAuth } = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");

router.post("/google", googleAuth);

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;