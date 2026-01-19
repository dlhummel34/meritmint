'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import {
    getProductLine,
    formatPrice,
    DESKTOP_REPLICA,
    CRYSTAL_MINT,
    HERITAGE_MINT,
} from '@/lib/products';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const productId = searchParams.get('product') || '';
    const includeReplica = searchParams.get('replica') === 'true';

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Find the product
    const allProducts = [...CRYSTAL_MINT.tiers, ...HERITAGE_MINT.tiers];
    const product = allProducts.find((p) => p.id === productId);
    const productLine = productId.startsWith('crystal') ? CRYSTAL_MINT : HERITAGE_MINT;

    if (!product) {
        return (
            <div className="min-h-screen bg-stone-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl text-stone-100 mb-4">Product not found</h1>
                    <Link href="/purchase" className="text-amber-500 hover:text-amber-400">
                        Return to shop
                    </Link>
                </div>
            </div>
        );
    }

    const subtotal = product.price;
    const replicaPrice = includeReplica ? DESKTOP_REPLICA.price : 0;
    const total = subtotal + replicaPrice;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        // In production, this would integrate with Stripe Elements
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setIsComplete(true);
    };

    if (isComplete) {
        return (
            <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-6"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="font-serif text-3xl text-stone-100">Order Confirmed!</h1>
                    <p className="text-stone-400">
                        Thank you for your order. We'll send you a proof within 24-48 hours.
                    </p>
                    <p className="text-stone-500 text-sm">
                        A confirmation email has been sent to {email}
                    </p>
                    <Link
                        href="/"
                        className="inline-block mt-4 px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded-lg transition-colors"
                    >
                        Return Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-950 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/purchase"
                        className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-200 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to selection
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 h-fit">
                        <h2 className="font-serif text-xl text-stone-100 mb-6">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-stone-100">{productLine.name}</p>
                                    <p className="text-stone-400 text-sm">{product.name} • {product.size}</p>
                                </div>
                                <p className="text-stone-100">{formatPrice(product.price)}</p>
                            </div>

                            {includeReplica && (
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-stone-100">{DESKTOP_REPLICA.name}</p>
                                        <p className="text-stone-400 text-sm">{DESKTOP_REPLICA.description}</p>
                                    </div>
                                    <p className="text-stone-100">{formatPrice(DESKTOP_REPLICA.price)}</p>
                                </div>
                            )}

                            <div className="border-t border-stone-700 pt-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-stone-400">Subtotal</p>
                                    <p className="text-stone-100">{formatPrice(total)}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-stone-400">Shipping</p>
                                    <p className="text-emerald-400">FREE</p>
                                </div>
                            </div>

                            <div className="border-t border-stone-700 pt-4">
                                <div className="flex justify-between items-center">
                                    <p className="font-serif text-xl text-stone-100">Total</p>
                                    <p className="font-serif text-2xl text-amber-400">{formatPrice(total)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Lock className="w-5 h-5 text-emerald-500" />
                            <h2 className="font-serif text-xl text-stone-100">Secure Checkout</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-stone-300 text-sm mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-stone-300 text-sm mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>

                            {/* Stripe Elements would go here */}
                            <div className="p-4 bg-stone-800 border border-stone-700 rounded-lg">
                                <div className="flex items-center gap-2 text-stone-400">
                                    <CreditCard className="w-5 h-5" />
                                    <span className="text-sm">Card details (Stripe integration pending)</span>
                                </div>
                                <p className="text-xs text-stone-500 mt-2">
                                    Add STRIPE_PUBLIC_KEY to .env.local to enable payments
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing || !email || !name}
                                className={`
                  w-full py-4 px-6 rounded-xl font-bold transition-all duration-300
                  ${isProcessing || !email || !name
                                        ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900'
                                    }
                `}
                            >
                                {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                            </button>

                            <p className="text-xs text-stone-500 text-center">
                                Your payment is secured with 256-bit SSL encryption
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-stone-950 flex items-center justify-center">
                <div className="text-stone-400">Loading checkout...</div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
