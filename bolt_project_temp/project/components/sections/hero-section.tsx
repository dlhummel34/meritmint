"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/7544696/pexels-photo-7544696.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "transform 1.5s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/80 dark:from-background/80 dark:via-background/60 dark:to-background/90" />
      </div>
      
      {/* Hero content */}
      <div className="relative flex h-full flex-col items-center justify-center text-center px-6 text-white">
        <h1 
          className={cn(
            "font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-5xl mx-auto tracking-tight transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Sophisticated Wealth Management for Exceptional Results
        </h1>
        <p 
          className={cn(
            "mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/90 transition-all duration-1000 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          Personalized financial strategies for high-net-worth individuals and families seeking long-term wealth preservation and growth.
        </p>
        <div 
          className={cn(
            "mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Button size="lg" className="font-medium">
            Explore Our Services
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:text-white hover:bg-white/10 hover:border-white">
            Schedule a Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1000",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-xs uppercase tracking-widest text-white/70">Discover More</span>
        <div className="h-16 w-px bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
      </div>
    </section>
  )
}