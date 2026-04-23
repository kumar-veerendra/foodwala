import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "../../../context/AuthContext";

function Signup() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (success) navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Email address"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Confirm Password"
              required
            />
          </div>

          <button type="submit" className="custom-btn w-100">
            Sign Up
          </button>

        </form>

        <div className="divider">or</div>

        <div className="social-login">

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const success = await login(
                credentialResponse.credential
              );

              if (success) navigate("/");
            }}
          />

        </div>

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