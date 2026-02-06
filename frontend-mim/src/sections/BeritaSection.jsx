import React, { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn";
import { FiClock, FiInbox } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import {Link} from "react-router-dom";

export default function BeritaSection() {
  const [beritaData, setBeritaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dengan timestamp agar data selalu fresh (anti-cache)
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/berita?t=${Date.now()}`,
        );
        const json = await res.json();

        // Urutkan berita terbaru di paling atas
        const sorted = Array.isArray(json) ? json.reverse() : [];
        setBeritaData(sorted);
      } catch (err) {
        console.error("Gagal load berita:", err);
      } finally {
        setLoading(false);
      }
    };

    // 1. Panggil pertama kali
    fetchData();

    // 2. Auto-refresh setiap 5 detik (Polling)
    const interval = setInterval(fetchData, 5000);

    // 3. Bersihkan memori saat pindah halaman
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="berita" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold">
              Informasi Terkini
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Berita & <span className="text-teal-600">Kegiatan</span>
            </h2>
          </div>
        </FadeIn>

        {loading && beritaData.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
          </div>
        ) : beritaData.length === 0 ? (
          /* --- TAMPILAN JIKA KOSONG --- */
          <FadeIn>
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-3xl border border-gray-100 text-center animate-fade-in">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <FiInbox size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-700">
                Belum Ada Berita
              </h3>
              <p className="text-gray-500 max-w-sm mt-2">
                Saat ini belum ada informasi kegiatan terbaru yang diunggah.
              </p>
              <div className="mt-6 px-6 py-2 bg-teal-600 rounded-full text-xs font-semibold text-white uppercase tracking-widest border border-white/10">
                Coming Soon
              </div>
            </div>
          </FadeIn>
        ) : (
          /* --- LIST DATA --- */
          /* LOGIKA LAYOUT: Jika cuma 1 berita, pakai Flex Center. Jika banyak, pakai Grid. */
          <div
            className={
              beritaData.length === 1
                ? "flex justify-center"
                : "grid md:grid-cols-3 gap-8"
            }
          >
            {beritaData.map((item) => (
              <FadeIn key={item.id}>
                <div
                  /* LOGIKA CARD: Jika cuma 1 berita, batasi lebarnya (max-w-md) agar tidak terlalu lebar */
                  className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group ${
                    beritaData.length === 1 ? "w-full max-w-md" : ""
                  }`}
                >
                  {/* Gambar / Thumbnail */}
                  <div className="h-48 w-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {item.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <LuGraduationCap className="w-16 h-16 text-gray-300 opacity-50 group-hover:scale-110 transition duration-500" />
                    )}

                    {/* Tag Label */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-white text-xs font-bold bg-teal-600 shadow-sm z-10">
                      {item.tag || "Kegiatan"}
                    </div>
                  </div>

                  {/* Konten Text */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-gray-400 text-xs mb-3 space-x-2">
                      <FiClock size={14} />
                      <span>{item.date || "-"}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                      {item.desc}
                    </p>
                    <Link 
                      to={`/berita/${item.id}`}
                      className="text-teal-600 font-semibold text-sm hover:underline self-start">
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
