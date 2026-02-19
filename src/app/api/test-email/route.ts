import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is missing from environment variables');
        }

        const data = await resend.emails.send({
            from: 'MeritMint Orders <orders@meritmint.news>',
            to: 'david@meritmint.news',
            subject: 'Test Email from MeritMint',
            html: '<h1>It Works!</h1><p>Resend integration is active.</p>'
        });

        if (data.error) {
            return NextResponse.json({ success: false, error: data.error }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}
