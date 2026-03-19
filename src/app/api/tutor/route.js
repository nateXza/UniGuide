import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export const maxDuration = 30;

export async function POST(req) {
    try {
        const apiKey = process.env.ANTHROPIC_API_KEY;

        if (!apiKey || apiKey === 'your-anthropic-api-key-here') {
            return NextResponse.json({
                error: 'API key not configured',
                text: '⚠️ **Tutoring service is not yet configured.** The site administrator needs to add a valid Anthropic API key in the `.env` file.',
            });
        }

        const { system, messages } = await req.json();

        // Server-side validation for file uploads (max 5MB, strict MIME whitelist)
        const ALLOWED_MIMES = ['application/pdf', 'image/png', 'image/jpeg', 'text/plain'];
        const MAX_BYTES = 5 * 1024 * 1024; // 5MB

        for (const msg of messages) {
            if (Array.isArray(msg.content)) {
                for (const part of msg.content) {
                    if (part.type === 'document' || part.type === 'image') {
                        // Validate Media Type
                        const mime = part.source?.media_type || part.source?.mime_type;
                        if (!ALLOWED_MIMES.includes(mime)) {
                            return NextResponse.json({ error: `Unsupported file type: ${mime}` }, { status: 400 });
                        }
                        
                        // Validate Size (Base64 string size approx: chars * 3/4)
                        const b64Data = part.source?.data;
                        if (b64Data) {
                            const sizeInBytes = (b64Data.length * 3) / 4;
                            if (sizeInBytes > MAX_BYTES) {
                                return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
                            }
                        }
                    }
                }
            }
        }

        const result = await generateText({
            model: anthropic('claude-3-5-sonnet-latest'),
            system: system || 'You are a helpful tutor.',
            messages,
            maxTokens: 1000,
        });

        return NextResponse.json({ text: result.text });
    } catch (error) {
        console.error('Tutor API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Error communicating with AI Tutor', text: '⚠️ **Service error.** Could not reach the tutoring service. Please try again.' },
            { status: 500 }
        );
    }
}
