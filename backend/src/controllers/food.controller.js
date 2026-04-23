// controllers/food.controller.js

const Food = require("../models/Food.model");

/*
==================================================
GET ALL FOODS
Supports:
?search=
?category=
?isVeg=
?minPrice=
?maxPrice=
?sort=
?page=
?limit=
==================================================
*/

const getAllFoods = async (req, res) => {
  try {
    const {
      search,
      category,
      isVeg,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 8,
    } = req.query;

    let query = {};

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category.toLowerCase();
    }

    // Veg filter
    if (isVeg !== undefined) {
      query.isVeg = isVeg === "true";
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Only available foods
    query.isAvailable = true;

    // Sorting
    let sortOption = { createdAt: -1 };

    if (sort === "priceLow") sortOption = { price: 1 };
    if (sort === "priceHigh") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };
    if (sort === "popular") sortOption = { numReviews: -1 };

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const foods = await Food.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalFoods = await Food.countDocuments(query);

    res.status(200).json({
      success: true,
      count: foods.length,
      totalFoods,
      currentPage: Number(page),
      totalPages: Math.ceil(totalFoods / limit),
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch foods",
      error: error.message,
    });
  }
};

/*
==================================================
GET SINGLE FOOD BY SLUG
==================================================
*/

const getSingleFood = async (req, res) => {
  try {
    const food = await Food.findOne({ slug: req.params.slug });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch food",
      error: error.message,
    });
  }
};

/*
==================================================
CREATE FOOD
==================================================
*/

const createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create food",
      error: error.message,
    });
  }
};

/*
==================================================
UPDATE FOOD
==================================================
*/

const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update food",
      error: error.message,
    });
  }
};

/*
==================================================
DELETE FOOD
==================================================
*/

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete food",
      error: error.message,
    });
  }
};

module.exports = {
  getAllFoods,
  getSingleFood,
  createFood,
  updateFood,
  deleteFood,
};