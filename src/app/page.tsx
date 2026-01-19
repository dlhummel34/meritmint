"use client";

import { useState, useEffect } from "react";
import SplashGate from "@/components/SplashGate";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import IngredientsGrid from "@/components/IngredientsGrid";
import IntakeForm from "@/components/IntakeForm";
import Footer from "@/components/Footer";
import FloatingLeaves from "@/components/FloatingLeaves";
import ParallaxPlaque from "@/components/ParallaxPlaque";
import MacroMintParallax from "@/components/MacroMintParallax";
import PlaquesCarousel from "@/components/PlaquesCarousel";

export default function Home() {
  const [showGate, setShowGate] = useState(true);

  // Prevent scroll when gate is open
  useEffect(() => {
    if (showGate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showGate]);

  return (
    <main className="min-h-screen relative selection:bg-merit-sage selection:text-white">
      {/* Splash Gate Overlay */}
      <SplashGate onEnter={() => setShowGate(false)} />

      {/* Main Site Content */}
      {!showGate && (
        <div className="animate-in fade-in duration-1000">
          <Navbar />

          {/* Floating Elements Layer */}
          <MacroMintParallax />
          <FloatingLeaves />
          <ParallaxPlaque />

          {/* Hero Section - Base layer (z-index: 1) */}
          <div className="relative" style={{ zIndex: 1 }}>
            <Hero />
          </div>

          {/* Content Sections - Slide OVER Hero (z-index: 10+) */}
          <div className="relative bg-merit-paper" style={{ zIndex: 10 }}>
            <IngredientsGrid />
            <PlaquesCarousel />
            <ProcessSection />
            <IntakeForm />
            <Footer />
          </div>
        </div>
      )}

      {/* Background when gate is open */}
      {showGate && (
        <div className="fixed inset-0 z-0 bg-merit-cream" />
      )}
    </main>
  );
}
