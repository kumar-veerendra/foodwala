// src/pages/public/SingleFood.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function SingleFood() {
  const { slug } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/foods/${slug}`
        );

        setFood(res.data.food);
      } catch (error) {
        console.log("Food fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [slug]);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "60px" }}>Loading...</h2>;
  }

  if (!food) {
    return <h2 style={{ textAlign: "center", marginTop: "60px" }}>Food not found 🍽️</h2>;
  }

  const discount =
    food.discountPrice &&
    Math.round(
      ((food.price - food.discountPrice) / food.price) * 100
    );

  const finalPrice = food.discountPrice || food.price;

  return (
    <div className="container py-5">
      {/* breadcrumb */}
      <p className="mb-4 text-muted">
        <Link to="/" className="text-decoration-none">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/menu" className="text-decoration-none">
          Menu
        </Link>{" "}
        / {food.name}
      </p>

      <div className="row g-5 align-items-start">
        {/* Left Image */}
        <div className="col-md-6">
          <div className="border rounded-4 p-3 bg-white shadow-sm">
            <img
              src={`http://localhost:5000${food.image[0]}`}
              alt={food.name}
              className="img-fluid rounded-4"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Right Details */}
        <div className="col-md-6">
          <span className="badge bg-dark mb-3 text-capitalize">
            {food.category}
          </span>

          <h1 className="fw-bold mb-3">{food.name}</h1>

          <div className="d-flex gap-3 flex-wrap mb-3">
            <span className="badge bg-success">
              ⭐ {food.rating}
            </span>

            <span className="badge bg-secondary">
              ⏱ {food.prepTime} min
            </span>

            <span
              className={`badge ${
                food.isVeg ? "bg-success" : "bg-danger"
              }`}
            >
              {food.isVeg ? "Veg" : "Non Veg"}
            </span>
          </div>

          <p className="text-muted fs-5">{food.description}</p>

          {/* Price */}
          <div className="my-4">
            <span className="fs-1 fw-bold text-danger">
              ₹{finalPrice}
            </span>

            {food.discountPrice && (
              <>
                <span className="ms-3 fs-4 text-muted text-decoration-line-through">
                  ₹{food.price}
                </span>

                <span className="ms-3 badge bg-warning text-dark">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="mb-4">
            {food.tags?.map((tag) => (
              <span
                key={tag}
                className="badge rounded-pill bg-light text-dark border me-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Qty */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <strong>Qty:</strong>

            <button
              className="btn btn-outline-dark"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>

            <span className="fs-5">{qty}</span>

            <button
              className="btn btn-outline-dark"
              onClick={() => setQty((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-3">
            <button className="btn btn-danger btn-lg">
              Add To Cart • ₹{qty * finalPrice}
            </button>

            <button className="btn btn-outline-danger btn-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleFood;