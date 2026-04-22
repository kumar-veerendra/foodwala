import React from "react";
// import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await login();
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control custom-input"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control custom-input"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="custom-btn w-100">
            Login
          </button>
        </form>

        <div className="divider">or</div>

        {/* Social Login Buttons */}
        <div className="social-login">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              await login(credentialResponse.credential);
              navigate("/");
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />

          <button className="social-btn facebook">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
            Continue with Facebook
          </button>
        </div>

        <p className="text-center mt-3">
            Don’t have an account? <Link to="/register" className="link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
