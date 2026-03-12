import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { system, messages } = await req.json();
        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey || apiKey === 'your-anthropic-api-key-here') {
            return NextResponse.json({
                error: 'API key not configured',
                text: '⚠️ **Tutoring service is not yet configured.** The site administrator needs to add a valid Anthropic API key in the `.env` file. In the meantime, you can still browse the CAPS curriculum topics and subjects.\n\nTo set up:\n1. Get an API key from [console.anthropic.com](https://console.anthropic.com)\n2. Add it to your `.env` file as `ANTHROPIC_API_KEY="sk-ant-..."`\n3. Restart the server',
            });
        }

        const resp = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 2000,
                system,
                messages,
            }),
        });

        const data = await resp.json();

        if (data.error) {
            const errMsg = data.error.message || 'API error';
            if (resp.status === 401) {
                return NextResponse.json({ text: '⚠️ **Invalid API key.** The Anthropic API key is incorrect. Please check the `ANTHROPIC_API_KEY` in your `.env` file.' });
            }
            if (resp.status === 429) {
                return NextResponse.json({ text: '⏳ **Rate limit reached.** Too many requests. Please wait a moment and try again.' });
            }
            return NextResponse.json({ error: errMsg, text: `⚠️ **Service error:** ${errMsg}. Please try again.` });
        }

        const text = data.content?.find(b => b.type === 'text')?.text || 'I\'m here to help. Could you rephrase that?';
        return NextResponse.json({ text });
    } catch (error) {
        return NextResponse.json({ text: '⚠️ **Connection error.** Could not reach the tutoring service. Please check your internet connection and try again.' });
    }
}
