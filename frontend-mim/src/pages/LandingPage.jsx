import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../sections/HeroSection";
import ProfilSection from "../sections/ProfilSection";
import KafilahSection from "../sections/KafilahSection";
import BeritaSection from "../sections/BeritaSection";
import PrestasiSection from "../sections/PrestasiSection";
import PPDBSection from "../sections/PPDBSection";

export default function LandingPage() {
  const bgGradient =
    "bg-gradient-to-br from-[#fffef9] via-[#f0fdf4] to-[#e6f7ed]";
  const heroGradient =
    "bg-gradient-to-br from-[#f0fdf4] via-[#e8f5e9] to-[#fff8e1]";

  return (
    <div className={`w-full h-full font-sans text-gray-800 ${bgGradient}`}>
      <Navbar />
      <HeroSection heroGradient={heroGradient} />
      <ProfilSection />
      <KafilahSection bgGradient={bgGradient} />
      <BeritaSection />
      <PrestasiSection />
      <PPDBSection heroGradient={heroGradient} />
      <Footer />
    </div>
  );
}
