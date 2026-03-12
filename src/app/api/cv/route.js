import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const { sessionId, template, data } = body;

        if (!sessionId || !template || !data) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const cv = await prisma.savedCV.upsert({
            where: { sessionId },
            update: {
                template,
                data: JSON.stringify(data),
            },
            create: {
                sessionId,
                template,
                data: JSON.stringify(data),
            },
        });

        return NextResponse.json({ data: cv });
    } catch (error) {
        console.error('POST /api/cv error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
        }

        const cv = await prisma.savedCV.findUnique({
            where: { sessionId },
        });

        if (!cv) {
            return NextResponse.json({ data: null });
        }

        return NextResponse.json({
            data: {
                ...cv,
                data: JSON.parse(cv.data),
            },
        });
    } catch (error) {
        console.error('GET /api/cv error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
