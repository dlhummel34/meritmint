"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxPlaque() {
    const plaqueRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for dynamic shadow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth shadow movement
    const springConfig = { damping: 25, stiffness: 80 };
    const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
    const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 20]), springConfig);

    // Subtle tilt based on mouse
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

    useEffect(() => {
        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);

        // GSAP ScrollTrigger
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // Parallax Float Up Effect
            gsap.to(containerRef.current, {
                y: -100, // Moves up slightly as you scroll down
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });

            // Fade out ONLY when leaving hero completely
            gsap.to(containerRef.current, {
                opacity: 0,
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "80% top",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            ctx.revert();
        };
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            className="absolute top-0 right-0 w-full md:w-1/2 h-screen z-30 hidden lg:flex items-center justify-center pointer-events-none pt-56"
        >
            <motion.div
                ref={plaqueRef}
                className="relative"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    perspective: 1200,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            >
                {/* Plaque Container with 3D Perspective */}
                <div
                    className="relative"
                    style={{
                        transform: "perspective(1200px) rotateY(-12deg) rotateX(5deg)",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Dynamic Multi-Layer Shadow */}
                    <motion.div
                        className="absolute inset-0 -z-10"
                        style={{
                            x: shadowX,
                            y: shadowY,
                        }}
                    >
                        {/* Primary warm shadow */}
                        <div
                            className="absolute inset-4 rounded-xl"
                            style={{
                                background: "radial-gradient(ellipse at center, rgba(74, 55, 40, 0.5) 0%, transparent 70%)",
                                filter: "blur(35px)",
                                transform: "translateZ(-30px) translateY(30px) scale(0.95)",
                            }}
                        />
                        {/* Secondary ambient shadow */}
                        <div
                            className="absolute inset-8 rounded-xl"
                            style={{
                                background: "radial-gradient(ellipse at center, rgba(45, 52, 54, 0.3) 0%, transparent 60%)",
                                filter: "blur(50px)",
                                transform: "translateZ(-50px) translateY(50px) scale(0.9)",
                            }}
                        />
                    </motion.div>

                    {/* Main Plaque Image - Enlarged */}
                    <div
                        className="relative"
                        style={{
                            width: "clamp(360px, 48vw, 600px)",
                            height: "clamp(450px, 60vw, 750px)",
                        }}
                    >
                        <Image
                            src="/images/meritmint_plaque.png"
                            alt="MeritMint Achievement Plaque"
                            fill
                            className="object-contain drop-shadow-lg"
                            priority
                        />

                        {/* Shimmer Highlight on Hover */}
                        <div
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-auto cursor-pointer"
                            style={{ transform: "translateZ(10px)" }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
