import React from "react";
import { useNavigate } from "react-router-dom";
import "./../../App.css";

function DishCard(props) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/menu/${props.slug}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation(); // prevent card click
    alert(`${props.name} added to cart`);
  };

  return (
    <div className="card" onClick={goToDetails} style={{ cursor: "pointer" }}>
      {/* Image */}
      <img
        src={props.image}
        alt={props.name}
        onClick={goToDetails}
      />

      {/* Top badges */}
      <div className="dish-top">
        {props.isVeg ? (
          <span className="veg-badge">🟢 Veg</span>
        ) : (
          <span className="nonveg-badge">🔴 Non Veg</span>
        )}

        {props.isBestSeller && (
          <span className="best-badge">🔥 Bestseller</span>
        )}
      </div>

      <div className="description">
        {/* Name */}
        <h2 onClick={goToDetails}>{props.name}</h2>

        {/* Rating + Time */}
        <div className="meta-row">
          <span className="rating">⭐ {props.rating}</span>
          <span className="time">⏱️ {props.prepTime} min</span>
        </div>

        {/* Price */}
        <p className="price">
          {props.newPrice}
          <span className="old-price">{props.oldPrice}</span>
        </p>

        {/* Description */}
        <p className="recipe">{props.explain}</p>

        {/* Add Button */}
        <button className="btn" onClick={handleAdd}>
          Add +
        </button>
      </div>
    </div>
  );
}

export default DishCard;