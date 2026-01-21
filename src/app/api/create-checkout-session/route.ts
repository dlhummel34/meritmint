import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

function getStripe() {
    const key = (process.env.STRIPE_SECRET_KEY || '').trim();
    return new Stripe(key);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            productId,
            productName,
            price,
            customerEmail,
            customerName,
            articleUrl,
        } = body;

        const origin = request.headers.get('origin') || 'http://localhost:3000';

        // Create Stripe Checkout Session
        const session = await getStripe().checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: customerEmail || undefined,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: productName,
                            description: `MeritMint Custom Plaque - ${productId}`,
                            metadata: {
                                productId,
                                articleUrl: articleUrl || '',
                            },
                        },
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                productId,
                productName,
                customerName: customerName || '',
                articleUrl: articleUrl || '',
            },
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/purchase?canceled=true`,
            // Free shipping - included in price
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free Shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
            ],
        });

        return NextResponse.json({
            url: session.url,
            sessionId: session.id,
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
