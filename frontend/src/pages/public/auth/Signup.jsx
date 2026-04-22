// src/components/auth/Signup.jsx
import React from "react";
import { Link } from "react-router-dom";
// import "./Login.css"; // reusing same styles

function Signup() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Create Account</h2>

        <form>
          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Email address"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control custom-input"
              placeholder="Password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              type="password"
              className="form-control custom-input"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Signup Button */}
          <button type="submit" className="custom-btn w-100">
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="divider">or</div>

        {/* Social Buttons */}
        <div className="social-login">
          <button className="social-btn google">
            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              alt="Google"
            />
            Continue with Google
          </button>
          <button className="social-btn facebook">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
            />
            Continue with Facebook
          </button>
        </div>

        {/* Already have account */}
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
