import React, { useState, useEffect } from "react";
import {
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiX,
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const getCurrentUserId = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.id;
  } catch {
    return null;
  }
};

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // <--- State lihat password
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentUserId = getCurrentUserId();
  const token = localStorage.getItem("token");
  const API_AUTH = `${import.meta.env.VITE_BASE_URL}/api/auth`;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${API_AUTH}/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setAdmins(data);
    } catch (err) {
      console.error("Gagal mengambil daftar admin:", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setSelectedId(null);
    setFormData({ username: "", password: "" });
    setShowPassword(false);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditModal = (admin) => {
    setEditMode(true);
    setSelectedId(admin.id);
    setFormData({ username: admin.username, password: "" });
    setShowPassword(false);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    try {
      const url = editMode
        ? `${API_AUTH}/admins/${selectedId}`
        : `${API_AUTH}/register`;
      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Terjadi kesalahan");
      }

      setIsModalOpen(false);
      fetchAdmins();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (admin) => {
    if (
      !window.confirm(
        `Yakin ingin menghapus akun admin "${admin.username}"? Akses loginnya akan dicabut permanen.`,
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`${API_AUTH}/admins/${admin.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Gagal menghapus admin");
        return;
      }
      fetchAdmins();
    } catch (err) {
      alert("Gagal terhubung ke server");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiShield className="text-teal-600" /> Kelola Akun Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Tambah, ubah, atau hapus akun pengelola website madrasah.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition cursor-pointer"
        >
          <FiUserPlus /> Tambah Admin Baru
        </button>
      </div>

      {/* Tabel Admin */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold">
                <th className="py-4 px-6 w-16">No</th>
                <th className="py-4 px-6">Username</th>
                <th className="py-4 px-6">Status Sesi</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-400">
                    Memuat data admin...
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-400">
                    Belum ada data admin.
                  </td>
                </tr>
              ) : (
                admins.map((admin, index) => {
                  const isCurrentUser =
                    String(admin.id) === String(currentUserId);
                  return (
                    <tr
                      key={admin.id}
                      className="hover:bg-gray-50/70 transition"
                    >
                      <td className="py-4 px-6 font-medium text-gray-600">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-800">
                        {admin.username}
                      </td>
                      <td className="py-4 px-6">
                        {isCurrentUser ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
                            Sedang Login (Anda)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Aktif
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(admin)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-semibold transition cursor-pointer"
                        >
                          <FiEdit2 /> Edit
                        </button>
                        {!isCurrentUser && (
                          <button
                            onClick={() => handleDelete(admin)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            <FiTrash2 /> Hapus
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah / Edit Admin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {editMode ? "Edit Akun Admin" : "Tambah Admin Baru"}
            </h2>
            <p className="text-xs text-gray-500 mb-5">
              {editMode
                ? "Kosongkan kolom password jika tidak ingin mengganti password lama."
                : "Buat kredensial login untuk admin baru."}
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    placeholder="Contoh: admin_kurikulum"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  {editMode ? "Password Baru (Opsional)" : "Password"}
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required={!editMode}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder={
                      editMode
                        ? "Biarkan kosong jika tetap"
                        : "Masukkan password"
                    }
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 cursor-pointer"
                    title={
                      showPassword ? "Sembunyikan password" : "Lihat password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff size={17} />
                    ) : (
                      <FiEye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer"
                >
                  {submitting
                    ? "Menyimpan..."
                    : editMode
                      ? "Simpan Perubahan"
                      : "Buat Akun"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
