import React from "react";
import FadeIn from "../components/FadeIn";
import { FiClock, FiCheck } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { GOOGLE_FORM_URL } from "../data";

export default function PPDBSection({ heroGradient }) {
  const infoCards = [
    {
      title: "Pendaftaran",
      val: "Januari - Juni 2026",
      icon: <FiClock className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Persyaratan",
      val: "Usia minimal 6 tahun",
      icon: <FiCheck className="w-6 h-6 text-amber-600" />,
    },
    {
      title: "Kuota",
      val: "Terbatas 30 Siswa",
      icon: <LuGraduationCap className="w-6 h-6 text-green-600" />,
    },
  ];

  return (
    <section id="info-ppdb" className={`${heroGradient} py-20`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-bold rounded-full mb-6">
            Penerimaan Peserta Didik Baru
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-teal-900 mb-4">
            PPDB <span className="text-teal-600">2026/2027</span>
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Bergabunglah bersama kami! Daftarkan putra-putri Anda...
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {infoCards.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.15}>
              <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-lg hover:border-teal-100 transition duration-300">
                <div className="w-14 h-14 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.val}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-amber-500 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 hover:bg-amber-600 shadow-xl hover:shadow-amber-500/40"
          >
            <span className="mr-2">Daftar Sekarang</span>
            <FiCheck className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-gray-400 text-sm mt-4">
            Klik tombol di atas untuk mengisi formulir pendaftaran
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
