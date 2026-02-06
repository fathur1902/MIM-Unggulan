import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

export default function EditBerita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    date: "",
    description: "",
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOldData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/berita/${id}`,
        );
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title || "",
            tag: data.tag || "",
            date: data.date ? data.date.split("T")[0] : "",
            description: data.description || "",
          });
          setCurrentImage(data.image);
        } else {
          Swal.fire("Gagal", "Data tidak ditemukan.", "error");
          navigate("/admin/berita");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOldData();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Simpan Perubahan?",
      text: "Data berita lama akan diperbarui.",
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
    payload.append("tag", formData.tag);
    payload.append("date", formData.date);
    payload.append("description", formData.description);
    if (imageFile) payload.append("image", imageFile);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/berita/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: payload,
        },
      );

      if (res.ok) {
        await Swal.fire("Berhasil!", "Berita berhasil diperbarui.", "success");
        navigate("/admin/berita");
      } else {
        Swal.fire("Gagal", "Gagal memperbarui berita.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Koneksi terputus.", "error");
    }
  };

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Edit Berita</h2>
        <Link
          to="/admin/berita"
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <FiArrowLeft /> Kembali
        </Link>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Berita
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
              Tanggal
            </label>
            <input
              type="date"
              value={formData.date}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag / Kategori
            </label>
            <input
              type="text"
              value={formData.tag}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, tag: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Isi Berita
          </label>
          <textarea
            rows="10"
            value={formData.description}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gambar Utama
          </label>
          {currentImage && !imageFile && (
            <div className="mb-2">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/uploads/${currentImage}`}
                alt="Current"
                className="h-32 rounded-lg object-cover border"
              />
              <p className="text-xs text-gray-400 mt-1">
                Gambar saat ini. Upload baru jika ingin mengganti.
              </p>
            </div>
          )}
          <input
            type="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Link
            to="/admin/berita"
            className="px-6 py-2 rounded-lg border hover:bg-gray-50 text-gray-600"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 flex items-center gap-2"
          >
            <FiSave /> Update Berita
          </button>
        </div>
      </form>
    </div>
  );
}
