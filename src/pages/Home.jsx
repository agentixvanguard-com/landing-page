import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import OuroborosSection from "@/components/landing/OuroborosSection";
import TechStackSection from "@/components/landing/TechStackSection";
import TrustSection from "@/components/landing/TrustSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-[#050a18] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <div id="servicios">
        <ServicesSection />
      </div>
      <div id="protocolo">
        <OuroborosSection />
      </div>
      <div id="stack">
        <TechStackSection />
      </div>
      <div id="seguridad">
        <TrustSection />
      </div>
      <CTASection />
      <Footer />
    </div>
  );
}