"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const materials = [
    {
        title: "Hand-Finished Hardwoods",
        subtitle: "American Black Walnut",
        description: "Sourced from sustainable forests, air-dried for decades to ensure stability and depth of color. Hand-finished with organic oils for a satin luster.",
        image: "/images/walnut_hd.png",
        position: "left"
    },
    {
        title: "Optical-Grade Crystal Acrylic",
        subtitle: "Museum-Quality Clarity",
        description: "UV-resistant, anti-reflective crystal acrylic provides unparalleled clarity—protecting your achievement while remaining virtually invisible.",
        image: "/images/acrylic_hd.png",
        position: "right"
    }
];

export default function IngredientsGrid() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section
            id="craft-section"
            className="relative min-h-screen w-full bg-merit-paper overflow-hidden py-32"
        >
            {/* Caustic Light Effect - Visible when hovering Acrylic */}
            <div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
                style={{
                    opacity: activeIndex === 1 ? 1 : 0,
                    background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)"
                }}
            />

            {/* Content Container */}
            <div className="container relative z-20 mx-auto px-6 flex flex-col items-center justify-center min-h-screen">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center space-y-4"
                >
                    <span className="text-merit-gold/80 font-serif italic text-xl">The Elements of Permanence</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-merit-charcoal">
                        Crafted to Endure
                    </h2>
                </motion.div>

                {/* Interactive Material List */}
                <div className="flex flex-col items-center space-y-16 w-full max-w-4xl">
                    {materials.map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative group w-full cursor-pointer py-8"
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ delay: index * 0.15 }}
                        >
                            {/* Container for text + image side by side */}
                            <div className="flex items-center justify-center gap-8">

                                {/* Left Image - for Hardwoods (index 0) */}
                                {index === 0 && (
                                    <div
                                        className="hidden md:block relative w-56 h-72 rounded-2xl overflow-hidden transition-all duration-500 ease-out flex-shrink-0"
                                        style={{
                                            transform: activeIndex === 0
                                                ? 'perspective(1000px) rotateY(-8deg) rotateX(5deg) scale(1.25) translateX(10px)'
                                                : 'perspective(1000px) rotateY(12deg) rotateX(0deg) scale(1) translateX(-30px)',
                                            opacity: activeIndex === 0 ? 1 : 0.35,
                                            boxShadow: activeIndex === 0
                                                ? '0 25px 50px -12px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.2)'
                                                : '0 10px 25px -5px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt="Walnut texture"
                                            fill
                                            className="object-cover transition-transform duration-500"
                                            style={{
                                                transform: activeIndex === 0 ? 'scale(1.1)' : 'scale(1)',
                                            }}
                                            sizes="224px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 transition-opacity duration-500"
                                            style={{ opacity: activeIndex === 0 ? 0.8 : 1 }} />
                                    </div>
                                )}

                                {/* Text Content */}
                                <div className="text-center flex-grow max-w-2xl">
                                    <h3
                                        className="text-4xl md:text-5xl lg:text-6xl font-serif transition-all duration-300"
                                        style={{
                                            color: activeIndex === index ? '#2a2a2a' : 'rgba(42, 42, 42, 0.25)',
                                            transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                                        }}
                                    >
                                        {item.title}
                                    </h3>

                                    <div
                                        className="overflow-hidden transition-all duration-300"
                                        style={{
                                            maxHeight: activeIndex === index ? '200px' : '0',
                                            opacity: activeIndex === index ? 1 : 0,
                                            marginTop: activeIndex === index ? '24px' : '0',
                                        }}
                                    >
                                        <h4 className="text-merit-gold font-serif italic text-xl mb-3">{item.subtitle}</h4>
                                        <p className="text-merit-charcoal/60 font-sans max-w-lg mx-auto leading-relaxed text-lg">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Image - for Acrylic (index 1) */}
                                {index === 1 && (
                                    <div
                                        className="hidden md:block relative w-56 h-72 rounded-2xl overflow-hidden transition-all duration-500 ease-out flex-shrink-0"
                                        style={{
                                            transform: activeIndex === 1
                                                ? 'perspective(1000px) rotateY(8deg) rotateX(-5deg) scale(1.25) translateX(-10px)'
                                                : 'perspective(1000px) rotateY(-12deg) rotateX(0deg) scale(1) translateX(30px)',
                                            opacity: activeIndex === 1 ? 1 : 0.35,
                                            boxShadow: activeIndex === 1
                                                ? '0 25px 50px -12px rgba(0,0,0,0.4), 0 0 40px rgba(100,200,255,0.25)'
                                                : '0 10px 25px -5px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt="Crystal acrylic texture"
                                            fill
                                            className="object-cover transition-transform duration-500"
                                            style={{
                                                transform: activeIndex === 1 ? 'scale(1.1)' : 'scale(1)',
                                            }}
                                            sizes="224px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 transition-opacity duration-500"
                                            style={{ opacity: activeIndex === 1 ? 0.6 : 1 }} />
                                        {/* Prismatic shimmer overlay on hover */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-tr from-cyan-200/20 via-purple-200/15 to-pink-200/20 mix-blend-overlay transition-opacity duration-500"
                                            style={{ opacity: activeIndex === 1 ? 1 : 0 }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Vertical connector line */}
                            {index < materials.length - 1 && (
                                <div className="absolute left-1/2 -bottom-16 h-12 w-px bg-gradient-to-b from-merit-charcoal/20 to-transparent -translate-x-1/2" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
}
