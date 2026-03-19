'use client';

import { useState } from 'react';
import { Users, Shield, ShieldOff } from 'lucide-react';

function UserRow({ user, onRoleChange }) {
    const [loading, setLoading] = useState(false);

    const toggleRole = async () => {
        setLoading(true);
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, role: newRole }),
            });
            if (res.ok) {
                onRoleChange(user.id, newRole);
            }
        } catch (err) {
            console.error('Failed to update role:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <tr>
            <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{user.name || '—'}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{user.email}</div>
            </td>
            <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                    background: user.role === 'admin' ? 'rgba(168,85,247,0.1)' : 'rgba(100,116,139,0.1)',
                    color: user.role === 'admin' ? '#a855f7' : 'var(--text2)',
                    border: `1px solid ${user.role === 'admin' ? 'rgba(168,85,247,0.2)' : 'var(--border)'}`,
                }}>
                    {user.role === 'admin' ? <Shield size={12} /> : null}
                    {user.role}
                </span>
            </td>
            <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text3)', fontSize: 13 }}>
                {new Date(user.createdAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}
            </td>
            <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <button
                    onClick={toggleRole}
                    disabled={loading}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500,
                        background: 'none', border: '1px solid var(--border)',
                        cursor: loading ? 'wait' : 'pointer', color: 'var(--text2)',
                        opacity: loading ? 0.5 : 1,
                    }}
                >
                    {user.role === 'admin' ? <ShieldOff size={14} /> : <Shield size={14} />}
                    {loading ? '...' : user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                </button>
            </td>
        </tr>
    );
}

export default function UsersClient({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);

    const handleRoleChange = (userId, newRole) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <Users size={24} style={{ color: 'var(--accent)' }} />
                <h1 style={{ fontSize: 24 }}>Manage Users</h1>
            </div>
            <p style={{ color: 'var(--text2)', marginBottom: 32 }}>
                {users.length} registered user{users.length !== 1 ? 's' : ''}.
            </p>

            <div style={{ background: 'var(--card)', borderRadius: 'var(--r)', border: '1px solid var(--border)', overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border)' }}>
                            <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>User</th>
                            <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Role</th>
                            <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Joined</th>
                            <th style={{ textAlign: 'left', padding: '14px 16px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserRow key={user.id} user={user} onRoleChange={handleRoleChange} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
