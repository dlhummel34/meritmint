"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

// Initialize Stripe with the publishable key
// Make sure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in your environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface StripeProviderProps {
    children: ReactNode;
    clientSecret?: string;
}

export default function StripeProvider({ children, clientSecret }: StripeProviderProps) {
    if (!clientSecret) {
        return <>{children}</>;
    }

    const options = {
        clientSecret,
        appearance: {
            theme: 'night' as const,
            variables: {
                colorPrimary: '#d4af37', // Merit Gold
                colorBackground: '#1c1917', // Stone 900
                colorText: '#f5f5f4', // Stone 100
                colorDanger: '#ef4444', // Red 500
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                borderRadius: '8px',
            },
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
}
