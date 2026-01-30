import React from "react";
import FadeIn from "../components/FadeIn";
import { LuGraduationCap } from "react-icons/lu";
import { FiCheck } from "react-icons/fi";

export default function ProfilSection() {
  return (
    <section id="profil" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold tracking-wider uppercase text-sm">
              Profil Madrasah
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Sambutan Kepala Madrasah
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FadeIn direction="right" className="relative w-full max-w-sm">
              <div className="absolute top-4 -right-4 w-full h-full bg-teal-800 rounded-2xl -z-10"></div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-3 pb-6">
                <div className="bg-gray-100 rounded-xl overflow-hidden aspect-[4/5] mb-4 relative">
                  <img
                    src="/images/kepalasekolah.jpeg"
                    alt="Kepala Madrasah"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-teal-900">
                    Agus Susilo, S.Pd.I
                  </h3>
                  <p className="text-teal-600 font-medium text-sm">
                    Kepala Madrasah
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <FadeIn direction="left" delay={0.2}>
              <div className="prose prose-lg text-gray-600">
                <h3 className="text-xl font-semibold text-teal-800 italic mb-4">
                  Assalamu'alaikum Warahmatullahi Wabarakatuh
                </h3>
                <p className="leading-relaxed mb-4">
                  Puji syukur kehadirat Allah SWT, atas limpahan rahmat dan
                  karunia-Nya, MIM Program Unggulan Kenokorejo terus berkomitmen
                  untuk memberikan pendidikan berkualitas yang mengintegrasikan
                  ilmu pengetahuan umum dengan nilai-nilai keislaman.
                </p>
                Kami percaya bahwa setiap anak adalah amanah yang harus dididik
                dengan penuh kasih sayang, kedisiplinan, dan pengembangan
                karakter yang baik. Bersama-sama, mari kita wujudkan generasi
                yang cerdas, berakhlak mulia, dan siap menghadapi tantangan masa
                depan.
                <h3 className="text-xl font-semibold text-teal-800 italic mt-4">
                  Wassalamu'alaikum Warahmatullahi Wabarakatuh
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 hover:shadow-md transition">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-teal-200 rounded-lg text-teal-800">
                      <LuGraduationCap />
                    </div>
                    <h4 className="font-bold text-teal-900">Visi</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Terwujudnya generasi Islam yang berilmu, berakhlak mulia,
                    dan berprestasi.
                  </p>
                </div>
                <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 hover:shadow-md transition">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-amber-200 rounded-lg text-amber-800">
                      <FiCheck />
                    </div>
                    <h4 className="font-bold text-amber-900">Misi</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Menyelenggarakan pendidikan berkualitas dengan landasan
                    Al-Quran dan Sunnah.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
