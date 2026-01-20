"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function MobilePlaque() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

    // Parallax effect: moves slightly faster than scroll
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div ref={containerRef} className="relative w-full flex justify-center items-center pt-12 pb-2 lg:hidden perspective-container">
            <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 10, // Maintain tilt
                    transition: { duration: 0.8, delay: 0.2 }
                }}
                style={{
                    y, // Apply parallax
                    rotateY: -5, // Slight twist
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                }}
                className="relative z-10"
            >
                {/* Floating Bobbing Animation Wrapper */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative"
                    style={{
                        width: "280px", // Increased size
                        height: "360px",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Shadow Blob */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/20 blur-xl rounded-[100%] z-[-1]" />

                    <Image
                        src="/images/meritmint_plaque.png"
                        alt="MeritMint Achievement Plaque"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
