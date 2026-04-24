// Menu.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import DishCard from "../../../components/dish/DishCard";
import "../../../App.css";

import { BoilLoader } from "../../../components/ui/FoodLoader";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    "all",
    "pizza",
    "burger",
    "biryani",
    "drink",
    "dessert",
    "roll",
    "snacks",
  ];

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams(location.search);
        const search = params.get("search");
        const category = params.get("category");

        setActiveCategory(category || "all");

        let url = `${import.meta.env.VITE_API_URL}/api/foods?`;
        const query = [];

        if (search) query.push(`search=${search}`);
        if (category && category !== "all") {
          query.push(`category=${category}`);
        }

        url += query.join("&");

        const res = await axios.get(url);
        setFoods(res.data.foods);
      } catch (error) {
        console.log("Failed to fetch foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [location.search]);

  const handleCategory = (cat) => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");

    const query = [];

    if (search) query.push(`search=${search}`);
    if (cat !== "all") query.push(`category=${cat}`);

    setActiveCategory(cat);

    navigate(query.length ? `/menu?${query.join("&")}` : "/menu");
  };

  return (
    <div className="main-container">
      {/* Category Buttons */}
      <div className="category-wrapper">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading ? (
        // <p className="text-center">Loading delicious food...</p>
        <div className="flex justify-center items-center py-16">
          <BoilLoader />
        </div>
      ) : foods.length === 0 ? (
        <p className="text-center">No food found 🍽️</p>
      ) : (
        <div className="product">
          {foods.map((item) => (
            <DishCard
              key={item._id}
              slug={item.slug}
              image={`${import.meta.env.VITE_API_URL}${item.image[0]}`}
              name={item.name}
              newPrice={`₹${item.discountPrice || item.price}`}
              oldPrice={`₹${item.price}`}
              explain={item.description}
              rating={item.rating}
              isVeg={item.isVeg}
              prepTime={item.prepTime}
              isBestSeller={item.isBestSeller}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;