import { PrismaClient } from '@prisma/client';
import { ScrollText, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AdminAuditPage({ searchParams }) {
    const page = parseInt(searchParams?.page || '1', 10);
    const limit = 25;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.auditLog.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    const actionColors = {
        'UPDATE_USER_ROLE': { bg: 'rgba(168,85,247,0.1)', color: '#a855f7', border: 'rgba(168,85,247,0.2)' },
        'DELETE_INSTITUTION': { bg: 'rgba(255,90,90,0.1)', color: 'var(--red)', border: 'rgba(255,90,90,0.2)' },
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <ScrollText size={24} style={{ color: 'var(--accent)' }} />
                <h1 style={{ fontSize: 24 }}>Audit Logs</h1>
            </div>
            <p style={{ color: 'var(--text2)', marginBottom: 32 }}>
                {total} log entr{total !== 1 ? 'ies' : 'y'} recorded.
            </p>

            {logs.length === 0 ? (
                <div style={{
                    background: 'var(--card)', borderRadius: 'var(--r)', border: '1px solid var(--border)',
                    padding: 48, textAlign: 'center', color: 'var(--text3)', fontSize: 14,
                }}>
                    No audit logs yet. Admin actions will be recorded here.
                </div>
            ) : (
                <div style={{ background: 'var(--card)', borderRadius: 'var(--r)', border: '1px solid var(--border)', overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border)' }}>
                                <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Timestamp</th>
                                <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Actor</th>
                                <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Action</th>
                                <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => {
                                const colors = actionColors[log.action] || { bg: 'rgba(100,116,139,0.1)', color: 'var(--text2)', border: 'var(--border)' };
                                let details = '';
                                try {
                                    const parsed = JSON.parse(log.details || '{}');
                                    details = Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join(', ');
                                } catch {
                                    details = log.details || '—';
                                }

                                return (
                                    <tr key={log.id}>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, color: 'var(--text2)', whiteSpace: 'nowrap' }}>
                                            {new Date(log.createdAt).toLocaleString('en-ZA', {
                                                year: 'numeric', month: 'short', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit',
                                            })}
                                        </td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 13, fontFamily: 'monospace', color: 'var(--text2)' }}>
                                            {log.userId.slice(0, 8)}…
                                        </td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                                            <span style={{
                                                display: 'inline-block', padding: '4px 10px', borderRadius: 100,
                                                fontSize: 11, fontWeight: 600,
                                                background: colors.bg, color: colors.color,
                                                border: `1px solid ${colors.border}`,
                                            }}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text3)', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {details}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
                    {page > 1 ? (
                        <Link href={`/admin/audit?page=${page - 1}`} className="btn btn-ghost" style={{ fontSize: 13 }}>
                            <ChevronLeft size={16} /> Previous
                        </Link>
                    ) : (
                        <span />
                    )}
                    <span style={{ fontSize: 13, color: 'var(--text2)' }}>
                        Page {page} of {totalPages}
                    </span>
                    {page < totalPages ? (
                        <Link href={`/admin/audit?page=${page + 1}`} className="btn btn-ghost" style={{ fontSize: 13 }}>
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
