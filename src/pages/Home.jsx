import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LogoCloudSection from "@/components/landing/LogoCloudSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AITechSection from "@/components/landing/AITechSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import OuroborosSection from "@/components/landing/OuroborosSection";
import TechStackSection from "@/components/landing/TechStackSection";
import TrustSection from "@/components/landing/TrustSection";
import BlogSection from "@/components/landing/BlogSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-[#050a18] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <LogoCloudSection />
      <div id="servicios">
        <ServicesSection />
      </div>
      <AITechSection />
      <TestimonialsSection />
      <div id="protocolo">
        <OuroborosSection />
      </div>
      <div id="stack">
        <TechStackSection />
      </div>
      <div id="seguridad">
        <TrustSection />
      </div>
      <BlogSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}