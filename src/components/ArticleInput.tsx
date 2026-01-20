'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Link, X, FileText } from 'lucide-react';

interface ArticleInputProps {
    value: string;
    file: File | null;
    onUrlChange: (url: string) => void;
    onFileChange: (file: File | null) => void;
}

export function ArticleInput({ value, file, onUrlChange, onFileChange }: ArticleInputProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            onFileChange(droppedFile);
            onUrlChange('');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileChange(selectedFile);
            onUrlChange('');
        }
    };

    const clearFile = () => {
        onFileChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-merit-charcoal font-medium font-serif">
                Your Award Article
            </label>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          relative rounded-xl border-2 border-dashed transition-all duration-300
          ${isDragging
                        ? 'border-merit-gold bg-merit-gold/5'
                        : 'border-merit-charcoal/20 bg-white/40 hover:border-merit-gold/40'
                    }
        `}
            >
                <AnimatePresence mode="wait">
                    {file ? (
                        <motion.div
                            key="file"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-6 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-merit-gold/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-merit-gold" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-merit-charcoal font-medium truncate font-sans">{file.name}</p>
                                <p className="text-merit-charcoal/50 text-sm font-sans">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <button
                                onClick={clearFile}
                                className="p-2 text-merit-charcoal/40 hover:text-merit-charcoal transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-merit-charcoal/5 rounded-lg flex items-center justify-center">
                                    <Link className="w-5 h-5 text-merit-charcoal/40" />
                                </div>
                                <input
                                    type="url"
                                    value={value}
                                    onChange={(e) => onUrlChange(e.target.value)}
                                    placeholder="Paste your article link..."
                                    className="flex-1 bg-transparent text-merit-charcoal placeholder:text-merit-charcoal/40 outline-none font-sans"
                                />
                                <div className="flex items-center gap-2 text-merit-charcoal/40 font-sans">
                                    <span className="text-sm">or</span>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-merit-charcoal/10 hover:border-merit-charcoal/30 rounded-lg transition-colors text-merit-charcoal/80 shadow-sm"
                                    >
                                        <Upload className="w-4 h-4" />
                                        <span className="text-sm">Upload</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    className="hidden"
                />
            </div>

            <p className="text-xs text-merit-charcoal/50 font-sans">
                We handle the design. You'll receive a proof before we print.
            </p>
        </div>
    );
}
