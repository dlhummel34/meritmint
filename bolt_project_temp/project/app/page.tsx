import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { InsightsSection } from "@/components/sections/insights-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <InsightsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}