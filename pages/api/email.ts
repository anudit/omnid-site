export const config = {
    runtime: 'edge',
};

import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req) {

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { text, userEmail } = await req.json();

    if (!text || !userEmail) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
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
            throw new Error(error.message || 'Failed to send email');
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
