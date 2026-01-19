'use client';

import { motion } from 'framer-motion';
import { ProductTier, formatPrice, getPriceGapMessage, ProductLine } from '@/lib/products';
import { Check } from 'lucide-react';

interface SizeSelectorProps {
    tiers: ProductTier[];
    selectedId: string;
    productLine: ProductLine;
    onChange: (tierId: string) => void;
}

export function SizeSelector({ tiers, selectedId, productLine, onChange }: SizeSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier, index) => (
                <SizeCard
                    key={tier.id}
                    tier={tier}
                    isSelected={selectedId === tier.id}
                    onClick={() => onChange(tier.id)}
                    priceGapMessage={getPriceGapMessage(productLine, tier.tier as 1 | 2)}
                    delay={index * 0.1}
                />
            ))}
        </div>
    );
}

interface SizeCardProps {
    tier: ProductTier;
    isSelected: boolean;
    onClick: () => void;
    priceGapMessage: string | null;
    delay: number;
}

function SizeCard({ tier, isSelected, onClick, priceGapMessage, delay }: SizeCardProps) {
    const isBestValue = tier.tier === 3;

    return (
        <motion.button
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className={`
        relative p-6 rounded-2xl border-2 transition-all duration-300 text-left
        ${isSelected
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-stone-700 bg-stone-900/50 hover:border-stone-600'
                }
        ${isBestValue ? 'ring-2 ring-amber-500/30 ring-offset-2 ring-offset-stone-950' : ''}
      `}
        >
            {/* Badge */}
            {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 text-xs font-bold rounded-full uppercase tracking-wide">
                        {tier.badge}
                    </span>
                </div>
            )}

            {/* Selection indicator */}
            {isSelected && (
                <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-stone-900" />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-serif text-xl text-stone-100">{tier.name}</h3>
                    <p className="text-stone-400 text-sm">{tier.size}</p>
                </div>

                <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl text-amber-400">{formatPrice(tier.price)}</span>
                </div>

                {/* Upsell message for non-top tiers */}
                {priceGapMessage && tier.tier < 3 && (
                    <p className="text-xs text-amber-500/80 italic">
                        {priceGapMessage}
                    </p>
                )}

                {/* Statement for top tier */}
                {tier.tier === 3 && (
                    <p className="text-xs text-stone-500">
                        The Statement Piece
                    </p>
                )}
            </div>
        </motion.button>
    );
}
