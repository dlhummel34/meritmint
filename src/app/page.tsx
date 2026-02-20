"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import MaterialsGrid from "@/components/MaterialsGrid";
import Footer from "@/components/Footer";
import ParallaxPlaque from "@/components/ParallaxPlaque";
import MacroMintParallax from "@/components/MacroMintParallax";
import PlaquesCarousel from "@/components/PlaquesCarousel";
import LoadingScreen from "@/components/LoadingScreen";
import SectionWaveTransition from "@/components/SectionWaveTransition";
import { PerformanceProvider, usePerformance } from "@/lib/PerformanceContext";

function HomeContent() {
  const { isLoaded } = usePerformance();

  return (
    <main className="min-h-screen relative selection:bg-merit-sage selection:text-white">
      {/* Loading Screen Overlay — blocks user from seeing unloaded content */}
      <LoadingScreen />

      {/* Main Site Content — hidden until all assets are loaded.
          Uses CSS transition for a smooth fade-in, not framer-motion,
          to avoid triggering animation libraries before they're ready. */}
      <div
        className="relative"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: isLoaded ? "opacity 0.4s ease-in" : "none",
          // Prevent interaction while invisible
          pointerEvents: isLoaded ? "auto" : "none",
        }}
      >
        <Navbar />

        {/* Floating Elements Layer */}
        <MacroMintParallax />
        <ParallaxPlaque />

        {/* Hero Section - Base layer (z-index: 1) */}
        <div className="relative" style={{ zIndex: 1 }}>
          <Hero />
        </div>

        {/* Crafted to Endure Section - with wave top */}
        <div className="relative" style={{ zIndex: 10, backgroundColor: "#F5F3EE" }}>
          <SectionWaveTransition fillColor="#F5F3EE" height={80} />
          <MaterialsGrid />
        </div>

        {/* Plaques Carousel Section - with wave top */}
        <div className="relative" style={{ zIndex: 11, backgroundColor: "#EBE7DF" }}>
          <SectionWaveTransition fillColor="#EBE7DF" height={80} />
          <PlaquesCarousel />
        </div>

        {/* Process Section - with wave top */}
        <div className="relative" style={{ zIndex: 12, backgroundColor: "#F5F3EE" }}>
          <SectionWaveTransition fillColor="#F5F3EE" height={80} />
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
