import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import ProtectedRoute from "./routes/ProtectedRoute";

import HomePage from "./pages/public/home/HomePage";
import Login from "./pages/public/auth/Login";
import Signup from "./pages/public/auth/Signup";
import AboutPage from "./pages/public/about/AboutPage";
import ContactPage from "./pages/public/contact/ContactPage";

import Profile from "./pages/private/dashboard/Profile";
import Menu from "./pages/public/home/Menu";

import SingleFood from "./pages/public/home/SingleFood";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<h1>Services Page</h1>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/menu/:slug" element={<SingleFood />} />

        {/* Protected Example Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <h1>My Orders</h1>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;