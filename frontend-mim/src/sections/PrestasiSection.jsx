import React, { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn";
import { FiTrendingUp } from "react-icons/fi";
import { FaMedal, FaTrophy } from "react-icons/fa";

export default function PrestasiSection() {
  const [prestasiData, setPrestasiData] = useState([]);
  const [stats, setStats] = useState({ j1: 0, j2: 0, j3: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data dengan timestamp anti-cache
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/prestasi?t=${Date.now()}`,
        );
        const json = await res.json();

        // --- PERBAIKAN PENTING DISINI ---
        // Backend sudah mengirim data TERBARU (DESC).
        // JANGAN di-reverse lagi. Gunakan langsung json-nya.
        const data = Array.isArray(json) ? json : [];

        setPrestasiData(data); // Data index 0 sekarang adalah yang paling baru diinput

        // 2. Hitung Statistik
        let c1 = 0,
          c2 = 0,
          c3 = 0;

        data.forEach((item) => {
          // Ambil rank dan kecilkan hurufnya
          const r = (item.rank || item.ranking || "").toString().toLowerCase();

          // Logika penghitungan statistik (Hanya murni Juara 1, 2, 3)
          // "Harapan 1" tidak masuk ke statistik Juara 1, tapi masuk ke Total Penghargaan
          const isHarapan = r.includes("harapan");

          if (r.includes("1") && !isHarapan) c1++;
          else if (r.includes("2") && !isHarapan) c2++;
          else if (r.includes("3") && !isHarapan) c3++;

          // Data lain seperti "Juara 4", "Harapan 1", "Finalis"
          // Otomatis masuk ke hitungan 'total' (data.length)
        });

        setStats({
          j1: c1,
          j2: c2,
          j3: c3,
          total: data.length,
        });
      } catch (err) {
        console.error("Gagal load prestasi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Auto-refresh 5 detik
    return () => clearInterval(interval);
  }, []);
  const getRankNumber = (rankString) => {
    if (!rankString) return "?";

    // Coba cari angka di dalam teks
    const match = rankString.match(/\d+/);

    if (match) {
      return match[0]; // Jika ada angka, tampilkan angkanya (misal: "1", "10", "4")
    } else {
      // Jika TIDAK ada angka (misal: "Finalis", "Gold Medal"), ambil huruf depannya
      return rankString.charAt(0).toUpperCase();
    }
  };

  return (
    <section
      id="prestasi"
      className="py-20 bg-teal-900 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="bg-white/10 text-teal-200 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              Prestasi Membanggakan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Raih Prestasi Gemilang
            </h2>
            <p className="text-teal-100 mt-2 max-w-2xl mx-auto">
              Siswa-siswi kami telah menorehkan berbagai prestasi membanggakan
            </p>
          </div>
        </FadeIn>

        {loading && prestasiData.length === 0 ? (
          <div className="text-white text-center py-10 flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
            <p>Memuat Data...</p>
          </div>
        ) : prestasiData.length === 0 ? (
          /* --- EMPTY STATE --- */
          <FadeIn>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center max-w-2xl mx-auto hover:bg-white/10 transition duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-amber-500/20">
                <FiTrendingUp size={36} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Siap Mengukir Sejarah Baru
              </h3>
              <p className="text-teal-100 leading-relaxed">
                Sebagai sekolah yang terus bertumbuh, MIM Unggulan Kenokorejo
                sedang mempersiapkan talenta-talenta terbaiknya.
              </p>
              <div className="mt-6 px-6 py-2 bg-white/10 rounded-full text-xs font-semibold text-teal-200 uppercase tracking-widest border border-white/10">
                Coming Soon
              </div>
            </div>
          </FadeIn>
        ) : (
          /* --- DATA LAYOUT --- */
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* KIRI: HIGHLIGHT PRESTASI TERBARU (Apapun juaranya) */}
            <div className="lg:col-span-8 h-full">
              <FadeIn className="h-full">
                <div className="bg-gradient-to-br from-teal-800/80 to-teal-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start gap-8 h-full shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl group-hover:bg-teal-400/30 transition duration-700"></div>

                  {/* LINGKARAN ANGKA BESAR */}
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 z-10 relative">
                      {/* Teks di dalam lingkaran menyesuaikan isi (bisa 1, 10, F, dll) */}
                      <span className="text-4xl md:text-5xl font-extrabold text-white">
                        {getRankNumber(
                          prestasiData[0].rank || prestasiData[0].ranking,
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="text-center md:text-left z-10 flex-1 w-full">
                    {/* LABEL JUARA LENGKAP DI ATAS JUDUL */}
                    <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
                      {prestasiData[0].rank || "Prestasi Terbaru"}
                    </div>

                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                      {prestasiData[0].title}
                    </h3>

                    {/* TINGKAT */}
                    <div className="inline-block px-4 py-1.5 bg-teal-700/50 rounded-lg text-teal-200 font-semibold mb-4 border border-teal-600/50">
                      {prestasiData[0].level || "Tingkat Sekolah"}
                    </div>

                    <p className="text-teal-100 text-lg leading-relaxed line-clamp-3 mb-6">
                      {prestasiData[0].description}
                    </p>

                    {/* GAMBAR FULL COLOR */}
                    {prestasiData[0].image && (
                      <div className="w-full md:w-auto">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/uploads/${prestasiData[0].image}`}
                          alt="Dokumentasi"
                          className="h-32 w-auto rounded-xl border-2 border-white/30 shadow-xl object-cover hover:scale-105 transition duration-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* KANAN: STATISTIK */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-full">
              {/* JUARA 1 */}
              <FadeIn delay={0.1}>
                <div className="bg-teal-800/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-teal-700/50 transition h-full flex flex-col justify-center items-center">
                  <FaMedal className="text-3xl text-yellow-400 mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stats.j1}
                  </div>
                  <div className="text-teal-200 text-xs font-bold uppercase tracking-wider">
                    Juara 1
                  </div>
                </div>
              </FadeIn>

              {/* JUARA 2 */}
              <FadeIn delay={0.2}>
                <div className="bg-teal-800/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-teal-700/50 transition h-full flex flex-col justify-center items-center">
                  <FaMedal className="text-3xl text-gray-300 mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stats.j2}
                  </div>
                  <div className="text-teal-200 text-xs font-bold uppercase tracking-wider">
                    Juara 2
                  </div>
                </div>
              </FadeIn>

              {/* JUARA 3 */}
              <FadeIn delay={0.3}>
                <div className="bg-teal-800/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-teal-700/50 transition h-full flex flex-col justify-center items-center">
                  <FaMedal className="text-3xl text-amber-600 mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stats.j3}
                  </div>
                  <div className="text-teal-200 text-xs font-bold uppercase tracking-wider">
                    Juara 3
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="bg-teal-800/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-teal-700/50 transition h-full flex flex-col justify-center items-center">
                  <FaTrophy className="text-3xl text-teal-300 mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stats.total}+
                  </div>
                  <div className="text-teal-200 text-xs font-bold uppercase tracking-wider">
                    Penghargaan
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
