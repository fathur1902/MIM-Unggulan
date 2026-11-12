import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiAward,
  FiShield, // <--- 1. Tambahkan import FiShield di sini
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import Swal from "sweetalert2";

// Helper untuk membaca username yang sedang login dari token
const getLoggedInUsername = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return "Admin";
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.username || "Admin";
  } catch {
    return "Admin";
  }
};

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const currentAdmin = getLoggedInUsername();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin keluar?",
      text: "Anda harus login kembali untuk mengakses halaman ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");

      await Swal.fire({
        title: "Logged Out!",
        text: "Berhasil keluar dari sistem.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    }
  };

  // 2. Tambahkan menu Kelola Admin ke dalam array menuItems ini
  const menuItems = [
    { path: "/admin", icon: <FiHome />, label: "Dashboard", end: true },
    { path: "/admin/berita", icon: <FiFileText />, label: "Berita" },
    { path: "/admin/guru", icon: <FiUsers />, label: "Guru (Kafilah)" },
    { path: "/admin/prestasi", icon: <FiAward />, label: "Prestasi" },
    { path: "/admin/users", icon: <FiShield />, label: "Kelola Admin" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-100">
          <div className="text-teal-600">
            <LuGraduationCap size={32} />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-gray-800 text-lg truncate">
              {currentAdmin}
            </h1>
            <p className="text-xs text-teal-600 font-medium">MIM Unggulan</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden ml-auto text-gray-500"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-teal-50 text-teal-700 font-bold border border-teal-100"
                    : "text-gray-500 hover:bg-gray-50 hover:text-teal-600"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition font-medium"
          >
            <FiLogOut /> Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 md:hidden sticky top-0 z-40">
          <div className="text-teal-600">
            <LuGraduationCap size={28} />
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600"
          >
            <FiMenu size={24} />
          </button>
        </header>

        <main className="p-6 md:p-8 flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
