import React, { useState, useEffect } from "react";
import {
  FiFileText,
  FiUsers,
  FiAward,
  FiCalendar,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function DashboardAdmin() {
  const [stats, setStats] = useState({ berita: 0, guru: 0, prestasi: 0 });
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [resBerita, resGuru, resPrestasi] = await Promise.all([
        fetch(`${import.meta.env.VITE_BASE_URL}/api/berita`),
        fetch(`${import.meta.env.VITE_BASE_URL}/api/guru`),
        fetch(`${import.meta.env.VITE_BASE_URL}/api/prestasi`),
      ]);

      const dataBerita = await resBerita.json();
      const dataGuru = await resGuru.json();
      const dataPrestasi = await resPrestasi.json();
      setStats({
        berita: Array.isArray(dataBerita) ? dataBerita.length : 0,
        guru: Array.isArray(dataGuru) ? dataGuru.length : 0,
        prestasi: Array.isArray(dataPrestasi) ? dataPrestasi.length : 0,
      });
      if (Array.isArray(dataBerita)) {
        const sorted = dataBerita.slice(0, 3);
        setRecentNews(sorted);
      }
    } catch (err) {
      console.error("Gagal memuat dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-teal-200 text-sm font-medium mb-2">
            <FiCalendar /> {today}
          </div>
          <h1 className="text-3xl font-bold mb-2">Selamat Datang, Admin!👋</h1>
          <p className="text-teal-100 max-w-xl">
            Pantau perkembangan madrasah hari ini. Anda memiliki total{" "}
            <span className="font-bold text-white">
              {stats.berita + stats.guru + stats.prestasi} data
            </span>{" "}
            yang terpublikasi di website.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500 rounded-full blur-3xl opacity-30"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Berita"
          count={loading ? "..." : stats.berita}
          icon={<FiFileText size={24} />}
          color="bg-white text-teal-600 border-l-4 border-teal-500"
          link="/admin/berita"
        />
        <StatCard
          title="Data Guru"
          count={loading ? "..." : stats.guru}
          icon={<FiUsers size={24} />}
          color="bg-white text-blue-600 border-l-4 border-blue-500"
          link="/admin/guru"
        />
        <StatCard
          title="Prestasi Siswa"
          count={loading ? "..." : stats.prestasi}
          icon={<FiAward size={24} />}
          color="bg-white text-orange-600 border-l-4 border-orange-500"
          link="/admin/prestasi"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FiTrendingUp className="text-teal-600" /> Upload Terbaru
            </h3>
            <Link
              to="/admin/berita"
              className="text-sm text-teal-600 hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-400 text-sm">Memuat data...</p>
            ) : recentNews.length === 0 ? (
              <p className="text-gray-400 text-sm italic">
                Belum ada berita yang diupload.
              </p>
            ) : (
              recentNews.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-100 group"
                >
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    {item.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${item.image}`}
                        className="w-full h-full object-cover"
                        alt="thumb"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Img
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm truncate group-hover:text-teal-600 transition">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                      <span>📅 {item.date}</span>
                      <span className="bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        {item.tag}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-teal-50 rounded-xl border border-teal-100 p-6">
          <h3 className="font-bold text-teal-900 mb-4">Aksi Cepat</h3>
          <div className="space-y-3">
            <Link
              to="/admin/berita"
              className="flex items-center justify-between w-full bg-white p-3 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:shadow-md hover:text-teal-600 transition"
            >
              <span>✍️ Tulis Berita Baru</span>
              <FiArrowRight />
            </Link>
            <Link
              to="/admin/guru"
              className="flex items-center justify-between w-full bg-white p-3 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:shadow-md hover:text-blue-600 transition"
            >
              <span>👨‍🏫 Tambah Guru</span>
              <FiArrowRight />
            </Link>
            <Link
              to="/admin/prestasi"
              className="flex items-center justify-between w-full bg-white p-3 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:shadow-md hover:text-orange-600 transition"
            >
              <span>🏆 Catat Juara</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="mt-8 bg-teal-100/50 p-4 rounded-lg">
            <p className="text-xs text-teal-800 leading-relaxed">
              <strong>Tips Admin:</strong> <br />
              Pastikan gambar yang diupload berukuran dibawah 2MB agar website
              tetap cepat diakses oleh wali murid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
const StatCard = ({ title, count, icon, color, link }) => (
  <Link
    to={link}
    className={`p-6 rounded-xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1 ${color}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-extrabold text-gray-800">{count}</h3>
      </div>
      <div className="p-3 rounded-full bg-gray-50/80">{icon}</div>
    </div>
  </Link>
);
