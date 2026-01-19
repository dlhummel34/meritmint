import Link from "next/link";
import { Gem, TicketCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-merit-navy text-merit-paper pt-24 pb-12 border-t border-white/5 relative bg-texture-paper">
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-texture-paper opacity-50 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-white/10 p-2 rounded-lg">
                                <Gem size={24} className="text-merit-green" />
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
                            <li><Link href="#faq" className="hover:text-white transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg mb-6 text-merit-gold">Contact</h4>
                        <ul className="space-y-4 text-sm text-merit-silver/60">
                            <li>hello@meritmint.com</li>
                            <li>+1 (555) 012-3456</li>
                            <li className="pt-4">
                                <Link href="#intake" className="inline-flex items-center gap-2 text-merit-green hover:text-white transition-colors">
                                    <TicketCheck size={16} /> Check Order Status
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-xs text-merit-silver/40">
                    <p>&copy; {new Date().getFullYear()} MeritMint. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
