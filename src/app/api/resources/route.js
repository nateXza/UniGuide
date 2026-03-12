import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const where = {};
        if (category && category !== 'All') {
            where.category = category;
        }

        const resources = await prisma.resource.findMany({ where });

        const parsed = resources.map(r => ({
            ...r,
            tags: JSON.parse(r.tags),
        }));

        return NextResponse.json({ data: parsed });
    } catch (error) {
        console.error('GET /api/resources error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
