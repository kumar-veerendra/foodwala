const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      default: "Home",
      trim: true
    },

    street: {
      type: String,
      default: "",
      trim: true
    },

    city: {
      type: String,
      default: "",
      trim: true
    },

    state: {
      type: String,
      default: "",
      trim: true
    },

    pincode: {
      type: String,
      default: "",
      trim: true
    },

    landmark: {
      type: String,
      default: "",
      trim: true
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      default: null
    },

    authProvider: {
      type: String,
      enum: ["google", "local"],
      default: "local"
    },

    googleId: {
      type: String,
      default: null
    },

    avatar: {
      type: String,
      default: ""
    },

    phone: {
      type: String,
      default: ""
    },

    isPhoneVerified: {
      type: Boolean,
      default: false
    },

    bio: {
      type: String,
      default: "",
      maxlength: 120,
      trim: true
    },

    addresses: [addressSchema],

    notifications: {
      orderUpdates: {
        type: Boolean,
        default: true
      },

      promotions: {
        type: Boolean,
        default: false
      },

      smsAlerts: {
        type: Boolean,
        default: true
      },

      emailDigest: {
        type: Boolean,
        default: false
      }
    },

    role: {
      type: String,
      enum: ["user", "admin", "rider", "owner"],
      default: "user"
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    lastLogin: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;