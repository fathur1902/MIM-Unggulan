import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

export default function EditPrestasi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ranking: "",
    level: "",
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
          `${import.meta.env.VITE_BASE_URL}/api/prestasi/${id}`,
        );
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title,
            ranking: data.ranking,
            level: data.level,
            description: data.description,
          });
          setCurrentImage(data.image);
        } else {
          Swal.fire("Error", "Data tidak ditemukan.", "error");
          navigate("/admin/prestasi");
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
      text: "Data prestasi akan diperbarui.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Update",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("ranking", formData.ranking);
    payload.append("level", formData.level);
    payload.append("description", formData.description);
    if (imageFile) payload.append("image", imageFile);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/prestasi/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: payload,
        },
      );
      if (res.ok) {
        await Swal.fire(
          "Berhasil!",
          "Prestasi berhasil diperbarui.",
          "success",
        );
        navigate("/admin/prestasi");
      } else {
        Swal.fire("Gagal", "Gagal update data.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Koneksi bermasalah.", "error");
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Edit Prestasi</h2>
        <Link
          to="/admin/prestasi"
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <FiArrowLeft /> Kembali
        </Link>
      </div>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lomba
            </label>
            <input
              type="text"
              value={formData.title}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Juara
            </label>
            <input
              type="text"
              value={formData.ranking}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, ranking: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tingkat
            </label>
            <input
              type="text"
              value={formData.level}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keterangan
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
            Foto Dokumentasi
          </label>
          {currentImage && !imageFile && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}/uploads/${currentImage}`}
              className="h-24 rounded-lg object-cover border mb-2"
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
            to="/admin/prestasi"
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
