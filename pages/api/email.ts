import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
    runtime: 'edge',
};

interface RequestBody {
    text: string;
    userEmail: string;
}

export default async function handler(req: NextRequest): Promise<NextResponse> {
    if (req.method !== 'POST') {
        return new NextResponse(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { text, userEmail }: RequestBody = await req.json();

    if (!text || !userEmail) {
        return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'admin@mail.omnid.io',
            to: ['nagaranudit@gmail.com', 'manvi4peace@gmail.com'],
            subject: 'Reach out to Omnid.io',
            reply_to: userEmail,
            text: text,
        });

        if (error) {
            console.error(error);
            throw new Error('Failed to send email');
        }

        return new NextResponse(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
