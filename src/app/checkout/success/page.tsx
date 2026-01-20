'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Package, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Small delay for animation
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-merit-paper flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-merit-gold border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-merit-paper flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg w-full text-center space-y-8 bg-white/60 rounded-3xl p-10 border border-merit-charcoal/10 shadow-xl"
            >
                {/* Success Icon */}
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-12 h-12 text-emerald-600" />
                </div>

                <div className="space-y-3">
                    <h1 className="font-serif text-4xl text-merit-charcoal">Order Confirmed!</h1>
                    <p className="text-merit-charcoal/60 text-lg">
                        Thank you for your order. Your custom plaque is being prepared.
                    </p>
                </div>

                {/* What's Next */}
                <div className="bg-merit-gold/5 rounded-2xl p-6 border border-merit-gold/20 text-left space-y-4">
                    <h2 className="font-serif text-xl text-merit-charcoal flex items-center gap-2">
                        <Package className="w-5 h-5 text-merit-gold" />
                        What&apos;s Next?
                    </h2>
                    <ul className="space-y-3 text-merit-charcoal/70">
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-merit-gold/20 rounded-full flex items-center justify-center text-xs font-bold text-merit-gold shrink-0">1</span>
                            <span>We&apos;ll send you a digital proof within 24-48 hours</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-merit-gold/20 rounded-full flex items-center justify-center text-xs font-bold text-merit-gold shrink-0">2</span>
                            <span>After your approval, we&apos;ll craft your plaque</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-merit-gold/20 rounded-full flex items-center justify-center text-xs font-bold text-merit-gold shrink-0">3</span>
                            <span>Your plaque ships within 5-7 business days</span>
                        </li>
                    </ul>
                </div>

                {/* Email Note */}
                <div className="flex items-center justify-center gap-2 text-merit-charcoal/50 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>A confirmation email has been sent to you</span>
                </div>

                {/* Back Home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-merit-gold hover:text-merit-gold/80 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Home
                </Link>

                {sessionId && (
                    <p className="text-xs text-merit-charcoal/30">
                        Order ID: {sessionId.slice(0, 20)}...
                    </p>
                )}
            </motion.div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-merit-paper flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-merit-gold border-t-transparent rounded-full" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
