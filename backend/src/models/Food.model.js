// models/Food.js

const mongoose = require("mongoose");
const slugify = require("slugify");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 1000,
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discount price cannot be greater than price",
      },
    },

    image: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    category: {
      type: String,
      required: true,
      enum: [
        "pizza",
        "burger",
        "biryani",
        "roll",
        "drink",
        "dessert",
        "combo",
        "snacks",
      ],
      lowercase: true,
    },

    subCategory: {
      type: String,
      trim: true,
      lowercase: true,
    },

    isVeg: {
      type: Boolean,
      default: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    prepTime: {
      type: Number, // in minutes
      default: 20,
    },

    stock: {
      type: Number,
      default: 100,
      min: 0,
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    keywords: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    spiceLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    portionSize: {
      type: String,
      enum: ["regular", "medium", "large"],
      default: "regular",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isBestSeller: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Auto create slug before save
foodSchema.pre("save", function () {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
});

// Search index
foodSchema.index({
  name: "text",
  description: "text",
  tags: "text",
  keywords: "text",
});

// Filter / sort indexes
foodSchema.index({ category: 1 });
foodSchema.index({ price: 1 });
foodSchema.index({ rating: -1 });
foodSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Food", foodSchema);