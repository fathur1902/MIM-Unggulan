import React from "react";
import FadeIn from "../components/FadeIn";

export default function PrestasiSection() {
  const stats = [
    { num: "10+", label: "Juara 1", icon: "🥇", bg: "bg-teal-800/50" },
    { num: "15+", label: "Juara 2", icon: "🥈", bg: "bg-teal-800/50" },
    { num: "8+", label: "Juara 3", icon: "🥉", bg: "bg-teal-800/50" },
    { num: "50+", label: "Penghargaan", icon: "🏆", bg: "bg-teal-800/50" },
  ];

  return (
    <section id="prestasi" className="py-20 bg-teal-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="bg-white/10 text-teal-200 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">Prestasi Membanggakan</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Raih Prestasi Gemilang</h2>
            <p className="text-teal-100 mt-2">Siswa-siswi kami telah menorehkan berbagai prestasi membanggakan</p>
          </div>
        </FadeIn>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <FadeIn direction="up">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg text-white text-4xl font-bold">2</div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-2">Juara 2 Olympicad</h3>
                  <p className="text-teal-200 font-medium text-lg mb-2">Tingkat Kabupaten Sragen</p>
                  <p className="text-teal-100 text-sm leading-relaxed max-w-lg">Siswa MIM Unggulan Kenokorejo berhasil meraih Juara 2...</p>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <FadeIn key={idx} delay={0.2 + idx * 0.1} className={`rounded-2xl p-4 text-center border border-white/10 backdrop-blur-sm ${stat.bg} hover:bg-white/20 transition`}>
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.num}</div>
                <div className="text-teal-200 text-xs">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}