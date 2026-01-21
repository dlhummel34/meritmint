'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Shield, Truck, Award, User, Mail, Link as LinkIcon, Upload, Check, Loader2, ExternalLink } from 'lucide-react';
import { ProductToggle } from './ProductToggle';
import { SizeSelector } from './SizeSelector';
import {
    ProductLine,
    getProductLine,
    formatPrice,
} from '@/lib/products';

export function PurchasePage() {
    // Product Selection
    const [productLine, setProductLine] = useState<ProductLine>('crystal');
    const [selectedTierId, setSelectedTierId] = useState<string>('');

    // Award Details
    const [articleUrl, setArticleUrl] = useState('');
    const [articleFile, setArticleFile] = useState<File | null>(null);

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
    useEffect(() => {
        if (!selectedTierId && currentProductLine.tiers.length > 0) {
            setSelectedTierId(currentProductLine.tiers[2].id);
        }
    }, [currentProductLine, selectedTierId]);

    const total = selectedTier ? selectedTier.price : 0;

    // Validation
    const hasValidAward = articleUrl.trim() !== '' || articleFile !== null;
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
                    articleUrl: articleUrl || (articleFile ? `File: ${articleFile.name}` : ''),
                }),
            });

            const data = await res.json();

            if (data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url;
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

                                    {/* Product Preview Image */}
                                    <div className="relative aspect-[3/4] max-w-[280px] mx-auto rounded-xl overflow-hidden shadow-lg">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={productLine}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={productLine === 'crystal' ? '/crystal-mint-preview.png' : '/heritage-mint-preview.jpg'}
                                                    alt={productLine === 'crystal' ? 'Crystal Mint Plaque' : 'Heritage Mint Plaque'}
                                                    fill
                                                    className="object-cover"
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
                                            disabled={articleFile !== null}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-px bg-merit-charcoal/10" />
                                        <span className="text-merit-charcoal/40 text-sm font-sans">or</span>
                                        <div className="flex-1 h-px bg-merit-charcoal/10" />
                                    </div>

                                    {/* File Upload */}
                                    <label className={`
                                        flex items-center justify-center gap-3 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all
                                        ${articleFile ? 'border-emerald-400 bg-emerald-50' : 'border-merit-charcoal/20 hover:border-merit-gold/50 hover:bg-merit-gold/5'}
                                    `}>
                                        <Upload className={`w-5 h-5 ${articleFile ? 'text-emerald-600' : 'text-merit-charcoal/40'}`} />
                                        <span className={`font-sans text-sm ${articleFile ? 'text-emerald-700' : 'text-merit-charcoal/60'}`}>
                                            {articleFile ? articleFile.name : 'Upload screenshot or PDF'}
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) => {
                                                setArticleFile(e.target.files?.[0] || null);
                                                if (e.target.files?.[0]) setArticleUrl('');
                                            }}
                                            className="sr-only"
                                        />
                                    </label>
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
                                            <span className="text-merit-charcoal font-medium">{formatPrice(selectedTier.price)}</span>
                                        </div>
                                        <div className="text-merit-charcoal/50 text-sm font-sans">
                                            {selectedTier.name} • {selectedTier.size}
                                        </div>

                                        <div className="border-t border-merit-charcoal/10 pt-3 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-merit-charcoal/60 font-sans">Shipping</span>
                                                <span className="text-emerald-600 font-medium">FREE</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-merit-charcoal/10 pt-3 flex justify-between">
                                            <span className="font-serif text-lg text-merit-charcoal">Total</span>
                                            <span className="font-serif text-2xl text-merit-gold">{formatPrice(total)}</span>
                                        </div>

                                        {/* Delivery Estimate */}
                                        <div className="bg-merit-gold/5 rounded-lg p-3 border border-merit-gold/20">
                                            <p className="text-sm text-merit-charcoal/70 font-sans">
                                                <span className="font-medium text-merit-charcoal">Estimated Delivery:</span> 5-7 business days
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
                </div>
            </section>
        </div>
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
