'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const errorParam = searchParams.get('error');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(
        errorParam === 'UnauthorizedAccess'
            ? 'You must be an admin to access that page.'
            : ''
    );
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error === 'CredentialsSignin'
                    ? 'Invalid email or password.'
                    : result.error
                );
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
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
                background: 'linear-gradient(135deg, var(--accent), #a855f7)',
                borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#fff',
            }}>
                <LogIn size={28} />
            </div>

            <h1 style={{ fontSize: 24, marginBottom: 8, fontFamily: 'var(--font-display)', textAlign: 'center' }}>
                Welcome Back
            </h1>
            <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 28, textAlign: 'center' }}>
                Sign in to your UniGuide account.
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
                    <label className="form-label" htmlFor="login-email">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
                        <input
                            id="login-email"
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="student@example.com"
                            style={{ paddingLeft: 40 }}
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="login-password">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
                        <input
                            id="login-password"
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ paddingLeft: 40 }}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <div style={{ textAlign: 'center', marginTop: 20, fontSize: 13 }}>
                    <span style={{ color: 'var(--text3)' }}>Don&apos;t have an account?</span>{' '}
                    <Link href="/register" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                        Create Account
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Suspense fallback={
                <div style={{
                    background: 'var(--card)', padding: '48px', borderRadius: 'var(--r)',
                    border: '1px solid var(--border)', maxWidth: 440, width: '100%',
                    textAlign: 'center', color: 'var(--text2)',
                }}>
                    Loading...
                </div>
            }>
                <LoginForm />
            </Suspense>
        </div>
    );
}
