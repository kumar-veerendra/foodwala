const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  updateMyProfile
} = require("../controllers/user.controller");

router.put("/profile", protect, updateMyProfile);

module.exports = router;