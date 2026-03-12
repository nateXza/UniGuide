import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const institution = await prisma.institution.findUnique({
            where: { id: parseInt(id) },
        });

        if (!institution) {
            return NextResponse.json({ error: 'Institution not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...institution,
            courses: JSON.parse(institution.courses),
        });
    } catch (error) {
        console.error('GET /api/institutions/[id] error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
