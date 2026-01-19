"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Building2 } from "lucide-react";

export default function SplashGate({ onEnter }: { onEnter: () => void }) {
    const [isVisible, setIsVisible] = useState(true);

    const handleEnter = () => {
        setIsVisible(false);
        setTimeout(onEnter, 500); // Wait for exit animation
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-merit-dark/95 backdrop-blur-md text-merit-cream"
                >
                    <div className="max-w-4xl w-full px-6 text-center">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="font-serif text-3xl md:text-5xl mb-12 text-merit-gold tracking-wide"
                        >
                            Select Your Distinction
                        </motion.h1>

                        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                            {/* Option 1: Honoree */}
                            <motion.button
                                onClick={handleEnter}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="group flex flex-col items-center p-10 border border-merit-silver/20 rounded-xl hover:bg-merit-silver/5 transition-colors"
                            >
                                <div className="w-16 h-16 mb-6 rounded-full bg-merit-green/10 flex items-center justify-center text-merit-green group-hover:bg-merit-green group-hover:text-merit-cream transition-colors duration-300">
                                    <ShieldCheck size={32} />
                                </div>
                                <h2 className="text-2xl font-serif mb-2">I am an Honoree</h2>
                                <p className="text-sm text-merit-silver/60">
                                    Celebrate your personal award nomination or feature.
                                </p>
                            </motion.button>

                            {/* Option 2: Organization */}
                            <motion.button
                                onClick={handleEnter}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="group flex flex-col items-center p-10 border border-merit-silver/20 rounded-xl hover:bg-merit-silver/5 transition-colors"
                            >
                                <div className="w-16 h-16 mb-6 rounded-full bg-merit-gold/10 flex items-center justify-center text-merit-gold group-hover:bg-merit-gold group-hover:text-merit-dark transition-colors duration-300">
                                    <Building2 size={32} />
                                </div>
                                <h2 className="text-2xl font-serif mb-2">I represent an Organization</h2>
                                <p className="text-sm text-merit-silver/60">
                                    Recognize team achievements and press mentions.
                                </p>
                            </motion.button>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-16 text-xs text-merit-silver/40 uppercase tracking-widest"
                        >
                            MeritMint &copy; {new Date().getFullYear()}
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
