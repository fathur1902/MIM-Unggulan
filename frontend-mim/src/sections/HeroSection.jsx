import React from "react";
import FadeIn from "../components/FadeIn";
import { FiCheck } from "react-icons/fi";
import { GOOGLE_FORM_URL } from "../data";

export default function HeroSection({ heroGradient }) {
  return (
    <section
      id="beranda"
      className={`${heroGradient} py-12 md:py-24 overflow-hidden relative`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <FadeIn direction="right">
              <span className="inline-block py-1 px-3 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-6">
                ✨ Pendaftaran PPDB 2026/2027 Dibuka!
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-teal-900 leading-[1.1] mb-6">
                MIM Program <br />
                <span className="text-teal-600">Unggulan</span> Kenokorejo
              </h1>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Mencetak Generasi yang Islami, Berprestasi, dan Peduli terhadap
                lingkungan dengan kurikulum modern berlandaskan Al-Qur'an.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#profil"
                  className="px-8 py-4 bg-teal-700 text-white font-bold rounded-full hover:bg-teal-800 transition shadow-lg hover:shadow-teal-500/30 text-center"
                >
                  Jelajahi Madrasah
                </a>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-600 transition shadow-lg hover:shadow-amber-500/30 text-center"
                >
                  Daftar Sekarang
                </a>
              </div>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2 flex justify-center relative">
            <FadeIn
              direction="left"
              delay={0.3}
              className="relative w-full max-w-lg"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img
                  src="/images/sekolah.jpeg"
                  alt="Gedung Sekolah"
                  className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-teal-900/60 to-transparent"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
