"use client";

interface SakariWaveTransitionProps {
    /** The color this wave reveals (the section below/after) */
    fillColor: string;
    /** Height of the wave area */
    height?: number;
    /** Add paper texture overlay (for matching textured sections like footer) */
    withTexture?: boolean;
    className?: string;
}

/**
 * Wave SVG that sits at the bottom of the PREVIOUS section,
 * drawing the color of the CURRENT section curving up.
 * Place this INSIDE the section wrapper, at the top of the content.
 */
export default function SakariWaveTransition({
    fillColor,
    height = 80,
    withTexture = false,
    className = "",
}: SakariWaveTransitionProps) {
    // SVG path for the wave - matches viewBox 0 0 1440 80
    const wavePath = `M0,30 C180,50 360,10 540,35 C720,60 900,20 1080,45 C1260,70 1380,25 1440,40 L1440,80 L0,80 Z`;

    // For mask, we need a data URL SVG 
    const maskSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 80' preserveAspectRatio='none'%3E%3Cpath d='${wavePath.replace(/\s+/g, ' ')}' fill='white'/%3E%3C/svg%3E")`;

    if (withTexture) {
        // Use a div with background + texture, masked to wave shape
        return (
            <div
                className={`relative w-full overflow-visible pointer-events-none ${className}`}
                style={{
                    height: 0,
                    marginTop: `-${height}px`,
                }}
            >
                {/* Masked div with background color + texture */}
                <div
                    className="absolute bottom-0 left-0 w-full bg-texture-paper"
                    style={{
                        height: `${height}px`,
                        backgroundColor: fillColor,
                        maskImage: maskSvg,
                        WebkitMaskImage: maskSvg,
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                    }}
                />
            </div>
        );
    }

    // Default: simple SVG wave without texture
    return (
        <div
            className={`relative w-full overflow-visible pointer-events-none ${className}`}
            style={{
                height: 0,
                marginTop: `-${height}px`,
            }}
        >
            <svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 1440 80"
                preserveAspectRatio="none"
                style={{
                    height: `${height}px`,
                    display: 'block',
                }}
            >
                <path d={wavePath} fill={fillColor} />
            </svg>
        </div>
    );
}
