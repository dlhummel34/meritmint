"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ImmersiveTransition() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Gentle parallax for smooth blending
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

    return (
        <div
            ref={containerRef}
            className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none"
            style={{ height: '300px' }}
        >
            {/* Seamless gradient fade - no waves, just smooth color transition */}
            <motion.div
                className="absolute inset-0"
                style={{ opacity }}
            >
                <div
                    className="w-full h-full"
                    style={{
                        background: `linear-gradient(to bottom, 
                            transparent 0%,
                            rgba(245, 243, 238, 0.3) 30%,
                            rgba(245, 243, 238, 0.7) 60%,
                            #F5F3EE 100%
                        )`,
                    }}
                />
            </motion.div>
        </div>
    );
}
