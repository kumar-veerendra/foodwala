import React from "react";
import { Link } from "react-router-dom";

import Button from "../ui/Button";
import Login from "../../pages/public/auth/Login";

import UserProfile from "../../pages/private/dashboard/UserProfile";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  // user = null  → not logged in
  // user = { name, email, avatar?, role? } → logged in

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light border-bottom sticky-top"
      style={{ backgroundColor: "#fff", height: "85px" }}
    >
      <div className="container">
        {/* Brand / Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            to="/"
            src="./icon.png"
            alt="Logo"
            style={{ height: "70px", width: "auto", borderRadius: "5px" }}
          />
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Center Search Bar */}
          <form className="d-flex mx-auto" style={{ width: "50%" }}>
            <input
              className="form-control me-2 custom-input"
              type="search"
              placeholder="Search for food, restaurants..."
              aria-label="Search"
            />
            <Button label="search" onClick={() => alert("Work in Progrss!")} />
          </form>

          {/* Right Side Menu */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          <li className="nav-item ml-5">
            {user ? (
                <UserProfile user={user} onLogout={logout} />
              ) : (
                <Link to="/login"><Button label="Login" /></Link>
              )}
          </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
