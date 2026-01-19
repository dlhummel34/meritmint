import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function getStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2025-12-15.clover',
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            productId,
            productName,
            price,
            includeReplica,
            customerEmail,
            articleUrl,
        } = body;

        // Calculate total in cents
        const amountInCents = price * 100;

        // Create a PaymentIntent with order metadata
        const paymentIntent = await getStripe().paymentIntents.create({
            amount: amountInCents,
            currency: 'usd',
            metadata: {
                productId,
                productName,
                includeReplica: includeReplica ? 'true' : 'false',
                articleUrl: articleUrl || '',
            },
            receipt_email: customerEmail,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json(
            { error: 'Failed to create payment intent' },
            { status: 500 }
        );
    }
}
