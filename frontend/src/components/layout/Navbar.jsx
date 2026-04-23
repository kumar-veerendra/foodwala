import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import UserProfile from "../../pages/private/dashboard/UserProfile";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/menu?search=${search}`);
    setSearch("");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light border-bottom sticky-top"
      style={{ backgroundColor: "#fff", height: "85px" }}
    >
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="./icon.png"
            alt="Logo"
            style={{ height: "70px", width: "auto", borderRadius: "5px" }}
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search Bar */}
          <form
            className="d-flex mx-auto"
            style={{ width: "50%" }}
            onSubmit={handleSearch}
          >
            <input
              className="form-control me-2 custom-input"
              type="search"
              placeholder="Search for food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button label="Search" type="submit" />
          </form>

          {/* Right Side */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/menu">
                Menu
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item ms-3">
              {user ? (
                <UserProfile user={user} onLogout={logout} />
              ) : (
                <Link to="/login">
                  <Button label="Login" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;