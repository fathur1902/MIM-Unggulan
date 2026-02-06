import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiTrash2, FiImage, FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

export default function ManageBerita() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/berita`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus berita?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/berita/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire({
          title: "Terhapus!",
          text: "Berita berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchData();
      } catch (error) {
        Swal.fire("Error", "Gagal menghapus data.", "error");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Berita</h2>
        <Link
          to="/admin/berita/create"
          className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-teal-700 transition flex items-center gap-2 shadow-sm"
        >
          <FiPlus /> Tambah Berita
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="p-4 w-16 text-center">No</th>
              <th className="p-4 w-24">Img</th>
              <th className="p-4">Judul</th>
              <th className="p-4">Info</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-center text-gray-500">{idx + 1}</td>
                  <td className="p-4">
                    {item.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${item.image}`}
                        className="w-10 h-10 object-cover rounded bg-gray-100"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <FiImage className="text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-semibold text-gray-800">
                    {item.title}
                  </td>
                  <td className="p-4 text-sm">
                    <div className="text-gray-500 mb-1">{item.date}</div>
                    <span className="bg-teal-50 text-teal-600 font-bold text-xs px-2 py-0.5 rounded border border-teal-100">
                      {item.tag}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/admin/berita/edit/${item.id}`}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"
                        title="Edit"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                        title="Hapus"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
