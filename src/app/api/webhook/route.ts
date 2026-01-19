import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function getStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2025-12-15.clover',
    });
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '';

async function sendSlackNotification(order: {
    productName: string;
    price: number;
    customerName: string;
    customerEmail: string;
    articleUrl: string;
    includeReplica: boolean;
}) {
    if (!slackWebhookUrl) {
        console.warn('Slack webhook URL not configured');
        return;
    }

    const replicaText = order.includeReplica ? ' + Desktop Replica' : '';

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
                        text: `*Product:*\n${order.productName}${replicaText}`,
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
            {
                type: 'actions',
                elements: [
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: '✅ Approve for Production',
                            emoji: true,
                        },
                        style: 'primary',
                        action_id: 'approve_order',
                    },
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: '👀 View Details',
                            emoji: true,
                        },
                        action_id: 'view_details',
                    },
                ],
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

    // Handle the payment_intent.succeeded event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata;

        await sendSlackNotification({
            productName: metadata.productName || 'Unknown Product',
            price: paymentIntent.amount / 100,
            customerName: paymentIntent.shipping?.name || 'Customer',
            customerEmail: paymentIntent.receipt_email || 'No email',
            articleUrl: metadata.articleUrl || '',
            includeReplica: metadata.includeReplica === 'true',
        });
    }

    return NextResponse.json({ received: true });
}
