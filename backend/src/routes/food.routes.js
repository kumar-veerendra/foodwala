// routes/food.routes.js

const express = require("express");
const router = express.Router();

const {
  getAllFoods,
  getSingleFood,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/food.controller");

// Optional middlewares (use when ready)
// const { protect } = require("../middlewares/auth.middleware");
// const { isAdmin } = require("../middlewares/role.middleware");

/*
========================================
PUBLIC ROUTES
========================================
*/

// Get all foods
// GET /api/foods
router.get("/", getAllFoods);

// Get single food by slug
// GET /api/foods/:slug
router.get("/:slug", getSingleFood);

/*
========================================
ADMIN ROUTES
========================================
*/

// Create food
// POST /api/foods
router.post(
  "/",
  // protect,
  // isAdmin,
  createFood
);

// Update food
// PUT /api/foods/:id
router.put(
  "/:id",
  // protect,
  // isAdmin,
  updateFood
);

// Delete food
// DELETE /api/foods/:id
router.delete(
  "/:id",
  // protect,
  // isAdmin,
  deleteFood
);

module.exports = router;