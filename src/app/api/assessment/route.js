import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const { sessionId, scores, topType } = body;

        if (!sessionId || !scores || !topType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const result = await prisma.assessmentResult.upsert({
            where: { sessionId },
            update: {
                scores: JSON.stringify(scores),
                topType,
            },
            create: {
                sessionId,
                scores: JSON.stringify(scores),
                topType,
            },
        });

        return NextResponse.json({ data: result });
    } catch (error) {
        console.error('POST /api/assessment error:', error);
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

        const result = await prisma.assessmentResult.findUnique({
            where: { sessionId },
        });

        if (!result) {
            return NextResponse.json({ data: null });
        }

        return NextResponse.json({
            data: {
                ...result,
                scores: JSON.parse(result.scores),
            },
        });
    } catch (error) {
        console.error('GET /api/assessment error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
