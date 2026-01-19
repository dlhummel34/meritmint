"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const steps = [
    {
        title: "The Source",
        subtitle: "Authentication",
        description: "Your achievement is validated. We verify your feature from '40 Under 40', Best in City nominations, or press articles, ensuring every MeritMint product represents a genuine accolade.",
        image: "/images/plaque_1.png",
        stamp: "/images/stamp_verified.png",
        stampLabel: "Verified",
    },
    {
        title: "The Minting",
        subtitle: "Creation",
        description: "Once verified, we craft your achievement into a museum-quality plaque. Precision milled hardwoods, laser-etched metals, and optional digital twin minting on the blockchain.",
        image: "/images/plaque_2.png",
        stamp: "/images/stamp_certified.png",
        stampLabel: "Certified",
    },
    {
        title: "The Legacy",
        subtitle: "Delivery",
        description: "Your heirloom arrives in a bespoke case, ready to hang. A timeless testament to your hard work, preserved for generations to come.",
        image: "/images/plaque_3.png",
        stamp: "/images/stamp_heirloom.png",
        stampLabel: "Heirloom",
    }
];

export default function ProcessSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Parallax for floating elements
    const leafY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const leafY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <section ref={containerRef} id="process" className="relative py-40 bg-merit-paper overflow-hidden">

            {/* Ambient glow connection from transition - clean continuation */}
            <div
                className="absolute top-0 left-0 w-full h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(197, 160, 89, 0.04) 0%, transparent 100%)',
                }}
            />

            {/* Floating Accent Leaves */}
            <motion.div style={{ y: leafY1 }} className="absolute top-1/4 left-[10%] opacity-25 rotate-12">
                <Image src="/images/mint_leaf_transparent.png" alt="" width={80} height={80} />
            </motion.div>
            <motion.div style={{ y: leafY2 }} className="absolute top-1/2 right-[15%] opacity-20 -rotate-45">
                <Image src="/images/mint_leaf_transparent.png" alt="" width={60} height={60} />
            </motion.div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-24 relative">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="block text-merit-gold/70 font-serif tracking-[0.3em] uppercase text-xs mb-4"
                    >
                        The Journey
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-5xl md:text-6xl text-merit-charcoal"
                    >
                        Our Process
                    </motion.h2>
                    <div className="w-16 h-px bg-merit-gold/40 mx-auto mt-8" />
                </div>

                {/* Process Steps - Zig-Zag Layout */}
                <div className="space-y-32 md:space-y-40">
                    {steps.map((step, index) => {
                        // Zig-zag: Step 01 & 03 = Text Left / Image Right, Step 02 = Image Left / Text Right
                        const isReversed = index === 1;

                        return (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Stamp Overlay - Positioned OUTSIDE text block at outer edge */}
                                <div
                                    className="absolute top-0 z-30 pointer-events-none transition-all"
                                    style={{
                                        right: isReversed ? 'auto' : '-140px',
                                        left: isReversed ? '-140px' : 'auto',
                                        transform: hoveredIndex === index
                                            ? `translateX(0) rotate(${isReversed ? '15deg' : '-15deg'}) scale(1)`
                                            : `translateX(${isReversed ? '-80px' : '80px'}) rotate(0deg) scale(0.7)`,
                                        opacity: hoveredIndex === index ? 0.9 : 0,
                                        transitionDuration: '600ms',
                                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    }}
                                >
                                    <Image
                                        src={step.stamp}
                                        alt={step.stampLabel}
                                        width={150}
                                        height={150}
                                        className="drop-shadow-lg mix-blend-multiply"
                                    />
                                </div>

                                <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 ${isReversed ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Text Side */}
                                    <div className="flex-1 space-y-5 text-center md:text-left max-w-lg relative">
                                        <motion.div
                                            initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.15 }}
                                        >
                                            {/* Step number */}
                                            <span className="text-merit-gold/50 font-serif text-6xl md:text-7xl font-light leading-none block mb-2">
                                                0{index + 1}
                                            </span>
                                            <span className="text-merit-sage/70 font-serif tracking-[0.2em] uppercase text-xs mb-3 block">
                                                {step.subtitle}
                                            </span>
                                            <h3 className="text-3xl md:text-4xl font-serif text-merit-charcoal mb-4">
                                                {step.title}
                                            </h3>
                                            <p className="text-base text-merit-charcoal/60 font-sans leading-[1.9] text-balance">
                                                {step.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Image Side */}
                                    <div className="flex-1 relative">
                                        {/* Soft ambient glow */}
                                        <div className="absolute inset-0 bg-merit-sage/8 rounded-full blur-[80px] scale-90" />

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.8 }}
                                            className="relative w-full aspect-square max-w-md mx-auto"
                                        >
                                            {/* Organic shape container */}
                                            <div
                                                className="relative w-full h-full overflow-hidden transition-transform duration-500"
                                                style={{
                                                    borderRadius: '40% 60% 55% 45% / 55% 45% 55% 45%',
                                                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                                                }}
                                            >
                                                <Image
                                                    src={step.image}
                                                    alt={step.title}
                                                    fill
                                                    className="object-contain p-6"
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Double-Layered Organic Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 translate-y-1">
                {/* Layer 2: Gold accent wave - slower offset */}
                <svg
                    className="absolute bottom-4 left-0 w-full"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    style={{ height: '80px' }}
                >
                    <path
                        d="M0,80 C300,20 600,100 900,40 C1050,10 1150,50 1200,30 L1200,120 L0,120 Z"
                        fill="rgba(212, 175, 55, 0.25)"
                    />
                </svg>

                {/* Layer 1: Deep navy asymmetrical curve */}
                <svg
                    className="relative w-full"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    style={{ height: '100px' }}
                >
                    <path
                        d="M0,60 C200,120 400,20 600,80 C800,140 1000,40 1200,90 L1200,120 L0,120 Z"
                        fill="#1A222E"
                    />
                </svg>
            </div>
        </section>
    );
}
