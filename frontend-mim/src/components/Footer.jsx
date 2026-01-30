import React from "react";
import {
  FiPhone,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiYoutube,
  FiFacebook,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

export default function Footer() {
  return (
    <footer id="kontak" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <LuGraduationCap size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl">MIM Unggulan</h3>
                <p className="text-xs text-teal-400 tracking-widest">
                  Kenokorejo
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Madrasah Ibtidaiyah Muhammadiyah Program Unggulan Kenokorejo
              berkomitmen untuk membentuk generasi Islam yang beriman, berilmu,
              dan berakhlak mulia.
            </p>
            <div className="flex space-x-4">
              {[FiInstagram, FiYoutube, FaTiktok, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition text-gray-400 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start space-x-3">
                <FiPhone className="text-teal-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-gray-500 text-xs">
                    Telepon/WA
                  </span>
                  <span className="text-white">081329071702</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-teal-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-gray-500 text-xs">Alamat</span>
                  <span className="text-white">
                    Kenokorejo, Polokarto, Sukoharjo
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FiClock className="text-teal-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-gray-500 text-xs">
                    Jam Operasional
                  </span>
                  <span className="text-white">
                    Senin - Sabtu, 07:00 - 14:00
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Menu Cepat</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                "Beranda",
                "Profil",
                "Kafilah",
                "Berita",
                "Prestasi",
                "Info PPDB",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-teal-400 transition flex items-center"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            © 2026 MIM Program Unggulan Kenokorejo. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
