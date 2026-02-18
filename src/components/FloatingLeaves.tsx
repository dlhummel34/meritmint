"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { usePerformance } from "@/lib/PerformanceContext";

// Leaf depth configuration
type LeafLayer = "foreground" | "midground" | "background";

interface LeafConfig {
    layer: LeafLayer;
    scale: number;
    blur: number;
    opacity: number;
    scrollSpeed: number;
    mouseSensitivity: number;
    zIndex: number;
}

// Desktop layer configs - leaves can be in foreground
const desktopLayerConfigs: Record<LeafLayer, Omit<LeafConfig, "layer">> = {
    foreground: {
        scale: 1.5,
        blur: 0,
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

// Mobile layer configs - ALL leaves pushed to background so they don't block content
const mobileLayerConfigs: Record<LeafLayer, Omit<LeafConfig, "layer">> = {
    foreground: {
        scale: 1.2,
        blur: 0,
        opacity: 0.2,  // Much lower opacity
        scrollSpeed: 0.8,
        mouseSensitivity: 0,
        zIndex: 3,     // Behind all content
    },
    midground: {
        scale: 0.9,
        blur: 0,
        opacity: 0.15,
        scrollSpeed: 0.6,
        mouseSensitivity: 0,
        zIndex: 2,
    },
    background: {
        scale: 0.5,
        blur: 0,
        opacity: 0.1,
        scrollSpeed: 0.4,
        mouseSensitivity: 0,
        zIndex: 1,
    },
};

// Function to get layer config based on device
const getLayerConfigs = (isMobile: boolean) => isMobile ? mobileLayerConfigs : desktopLayerConfigs;

// Generate leaf data with collision avoidance for the logo area
function generateLeaves(count: number): Array<{ id: number; x: number; y: number; rotation: number; layer: LeafLayer }> {
    const leaves: Array<{ id: number; x: number; y: number; rotation: number; layer: LeafLayer }> = [];
    const layers: LeafLayer[] = ["foreground", "midground", "background"];

    // Exclusion zones in percentages (based on desktop layout)
    const exclusionZones = [
        // Protect Left Text Area (Eyebrow, Merit, Mint, Tagline, Button)
        { minX: -5, maxX: 55, minY: 15, maxY: 85 },
        // Protect Right Plaque Area
        { minX: 55, maxX: 105, minY: 5, maxY: 95 }
    ];

    let attempts = 0;
    const maxAttempts = count * 10; // Safety break

    while (leaves.length < count && attempts < maxAttempts) {
        let x = (attempts * 137.5) % 100;
        let y = (attempts * 89.3) % 100;

        // Check against all exclusion zones
        const isExcluded = exclusionZones.some(zone =>
            x > zone.minX &&
            x < zone.maxX &&
            y > zone.minY &&
            y < zone.maxY
        );

        if (!isExcluded) {
            const leafId = leaves.length;
            const rotation = (leafId * 47) % 360;
            const layer = layers[leafId % 3];
            leaves.push({ id: leafId, x, y, rotation, layer });
        }

        attempts++;
    }

    return leaves;
}

export default function FloatingLeaves() {
    const [isClient, setIsClient] = useState(false);
    const { isMobile, isLowPower, prefersReducedMotion } = usePerformance();

    // Reduce leaf count on mobile/low-power devices for smoother performance
    const leafCount = isMobile || isLowPower ? 4 : 10;
    const leaves = useMemo(() => generateLeaves(leafCount), [leafCount]);

    // Mouse tracking (disabled on mobile)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Scroll tracking
    const { scrollY } = useScroll();

    useEffect(() => {
        setIsClient(true);

        // Skip mouse tracking on mobile or if reduced motion preferred
        if (isMobile || prefersReducedMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, isMobile, prefersReducedMotion]);

    if (!isClient) return null;

    // Completely disable on reduced motion
    if (prefersReducedMotion) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
            {leaves.map((leaf) => (
                <Leaf
                    key={leaf.id}
                    {...leaf}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    scrollY={scrollY}
                    isMobile={isMobile}
                    isLowPower={isLowPower}
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
    isMobile: boolean;
    isLowPower: boolean;
}

function Leaf({ id, x, y, rotation, layer, mouseX, mouseY, scrollY, isMobile, isLowPower }: LeafProps) {
    const layerConfigs = getLayerConfigs(isMobile);
    const config = layerConfigs[layer];

    // Mouse drift (disabled on mobile)
    const springConfig = { damping: 30, stiffness: 40 };
    const driftX = useSpring(
        useTransform(mouseX, [-0.5, 0.5], isMobile ? [0, 0] : [config.mouseSensitivity, -config.mouseSensitivity]),
        springConfig
    );
    const driftY = useSpring(
        useTransform(mouseY, [-0.5, 0.5], isMobile ? [0, 0] : [config.mouseSensitivity, -config.mouseSensitivity]),
        springConfig
    );

    // Scroll parallax (simplified on mobile)
    const scrollMultiplier = isMobile || isLowPower ? 0.5 : 1;
    const scrollParallax = useTransform(
        scrollY,
        [0, 2000],
        [0, -200 * config.scrollSpeed * scrollMultiplier]
    );

    // Animation durations (faster on low-power for less computation)
    const floatDuration = isLowPower ? 12 + (id % 3) * 2 : 8 + (id % 5) * 2;
    const floatDelay = (id * 0.3) % 3;

    return (
        <motion.div
            className="absolute"
            style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)', // Force GPU layer
                left: `${x}%`,
                top: `${y}%`,
                x: isMobile ? 0 : driftX,
                y: scrollParallax,
                zIndex: config.zIndex,
                filter: config.blur > 0 && !isLowPower ? `blur(${config.blur}px)` : undefined,
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: config.opacity,
                    scale: config.scale,
                    rotate: isLowPower ? rotation : [rotation, rotation + 15, rotation - 10, rotation],
                    y: isLowPower ? 0 : [0, -20, 10, 0],
                }}
                transition={{
                    opacity: { duration: 1, delay: floatDelay },
                    scale: { duration: 1, delay: floatDelay },
                    rotate: isLowPower ? undefined : { duration: floatDuration, repeat: Infinity, ease: "easeInOut" },
                    y: isLowPower ? undefined : { duration: floatDuration * 0.8, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
                }}
            >
                <motion.div
                    style={{ x: isMobile ? 0 : driftX, y: isMobile ? 0 : driftY }}
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
