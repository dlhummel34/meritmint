"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

// Leaf depth configuration
type LeafLayer = "foreground" | "midground" | "background";

interface LeafConfig {
    layer: LeafLayer;
    scale: number;
    blur: number;
    opacity: number;
    scrollSpeed: number;      // Multiplier for scroll parallax
    mouseSensitivity: number; // Multiplier for mouse drift
    zIndex: number;
}

const layerConfigs: Record<LeafLayer, Omit<LeafConfig, "layer">> = {
    foreground: {
        scale: 1.5,
        blur: 4,
        opacity: 0.6,
        scrollSpeed: 1.5,
        mouseSensitivity: 40,
        zIndex: 30,
    },
    midground: {
        scale: 1.0,
        blur: 0,
        opacity: 0.5,
        scrollSpeed: 1.0,
        mouseSensitivity: 25,
        zIndex: 20,
    },
    background: {
        scale: 0.5,
        blur: 0,
        opacity: 0.25,
        scrollSpeed: 0.5,
        mouseSensitivity: 10,
        zIndex: 10,
    },
};

// Generate leaf data with deterministic pseudo-random positions
function generateLeaves(count: number): Array<{ id: number; x: number; y: number; rotation: number; layer: LeafLayer }> {
    const leaves = [];
    const layers: LeafLayer[] = ["foreground", "midground", "background"];

    for (let i = 0; i < count; i++) {
        const x = (i * 137.5) % 100; // Golden ratio distribution
        const y = (i * 89.3) % 100;
        const rotation = (i * 47) % 360;
        const layer = layers[i % 3];

        leaves.push({ id: i, x, y, rotation, layer });
    }
    return leaves;
}

export default function FloatingLeaves() {
    const [isClient, setIsClient] = useState(false);
    const leaves = useMemo(() => generateLeaves(18), []); // 6 per layer

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Scroll tracking
    const { scrollY } = useScroll();

    useEffect(() => {
        setIsClient(true);

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -0.5 to 0.5
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isClient) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
            {leaves.map((leaf) => (
                <Leaf
                    key={leaf.id}
                    {...leaf}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    scrollY={scrollY}
                />
            ))}
        </div>
    );
}

interface LeafProps {
    id: number;
    x: number;
    y: number;
    rotation: number;
    layer: LeafLayer;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    mouseY: ReturnType<typeof useMotionValue<number>>;
    scrollY: ReturnType<typeof useScroll>["scrollY"];
}

function Leaf({ id, x, y, rotation, layer, mouseX, mouseY, scrollY }: LeafProps) {
    const config = layerConfigs[layer];

    // Mouse drift: leaves move OPPOSITE to mouse direction
    const springConfig = { damping: 30, stiffness: 40 };
    const driftX = useSpring(
        useTransform(mouseX, [-0.5, 0.5], [config.mouseSensitivity, -config.mouseSensitivity]),
        springConfig
    );
    const driftY = useSpring(
        useTransform(mouseY, [-0.5, 0.5], [config.mouseSensitivity, -config.mouseSensitivity]),
        springConfig
    );

    // Scroll parallax: different speeds per layer
    const scrollParallax = useTransform(
        scrollY,
        [0, 2000],
        [0, -200 * config.scrollSpeed]
    );

    // Gentle floating animation
    const floatDuration = 8 + (id % 5) * 2; // 8-16s
    const floatDelay = (id * 0.3) % 3;

    return (
        <motion.div
            className="absolute"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                x: driftX,
                y: scrollParallax,
                zIndex: config.zIndex,
                filter: config.blur > 0 ? `blur(${config.blur}px)` : undefined,
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: config.opacity,
                    scale: config.scale,
                    rotate: [rotation, rotation + 15, rotation - 10, rotation],
                    y: [0, -20, 10, 0],
                }}
                transition={{
                    opacity: { duration: 1, delay: floatDelay },
                    scale: { duration: 1, delay: floatDelay },
                    rotate: { duration: floatDuration, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: floatDuration * 0.8, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
                }}
            >
                <motion.div
                    style={{ x: driftX, y: driftY }}
                    className="relative"
                >
                    <Image
                        src="/images/mint_leaf_transparent.png"
                        alt=""
                        width={60}
                        height={60}
                        className="object-contain"
                        style={{
                            width: `${40 * config.scale}px`,
                            height: `${40 * config.scale}px`,
                        }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
