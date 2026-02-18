"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { scrollY } = useScroll();

    // Morph from transparent to frosted glass
    const headerBg = useTransform(
        scrollY,
        [0, 150],
        ["rgba(249, 247, 242, 0)", "rgba(249, 247, 242, 0.85)"]
    );

    const headerBlur = useTransform(
        scrollY,
        [0, 150],
        ["blur(0px)", "blur(20px)"]
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Craft", href: "#craft-section" },
        { name: "Gallery", href: "#gallery" },
        { name: "Process", href: "#process" },
        { name: "Commission", href: "#commission" },
    ];

    return (
        <>
            {/* Initial Top Bar - Minimal, floats on page */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-8 left-0 right-0 z-50 pointer-events-none"
                    >
                        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between pointer-events-auto">
                            {/* Floating Logo */}
                            <Link href="/" className="group flex items-center gap-3">
                                <motion.div
                                    className="relative"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                >
                                    {/* Gold ring with Image */}
                                    <div className="w-10 h-10 rounded-full border-2 border-merit-gold/60 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                        <img src="/images/mint_leaf_transparent.png" alt="MeritMint" className="w-6 h-6 object-contain" />
                                    </div>
                                </motion.div>
                            </Link>

                            {/* Floating Pills Navigation */}
                            <nav className="hidden md:flex items-center gap-2">
                                {navItems.slice(0, 3).map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-merit-charcoal/70 hover:text-merit-charcoal transition-colors relative group"
                                        >
                                            {item.name}
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-merit-gold scale-0 group-hover:scale-100 transition-transform" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Elegant CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link
                                    href="/purchase"
                                    className="group relative overflow-hidden"
                                >
                                    <span className="relative z-10 px-6 py-3 text-xs font-medium tracking-[0.15em] uppercase text-merit-charcoal border border-merit-charcoal/20 hover:border-merit-gold/60 hover:text-merit-gold transition-all duration-500 inline-flex items-center gap-2 rounded-full">
                                        Begin
                                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scrolled State - Compact Floating Bar */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.header
                        initial={{ opacity: 0, y: -100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -100, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div
                            className="flex items-center gap-6 px-8 py-3 rounded-full border border-white/20 shadow-lg shadow-black/5"
                            style={{
                                background: "rgba(249, 247, 242, 0.9)",
                                backdropFilter: "blur(20px)",
                            }}
                        >
                            {/* Mini Logo */}
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-merit-gold to-merit-sage flex items-center justify-center">
                                    <img src="/images/mint_leaf_transparent.png" alt="M" className="w-5 h-5 object-contain brightness-0 invert" />
                                </div>
                                <span className="font-serif text-base font-semibold text-merit-charcoal hidden lg:block">
                                    MeritMint
                                </span>
                            </Link>

                            {/* Divider */}
                            <div className="w-px h-6 bg-merit-charcoal/10" />

                            {/* Nav Links */}
                            <nav className="hidden md:flex items-center gap-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="text-xs font-medium tracking-wider uppercase text-merit-charcoal/70 hover:text-merit-gold transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* CTA Button */}
                            <Link
                                href="/purchase"
                                className="ml-2 px-5 py-2 bg-gradient-to-r from-merit-charcoal to-merit-sage text-white text-xs font-medium tracking-wider uppercase rounded-full hover:shadow-lg hover:shadow-merit-sage/20 transition-all duration-300 hover:scale-105"
                            >
                                Start
                            </Link>
                        </div>
                    </motion.header>
                )}
            </AnimatePresence>


        </>
    );
}
