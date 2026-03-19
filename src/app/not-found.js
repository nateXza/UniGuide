import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div>
                <h1 style={{ fontSize: 120, color: 'var(--accent)', marginBottom: 0, fontFamily: 'var(--font-display)', lineHeight: 1 }}>404</h1>
                <h2 style={{ fontSize: 24, marginBottom: 16 }}>Page Not Found</h2>
                <p style={{ color: 'var(--text2)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
                    The page you are looking for doesn't exist or has been moved. Let's get you back on track.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <Link href="/" className="btn btn-primary">Go Home</Link>
                    <Link href="/institutions" className="btn btn-ghost">Browse Institutions</Link>
                </div>
            </div>
        </div>
    );
}
