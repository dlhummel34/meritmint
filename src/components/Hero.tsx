"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Diamond } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobilePlaque from "./MobilePlaque";
import { usePerformance } from "@/lib/PerformanceContext";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
    const { isLoaded } = usePerformance();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Ensure we only animate after mounting and loading to prevent hydration mismatch
    const shouldAnimate = mounted && isLoaded;

    return (
        <section
            id="hero-section"
            className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-merit-paper bg-texture-paper"
        >
            {/* Vignette Overlay */}
            <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(45,52,54,0.06)_100%)]" />

            {/* Mesh Gradient Background Spots */}
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-merit-sage/15 rounded-full blur-[120px] mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-merit-gold/8 rounded-full blur-[100px] mix-blend-multiply opacity-60 pointer-events-none" />

            {/* Sticky Vertical Decorative Text */}
            <div className="hidden lg:flex fixed left-12 top-1/3 flex-col items-center z-30 space-y-4">
                <Diamond className="w-3 h-3 text-merit-gold/60 fill-current" />
                <div className="w-px h-12 bg-merit-sage/30" />
                <span className="text-merit-sage/50 font-serif tracking-[0.3em] text-[10px] uppercase text-vertical">
                    Preserving Excellence
                </span>
                <div className="w-px h-8 bg-merit-sage/20" />
                <span className="text-merit-gold/40 font-serif tracking-widest text-[9px] text-vertical">
                    Est. 2024
                </span>
            </div>

            {/* Right Vertical Anchor */}
            <div className="hidden lg:flex fixed right-12 top-1/3 flex-col items-center z-30 space-y-4">
                <span className="text-merit-gold/40 font-serif tracking-widest text-[9px] text-vertical">
                    Heirloom Grade
                </span>
                <div className="w-px h-8 bg-merit-gold/20" />
                <Diamond className="w-3 h-3 text-merit-gold/60 fill-current" />
                <div className="w-px h-12 bg-merit-sage/30" />
                <span className="text-merit-sage/50 font-serif tracking-[0.3em] text-[10px] uppercase text-vertical">
                    Museum Quality
                </span>
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-30 pt-16 lg:pt-24 pb-12 lg:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Text Content */}
                    <div className="lg:col-span-6 lg:pr-12 relative">
                        <div className="space-y-6 lg:space-y-10">

                            {/* Eyebrow */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex items-center space-x-3 text-merit-sage/80"
                            >
                                <div className="w-8 h-px bg-merit-sage/40" />
                                <span className="font-serif italic text-sm tracking-wide">The Pinnacle of Recognition</span>
                            </motion.div>

                            {/* Main Headline - Framer Motion Animated */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                className="leading-[0.9] -ml-1 relative z-50"
                            >
                                <span className="block font-serif text-7xl md:text-8xl lg:text-[10rem] font-medium text-merit-charcoal tracking-tight">
                                    Merit
                                </span>
                                <span className="block font-serif text-6xl md:text-7xl lg:text-[8rem] italic font-normal ml-16 lg:ml-36 text-merit-gold tracking-tight -mt-4 md:-mt-8">
                                    Mint
                                </span>
                            </motion.h1>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-lg md:text-xl text-merit-charcoal/60 font-sans leading-[1.8] tracking-wide max-w-md ml-4"
                            >
                                Transforming fleeting accolades into heirloom artifacts.
                            </motion.p>

                            {/* CTA - Moved up on mobile to be immediately visible */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="ml-4 flex justify-center lg:justify-start"
                            >
                                <a
                                    href="/purchase"
                                    className="group relative px-8 py-4 bg-merit-charcoal/5 border border-merit-charcoal/30 hover:border-merit-gold/60 hover:bg-merit-charcoal/10 transition-all duration-500 rounded-full overflow-hidden backdrop-blur-sm shadow-xl shadow-merit-sage/5"
                                >
                                    <span className="relative z-10 flex items-center space-x-3 text-merit-charcoal group-hover:text-merit-gold transition-colors duration-500 font-serif tracking-[0.2em] uppercase text-xs font-semibold">
                                        <span>Begin Commission</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2 duration-500" />
                                    </span>
                                </a>
                            </motion.div>

                            {/* Mobile Plaque - Integrated for perfect positioning */}
                            <MobilePlaque />
                        </div>
                    </div>

                    {/* Plaque Space with Golden Ratio Wireframe */}
                    <div className="hidden lg:block lg:col-span-6 relative min-h-[50vh] lg:min-h-[70vh]">
                        {/* Golden Ratio Wireframe Backdrop */}
                        <motion.svg
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 400 400"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {/* Golden Ratio Rectangles */}
                            <motion.rect
                                x="50" y="50" width="300" height="185"
                                fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3"
                                initial={{ pathLength: 0 }}
                                animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                            <motion.rect
                                x="50" y="235" width="185" height="115"
                                fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.25"
                                initial={{ pathLength: 0 }}
                                animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 1.2, delay: 0.8 }}
                            />
                            <motion.rect
                                x="235" y="235" width="115" height="115"
                                fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2"
                                initial={{ pathLength: 0 }}
                                animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                            />
                            {/* Spiral Path */}
                            <motion.path
                                d="M350,50 Q350,235 235,235 Q50,235 50,350"
                                fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.15"
                                initial={{ pathLength: 0 }}
                                animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 2, delay: 1.2 }}
                            />
                            {/* Construction Lines */}
                            <motion.line
                                x1="50" y1="50" x2="350" y2="350"
                                stroke="#D4AF37" strokeWidth="0.3" opacity="0.1"
                                initial={{ pathLength: 0 }}
                                animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 1.5, delay: 1.5 }}
                            />
                        </motion.svg>
                    </div>
                </div>
            </div>


        </section>
    );
}
