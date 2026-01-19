"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePerformance } from "@/lib/PerformanceContext";

// Assets to preload
const PRELOAD_IMAGES = [
    "/images/meritmint_plaque.png",
    "/images/mint_leaf_transparent.png",
];

export default function LoadingScreen() {
    const { setLoaded } = usePerformance();
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let loadedCount = 0;
        const totalAssets = PRELOAD_IMAGES.length;

        // Preload images
        PRELOAD_IMAGES.forEach((src) => {
            const img = new window.Image();
            img.onload = () => {
                loadedCount++;
                setProgress((loadedCount / totalAssets) * 100);
            };
            img.onerror = () => {
                loadedCount++;
                setProgress((loadedCount / totalAssets) * 100);
            };
            img.src = src;
        });

        // Minimum display time for UX
        const minDisplayTime = 1500;
        const startTime = Date.now();

        const checkCompletion = () => {
            const elapsed = Date.now() - startTime;
            if (loadedCount >= totalAssets) {
                const remainingTime = Math.max(0, minDisplayTime - elapsed);
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(setLoaded, 600); // Wait for exit animation
                }, remainingTime);
            } else {
                requestAnimationFrame(checkCompletion);
            }
        };

        checkCompletion();
    }, [setLoaded]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-merit-paper"
                >
                    {/* Subtle background texture */}
                    <div className="absolute inset-0 bg-texture-paper opacity-50" />

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
                        <div className="h-0.5 bg-merit-charcoal/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-merit-gold"
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.max(progress, 5)}%` }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
