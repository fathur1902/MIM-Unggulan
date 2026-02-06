import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

export default function CreateGuru() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Simpan Data Guru?",
      text: "Data kafilah baru akan ditambahkan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("role", formData.role);
    payload.append("description", formData.description);
    if (imageFile) payload.append("image", imageFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/guru`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });
      const responseData = await res.json();
      if (res.ok) {
        await Swal.fire(
          "Berhasil!",
          "Data guru berhasil ditambahkan.",
          "success",
        );
        navigate("/admin/guru");
      } else {
        Swal.fire(
          "Gagal",
          responseData.message || "Terjadi kesalahan saat menyimpan.",
          "error",
        );
      }
    } catch (err) {
      Swal.fire("Error", "Koneksi terputus.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Tambah Guru (Kafilah)
        </h2>
        <Link
          to="/admin/guru"
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <FiArrowLeft /> Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jabatan
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keterangan / Status
          </label>
          <input
            type="text"
            placeholder="Contoh: Tenaga Pendidik, Staf Administrasi"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <p className="text-xs text-gray-400 mt-1">
            *Isi dengan deskripsi peran, misal: "Tenaga Pendidik" atau "Pemimpin
            Kebijakan"
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto Profil
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center bg-gray-50">
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <span className="text-sm text-gray-500 mt-2">
            Format gambar: JPG, PNG, JPEG, GIF, WEBP (Maks. 10MB)
          </span>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Link
            to="/admin/guru"
            className="px-6 py-2 rounded-lg border hover:bg-gray-50 text-gray-600"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 flex items-center gap-2"
          >
            <FiSave /> Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
