import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LogoCloudSection from "@/components/landing/LogoCloudSection";
import ProblemSection from "@/components/landing/ProblemSection";
import AgentFlowSection from "@/components/landing/AgentFlowSection";
import ServicesSection from "@/components/landing/ServicesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import RoiCalculatorSection from "@/components/landing/RoiCalculatorSection";
import ProductsSection from "@/components/landing/ProductsSection";
import PlansSection from "@/components/landing/PlansSection";
import PlatformTeaserSection from "@/components/landing/PlatformTeaserSection";
import BlogSection from "@/components/landing/BlogSection";
import LeadMagnetSection from "@/components/landing/LeadMagnetSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import MobileStickyCta from "@/components/landing/MobileStickyCta";
import { ScrollProgress } from "@/components/landing/motion";
import { SITE } from "@/config/site";

export default function Home() {
  const { hash } = useLocation();

  // Arriving from another page via a section link (e.g. /#planes): scroll once the sections exist
  useEffect(() => {
    if (!hash) return;
    const id = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
    return () => clearTimeout(id);
  }, [hash]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-[#050a18] min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <HeroSection />
        <LogoCloudSection />
        <ProblemSection />
        <AgentFlowSection />
        <ProductsSection />
        <div id="servicios">
          <ServicesSection />
        </div>
        <HowItWorksSection />
        <TestimonialsSection />
        <RoiCalculatorSection />
        <PlansSection />
        <PlatformTeaserSection />
        <LeadMagnetSection />
        {SITE.showBlog && <BlogSection />}
        <FAQSection />
        <CTASection />
        <Footer />
        <MobileStickyCta />
      </div>
    </MotionConfig>
  );
}
