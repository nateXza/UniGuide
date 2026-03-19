import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const metadata = {
    title: 'Admin Dashboard — UniGuide',
};

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        redirect('/login');
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
            <aside style={{ width: 250, borderRight: '1px solid var(--border)', padding: 24, background: 'var(--card)' }}>
                <h2 style={{ fontSize: 18, marginBottom: 24, color: 'var(--accent)' }}>Admin Panel</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Link href="/admin" style={{ fontWeight: 500 }}>Dashboard</Link>
                    <Link href="/admin/users" style={{ color: 'var(--text2)' }}>Manage Users</Link>
                    <Link href="/admin/institutions" style={{ color: 'var(--text2)' }}>Institutions</Link>
                    <Link href="/admin/audit" style={{ color: 'var(--text2)' }}>Audit Logs</Link>
                    <Link href="/" style={{ color: 'var(--text3)', marginTop: 24, fontSize: 13 }}>← Back to Site</Link>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '48px' }}>
                {children}
            </main>
        </div>
    );
}
