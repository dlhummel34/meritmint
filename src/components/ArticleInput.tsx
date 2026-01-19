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
            <label className="block text-stone-300 font-medium">
                Your Award Article
            </label>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          relative rounded-xl border-2 border-dashed transition-all duration-300
          ${isDragging
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-stone-700 bg-stone-900/50 hover:border-stone-600'
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
                            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-amber-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-stone-100 font-medium truncate">{file.name}</p>
                                <p className="text-stone-500 text-sm">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <button
                                onClick={clearFile}
                                className="p-2 text-stone-400 hover:text-stone-200 transition-colors"
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
                                <div className="flex-shrink-0 w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center">
                                    <Link className="w-5 h-5 text-stone-400" />
                                </div>
                                <input
                                    type="url"
                                    value={value}
                                    onChange={(e) => onUrlChange(e.target.value)}
                                    placeholder="Paste your article link..."
                                    className="flex-1 bg-transparent text-stone-100 placeholder:text-stone-600 outline-none"
                                />
                                <div className="flex items-center gap-2 text-stone-500">
                                    <span className="text-sm">or</span>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors text-stone-300"
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

            <p className="text-xs text-stone-500">
                We handle the design. You'll receive a proof before we print.
            </p>
        </div>
    );
}
