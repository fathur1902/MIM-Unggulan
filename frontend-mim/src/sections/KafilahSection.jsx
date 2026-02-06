import React, { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn";
import { FaUser } from "react-icons/fa";

const colorPalette = [
  { bg: "bg-teal-50", icon: "text-teal-200", badge: "bg-teal-700 text-white" },
  { bg: "bg-blue-50", icon: "text-blue-200", badge: "bg-blue-500 text-white" },
  {
    bg: "bg-purple-50",
    icon: "text-purple-200",
    badge: "bg-purple-500 text-white",
  },
  { bg: "bg-pink-50", icon: "text-pink-200", badge: "bg-pink-500 text-white" },
  {
    bg: "bg-amber-50",
    icon: "text-amber-200",
    badge: "bg-amber-500 text-white",
  },
  {
    bg: "bg-green-50",
    icon: "text-green-200",
    badge: "bg-green-500 text-white",
  },
];

export default function KafilahSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/guru?t=${Date.now()}`,
        );
        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error("Gagal load guru:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="kafilah" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-teal-100 text-teal-600 text-xs font-bold uppercase tracking-wider mb-2">
              Tim Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kafilah Madrasah
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Tenaga pendidik dan kependidikan yang berdedikasi tinggi dalam
              membentuk generasi unggul.
            </p>
          </div>
        </FadeIn>

        {loading && data.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            Memuat Data Kafilah...
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((staff, idx) => {
              const theme = colorPalette[idx % colorPalette.length];
              return (
                <FadeIn key={staff.id}>
                  <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <div
                      className={`relative w-full aspect-[3/4] rounded-2xl flex items-center justify-center ${theme.bg} mb-8 overflow-visible`}
                    >
                      {staff.image ? (
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/uploads/${staff.image}`}
                          alt={staff.name}
                          className="w-full h-full object-contain rounded-2xl"
                        />
                      ) : (
                        <FaUser className={`w-32 h-32 ${theme.icon}`} />
                      )}
                      <div
                        className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm whitespace-nowrap ${theme.badge}`}
                      >
                        {staff.role}
                      </div>
                    </div>
                    <div className="text-center px-2 pb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition">
                        {staff.name}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        {staff.description || "-"}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
