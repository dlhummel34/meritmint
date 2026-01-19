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
        <div className="min-h-screen bg-stone-950">
            {/* Hero */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-5xl md:text-6xl text-stone-100"
                    >
                        Mint Your Achievement
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-stone-400 text-lg max-w-2xl mx-auto"
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
                        <p className="text-stone-500 text-sm">
                            Perfect for: {currentProductLine.vibe}
                        </p>
                    </motion.div>

                    {/* Size Selector */}
                    <div>
                        <h2 className="font-serif text-2xl text-stone-100 mb-6 text-center">
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
                        className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-serif text-xl text-stone-100">Order Summary</h3>
                                {selectedTier && (
                                    <p className="text-stone-400 text-sm">
                                        {currentProductLine.name} • {selectedTier.name} ({selectedTier.size})
                                    </p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="font-serif text-3xl text-amber-400">{formatPrice(total)}</p>
                                {includeReplica && (
                                    <p className="text-stone-500 text-xs">
                                        Includes Desktop Replica
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleCheckoutClick}
                            disabled={!canCheckout}
                            className={`
                w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                ${canCheckout
                                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 transform hover:scale-[1.02]'
                                    : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                                }
              `}
                        >
                            <span>Continue to Checkout</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-6 pt-4 border-t border-stone-800">
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
        <div className="flex items-center gap-2 text-stone-500">
            <Icon className="w-4 h-4" />
            <span className="text-xs">{text}</span>
        </div>
    );
}
