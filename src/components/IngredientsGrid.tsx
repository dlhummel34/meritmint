"use client";

const materials = [
    {
        title: "Heirloom-Grade Cherrywood",
        subtitle: "High-Definition Permanence",
        description: "Deep, rich cherrywood with a sleek matte black finish. Infused directly into coated aluminum for archival durability and modern elegance.",
        image: "/images/walnut_hd.png",
        position: "left"
    },
    {
        title: "Museum-Grade Acrylic",
        subtitle: "Optical Crystal Clarity",
        description: "UV-resistant, anti-reflective acrylic with diamond-polished edges. Provides a floating, ethereal presentation that protects and preserves your achievement.",
        image: "/images/acrylic_hd.png",
        position: "right"
    }
] as const;

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { usePerformance } from "@/lib/PerformanceContext";
import BlurFade from "@/components/magicui/blur-fade";

export default function IngredientsGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isMobile } = usePerformance();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Mouse tilt effect (Desktop only)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
        const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
        mouseX.set(x);
        mouseY.set(y);
    };

    // Smooth tilt values
    const tiltX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), { stiffness: 100, damping: 30 });
    const tiltY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), { stiffness: 100, damping: 30 });

    // Opposing tilt for the second item
    const tiltX2 = useSpring(useTransform(mouseY, [-1, 1], [-5, 5]), { stiffness: 100, damping: 30 });
    const tiltY2 = useSpring(useTransform(mouseX, [-1, 1], [5, -5]), { stiffness: 100, damping: 30 });

    // Background Glow Parallax
    const glow1X = useTransform(mouseX, [-1, 1], [-50, 50]);
    const glow1Y = useTransform(mouseY, [-1, 1], [-50, 50]);
    const glow2X = useTransform(mouseX, [-1, 1], [30, -30]);
    const glow2Y = useTransform(mouseY, [-1, 1], [30, -30]);

    // Item 1 Parallax
    const item1X = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
    const item1Opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const item1ShimmerX = useTransform(mouseX, [-1, 1], [20, -20]);

    // Item 2 Parallax
    const item2X = useTransform(scrollYProgress, [0.3, 0.8], [200, 0]);
    const item2Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const item2ShimmerX = useTransform(mouseX, [-1, 1], [-30, 30]);

    return (
        <section
            ref={containerRef}
            id="craft-section"
            className="relative min-h-[100vh] md:min-h-[120vh] w-full bg-merit-paper overflow-hidden py-24 md:py-48"
            onMouseMove={handleMouseMove}
        >
            {/* Background elements - Desktop Only */}
            {!isMobile && (
                <div className="absolute inset-0 pointer-events-none opacity-30 select-none overflow-hidden">
                    <motion.div
                        className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-merit-gold/5 blur-[120px]"
                        style={{ x: glow1X, y: glow1Y }}
                    />
                    <motion.div
                        className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-merit-gold/10 blur-[100px]"
                        style={{ x: glow2X, y: glow2Y }}
                    />
                </div>
            )}

            <div className="container relative z-10 mx-auto px-6">

                {/* Section Header */}
                <div className="mb-24 md:mb-48 text-center space-y-4 max-w-3xl mx-auto">
                    <BlurFade delay={0.1}>
                        <span className="text-merit-gold/80 font-serif italic text-xl md:text-2xl block">The Elements of Permanence</span>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                        <h2 className="text-5xl md:text-7xl font-serif text-merit-charcoal">
                            Crafted to Endure
                        </h2>
                    </BlurFade>
                </div>

                {/* Immersive Layout */}
                <div className="flex flex-col gap-24 md:gap-0 relative">

                    {/* Item 1: Cherrywood */}
                    <div className="flex flex-col md:flex-row items-center md:justify-between w-full relative group perspective-1000">
                        {/* Image Side */}
                        {isMobile ? (
                            <BlurFade className="w-full h-[400px] relative z-20 mb-8">
                                <Image
                                    src={materials[0].image}
                                    alt={materials[0].title}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    sizes="(max-width: 768px) 300px, 600px"
                                    priority
                                />
                            </BlurFade>
                        ) : (
                            <motion.div
                                className="md:absolute md:left-[-15%] md:top-1/2 md:-translate-y-1/2 w-[600px] h-[800px] z-20"
                                style={{
                                    x: item1X,
                                    rotateX: tiltX,
                                    rotateY: tiltY,
                                    opacity: item1Opacity
                                }}
                            >
                                <div className="relative w-full h-full transform-style-3d transition-transform duration-500 hover:scale-[1.02]">
                                    <Image
                                        src={materials[0].image}
                                        alt={materials[0].title}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        sizes="600px"
                                        priority
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"
                                        style={{ x: item1ShimmerX, opacity: 0.5 }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Text Side - Right Aligned */}
                        <div className="w-full md:w-1/2 md:ml-auto md:pl-20 md:pr-10 relative z-10">
                            <BlurFade delay={isMobile ? 0.3 : 0.2}>
                                <h3 className="text-4xl md:text-6xl font-serif text-merit-charcoal mb-4">
                                    {materials[0].title}
                                </h3>
                            </BlurFade>
                            <BlurFade delay={isMobile ? 0.4 : 0.3}>
                                <div className="h-1 w-24 bg-merit-gold mb-6" />
                                <h4 className="text-xl md:text-2xl font-serif italic text-merit-gold/90 mb-6">
                                    {materials[0].subtitle}
                                </h4>
                            </BlurFade>
                            <BlurFade delay={isMobile ? 0.5 : 0.4}>
                                <p className="text-lg md:text-xl text-merit-charcoal/70 leading-relaxed max-w-lg">
                                    {materials[0].description}
                                </p>
                            </BlurFade>
                        </div>
                    </div>


                    {/* Item 2: Acrylic */}
                    <div className="flex flex-col md:flex-row items-center md:mt-64 md:justify-between w-full relative group perspective-1000">
                        {/* Text Side - Left Aligned */}
                        <div className="w-full md:w-1/2 md:mr-auto md:pr-20 md:pl-10 order-2 md:order-1 mt-12 md:mt-0">
                            <div className="md:text-right flex flex-col items-center md:items-end">
                                <BlurFade delay={isMobile ? 0.3 : 0.2}>
                                    <h3 className="text-4xl md:text-6xl font-serif text-merit-charcoal mb-4">
                                        {materials[1].title}
                                    </h3>
                                </BlurFade>
                                <BlurFade delay={isMobile ? 0.4 : 0.3}>
                                    <div className="h-1 w-24 bg-merit-gold mb-6" />
                                    <h4 className="text-xl md:text-2xl font-serif italic text-merit-gold/90 mb-6">
                                        {materials[1].subtitle}
                                    </h4>
                                </BlurFade>
                                <BlurFade delay={isMobile ? 0.5 : 0.4}>
                                    <p className="text-lg md:text-xl text-merit-charcoal/70 leading-relaxed max-w-lg">
                                        {materials[1].description}
                                    </p>
                                </BlurFade>
                            </div>
                        </div>

                        {/* Image Side */}
                        {isMobile ? (
                            <BlurFade className="w-full h-[400px] relative z-20 mb-8 order-1 md:order-2">
                                <Image
                                    src={materials[1].image}
                                    alt={materials[1].title}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    sizes="(max-width: 768px) 300px, 600px"
                                    priority
                                />
                            </BlurFade>
                        ) : (
                            <motion.div
                                className="md:absolute md:right-[-10%] md:top-1/2 md:-translate-y-1/2 w-[600px] h-[800px] z-20 order-1 md:order-2"
                                style={{
                                    x: item2X,
                                    rotateX: tiltX2,
                                    rotateY: tiltY2,
                                    opacity: item2Opacity
                                }}
                            >
                                <div className="relative w-full h-full transform-style-3d transition-transform duration-500 hover:scale-[1.02]">
                                    <Image
                                        src={materials[1].image}
                                        alt={materials[1].title}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        sizes="600px"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-30 mix-blend-overlay border border-white/30 rounded-lg pointer-events-none" />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-tr from-cyan-50/0 via-cyan-100/20 to-cyan-50/0 pointer-events-none mix-blend-overlay"
                                        style={{ x: item2ShimmerX, opacity: 0.6 }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
