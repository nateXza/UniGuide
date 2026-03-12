import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');
        const field = searchParams.get('field');
        const level = searchParams.get('level');
        const province = searchParams.get('province');

        const where = {};
        if (type) where.type = type;
        if (level) where.level = level;
        if (province) where.province = province;

        let data = await prisma.bursary.findMany({ where, orderBy: { name: 'asc' } });
        data = data.map(d => ({ ...d, fields: JSON.parse(d.fields || '[]') }));

        if (field) {
            data = data.filter(d => d.fields.some(f => f.toLowerCase().includes(field.toLowerCase()) || f === 'All fields'));
        }

        return NextResponse.json({ data, total: data.length });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bursaries' }, { status: 500 });
    }
}
