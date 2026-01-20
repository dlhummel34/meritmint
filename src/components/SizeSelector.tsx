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
        relative p-6 pt-8 rounded-2xl border transition-all duration-300 text-left overflow-visible
        ${isSelected
                    ? 'border-merit-gold bg-merit-gold/5 shadow-md'
                    : 'border-merit-charcoal/10 bg-white/40 hover:border-merit-gold/40'
                }
        ${isBestValue ? 'ring-2 ring-merit-gold/20 ring-offset-2 ring-offset-merit-paper' : ''}
      `}
        >
            {/* Badge */}
            {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-3 py-1.5 bg-merit-gold text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-md font-sans whitespace-nowrap">
                        {tier.badge}
                    </span>
                </div>
            )}

            {/* Selection indicator */}
            {isSelected && (
                <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-merit-gold rounded-full flex items-center justify-center shadow-sm">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="space-y-4">
                <div>
                    <h3 className="font-serif text-xl text-merit-charcoal">{tier.name}</h3>
                    <p className="text-merit-charcoal/60 text-sm font-sans">{tier.size}</p>
                </div>

                <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl text-merit-gold">{formatPrice(tier.price)}</span>
                </div>

                {/* Upsell message for non-top tiers */}
                {priceGapMessage && tier.tier < 3 && (
                    <p className="text-xs text-merit-gold/80 italic font-sans">
                        {priceGapMessage}
                    </p>
                )}

                {/* Statement for top tier */}
                {tier.tier === 3 && (
                    <p className="text-xs text-merit-charcoal/50 font-sans">
                        The Statement Piece
                    </p>
                )}
            </div>
        </motion.button>
    );
}
