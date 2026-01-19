"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function MacroMintParallax() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Foreground leaves: faster parallax (1.5x), heavy blur
    const foregroundY1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const foregroundY2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
    const foregroundY3 = useTransform(scrollYProgress, [0, 1], [0, -450]);

    // Midground leaves: medium parallax
    const midgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const midgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const midgroundY3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const midgroundRotate1 = useTransform(scrollYProgress, [0, 1], [0, 25]);
    const midgroundRotate2 = useTransform(scrollYProgress, [0, 1], [-10, 20]);
    const midgroundRotate3 = useTransform(scrollYProgress, [0, 1], [5, -15]);

    // Background leaves: slowest parallax
    const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {/* Washi Paper Grain Overlay */}
            <div
                className="absolute inset-0 bg-repeat opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ===== LARGE BACKGROUND LEAVES - Heavily Blurred ===== */}

            {/* Giant leaf - bottom left corner */}
            <motion.div
                style={{ y: backgroundY1 }}
                className="absolute -bottom-40 -left-40 w-[700px] h-[700px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[25px] opacity-20 rotate-[30deg]"
                    sizes="700px"
                />
            </motion.div>

            {/* Giant leaf - top right */}
            <motion.div
                style={{ y: backgroundY2 }}
                className="absolute -top-60 -right-40 w-[600px] h-[600px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[25px] opacity-15 -rotate-[45deg] scale-x-[-1]"
                    sizes="600px"
                />
            </motion.div>

            {/* Large leaf - center left (shows in middle sections) */}
            <motion.div
                style={{ y: midgroundY3 }}
                className="absolute top-[40%] -left-32 w-[500px] h-[500px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[20px] opacity-15 rotate-[15deg]"
                    sizes="500px"
                />
            </motion.div>

            {/* Large leaf - center right (shows in middle sections) */}
            <motion.div
                style={{ y: midgroundY2, rotate: midgroundRotate3 }}
                className="absolute top-[60%] -right-24 w-[450px] h-[450px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[18px] opacity-12 -rotate-[25deg]"
                    sizes="450px"
                />
            </motion.div>

            {/* Large leaf - bottom right */}
            <motion.div
                style={{ y: backgroundY1 }}
                className="absolute bottom-[10%] -right-48 w-[550px] h-[550px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[22px] opacity-18 rotate-[50deg] scale-x-[-1]"
                    sizes="550px"
                />
            </motion.div>

            {/* ===== FOREGROUND LEAVES - Medium Size, More Blur ===== */}

            <motion.div
                style={{ y: foregroundY1 }}
                className="absolute -bottom-20 -left-20 w-[350px] h-[350px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[15px] opacity-25 rotate-[25deg]"
                    sizes="350px"
                />
            </motion.div>

            <motion.div
                style={{ y: foregroundY2 }}
                className="absolute -top-32 -right-20 w-[300px] h-[300px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[15px] opacity-20 -rotate-[40deg]"
                    sizes="300px"
                />
            </motion.div>

            <motion.div
                style={{ y: foregroundY3 }}
                className="absolute top-[75%] left-[10%] w-[280px] h-[280px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[14px] opacity-22 rotate-[70deg]"
                    sizes="280px"
                />
            </motion.div>

            {/* ===== MIDGROUND LEAVES - Smaller, Less Blur, Rotating ===== */}

            <motion.div
                style={{ y: midgroundY1, rotate: midgroundRotate1 }}
                className="absolute top-[25%] left-[5%] w-[150px] h-[150px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[6px] opacity-35"
                    sizes="150px"
                />
            </motion.div>

            <motion.div
                style={{ y: midgroundY2, rotate: midgroundRotate2 }}
                className="absolute top-[55%] right-[8%] w-[120px] h-[120px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[5px] opacity-30 scale-x-[-1]"
                    sizes="120px"
                />
            </motion.div>

            <motion.div
                style={{ y: midgroundY1 }}
                className="absolute bottom-[25%] left-[12%] w-[100px] h-[100px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[4px] opacity-28 rotate-[60deg]"
                    sizes="100px"
                />
            </motion.div>

            <motion.div
                style={{ y: midgroundY3, rotate: midgroundRotate1 }}
                className="absolute top-[85%] right-[15%] w-[90px] h-[90px]"
            >
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain blur-[3px] opacity-32 -rotate-[30deg]"
                    sizes="90px"
                />
            </motion.div>
        </div>
    );
}
