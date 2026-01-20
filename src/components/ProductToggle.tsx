'use client';

import { motion } from 'framer-motion';
import { ProductLine } from '@/lib/products';

interface ProductToggleProps {
    selected: ProductLine;
    onChange: (line: ProductLine) => void;
}

export function ProductToggle({ selected, onChange }: ProductToggleProps) {
    return (
        <div className="flex items-center justify-center gap-2 p-1 bg-white/50 rounded-full border border-merit-charcoal/5 backdrop-blur-sm">
            <ToggleButton
                active={selected === 'crystal'}
                onClick={() => onChange('crystal')}
                label="Crystal Mint"
                sublabel="Modern Acrylic"
            />
            <ToggleButton
                active={selected === 'heritage'}
                onClick={() => onChange('heritage')}
                label="Heritage Mint"
                sublabel="Wood + Metal"
            />
        </div>
    );
}

interface ToggleButtonProps {
    active: boolean;
    onClick: () => void;
    label: string;
    sublabel: string;
}

function ToggleButton({ active, onClick, label, sublabel }: ToggleButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
        relative px-6 py-3 rounded-full transition-all duration-300
        ${active ? 'text-white' : 'text-merit-charcoal/50 hover:text-merit-charcoal/80'}
      `}
        >
            {active && (
                <motion.div
                    layoutId="toggle-bg"
                    className="absolute inset-0 bg-merit-gold rounded-full shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10 flex flex-col items-center">
                <span className="font-serif text-lg font-medium">{label}</span>
                <span className="text-xs opacity-80 font-sans">{sublabel}</span>
            </span>
        </button>
    );
}
