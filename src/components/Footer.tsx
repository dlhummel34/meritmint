import Link from "next/link";
import { Gem, TicketCheck } from "lucide-react";

export default function Footer() {
    return (
        <div className="relative" style={{ marginTop: "-100px" }}>
            {/* SVG Wave - positioned at top, dark navy with smooth curve */}
            <svg
                className="w-full block"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                style={{ height: "100px", display: "block" }}
            >
                <defs>
                    {/* Define texture pattern */}
                    <filter id="footerGrain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <pattern id="footerTexture" patternUnits="userSpaceOnUse" width="200" height="200">
                        <rect width="200" height="200" fill="#1A2634" />
                        <rect width="200" height="200" filter="url(#footerGrain)" opacity="0.05" />
                    </pattern>
                </defs>
                {/* Smooth wave path - starts at y=30-50 range, fills to bottom */}
                <path
                    d="M0,35 C180,60 360,15 540,40 C720,65 900,20 1080,45 C1260,70 1380,25 1440,40 L1440,100 L0,100 Z"
                    fill="url(#footerTexture)"
                />
            </svg>

            <footer className="bg-merit-navy text-merit-paper pt-16 pb-12 relative bg-texture-paper" style={{ marginTop: "-1px" }}>
                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-texture-paper opacity-50 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-4 gap-12 mb-20">
                        <div className="md:col-span-2 space-y-6">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="bg-white/10 p-2 rounded-lg">
                                    <img src="/images/mint_leaf_transparent.png" alt="MeritMint Logo" className="w-6 h-6 object-contain" />
                                </div>
                                <span className="font-serif text-2xl font-bold tracking-tight">MeritMint</span>
                            </Link>
                            <p className="text-merit-silver/60 font-light max-w-sm leading-relaxed">
                                The premier service for permanently minting your achievements into tangible, museum-quality tributes.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-serif text-lg mb-6 text-merit-gold">Explore</h4>
                            <ul className="space-y-4 text-sm text-merit-silver/60">
                                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="#products" className="hover:text-white transition-colors">Products</Link></li>
                                <li><Link href="#process" className="hover:text-white transition-colors">Our Process</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-serif text-lg mb-6 text-merit-gold">Contact</h4>
                            <ul className="space-y-4 text-sm text-merit-silver/60">
                                <li>david@meritmint.news</li>
                                <li className="pt-4">
                                    <Link href="/purchase?product=heritage&tier=heritage-presidential" className="inline-flex items-center gap-2 text-merit-green hover:text-white transition-colors">
                                        <TicketCheck size={16} /> Start Commission
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-xs text-merit-silver/40">
                        <div className="flex flex-col gap-2">
                            <p>&copy; {new Date().getFullYear()} MeritMint. All rights reserved.</p>
                            <p className="text-[10px] text-merit-silver/30 max-w-md">
                                This site is protected by reCAPTCHA and the Google{' '}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:text-merit-silver/50 underline transition-colors">Privacy Policy</a>{' '}
                                and{' '}
                                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-merit-silver/50 underline transition-colors">Terms of Service</a>{' '}
                                apply.
                            </p>
                        </div>
                        <div className="flex gap-8 mt-4 md:mt-0">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
