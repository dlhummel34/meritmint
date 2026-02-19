'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Shield, Truck, Award, User, Mail, Link as LinkIcon, Upload, Check, Loader2, ExternalLink } from 'lucide-react';
import { ProductToggle } from './ProductToggle';
import { SizeSelector } from './SizeSelector';
import {
    ProductLine,
    getProductLine,
    formatPrice,
} from '@/lib/products';

export function PurchasePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Product Selection
    const [productLine, setProductLine] = useState<ProductLine>('heritage');
    const [selectedTierId, setSelectedTierId] = useState<string>('');

    // Award Details
    const [articleUrl, setArticleUrl] = useState('');

    // Customer Info (basic - Stripe collects the rest)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Checkout State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const currentProductLine = getProductLine(productLine);
    const selectedTier = currentProductLine.tiers.find((t) => t.id === selectedTierId);

    // Auto-select top tier
    const handleProductLineChange = (line: ProductLine) => {
        setProductLine(line);
        const newLine = getProductLine(line);
        setSelectedTierId(newLine.tiers[2].id);
    };

    // Initialize with top tier
    // Initialize from URL or default to top tier
    // Effect 1: Initialize from URL (Run only when searchParams change, not when local state changes)
    useEffect(() => {
        const productParam = searchParams.get('product');
        const tierParam = searchParams.get('tier');

        if (productParam && (productParam === 'crystal' || productParam === 'heritage')) {
            setProductLine(productParam as ProductLine);
        }

        if (tierParam) {
            setSelectedTierId(tierParam);
        }
    }, [searchParams]);

    // Effect 2: Ensure valid tier selection when product line changes (Maintains state consistency)
    useEffect(() => {
        // Check if selectedTierId is valid for current product line
        const isValidTier = currentProductLine.tiers.some(t => t.id === selectedTierId);

        if (!isValidTier && currentProductLine.tiers.length > 0) {
            // Default to top tier if selected tier is invalid for current line
            setSelectedTierId(currentProductLine.tiers[2].id);
        }
    }, [currentProductLine, selectedTierId]);

    const total = selectedTier ? selectedTier.price : 0;

    // Validation
    const hasValidAward = articleUrl.trim() !== '';
    const hasValidCustomer = name.trim() !== '' && email.trim() !== '' && email.includes('@');
    const canCheckout = selectedTier && hasValidAward && hasValidCustomer;

    // Redirect to Stripe Checkout
    const handleCheckout = async () => {
        if (!canCheckout) return;

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: selectedTierId,
                    productName: `${currentProductLine.name} - ${selectedTier?.name}`,
                    price: total,
                    customerEmail: email,
                    customerName: name,
                    articleUrl: articleUrl,
                }),
            });

            const data = await res.json();

            if (data.url) {
                // Redirect to Stripe Checkout
                router.push(data.url);
            } else {
                setError('Failed to create checkout session');
                setIsLoading(false);
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError('Something went wrong. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-merit-paper bg-texture-paper">
            {/* Hero */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-4xl md:text-5xl text-merit-charcoal"
                    >
                        Mint Your Achievement
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-merit-charcoal/60 text-lg max-w-2xl mx-auto font-sans"
                    >
                        Transform your award into a timeless display piece in 3 simple steps.
                    </motion.p>
                </div>
            </section>

            {/* Main Flow */}
            <section className="pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Left Column: Steps */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Step 1: Style & Size */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/60 rounded-2xl p-6 border border-merit-charcoal/10 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-merit-gold text-white flex items-center justify-center font-serif font-bold text-sm">1</div>
                                    <h2 className="font-serif text-xl text-merit-charcoal">Choose Your Style</h2>
                                </div>

                                <div className="space-y-6">
                                    <ProductToggle selected={productLine} onChange={handleProductLineChange} />

                                    {/* Product Preview Image - Floating 3D */}
                                    <div className="relative h-[320px] flex items-center justify-center" style={{ perspective: '1000px' }}>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={productLine}
                                                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    rotateY: 0,
                                                    y: [0, -6, 0],
                                                }}
                                                exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                                                transition={{
                                                    duration: 0.6,
                                                    y: {
                                                        repeat: Infinity,
                                                        duration: 4,
                                                        ease: "easeInOut"
                                                    }
                                                }}
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotateY: 5,
                                                    rotateX: -5,
                                                }}
                                                className="relative w-[240px] cursor-pointer"
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                {/* Shadow */}
                                                <motion.div
                                                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[180px] h-[20px] bg-black/20 rounded-[50%]"
                                                    style={{ filter: 'blur(8px)', willChange: 'transform, opacity' }}
                                                    animate={{
                                                        scale: [1, 0.95, 1],
                                                        opacity: [0.3, 0.25, 0.3],
                                                    }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 4,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                                <Image
                                                    src={productLine === 'crystal' ? '/crystalmint.jpg' : '/woodmint.png'}
                                                    alt={productLine === 'crystal' ? 'Crystal Mint Plaque' : 'Heritage Mint Plaque'}
                                                    width={240}
                                                    height={320}
                                                    className="object-contain drop-shadow-2xl"
                                                    priority
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <p className="text-merit-charcoal/50 text-sm text-center">
                                        Perfect for: {currentProductLine.vibe}
                                    </p>
                                    <SizeSelector
                                        tiers={currentProductLine.tiers}
                                        selectedId={selectedTierId}
                                        productLine={productLine}
                                        onChange={setSelectedTierId}
                                    />
                                </div>
                            </motion.div>

                            {/* Step 2: Award Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/60 rounded-2xl p-6 border border-merit-charcoal/10 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm ${hasValidAward ? 'bg-emerald-500 text-white' : 'bg-merit-charcoal/10 text-merit-charcoal/40'}`}>
                                        {hasValidAward ? <Check className="w-4 h-4" /> : '2'}
                                    </div>
                                    <h2 className="font-serif text-xl text-merit-charcoal">Submit Your Award</h2>
                                </div>

                                <div className="space-y-4">
                                    {/* URL Input */}
                                    <div className="relative">
                                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-merit-charcoal/40" />
                                        <input
                                            type="url"
                                            value={articleUrl}
                                            onChange={(e) => setArticleUrl(e.target.value)}
                                            placeholder="Paste your article or award link..."
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-merit-charcoal/20 rounded-xl text-merit-charcoal placeholder:text-merit-charcoal/40 focus:outline-none focus:border-merit-gold focus:ring-1 focus:ring-merit-gold/20 transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Step 3: Customer Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/60 rounded-2xl p-6 border border-merit-charcoal/10 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm ${hasValidCustomer ? 'bg-emerald-500 text-white' : 'bg-merit-charcoal/10 text-merit-charcoal/40'}`}>
                                        {hasValidCustomer ? <Check className="w-4 h-4" /> : '3'}
                                    </div>
                                    <h2 className="font-serif text-xl text-merit-charcoal">Your Information</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-merit-charcoal/40" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your Name"
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-merit-charcoal/20 rounded-xl text-merit-charcoal placeholder:text-merit-charcoal/40 focus:outline-none focus:border-merit-gold focus:ring-1 focus:ring-merit-gold/20 transition-all"
                                        />
                                    </div>

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-merit-charcoal/40" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email Address"
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-merit-charcoal/20 rounded-xl text-merit-charcoal placeholder:text-merit-charcoal/40 focus:outline-none focus:border-merit-gold focus:ring-1 focus:ring-merit-gold/20 transition-all"
                                        />
                                    </div>

                                    <p className="text-xs text-merit-charcoal/50 text-center">
                                        Shipping address will be collected on the next page
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Order Summary (Sticky) */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="sticky top-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-merit-charcoal/10 shadow-lg space-y-6"
                            >
                                <h3 className="font-serif text-xl text-merit-charcoal">Order Summary</h3>

                                {selectedTier && (
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-merit-charcoal/60 font-sans">{currentProductLine.name}</span>
                                            <div className="flex flex-col items-end">
                                                <span className={`font-bold font-serif text-lg ${selectedTier.tier === 3 ? 'text-emerald-600' : 'text-merit-charcoal'}`}>
                                                    {formatPrice(selectedTier.price)}
                                                </span>
                                                {selectedTier.originalPrice && (
                                                    <span className="text-sm text-merit-charcoal/60 line-through decoration-merit-charcoal/60">
                                                        {formatPrice(selectedTier.originalPrice)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-merit-charcoal/50 text-sm font-sans">
                                            {selectedTier.name} • {selectedTier.size}
                                        </div>

                                        <div className="border-t border-merit-charcoal/10 pt-3 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <div className="flex flex-col">
                                                    <span className="text-merit-charcoal/60 font-sans">Shipping</span>
                                                    <span className="text-xs text-merit-charcoal/40 font-sans">7-10 business days</span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-emerald-600 font-bold font-serif">FREE</span>
                                                    <span className="text-xs text-merit-charcoal/60 line-through decoration-merit-charcoal/60">
                                                        {formatPrice(Math.round(selectedTier.price * 0.2))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-merit-charcoal/10 pt-3 flex justify-between items-baseline">
                                            <span className="font-serif text-lg text-merit-charcoal">Total</span>
                                            <span className={`font-serif text-2xl font-bold ${selectedTier.tier === 3 ? 'text-emerald-600' : 'text-merit-gold'}`}>
                                                {formatPrice(total)}
                                            </span>
                                        </div>

                                        {/* Delivery Estimate */}
                                        <div className="bg-merit-gold/5 rounded-lg p-3 border border-merit-gold/20">
                                            <p className="text-sm text-merit-charcoal/70 font-sans">
                                                <span className="font-medium text-merit-charcoal">Estimated Production Time:</span> 3-5 business days
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {error && (
                                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                                        {error}
                                    </div>
                                )}

                                {/* Checkout Button */}
                                <button
                                    onClick={handleCheckout}
                                    disabled={!canCheckout || isLoading}
                                    className={`
                                        w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 font-serif tracking-wide
                                        ${canCheckout && !isLoading
                                            ? 'bg-merit-gold text-white hover:bg-merit-gold/90 transform hover:scale-[1.02] shadow-md'
                                            : 'bg-merit-charcoal/10 text-merit-charcoal/40 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Redirecting to Checkout...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Secure Checkout</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-merit-charcoal/40 text-center">
                                    Powered by Stripe • Enter shipping address on the next page
                                </p>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-merit-charcoal/10">
                                    <TrustBadge icon={Shield} text="Secure" />
                                    <TrustBadge icon={Truck} text="Free Ship" />
                                    <TrustBadge icon={Award} text="Guaranteed" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    );
}

function TrustBadge({ icon: Icon, text }: { icon: typeof Shield; text: string }) {
    return (
        <div className="flex flex-col items-center gap-1 text-merit-charcoal/40">
            <Icon className="w-4 h-4" />
            <span className="text-xs font-sans">{text}</span>
        </div>
    );
}
