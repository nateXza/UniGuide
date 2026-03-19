'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Bot, RefreshCw, Home, AlertCircle } from 'lucide-react';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to Sentry or console
        console.error('Global Error caught:', error);
    }, [error]);

    return (
        <div className="page" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: 'var(--card)', padding: '64px 48px', borderRadius: 'var(--r)', border: '1px solid var(--border)', maxWidth: 500, width: '100%', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                <div style={{ width: 80, height: 80, background: 'rgba(255,90,90,0.1)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--red)' }}>
                    <AlertCircle size={40} />
                </div>
                
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 12, color: 'var(--text)' }}>
                    System Error
                </h1>
                
                <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                    We&apos;re sorry, something went wrong on our end. Our engineering team has been notified via Sentry.
                </p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => reset()} 
                        className="btn btn-primary"
                        style={{ minWidth: 140 }}
                    >
                        <RefreshCw size={18} style={{ marginRight: 8 }} />
                        Try Again
                    </button>
                    <Link 
                        href="/" 
                        className="btn btn-ghost"
                        style={{ minWidth: 140 }}
                    >
                        <Home size={18} style={{ marginRight: 8 }} />
                        Go Home
                    </Link>
                </div>

                <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text3)', fontSize: 13 }}>
                    <Bot size={16} />
                    <span>UniGuide Automated Error Reporting is Active</span>
                </div>
            </div>
        </div>
    );
}
