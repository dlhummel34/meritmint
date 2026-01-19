"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { usePerformance } from "@/lib/PerformanceContext";

export default function MacroMintParallax() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const { isMobile, isLowPower, prefersReducedMotion } = usePerformance();

    // Disable entirely on reduced motion preference
    if (prefersReducedMotion) return null;

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

    // On mobile, render fewer leaves with no blur
    if (isMobile) {
        return (
            <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
                {/* Single background leaf - bottom left */}
                <motion.div
                    style={{ y: backgroundY1 }}
                    className="absolute -bottom-20 -left-20 w-[300px] h-[300px] will-change-transform"
                >
                    <Image
                        src="/images/mint_leaf_transparent.png"
                        alt=""
                        fill
                        className="object-contain opacity-15 rotate-[30deg]"
                        sizes="300px"
                    />
                </motion.div>

                {/* Single background leaf - top right */}
                <motion.div
                    style={{ y: backgroundY1 }}
                    className="absolute -top-20 -right-20 w-[250px] h-[250px] will-change-transform"
                >
                    <Image
                        src="/images/mint_leaf_transparent.png"
                        alt=""
                        fill
                        className="object-contain opacity-12 -rotate-[45deg] scale-x-[-1]"
                        sizes="250px"
                    />
                </motion.div>

                {/* Midground accent */}
                <motion.div
                    style={{ y: midgroundY1 }}
                    className="absolute top-[50%] -left-16 w-[150px] h-[150px] will-change-transform"
                >
                    <Image
                        src="/images/mint_leaf_transparent.png"
                        alt=""
                        fill
                        className="object-contain opacity-20 rotate-[15deg]"
                        sizes="150px"
                    />
                </motion.div>
            </div>
        );
    }

    // Desktop: full experience with blur effects
    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {/* Washi Paper Grain Overlay */}
            <div
                className="absolute inset-0 bg-repeat opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ===== LARGE BACKGROUND LEAVES ===== */}
            <motion.div
                style={{ y: backgroundY1 }}
                className="absolute -bottom-40 -left-40 w-[700px] h-[700px] will-change-transform"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className={`object-contain opacity-20 rotate-[30deg] ${isLowPower ? '' : 'blur-[25px]'}`}
                    sizes="700px"
                />
            </motion.div>

            <motion.div
                style={{ y: backgroundY1 }}
                className="absolute -top-60 -right-40 w-[600px] h-[600px] will-change-transform"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className={`object-contain opacity-15 -rotate-[45deg] scale-x-[-1] ${isLowPower ? '' : 'blur-[25px]'}`}
                    sizes="600px"
                />
            </motion.div>

            {/* ===== FOREGROUND LEAVES ===== */}
            <motion.div
                style={{ y: foregroundY1 }}
                className="absolute -bottom-20 -left-20 w-[350px] h-[350px] will-change-transform"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className={`object-contain opacity-25 rotate-[25deg] ${isLowPower ? '' : 'blur-[15px]'}`}
                    sizes="350px"
                />
            </motion.div>

            <motion.div
                style={{ y: foregroundY2 }}
                className="absolute -top-32 -right-20 w-[300px] h-[300px] will-change-transform"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className={`object-contain opacity-20 -rotate-[40deg] ${isLowPower ? '' : 'blur-[15px]'}`}
                    sizes="300px"
                />
            </motion.div>

            {/* ===== MIDGROUND LEAVES ===== */}
            <motion.div
                style={{ y: midgroundY1, rotate: midgroundRotate1 }}
                className="absolute top-[25%] left-[5%] w-[150px] h-[150px] will-change-transform"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className={`object-contain opacity-35 ${isLowPower ? '' : 'blur-[6px]'}`}
                    sizes="150px"
                />
            </motion.div>

            <motion.div
                style={{ y: midgroundY2 }}
                className="absolute top-[55%] right-[8%] w-[120px] h-[120px] will-change-transform"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className={`object-contain opacity-30 scale-x-[-1] ${isLowPower ? '' : 'blur-[5px]'}`}
                    sizes="120px"
                />
            </motion.div>
        </div>
    );
}
