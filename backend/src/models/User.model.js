const mongoose = require("mongoose");

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

        addresses: [
            {
            label: String,
            street: String,
            city: String,
            state: String,
            pincode: String,
            landmark: String
            }
        ],

        role: {
            type: String,
            enum: ["user", "admin", "rider", "owner"],
            default: "user"
        },

        isBlocked: {
            type: Boolean,
            default: false
        }

    },
        {
            timestamps: true
        }
);

const User = mongoose.model("User", userSchema);

module.exports = User;