import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuGraduationCap } from "react-icons/lu";
import { FiEye, FiEyeOff } from "react-icons/fi"; // <--- Import ikon mata

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <--- State tampilkan password
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-4 text-teal-600">
          <LuGraduationCap size={48} />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Input Password dengan tombol lihat password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 cursor-pointer"
              title={showPassword ? "Sembunyikan password" : "Lihat password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg font-bold hover:bg-teal-700 transition cursor-pointer"
          >
            Masuk
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-gray-500 hover:text-teal-600">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}
