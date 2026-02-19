import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

function getStripe() {
    const key = (process.env.STRIPE_SECRET_KEY || '').trim();
    if (!key) console.error('Stripe Secret Key is missing or empty!');
    else console.log('Stripe Secret Key loaded (prefix):', key.substring(0, 8));
    return new Stripe(key);
}

const resend = new Resend(process.env.RESEND_API_KEY);

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
                                value: 7,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 10,
                            },
                        },
                    },
                },
            ],
        });

        // Send E-mail Notification to Admin
        try {
            await resend.emails.send({
                from: 'MeritMint Orders <orders@meritmint.news>',
                to: 'david@meritmint.news',
                subject: `New Checkout Initiated: ${customerName || 'Guest'}`,
                html: `
                    <h1>New Checkout Session Started</h1>
                    <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
                    <p><strong>Product:</strong> ${productName}</p>
                    <p><strong>Price:</strong> $${price}</p>
                    <p><strong>Article URL:</strong> <a href="${articleUrl}">${articleUrl}</a></p>
                    <br/>
                    <p>Is this live? ${session.livemode ? 'YES (Live Payment)' : 'NO (Test Mode)'}</p>
                `
            });
            console.log('Admin notification email sent successfully.');
        } catch (emailError) {
            console.error('Failed to send admin notification email:', emailError);
            // Don't block the checkout flow if email fails
        }

        return NextResponse.json({
            url: session.url,
            sessionId: session.id,
        });
    } catch (error) {
        console.error('Error creating checkout session details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            name: error instanceof Error ? error.name : 'Unknown name',
            stack: error instanceof Error ? error.stack : undefined,
            raw: error
        });
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
