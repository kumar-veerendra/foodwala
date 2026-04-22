const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name: String,
    email: String,
    googleId: String,
    avatar: String,

    phone: String,

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