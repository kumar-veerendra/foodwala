import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "../../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(formData);

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control custom-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="custom-btn w-100">
            Login
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

            onError={() => {
              console.log("Google Login Failed");
            }}
          />

        </div>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="link">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;