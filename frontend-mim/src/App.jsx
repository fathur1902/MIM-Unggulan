import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import ManageGuru from "./pages/admin/ManageGuru";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ManageBerita from "./pages/admin/ManageBerita";
import ManagePrestasi from "./pages/admin/ManagePrestasi";
import CreateBerita from "./pages/admin/CreateBerita";
import CreateGuru from "./pages/admin/CreateGuru";
import CreatePrestasi from "./pages/admin/CreatePrestasi";
import EditBerita from "./pages/admin/EditBerita";
import EditGuru from "./pages/admin/EditGuru";
import EditPrestasi from "./pages/admin/EditPrestasi";
import DetailBerita from "./pages/DetailBerita";
import ScrollToHash from "./components/ScrollToHash";
import ManageAdmin from "./pages/admin/ManageAdmin";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};
export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/berita/:id" element={<DetailBerita />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAdmin />} />
          <Route path="users" element={<ManageAdmin />} />
          <Route path="berita" element={<ManageBerita />} />
          <Route path="berita/create" element={<CreateBerita />} />
          <Route path="berita/edit/:id" element={<EditBerita />} />
          <Route path="guru" element={<ManageGuru />} />
          <Route path="guru/create" element={<CreateGuru />} />
          <Route path="guru/edit/:id" element={<EditGuru />} />
          <Route path="prestasi" element={<ManagePrestasi />} />
          <Route path="prestasi/create" element={<CreatePrestasi />} />
          <Route path="prestasi/edit/:id" element={<EditPrestasi />} />
        </Route>
      </Routes>
    </Router>
  );
}
