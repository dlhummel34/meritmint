// MeritMint Product Configuration
// Asymmetrical Pricing Strategy: Large gaps to anchor, small gaps to upsell

export type ProductLine = 'crystal' | 'heritage';

export interface ProductTier {
    id: string;
    name: string;
    size: string;
    dimensions: { width: number; height: number };
    price: number;
    tier: 1 | 2 | 3;
    badge?: string;
}

export interface ProductLineConfig {
    id: ProductLine;
    name: string;
    tagline: string;
    vibe: string;
    tiers: ProductTier[];
}

// Crystal Mint - Modern Acrylic Line
export const CRYSTAL_MINT: ProductLineConfig = {
    id: 'crystal',
    name: 'Crystal Mint',
    tagline: 'Modern Acrylic',
    vibe: 'Tech, Startups, Modern Offices',
    tiers: [
        {
            id: 'crystal-starter',
            name: 'The Starter',
            size: '7" × 9"',
            dimensions: { width: 7, height: 9 },
            price: 149,
            tier: 1,
        },
        {
            id: 'crystal-standard',
            name: 'The Standard',
            size: '8" × 10"',
            dimensions: { width: 8, height: 10 },
            price: 199,
            tier: 2,
        },
        {
            id: 'crystal-executive',
            name: 'The Executive',
            size: '9" × 12"',
            dimensions: { width: 9, height: 12 },
            price: 229,
            tier: 3,
            badge: 'Best Value',
        },
    ],
};

// Heritage Mint - Classic Wood + Metal Line
export const HERITAGE_MINT: ProductLineConfig = {
    id: 'heritage',
    name: 'Heritage Mint',
    tagline: 'Classic Wood + Metal',
    vibe: 'Law, Finance, Legacy, "Best of" Lists',
    tiers: [
        {
            id: 'heritage-standard',
            name: 'The Standard',
            size: '9" × 12"',
            dimensions: { width: 9, height: 12 },
            price: 189,
            tier: 1,
        },
        {
            id: 'heritage-executive',
            name: 'The Executive',
            size: '10" × 13"',
            dimensions: { width: 10, height: 13 },
            price: 239,
            tier: 2,
        },
        {
            id: 'heritage-presidential',
            name: 'The Presidential',
            size: '12" × 15"',
            dimensions: { width: 12, height: 15 },
            price: 269,
            tier: 3,
            badge: 'Most Popular',
        },
    ],
};

// Desktop Replica Add-On
export const DESKTOP_REPLICA = {
    id: 'desktop-replica',
    name: 'Desktop Replica',
    description: '8×10 Mini with elegant stand',
    size: '8" × 10"',
    price: 99,
    originalPrice: 149,
};

// Helper Functions
export function getProductLine(line: ProductLine): ProductLineConfig {
    return line === 'crystal' ? CRYSTAL_MINT : HERITAGE_MINT;
}

export function calculateTotal(
    line: ProductLine,
    tierId: string,
    includeReplica: boolean
): number {
    const productLine = getProductLine(line);
    const tier = productLine.tiers.find((t) => t.id === tierId);
    if (!tier) return 0;

    let total = tier.price;
    if (includeReplica) {
        total += DESKTOP_REPLICA.price;
    }
    return total;
}

export function formatPrice(price: number): string {
    return `$${price}`;
}

// Price gap analysis for UI messaging
export function getPriceGapMessage(
    line: ProductLine,
    currentTier: 1 | 2 | 3
): string | null {
    const productLine = getProductLine(line);
    const current = productLine.tiers.find((t) => t.tier === currentTier);
    const next = productLine.tiers.find((t) => t.tier === currentTier + 1);

    if (!current || !next) return null;

    const gap = next.price - current.price;
    return `Only $${gap} more for ${next.name}`;
}
