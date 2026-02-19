import { Suspense } from 'react';
import { PurchasePage } from '@/components/PurchasePage';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Purchase | MeritMint',
    description: 'Mint your achievement with a premium custom plaque.',
};

export default function PurchaseRoute() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-merit-paper flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-merit-gold border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <PurchasePage />
        </Suspense>
    );
}
