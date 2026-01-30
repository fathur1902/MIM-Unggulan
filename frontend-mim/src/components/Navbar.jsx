import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = [
    "Beranda",
    "Profil",
    "Kafilah",
    "Berita",
    "Prestasi",
    "Info PPDB",
    "Kontak",
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-700 rounded-xl flex items-center justify-center shadow-lg hover:rotate-12 transition duration-300">
              <img
                src={"/images/logo_mim.jpeg"}
                alt="Logo"
                className="w-10 h-10 md:w-8 md:h-8 object-contain"
              />
            </div>
            <div>
              <span className="text-teal-800 font-bold text-lg md:text-xl block leading-none">
                MIM Unggulan
              </span>
              <span className="text-teal-600 text-xs font-medium tracking-wider">
                Kenokorejo
              </span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-gray-600 font-medium hover:text-teal-600 transition relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Link
              to="/login"
              className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-700 transition shadow-md"
            >
              <FiLogIn /> Login
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-teal-800 rounded-lg hover:bg-teal-50 transition"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="flex flex-col space-y-1 py-4">
                {menuItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-600 font-medium py-3 px-4 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition block"
                  >
                    {item}
                  </a>
                ))}
                <Link
                  to="/login"
                  className="text-teal-600 font-bold py-3 px-4 rounded-lg hover:bg-teal-50 transition block flex items-center gap-2"
                >
                  <FiLogIn /> Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
