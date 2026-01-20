'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, Sparkles, ArrowRight } from 'lucide-react';

interface LeadData {
    name: string;
    email: string;
    phone?: string;
    newsletter: boolean;
}

interface LeadCaptureModalProps {
    onComplete: (data: LeadData) => void;
    onSkip: () => void;
}

const STORAGE_KEY = 'meritmint_lead_data';

export function getStoredLeadData(): LeadData | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return null;
        }
    }
    return null;
}

export function storeLeadData(data: LeadData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function LeadCaptureModal({ onComplete, onSkip }: LeadCaptureModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [newsletter, setNewsletter] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data: LeadData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
            newsletter,
        };

        storeLeadData(data);

        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 300));

        onComplete(data);
    };

    const isValid = name.trim().length > 0 && email.trim().length > 0 && email.includes('@');

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
                    onClick={onSkip}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-md bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800 rounded-3xl shadow-2xl border border-stone-700/50 overflow-hidden"
                >
                    {/* Decorative gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

                    {/* Close button */}
                    <button
                        onClick={onSkip}
                        className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-200 transition-colors rounded-full hover:bg-stone-800"
                        aria-label="Skip"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                                <Sparkles className="w-8 h-8 text-amber-400" />
                            </div>
                            <h2 className="font-serif text-2xl text-stone-100 mb-2">
                                Welcome to MeritMint
                            </h2>
                            <p className="text-stone-400 text-sm">
                                Enter your details to unlock exclusive offers and expedite your checkout.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full pl-12 pr-4 py-3.5 bg-stone-800/50 border border-stone-700 rounded-xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3.5 bg-stone-800/50 border border-stone-700 rounded-xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                                    required
                                />
                            </div>

                            {/* Phone (optional) */}
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone (optional)"
                                    className="w-full pl-12 pr-4 py-3.5 bg-stone-800/50 border border-stone-700 rounded-xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                                />
                            </div>

                            {/* Newsletter checkbox */}
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={newsletter}
                                        onChange={(e) => setNewsletter(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-5 h-5 rounded border border-stone-600 bg-stone-800 peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all flex items-center justify-center">
                                        {newsletter && (
                                            <svg className="w-3 h-3 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">
                                    Send me exclusive offers and updates about my order
                                </span>
                            </label>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className={`
                                    w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2
                                    ${isValid && !isSubmitting
                                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 shadow-lg shadow-amber-500/20'
                                        : 'bg-stone-700 text-stone-400 cursor-not-allowed'
                                    }
                                `}
                            >
                                {isSubmitting ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <span>Continue</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Skip link */}
                        <button
                            onClick={onSkip}
                            className="w-full mt-4 text-center text-sm text-stone-500 hover:text-stone-300 transition-colors"
                        >
                            Skip for now
                        </button>

                        {/* Privacy note */}
                        <p className="mt-6 text-xs text-stone-500 text-center">
                            We respect your privacy. Your information is secure and will never be shared.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
