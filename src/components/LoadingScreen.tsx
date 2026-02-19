"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePerformance } from "@/lib/PerformanceContext";

/**
 * CRITICAL ASSETS — These are the heavy assets that must be fully downloaded
 * before the site is revealed. Ordered by visual impact / render priority.
 *
 * Each asset here is verified to exist in /public.
 */
const CRITICAL_ASSETS = [
    // Hero section — largest visible assets on first paint
    "/woodmint.png",           // 3.5 MB — Heritage Mint plaque (Purchase Page + Hero)
    "/crystalmint.jpg",        // 1.7 MB — Crystal Mint plaque
    // Ingredients section — HD textures for the 3D material cards
    "/images/walnut_hd.png",   // 1.1 MB — Walnut texture
    "/images/acrylic_hd.png",  // 0.5 MB — Acrylic texture
    // Hero plaque preview
    "/images/hero_plaque.png", // 0.8 MB — Main hero plaque
    // Carousel first few (above the fold on desktop)
    "/images/plaque_01.jpg",
    "/images/plaque_02.jpg",
    "/images/plaque_03.jpg",
    "/images/plaque_04.jpg",
    // Loading screen itself
    "/images/mint_leaf_transparent.png",
];

/**
 * Minimum time (ms) to show the loading screen for UX smoothness.
 * This prevents a jarring flash when assets are cached.
 */
const MIN_DISPLAY_MS = 1200;

export default function LoadingScreen() {
    const { setLoaded } = usePerformance();
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let loadedCount = 0;
        const totalAssets = CRITICAL_ASSETS.length;
        const startTime = Date.now();
        let assetsComplete = false;
        let fontsComplete = false;

        const tryComplete = () => {
            if (!assetsComplete || !fontsComplete) return;

            const elapsed = Date.now() - startTime;
            const remainingDelay = Math.max(0, MIN_DISPLAY_MS - elapsed);

            setTimeout(() => {
                setIsVisible(false);
                // Wait for fade-out animation to finish before signalling app
                setTimeout(setLoaded, 650);
            }, remainingDelay);
        };

        // --- 1. ASSET LOADING ---
        const onAssetSettled = () => {
            loadedCount++;
            const pct = (loadedCount / totalAssets) * 100;
            setProgress(pct);

            if (loadedCount >= totalAssets) {
                assetsComplete = true;
                tryComplete();
            }
        };

        CRITICAL_ASSETS.forEach((src) => {
            const img = new window.Image();
            img.onload = onAssetSettled;
            img.onerror = onAssetSettled; // Count failures too — don't block forever
            img.decoding = "async";
            img.src = src;
        });

        // --- 2. FONT LOADING ---
        if (typeof document !== "undefined" && document.fonts) {
            document.fonts.ready.then(() => {
                fontsComplete = true;
                tryComplete();
            });
        } else {
            fontsComplete = true; // Fallback for environments without FontFaceSet
        }

        // --- 3. SAFETY TIMEOUT (8s max) ---
        const safetyTimeout = setTimeout(() => {
            assetsComplete = true;
            fontsComplete = true;
            tryComplete();
        }, 8000);

        return () => clearTimeout(safetyTimeout);
    }, [setLoaded]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeInOut" }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-merit-paper"
                >
                    {/* Subtle background texture */}
                    <div className="absolute inset-0 bg-texture-paper opacity-50" />

                    {/* Hidden pre-render of heavy assets forces GPU texture upload
                        so transitions are smooth when they appear on screen */}
                    <div
                        className="absolute opacity-0 pointer-events-none overflow-hidden"
                        style={{ width: 1, height: 1, top: 0, left: 0 }}
                        aria-hidden="true"
                    >
                        <Image src="/crystalmint.jpg" alt="" width={4} height={4} priority />
                        <Image src="/woodmint.png" alt="" width={4} height={4} priority />
                        <Image src="/images/walnut_hd.png" alt="" width={4} height={4} priority />
                        <Image src="/images/acrylic_hd.png" alt="" width={4} height={4} priority />
                    </div>

                    {/* Logo / Wordmark */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10 text-center"
                    >
                        {/* Mint leaf accent */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                            animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-20"
                        >
                            <Image
                                src="/images/mint_leaf_transparent.png"
                                alt=""
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Brand name */}
                        <h1 className="font-serif text-5xl md:text-6xl tracking-tight">
                            <span className="text-merit-charcoal">Merit</span>
                            <span className="text-merit-gold italic ml-2">Mint</span>
                        </h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-4 text-merit-charcoal/50 font-serif italic text-sm tracking-wide"
                        >
                            Preserving Excellence
                        </motion.p>
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "240px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative z-10 mt-12"
                    >
                        <div className="h-0.5 bg-merit-charcoal/10 overflow-hidden rounded-full">
                            <motion.div
                                className="h-full bg-merit-gold rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.max(progress, 4)}%` }}
                                transition={{ type: "spring", stiffness: 40, damping: 18 }}
                            />
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.8 }}
                            className="text-center text-xs text-merit-charcoal/40 mt-3 font-sans tabular-nums"
                        >
                            {Math.round(progress)}%
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
