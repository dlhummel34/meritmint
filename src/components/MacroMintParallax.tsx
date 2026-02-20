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
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {/* Washi Paper Grain Overlay */}
            <div
                className="absolute inset-0 bg-repeat opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ===== MINT BACKGROUND LEAVES ===== */}
            {/* Left Leaf */}
            <div className={`absolute -bottom-40 -left-40 w-[700px] h-[700px] opacity-[0.60] rotate-[20deg] pointer-events-none ${isMobile ? 'scale-75 -bottom-20 -left-20' : ''}`}>
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="700px"
                    priority
                />
            </div>

            {/* Right Leaf */}
            <div className={`absolute -top-60 -right-40 w-[600px] h-[600px] opacity-[0.55] -rotate-[45deg] scale-x-[-1] pointer-events-none ${isMobile ? 'scale-75 -top-30 -right-20' : ''}`}>
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="600px"
                    priority
                />
            </div>
        </div>
    );
}
