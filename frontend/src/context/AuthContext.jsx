import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
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

  const login = async (credential) => {
    // const res = await axios.post(
    //     "http://localhost:5000/api/auth/google",
    //     {
    //     name: "Veeru",
    //     email: "veeru@gmail.com",
    //     googleId: "12345",
    //     avatar: "photo-url"
    //     }
    // );

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/google`,
    { credential }
  );

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);