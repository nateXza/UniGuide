'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!agreed) {
            setError('You must agree to the Privacy Policy and Terms of Service to register.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Failed to register account.');
                return;
            }

            // Auto-sign in after successful registration
            const signInResult = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (signInResult?.error) {
                // Registration succeeded but auto-login failed — redirect to login
                router.push('/login');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                background: 'var(--card)',
                padding: '48px',
                borderRadius: 'var(--r)',
                border: '1px solid var(--border)',
                maxWidth: 440,
                width: '100%',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            }}>
                <div style={{
                    width: 56, height: 56,
                    background: 'linear-gradient(135deg, #30d980, var(--accent))',
                    borderRadius: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: '#fff',
                }}>
                    <UserPlus size={28} />
                </div>

                <h1 style={{ fontSize: 24, marginBottom: 8, fontFamily: 'var(--font-display)', textAlign: 'center' }}>
                    Create an Account
                </h1>
                <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 28, textAlign: 'center' }}>
                    Join UniGuide to save your CVs and career paths.
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(255,90,90,0.1)',
                        color: 'var(--red)',
                        padding: '12px 16px',
                        borderRadius: 8,
                        fontSize: 13,
                        marginBottom: 20,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                    }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="register-name">Full Name</label>
                        <input id="register-name" type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" required autoComplete="name" />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="register-email">Email Address</label>
                        <input id="register-email" type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@example.com" required autoComplete="email" />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="register-password">Password</label>
                        <input id="register-password" type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="new-password" />
                        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>Minimum 8 characters</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24, marginTop: 12 }}>
                        <input
                            type="checkbox"
                            id="popia-consent"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--accent)' }}
                        />
                        <label htmlFor="popia-consent" style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text2)' }}>
                            I agree to the <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }} target="_blank">Privacy Policy</Link> and <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'underline' }} target="_blank">Terms of Service</Link>.
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13 }}>
                        <span style={{ color: 'var(--text3)' }}>Already have an account?</span>{' '}
                        <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
