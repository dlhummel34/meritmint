"use client";

import { motion } from "framer-motion";
import { Upload, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function IntakeForm() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <section id="commission" className="relative py-40 bg-merit-navy text-merit-paper overflow-hidden">

            {/* Subtle Texture Overlay - like wood grain or paper */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-texture-paper" />

            {/* Background Ambience - Soft glows */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-merit-gold/4 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-merit-sage/3 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="block text-merit-gold/70 font-serif tracking-[0.3em] uppercase text-xs mb-6">
                        Commission Your Legacy
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl text-merit-paper/95 mb-6">
                        Begin the Process
                    </h2>
                    <p className="text-merit-paper/40 text-lg font-sans max-w-lg mx-auto leading-relaxed">
                        Submit your details for verification. Our curators will review your accolades and craft a preservation plan.
                    </p>
                    <div className="w-12 h-px bg-merit-gold/30 mx-auto mt-10" />
                </motion.div>

                {/* Form - No heavy box, floating on dark background */}
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-14"
                >
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Full Name */}
                        <div className="space-y-3 group">
                            <label className="block text-[10px] uppercase tracking-[0.25em] text-merit-paper/40 group-focus-within:text-merit-gold transition-colors duration-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-0 border-b border-white/15 py-4 text-lg text-merit-paper placeholder-white/20 focus:outline-none focus:border-merit-gold transition-colors duration-300 font-serif"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-3 group">
                            <label className="block text-[10px] uppercase tracking-[0.25em] text-merit-paper/40 group-focus-within:text-merit-gold transition-colors duration-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="w-full bg-transparent border-0 border-b border-white/15 py-4 text-lg text-merit-paper placeholder-white/20 focus:outline-none focus:border-merit-gold transition-colors duration-300 font-serif"
                                placeholder="hello@example.com"
                            />
                        </div>
                    </div>

                    {/* Accolade Link */}
                    <div className="space-y-3 group">
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-merit-paper/40 group-focus-within:text-merit-gold transition-colors duration-300">
                            Accolade Link / Verification Source
                        </label>
                        <input
                            type="url"
                            className="w-full bg-transparent border-0 border-b border-white/15 py-4 text-lg text-merit-paper placeholder-white/20 focus:outline-none focus:border-merit-gold transition-colors duration-300 font-serif"
                            placeholder="https://forbes.com/..."
                        />
                    </div>

                    {/* Upload Area - Minimal styling */}
                    <div className="space-y-4">
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-merit-paper/40">
                            Supporting Documentation
                        </label>
                        <div className="border border-dashed border-white/10 rounded-xl p-10 hover:bg-white/[0.02] transition-colors duration-300 cursor-pointer text-center group">
                            <Upload className="w-6 h-6 text-merit-paper/30 mx-auto mb-4 group-hover:text-merit-gold transition-colors duration-300" />
                            <p className="text-merit-paper/40 text-sm">Drag and drop or click to upload</p>
                            <span className="text-[10px] text-merit-paper/20 mt-2 block tracking-wide">PDF, JPG, PNG (Max 10MB)</span>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center pt-10">
                        <button className="group relative px-12 py-5 bg-transparent border border-merit-gold/50 text-merit-gold font-serif uppercase tracking-[0.2em] text-xs rounded-full overflow-hidden hover:bg-merit-gold hover:text-merit-navy transition-all duration-500">
                            <span className="relative z-10 flex items-center gap-4">
                                Submit Request
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}
