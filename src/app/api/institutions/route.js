import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        const province = searchParams.get('province');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '200');

        const where = {};
        if (type) where.type = type;
        if (province) where.province = province;
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { city: { contains: search } },
                { abbr: { contains: search } },
            ];
        }

        const [data, total] = await Promise.all([
            prisma.institution.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: [{ rank: 'asc' }, { name: 'asc' }] }),
            prisma.institution.count({ where }),
        ]);

        return NextResponse.json({
            data: data.map(d => ({ ...d, courses: JSON.parse(d.courses || '[]') })),
            total, page, totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch institutions' }, { status: 500 });
    }
}
