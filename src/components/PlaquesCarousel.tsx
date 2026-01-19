"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";



// All plaque images
const plaques = [
    "/images/plaque_01.jpg",
    "/images/plaque_02.jpg",
    "/images/plaque_03.jpg",
    "/images/plaque_04.jpg",
    "/images/plaque_05.jpg",
    "/images/plaque_06.jpg",
    "/images/plaque_07.jpg",
    "/images/plaque_08.jpg",
    "/images/plaque_09.jpg",
    "/images/plaque_10.jpg",
    "/images/plaque_11.jpg",
    "/images/plaque_12.jpg",
    "/images/plaque_13.jpg",
    "/images/plaque_14.jpg",
    "/images/plaque_15.jpg",
    "/images/plaque_16.jpg",
    "/images/plaque_17.jpg",
    "/images/plaque_18.jpg",
    "/images/plaque_19.jpg",
    "/images/plaque_20.jpg",
    "/images/plaque_21.jpg",
    "/images/plaque_22.jpg",
    "/images/plaque_23.jpg",
    "/images/plaque_24.jpg",
];

export default function PlaquesCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-scroll animation
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId: number;
        let scrollPos = 0;
        const speed = 0.5; // pixels per frame

        const animate = () => {
            if (!isHovered && scrollContainer) {
                scrollPos += speed;
                // Reset to beginning for infinite scroll effect
                if (scrollPos >= scrollContainer.scrollWidth / 2) {
                    scrollPos = 0;
                }
                scrollContainer.scrollLeft = scrollPos;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, [isHovered]);

    return (
        <section className="relative pt-24 pb-48 bg-merit-paper overflow-hidden">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <span className="text-merit-gold/80 font-serif italic text-xl">Our Portfolio</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-merit-charcoal mt-4">
                    Distinguished Creations
                </h2>
                <p className="text-merit-charcoal/60 mt-6 max-w-2xl mx-auto px-6">
                    Each plaque tells a unique story of achievement. Explore our collection of custom-crafted recognition pieces.
                </p>
            </motion.div>

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-hidden px-8 py-8 cursor-grab active:cursor-grabbing"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ scrollBehavior: 'auto' }}
            >
                {/* Duplicate plaques for infinite scroll effect */}
                {[...plaques, ...plaques].map((src, index) => (
                    <motion.div
                        key={index}
                        className="flex-shrink-0 relative group"
                        whileHover={{ scale: 1.05, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div
                            className="relative rounded-xl overflow-hidden shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
                            style={{
                                width: '280px',
                                height: '380px',
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Plaque ${(index % plaques.length) + 1}`}
                                fill
                                className="object-cover"
                                sizes="280px"
                            />
                            {/* Hover overlay with shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Gradient fades on edges - matching the paper background */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-merit-paper to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-merit-paper to-transparent pointer-events-none z-10" />
        </section>
    );
}

