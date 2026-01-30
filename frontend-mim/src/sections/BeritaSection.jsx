import React from "react";
import FadeIn from "../components/FadeIn";
import { FiClock } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { beritaData } from "../data";

export default function BeritaSection() {
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

        <div className="grid md:grid-cols-3 gap-8">
          {beritaData.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group">
                <div
                  className={`h-48 w-full ${item.color} bg-opacity-10 flex items-center justify-center relative overflow-hidden`}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <LuGraduationCap
                      className={`w-16 h-16 ${item.color.replace("bg-", "text-")} opacity-50 group-hover:scale-110 transition duration-500`}
                    />
                  )}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-white text-xs font-bold ${item.color} shadow-sm z-10`}
                  >
                    {item.tag}
                  </div>
                  {item.image && (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-gray-400 text-xs mb-3 space-x-2">
                    <FiClock size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
                    {item.desc}
                  </p>
                  <button className="text-teal-600 font-semibold text-sm hover:underline self-start">
                    Baca Selengkapnya →
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
