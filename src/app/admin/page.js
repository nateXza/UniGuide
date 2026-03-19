import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AdminDashboardPage() {
    const userCount = await prisma.user.count();
    const institutionCount = await prisma.institution.count();
    const bursaryCount = await prisma.bursary.count();

    return (
        <div>
            <h1 style={{ marginBottom: 8, fontSize: 24 }}>System Overview</h1>
            <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Welcome to the UniGuide administrative dashboard.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                <div style={{ background: 'var(--card)', padding: 24, borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 8 }}>Total Users</h3>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>{userCount}</div>
                </div>
                <div style={{ background: 'var(--card)', padding: 24, borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 8 }}>Institutions Map</h3>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>{institutionCount}</div>
                </div>
                <div style={{ background: 'var(--card)', padding: 24, borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 8 }}>Active Bursaries</h3>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>{bursaryCount}</div>
                </div>
            </div>
            
            <h2 style={{ marginTop: 48, marginBottom: 16 }}>Recent System Activity</h2>
            <div style={{ background: 'var(--card)', padding: 24, borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
                <p style={{ color: 'var(--text3)', fontSize: 14 }}>Audit logs will appear here once the system is fully operational.</p>
            </div>
        </div>
    );
}
