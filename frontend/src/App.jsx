import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/public/home/HomePage";
import Login from "./pages/public/auth/Login";
import Signup from "./pages/public/auth/Signup";
import AboutPage from "./pages/public/about/AboutPage";
import ContactPage from "./pages/public/contact/ContactPage";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"element={<HomePage />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/services" element={<h1>Services Page</h1>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
