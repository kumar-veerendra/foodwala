import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadUser();
    else setLoading(false);
  }, []);

  const login = async (data) => {
    try {
      let res;

      if (typeof data === "string") {
        // Google Login
        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/google`,
          { credential: data }
        );
      } else {
        // Email + Password Login
        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          data
        );
      }

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      return true;

    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      return true;

    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);