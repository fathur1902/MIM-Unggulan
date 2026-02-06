import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Swal from "sweetalert2";

export default function CreateBerita() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    date: "",
    desc: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Publikasikan Berita?",
      text: "Pastikan konten berita sudah benar dan sesuai.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Publikasikan",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("tag", formData.tag);
    payload.append("date", formData.date);
    payload.append("desc", formData.desc);
    if (imageFile) payload.append("image", imageFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/berita`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });
      const responseData = await res.json();
      if (res.ok) {
        await Swal.fire("Berhasil!", "Berita berhasil diterbitkan.", "success");
        navigate("/admin/berita");
      } else {
        Swal.fire(
          "Gagal",
          responseData.message || "Terjadi kesalahan saat menyimpan data.",
          "error",
        );
      }
    } catch (err) {
      Swal.fire("Error", "Koneksi ke server bermasalah.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tulis Berita Baru</h2>
        <Link
          to="/admin/berita"
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <FiArrowLeft /> Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Berita
            </label>
            <input
              type="text"
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
              placeholder="Contoh: Kegiatan"
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
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gambar Utama
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
            to="/admin/berita"
            className="px-6 py-2 rounded-lg border hover:bg-gray-50 text-gray-600"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 flex items-center gap-2"
          >
            <FiSave /> {loading ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </div>
      </form>
    </div>
  );
}
