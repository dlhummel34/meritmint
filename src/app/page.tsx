"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import IngredientsGrid from "@/components/IngredientsGrid";
import Footer from "@/components/Footer";
import FloatingLeaves from "@/components/FloatingLeaves";
import ParallaxPlaque from "@/components/ParallaxPlaque";
import MacroMintParallax from "@/components/MacroMintParallax";
import PlaquesCarousel from "@/components/PlaquesCarousel";
import LoadingScreen from "@/components/LoadingScreen";
import SakariWaveTransition from "@/components/SakariWaveTransition";
import { PerformanceProvider, usePerformance } from "@/lib/PerformanceContext";

function HomeContent() {
  // We use usePerformance mostly for the context, but we don't block rendering on isLoaded anymore
  // to improve LCP. The LoadingScreen covers the initial paint.
  usePerformance();

  return (
    <main className="min-h-screen relative selection:bg-merit-sage selection:text-white">
      {/* Loading Screen Overlay */}
      <LoadingScreen />

      {/* Main Site Content - Rendered immediately behind loader for LCP */}
      <div className="relative">
        <Navbar />

        {/* Floating Elements Layer */}
        <MacroMintParallax />
        <FloatingLeaves />
        <ParallaxPlaque />

        {/* Hero Section - Base layer (z-index: 1) */}
        <div className="relative" style={{ zIndex: 1 }}>
          <Hero />
        </div>

        {/* Crafted to Endure Section - with wave top */}
        <div className="relative" style={{ zIndex: 10, backgroundColor: "#F5F3EE" }}>
          <SakariWaveTransition fillColor="#F5F3EE" height={80} />
          <IngredientsGrid />
        </div>

        {/* Plaques Carousel Section - with wave top */}
        <div className="relative" style={{ zIndex: 11, backgroundColor: "#EBE7DF" }}>
          <SakariWaveTransition fillColor="#EBE7DF" height={80} />
          <PlaquesCarousel />
        </div>

        {/* Process Section - with wave top */}
        <div className="relative" style={{ zIndex: 12, backgroundColor: "#F5F3EE" }}>
          <SakariWaveTransition fillColor="#F5F3EE" height={80} />
          <ProcessSection />
        </div>

        {/* Footer - wave is now built into the component */}
        <div className="relative" style={{ zIndex: 13, backgroundColor: "#F5F3EE" }}>
          <Footer />
        </div>
      </div>
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
