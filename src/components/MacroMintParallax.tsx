"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { usePerformance } from "@/lib/PerformanceContext";

export default function MacroMintParallax() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const { isMobile, isLowPower, prefersReducedMotion } = usePerformance();

    // Reduced parallax multiplier for mobile/low-power
    const parallaxMultiplier = isMobile || isLowPower ? 0.3 : 1;

    // Foreground leaves: faster parallax
    const foregroundY1 = useTransform(scrollYProgress, [0, 1], [0, -400 * parallaxMultiplier]);
    const foregroundY2 = useTransform(scrollYProgress, [0, 1], [0, -350 * parallaxMultiplier]);

    // Midground leaves: medium parallax
    const midgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -200 * parallaxMultiplier]);
    const midgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -250 * parallaxMultiplier]);
    const midgroundRotate1 = useTransform(scrollYProgress, [0, 1], [0, isLowPower ? 0 : 25]);

    // Background leaves: slowest parallax
    const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -100 * parallaxMultiplier]);

    // Disable entirely on reduced motion preference or low power
    if (prefersReducedMotion || isLowPower) return null;

    // Desktop: full experience with static CSS animations
    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            {/* Washi Paper Grain Overlay */}
            <div
                className="absolute inset-0 bg-repeat opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ===== MINT BACKGROUND LEAVES ===== */}
            {/* Left Leaf */}
            <div className={`absolute -bottom-20 -left-20 w-[300px] h-[300px] md:-bottom-20 md:-left-10 md:w-[500px] md:h-[500px] lg:-bottom-40 lg:-left-20 lg:w-[700px] lg:h-[700px] opacity-[0.60] rotate-[20deg] pointer-events-none`}>
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 500px, 700px"
                    priority
                />
            </div>

            {/* Right Leaf */}
            <div className={`absolute -top-10 -right-20 w-[250px] h-[250px] md:-top-30 md:-right-10 md:w-[450px] md:h-[450px] lg:-top-60 lg:-right-30 lg:w-[600px] lg:h-[600px] opacity-[0.55] -rotate-[45deg] scale-x-[-1] pointer-events-none`}>
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 250px, (max-width: 1024px) 450px, 600px"
                    priority
                />
            </div>
        </div>
    );
}
