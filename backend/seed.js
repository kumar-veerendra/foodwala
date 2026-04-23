const mongoose = require("mongoose");
const dotenv = require("dotenv");
const slugify = require("slugify");

const Food = require("./src/models/Food.model");
const foods = require("./src/data/foods");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Food.deleteMany();

  const updatedFoods = foods.map((item) => ({
    ...item,
    slug: slugify(item.name, { lower: true, strict: true }),
  }));

  await Food.insertMany(updatedFoods);

  console.log("Foods Inserted");
  process.exit();
});