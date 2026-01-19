'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Gift } from 'lucide-react';
import { DESKTOP_REPLICA, formatPrice } from '@/lib/products';

interface AddOnModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (includeReplica: boolean) => void;
}

export function AddOnModal({ isOpen, onClose, onConfirm }: AddOnModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-stone-900 border-l border-stone-800 z-50 overflow-y-auto"
                    >
                        <div className="p-6 space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h2 className="font-serif text-2xl text-stone-100">Complete Your Set</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-stone-400 hover:text-stone-200 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Add-on Card */}
                            <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent p-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Gift className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-serif text-xl text-stone-100">{DESKTOP_REPLICA.name}</h3>
                                        <p className="text-stone-400 text-sm mt-1">{DESKTOP_REPLICA.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className="font-serif text-3xl text-amber-400">
                                        {formatPrice(DESKTOP_REPLICA.price)}
                                    </span>
                                    <span className="text-stone-500 line-through text-sm">
                                        {formatPrice(DESKTOP_REPLICA.originalPrice)}
                                    </span>
                                    <span className="text-emerald-400 text-sm font-medium">
                                        Save ${DESKTOP_REPLICA.originalPrice - DESKTOP_REPLICA.price}
                                    </span>
                                </div>

                                <p className="text-stone-500 text-sm">
                                    Perfect for your desk or shelf. A miniature version of your achievement.
                                </p>

                                <ul className="space-y-2">
                                    {[
                                        'Same premium print quality',
                                        'Elegant display stand included',
                                        'Ships with your main plaque'
                                    ].map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-stone-300 text-sm">
                                            <Check className="w-4 h-4 text-amber-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => onConfirm(true)}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    Add Desktop Replica + {formatPrice(DESKTOP_REPLICA.price)}
                                </button>

                                <button
                                    onClick={() => onConfirm(false)}
                                    className="w-full py-4 px-6 border border-stone-700 hover:border-stone-600 text-stone-300 hover:text-stone-100 rounded-xl transition-all duration-300"
                                >
                                    No thanks, just the plaque
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
