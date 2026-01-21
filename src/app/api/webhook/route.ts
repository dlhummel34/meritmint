import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function getStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2025-12-15.clover',
    });
}

function getResend() {
    return new Resend(process.env.RESEND_API_KEY || '');
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '';
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'orders@example.com';

interface OrderDetails {
    productName: string;
    price: number;
    customerName: string;
    customerEmail: string;
    articleUrl: string;
    shippingAddress?: string;
}

async function sendEmailNotification(order: OrderDetails) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('Resend API key not configured');
        return;
    }

    try {
        await getResend().emails.send({
            from: 'MeritMint Orders <orders@resend.dev>',
            to: notificationEmail,
            subject: `🎉 New Order: ${order.productName} - $${order.price}`,
            html: `
                <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
                        💰 New Order Received!
                    </h1>
                    
                    <div style="background: #f5f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h2 style="margin-top: 0; color: #1c1917;">Order Details</h2>
                        <p><strong>Product:</strong> ${order.productName}</p>
                        <p><strong>Price:</strong> $${order.price}</p>
                    </div>

                    <div style="background: #f5f5f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h2 style="margin-top: 0; color: #1c1917;">Customer</h2>
                        <p><strong>Name:</strong> ${order.customerName}</p>
                        <p><strong>Email:</strong> <a href="mailto:${order.customerEmail}">${order.customerEmail}</a></p>
                        ${order.shippingAddress ? `<p><strong>Shipping:</strong> ${order.shippingAddress}</p>` : ''}
                    </div>

                    <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h2 style="margin-top: 0; color: #92400e;">Award/Article</h2>
                        <p>${order.articleUrl || '<em>File uploaded - check Stripe dashboard</em>'}</p>
                    </div>

                    <p style="color: #78716c; font-size: 14px;">
                        This order was placed on MeritMint. Log into your 
                        <a href="https://dashboard.stripe.com">Stripe Dashboard</a> for full details.
                    </p>
                </div>
            `,
        });
        console.log('Email notification sent successfully');
    } catch (error) {
        console.error('Failed to send email notification:', error);
    }
}

async function sendSlackNotification(order: OrderDetails) {
    if (!slackWebhookUrl) {
        console.warn('Slack webhook URL not configured');
        return;
    }

    const message = {
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: '💰 New Order Received!',
                    emoji: true,
                },
            },
            {
                type: 'section',
                fields: [
                    {
                        type: 'mrkdwn',
                        text: `*Product:*\n${order.productName}`,
                    },
                    {
                        type: 'mrkdwn',
                        text: `*Price:*\n$${order.price}`,
                    },
                ],
            },
            {
                type: 'section',
                fields: [
                    {
                        type: 'mrkdwn',
                        text: `*Customer:*\n${order.customerName}`,
                    },
                    {
                        type: 'mrkdwn',
                        text: `*Email:*\n${order.customerEmail}`,
                    },
                ],
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `*Asset Link:*\n${order.articleUrl || '_File uploaded - check email_'}`,
                },
            },
        ],
    };

    try {
        await fetch(slackWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message),
        });
    } catch (error) {
        console.error('Failed to send Slack notification:', error);
    }
}

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing stripe-signature header' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
        );
    }

    // Handle checkout.session.completed event (for Checkout Sessions)
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata || {};

        // Get shipping address (shipping_details available when shipping collection is enabled)
        const shippingDetails = (session as unknown as { shipping_details?: { address?: { line1?: string; city?: string; state?: string; postal_code?: string } } }).shipping_details;
        const shippingAddress = shippingDetails?.address
            ? `${shippingDetails.address.line1 || ''}, ${shippingDetails.address.city || ''}, ${shippingDetails.address.state || ''} ${shippingDetails.address.postal_code || ''}`
            : undefined;

        const orderDetails: OrderDetails = {
            productName: metadata.productName || 'MeritMint Plaque',
            price: (session.amount_total || 0) / 100,
            customerName: metadata.customerName || session.customer_details?.name || 'Customer',
            customerEmail: session.customer_details?.email || 'No email',
            articleUrl: metadata.articleUrl || '',
            shippingAddress,
        };

        // Send both email and Slack notifications
        await Promise.all([
            sendEmailNotification(orderDetails),
            sendSlackNotification(orderDetails),
        ]);
    }

    // Also handle payment_intent.succeeded for backwards compatibility
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata;

        const orderDetails: OrderDetails = {
            productName: metadata.productName || 'Unknown Product',
            price: paymentIntent.amount / 100,
            customerName: paymentIntent.shipping?.name || 'Customer',
            customerEmail: paymentIntent.receipt_email || 'No email',
            articleUrl: metadata.articleUrl || '',
        };

        await Promise.all([
            sendEmailNotification(orderDetails),
            sendSlackNotification(orderDetails),
        ]);
    }

    return NextResponse.json({ received: true });
}
