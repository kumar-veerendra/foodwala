const express = require("express");

const app = express();

const User = require("./models/User.model");

const authRoutes = require("./routes/auth.routes");

const cors = require("cors");

const foodRoutes = require("./routes/food.routes");

const path = require("path");

app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use(cors());

// middleware
app.use(express.json());

// routes here
app.use("/api/auth", authRoutes);

app.use("/api/foods", foodRoutes);

// test route
app.get("/", (req, res) => {
  res.send("FoodWala Backend Running");
});


app.get("/test-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Veeru",
      email: `veeru${Date.now()}@gmail.com`,
      googleId: "123google",
      phone: "9876543210"
    });

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = app;