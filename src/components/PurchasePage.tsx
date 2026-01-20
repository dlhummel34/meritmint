'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';
import { ProductToggle } from './ProductToggle';
import { SizeSelector } from './SizeSelector';
import { ArticleInput } from './ArticleInput';
import { AddOnModal } from './AddOnModal';
import {
    ProductLine,
    getProductLine,
    calculateTotal,
    formatPrice,
    DESKTOP_REPLICA,
} from '@/lib/products';

export function PurchasePage() {
    const [productLine, setProductLine] = useState<ProductLine>('crystal');
    const [selectedTierId, setSelectedTierId] = useState<string>('');
    const [articleUrl, setArticleUrl] = useState('');
    const [articleFile, setArticleFile] = useState<File | null>(null);
    const [showAddOnModal, setShowAddOnModal] = useState(false);
    const [includeReplica, setIncludeReplica] = useState(false);

    const currentProductLine = getProductLine(productLine);
    const selectedTier = currentProductLine.tiers.find((t) => t.id === selectedTierId);

    // Auto-select the recommended tier when switching product lines
    const handleProductLineChange = (line: ProductLine) => {
        setProductLine(line);
        const newLine = getProductLine(line);
        // Select the top tier (Best Value) by default
        setSelectedTierId(newLine.tiers[2].id);
    };

    // Initialize with top tier
    if (!selectedTierId && currentProductLine.tiers.length > 0) {
        setSelectedTierId(currentProductLine.tiers[2].id);
    }

    const total = selectedTier
        ? calculateTotal(productLine, selectedTierId, includeReplica)
        : 0;

    const hasValidInput = articleUrl.trim() !== '' || articleFile !== null;
    const canCheckout = selectedTier && hasValidInput;

    const handleCheckoutClick = () => {
        if (!canCheckout) return;
        setShowAddOnModal(true);
    };

    const handleAddOnConfirm = (withReplica: boolean) => {
        setIncludeReplica(withReplica);
        setShowAddOnModal(false);
        // Navigate to checkout - in production this would go to Stripe
        window.location.href = `/checkout?product=${selectedTierId}&replica=${withReplica}`;
    };

    return (
        <div className="min-h-screen bg-merit-paper bg-texture-paper">
            {/* Hero */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-5xl md:text-6xl text-merit-charcoal"
                    >
                        Mint Your Achievement
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-merit-charcoal/60 text-lg max-w-2xl mx-auto font-sans"
                    >
                        Transform your award or press feature into a timeless display piece.
                        Premium craftsmanship, delivered to your door.
                    </motion.p>
                </div>
            </section>

            {/* Product Selection */}
            <section className="pb-16 px-4">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Product Line Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <ProductToggle
                            selected={productLine}
                            onChange={handleProductLineChange}
                        />
                    </motion.div>

                    {/* Product Line Description */}
                    <motion.div
                        key={productLine}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-merit-charcoal/60 text-sm font-sans">
                            Perfect for: {currentProductLine.vibe}
                        </p>
                    </motion.div>

                    {/* Size Selector */}
                    <div>
                        <h2 className="font-serif text-2xl text-merit-charcoal mb-6 text-center">
                            Choose Your Size
                        </h2>
                        <SizeSelector
                            tiers={currentProductLine.tiers}
                            selectedId={selectedTierId}
                            productLine={productLine}
                            onChange={setSelectedTierId}
                        />
                    </div>

                    {/* Article Input */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <ArticleInput
                            value={articleUrl}
                            file={articleFile}
                            onUrlChange={setArticleUrl}
                            onFileChange={setArticleFile}
                        />
                    </motion.div>

                    {/* Order Summary & Checkout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/40 border border-merit-charcoal/10 rounded-2xl p-6 space-y-6 shadow-sm backdrop-blur-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-serif text-xl text-merit-charcoal">Order Summary</h3>
                                {selectedTier && (
                                    <p className="text-merit-charcoal/60 text-sm font-sans">
                                        {currentProductLine.name} • {selectedTier.name} ({selectedTier.size})
                                    </p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="font-serif text-3xl text-merit-gold">{formatPrice(total)}</p>
                                {includeReplica && (
                                    <p className="text-merit-charcoal/50 text-xs font-sans">
                                        Includes Desktop Replica
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleCheckoutClick}
                            disabled={!canCheckout}
                            className={`
                w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 font-serif tracking-wide
                ${canCheckout
                                    ? 'bg-merit-gold text-white hover:bg-merit-gold/90 transform hover:scale-[1.02] shadow-md'
                                    : 'bg-merit-charcoal/10 text-merit-charcoal/40 cursor-not-allowed'
                                }
              `}
                        >
                            <span>Continue to Checkout</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-6 pt-4 border-t border-merit-charcoal/10">
                            <TrustBadge icon={Shield} text="Secure Payment" />
                            <TrustBadge icon={Truck} text="Free Shipping" />
                            <TrustBadge icon={Award} text="Quality Guaranteed" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Add-On Modal */}
            <AddOnModal
                isOpen={showAddOnModal}
                onClose={() => setShowAddOnModal(false)}
                onConfirm={handleAddOnConfirm}
            />
        </div>
    );
}

function TrustBadge({ icon: Icon, text }: { icon: typeof Shield; text: string }) {
    return (
        <div className="flex items-center gap-2 text-merit-charcoal/50">
            <Icon className="w-4 h-4" />
            <span className="text-xs font-sans">{text}</span>
        </div>
    );
}
