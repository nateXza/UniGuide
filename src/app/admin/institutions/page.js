import { PrismaClient } from '@prisma/client';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AdminInstitutionsPage({ searchParams }) {
    const page = parseInt(searchParams?.page || '1', 10);
    const limit = 20;
    const skip = (page - 1) * limit;

    const [institutions, total] = await Promise.all([
        prisma.institution.findMany({
            select: {
                id: true,
                name: true,
                abbr: true,
                province: true,
                type: true,
                students: true,
            },
            orderBy: { name: 'asc' },
            skip,
            take: limit,
        }),
        prisma.institution.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <Building2 size={24} style={{ color: 'var(--accent)' }} />
                <h1 style={{ fontSize: 24 }}>Institutions</h1>
            </div>
            <p style={{ color: 'var(--text2)', marginBottom: 32 }}>
                {total} institution{total !== 1 ? 's' : ''} in the database.
            </p>

            <div style={{ background: 'var(--card)', borderRadius: 'var(--r)', border: '1px solid var(--border)', overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border)' }}>
                            <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Province</th>
                            <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Type</th>
                            <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {institutions.map(inst => (
                            <tr key={inst.id}>
                                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ fontWeight: 600, fontSize: 14 }}>{inst.name}</div>
                                    {inst.abbr && <div style={{ fontSize: 12, color: 'var(--text3)' }}>{inst.abbr}</div>}
                                </td>
                                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, color: 'var(--text2)' }}>
                                    {inst.province}
                                </td>
                                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{
                                        display: 'inline-block', padding: '4px 10px', borderRadius: 100,
                                        fontSize: 11, fontWeight: 600,
                                        background: inst.type === 'University' ? 'rgba(59,130,246,0.1)' : 'rgba(48,217,128,0.1)',
                                        color: inst.type === 'University' ? '#3b82f6' : '#30d980',
                                        border: `1px solid ${inst.type === 'University' ? 'rgba(59,130,246,0.2)' : 'rgba(48,217,128,0.2)'}`,
                                    }}>
                                        {inst.type}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, color: 'var(--text2)' }}>
                                    {inst.students ? inst.students.toLocaleString() : '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
                    {page > 1 ? (
                        <Link href={`/admin/institutions?page=${page - 1}`} className="btn btn-ghost" style={{ fontSize: 13 }}>
                            <ChevronLeft size={16} /> Previous
                        </Link>
                    ) : (
                        <span />
                    )}
                    <span style={{ fontSize: 13, color: 'var(--text2)' }}>
                        Page {page} of {totalPages}
                    </span>
                    {page < totalPages ? (
                        <Link href={`/admin/institutions?page=${page + 1}`} className="btn btn-ghost" style={{ fontSize: 13 }}>
                            Next <ChevronRight size={16} />
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
            )}
        </div>
    );
}
