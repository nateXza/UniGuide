import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        const field = searchParams.get('field');
        const level = searchParams.get('level');
        const province = searchParams.get('province');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');

        const where = {};
        if (type) where.type = type;
        if (level) where.level = level;
        if (province) where.province = province;

        let data = await prisma.bursary.findMany({ where, orderBy: { name: 'asc' } });
        data = data.map(d => ({ ...d, fields: JSON.parse(d.fields || '[]') }));

        if (field) {
            data = data.filter(d => d.fields.some(f => f.toLowerCase().includes(field.toLowerCase()) || f === 'All fields'));
        }

        const totalRow = data.length;
        const totalPages = Math.ceil(totalRow / limit);
        const paginatedData = data.slice((page - 1) * limit, page * limit);

        return NextResponse.json({ 
            data: paginatedData, 
            total: totalRow,
            page,
            totalPages
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bursaries' }, { status: 500 });
    }
}
