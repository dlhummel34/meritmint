"use client";

import Image from "next/image";
import { useRef } from "react";

export default function MacroMintParallax() {
    const containerRef = useRef(null);

    // Desktop: full experience with static CSS animations
    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
            {/* Washi Paper Grain Overlay */}
            <div
                className="absolute inset-0 bg-repeat opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ===== MINT BACKGROUND LEAVES ===== */}
            {/* Left Leaf */}
            <div className="absolute -bottom-[10%] -left-[10%] w-[80vw] max-w-[700px] aspect-square md:-bottom-40 md:-left-40 opacity-[0.60] rotate-[20deg] pointer-events-none">
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 80vw, 700px"
                    priority
                />
            </div>

            {/* Right Leaf */}
            <div className="absolute -top-[5%] -right-[15%] w-[70vw] max-w-[600px] aspect-square md:-top-60 md:-right-40 opacity-[0.55] -rotate-[45deg] scale-x-[-1] pointer-events-none">
                <Image
                    src="/images/mint_leaf_transparent.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 70vw, 600px"
                    priority
                />
            </div>
        </div>
    );
}
