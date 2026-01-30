import React from "react";
import FadeIn from "../components/FadeIn";
import { FaUser } from "react-icons/fa";
import { kafilahData } from "../data";

export default function KafilahSection({ bgGradient }) {
  return (
    <section id="kafilah" className={`py-20 bg-white`}>
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
              Tenaga pendidik dan kependidikan yang berdedikasi tinggi...
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {kafilahData.map((staff, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div
                  className={`relative w-full aspect-square rounded-2xl flex items-center justify-center ${staff.bg} mb-8 overflow-visible`}
                >
                  {staff.image ? (
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  ) : (
                    <FaUser className={`w-32 h-32 ${staff.iconColor}`} />
                  )}
                  <div
                    className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${staff.badgeColor}`}
                  >
                    {staff.role}
                  </div>
                </div>
                <div className="text-center px-2 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition">
                    {staff.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    {staff.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
