import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard"; // (Nanti dibuat)

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Rute Admin (Nanti) */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}
