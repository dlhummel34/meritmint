"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface OrganicWaveTransitionProps {
    position?: "top" | "bottom";
    flipVertical?: boolean;
    className?: string;
}

export default function OrganicWaveTransition({
    position = "bottom",
    flipVertical = false,
    className = "",
}: OrganicWaveTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Subtle parallax for each wave layer
    const wave1Y = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const wave2Y = useTransform(scrollYProgress, [0, 1], [10, -30]);
    const wave3Y = useTransform(scrollYProgress, [0, 1], [30, -10]);

    const positionClasses = position === "top" ? "top-0" : "bottom-0";
    const flipStyle = flipVertical ? { transform: "scaleY(-1)" } : {};

    return (
        <div
            ref={containerRef}
            className={`absolute left-0 right-0 ${positionClasses} pointer-events-none overflow-hidden ${className}`}
            style={{ height: "180px", ...flipStyle }}
        >
            {/* Layer 1: Furthest back - subtle warm gray */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 1440 180"
                preserveAspectRatio="none"
                style={{ y: wave1Y, height: "180px" }}
            >
                <path
                    d="M0,120 C240,180 480,100 720,140 C960,180 1200,80 1440,120 L1440,180 L0,180 Z"
                    fill="rgba(232, 228, 219, 0.5)"
                />
            </motion.svg>

            {/* Layer 2: Middle - cream blend */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 1440 180"
                preserveAspectRatio="none"
                style={{ y: wave2Y, height: "150px" }}
            >
                <path
                    d="M0,100 C180,140 360,60 540,100 C720,140 900,80 1080,120 C1260,160 1380,100 1440,80 L1440,180 L0,180 Z"
                    fill="rgba(245, 243, 238, 0.8)"
                />
            </motion.svg>

            {/* Layer 3: Foreground - solid paper color */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 1440 180"
                preserveAspectRatio="none"
                style={{ y: wave3Y, height: "120px" }}
            >
                <path
                    d="M0,80 C200,120 400,60 600,100 C800,140 1000,70 1200,110 C1350,140 1440,90 1440,90 L1440,180 L0,180 Z"
                    fill="#F9F7F2"
                />
            </motion.svg>
        </div>
    );
}
