'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Truck, Award, User, Mail, Phone, Link as LinkIcon, Upload, CreditCard, Check, Loader2 } from 'lucide-react';
import { ProductToggle } from './ProductToggle';
import { SizeSelector } from './SizeSelector';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StripeProvider from '@/lib/StripeProvider';
import {
    ProductLine,
    getProductLine,
    formatPrice,
} from '@/lib/products';

// Inline Payment Form Component
function PaymentForm({ onSuccess, amount }: { onSuccess: () => void; amount: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setError('');

        const { error: paymentError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/checkout?success=true',
            },
            redirect: 'if_required',
        });

        if (paymentError) {
            setError(paymentError.message || 'Payment failed');
            setIsProcessing(false);
        } else {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                    {error}
                </div>
            )}
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`
                    w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 font-serif tracking-wide
                    ${!stripe || isProcessing
                        ? 'bg-merit-charcoal/20 text-merit-charcoal/40 cursor-not-allowed'
                        : 'bg-merit-gold text-white hover:bg-merit-gold/90 shadow-lg'
                    }
                `}
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <CreditCard className="w-5 h-5" />
                        <span>Pay {formatPrice(amount)}</span>
                    </>
                )}
            </button>
        </form>
    );
}

export function PurchasePage() {
    // Product Selection
    const [productLine, setProductLine] = useState<ProductLine>('crystal');
    const [selectedTierId, setSelectedTierId] = useState<string>('');

    // Section A: Award Details
    const [articleUrl, setArticleUrl] = useState('');
    const [articleFile, setArticleFile] = useState<File | null>(null);

    // Section B: Customer Info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Payment State
    const [clientSecret, setClientSecret] = useState('');
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [step, setStep] = useState<'form' | 'payment'>('form');

    const currentProductLine = getProductLine(productLine);
    const selectedTier = currentProductLine.tiers.find((t) => t.id === selectedTierId);

    // Auto-select top tier on mount or product line change
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
    const canProceed = selectedTier && hasValidAward && hasValidCustomer;

    // Proceed to Payment
    const handleProceedToPayment = async () => {
        if (!canProceed) return;

        setIsLoadingPayment(true);

        try {
            const res = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: selectedTierId,
                    productName: `${currentProductLine.name} - ${selectedTier?.name}`,
                    price: total,
                    customerEmail: email,
                    articleUrl: articleUrl || 'File uploaded',
                }),
            });

            const data = await res.json();
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
                setStep('payment');
            }
        } catch (err) {
            console.error('Payment init failed:', err);
        } finally {
            setIsLoadingPayment(false);
        }
    };

    // Success State
    if (paymentSuccess) {
        return (
            <div className="min-h-screen bg-merit-paper flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center space-y-6 bg-white/60 rounded-3xl p-8 border border-merit-charcoal/10 shadow-xl"
                >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="font-serif text-3xl text-merit-charcoal">Order Confirmed!</h1>
                    <p className="text-merit-charcoal/60">
                        Thank you for your order. We&apos;ll send you a proof within 24-48 hours.
                    </p>
                    <p className="text-merit-charcoal/40 text-sm">
                        A confirmation email has been sent to {email}
                    </p>
                </motion.div>
            </div>
        );
    }

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

                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-merit-charcoal/40" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Phone (optional)"
                                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-merit-charcoal/20 rounded-xl text-merit-charcoal placeholder:text-merit-charcoal/40 focus:outline-none focus:border-merit-gold focus:ring-1 focus:ring-merit-gold/20 transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Payment Section (Inline) */}
                            <AnimatePresence>
                                {step === 'payment' && clientSecret && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: -20, height: 0 }}
                                        className="bg-white/60 rounded-2xl p-6 border border-merit-charcoal/10 shadow-sm overflow-hidden"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-merit-gold text-white flex items-center justify-center font-serif font-bold text-sm">4</div>
                                            <h2 className="font-serif text-xl text-merit-charcoal">Payment</h2>
                                        </div>

                                        <StripeProvider clientSecret={clientSecret}>
                                            <PaymentForm amount={total} onSuccess={() => setPaymentSuccess(true)} />
                                        </StripeProvider>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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

                                        <div className="border-t border-merit-charcoal/10 pt-3 flex justify-between">
                                            <span className="font-serif text-lg text-merit-charcoal">Total</span>
                                            <span className="font-serif text-2xl text-merit-gold">{formatPrice(total)}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Proceed Button */}
                                {step === 'form' && (
                                    <button
                                        onClick={handleProceedToPayment}
                                        disabled={!canProceed || isLoadingPayment}
                                        className={`
                                            w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 font-serif tracking-wide
                                            ${canProceed && !isLoadingPayment
                                                ? 'bg-merit-gold text-white hover:bg-merit-gold/90 transform hover:scale-[1.02] shadow-md'
                                                : 'bg-merit-charcoal/10 text-merit-charcoal/40 cursor-not-allowed'
                                            }
                                        `}
                                    >
                                        {isLoadingPayment ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Loading...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Continue to Payment</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                )}

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
