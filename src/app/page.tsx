"use client";

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
import LoadingScreen from "@/components/LoadingScreen";
import { PerformanceProvider, usePerformance } from "@/lib/PerformanceContext";

function HomeContent() {
  const { isLoaded, isMobile } = usePerformance();

  return (
    <main className="min-h-screen relative selection:bg-merit-sage selection:text-white">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Main Site Content - shown after loading */}
      {isLoaded && (
        <div className="animate-in fade-in duration-1000">
          <Navbar />

          {/* Floating Elements Layer (desktop only for MacroMintParallax) */}
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
    </main>
  );
}

export default function Home() {
  return (
    <PerformanceProvider>
      <HomeContent />
    </PerformanceProvider>
  );
}
