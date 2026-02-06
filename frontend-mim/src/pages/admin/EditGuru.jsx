import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

export default function EditGuru() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/guru/${id}`,
        );
        const data = await res.json();
        if (res.ok) {
          setFormData({
            name: data.name,
            role: data.role,
            description: data.description,
          });
          setCurrentImage(data.image);
        } else {
          Swal.fire("Error", "Data tidak ditemukan.", "error");
          navigate("/admin/guru");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Simpan Perubahan?",
      text: "Data guru akan diperbarui.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Update",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("role", formData.role);
    payload.append("description", formData.description);
    if (imageFile) payload.append("image", imageFile);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/guru/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: payload,
        },
      );
      if (res.ok) {
        await Swal.fire(
          "Berhasil!",
          "Data guru berhasil diperbarui.",
          "success",
        );
        navigate("/admin/guru");
      } else {
        Swal.fire("Gagal", "Gagal mengupdate data.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Koneksi bermasalah.", "error");
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Edit Data Guru</h2>
        <Link
          to="/admin/guru"
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <FiArrowLeft /> Kembali
        </Link>
      </div>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.name}
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
              value={formData.role}
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
          <textarea
            rows="4"
            value={formData.description}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto Profil
          </label>
          {currentImage && !imageFile && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/uploads/${currentImage}`}
              className="h-20 w-20 rounded-full object-cover border mb-2"
            />
          )}
          <input
            type="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
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
            className="px-6 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 flex items-center gap-2"
          >
            <FiSave /> Update Data
          </button>
        </div>
      </form>
    </div>
  );
}
