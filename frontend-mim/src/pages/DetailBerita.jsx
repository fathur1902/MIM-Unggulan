import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiTag, FiClock } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DetailBerita() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [recommendations, setRecommendations] = useState([]); 
  const [loading, setLoading] = useState(true);
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resDetail = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/berita/${id}`,
        );
        const dataDetail = await resDetail.json();

        if (resDetail.ok) {
          setBerita(dataDetail);
          const resAll = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/berita`,
          );
          const dataAll = await resAll.json();

          if (Array.isArray(dataAll)) {
            const otherNews = dataAll
              .filter((item) => item.id !== parseInt(id))
              .slice(0, 3);
            setRecommendations(otherNews);
          }
        } else {
          setBerita(null);
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
        <Footer />
      </>
    );
  }
  if (!berita) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Berita Tidak Ditemukan
          </h2>
          <p className="text-gray-500 mb-6">
            Berita yang Anda cari mungkin sudah dihapus atau URL salah.
          </p>
          <Link
            to="/"
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="w-full h-64 md:h-96 bg-gray-200 relative">
            {berita.image ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/uploads/${berita.image}`}
                alt={berita.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                <LuGraduationCap size={64} opacity={0.5} />
              </div>
            )}

            <Link
              to="/"
              className="absolute top-6 left-6 bg-white/90 backdrop-blur text-gray-700 px-4 py-2 rounded-full font-medium text-sm hover:bg-white transition flex items-center gap-2 shadow-lg"
            >
              <FiArrowLeft /> Kembali
            </Link>
          </div>
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1 bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-semibold">
                <FiTag /> {berita.tag || "Berita Sekolah"}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar /> {formatDate(berita.date)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
              {berita.title}
            </h1>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap text-justify">
              {berita.desc || berita.description}
            </div>

            <hr className="my-10 border-gray-100" />
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-sm italic">
                Diposting oleh MIM Unggulan
              </p>
              <a
                href="/#berita"
                className="text-teal-600 font-bold hover:underline flex items-center gap-2"
              >
                Lihat Berita Lainnya <FiArrowLeft className="rotate-180" />
              </a>
            </div>
          </div>
        </article>
        {recommendations.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FiTag className="text-teal-600" /> Baca Juga
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((item) => (
                <Link
                  key={item.id}
                  to={`/berita/${item.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col"
                >
                  <div className="h-40 bg-gray-200 overflow-hidden relative">
                    {item.image ? (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/uploads/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <LuGraduationCap size={32} />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                      <FiClock size={12} /> {formatDate(item.date)}
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-2 mb-2 hover:text-teal-600 transition">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
