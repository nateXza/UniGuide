import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer-grid">
                <div className="footer-brand">
                    <Link href="/" className="nav-logo" aria-label="UniGuide home"><span>Uni</span>Guide</Link>
                    <p>South Africa&apos;s free student platform helping matriculants and students find universities, bursaries, career paths, and academic tools.</p>
                    <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                        <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: 'rgba(48,217,128,0.1)', color: 'var(--green)', border: '1px solid rgba(48,217,128,0.2)', fontWeight: 600 }}>🇿🇦 Made in South Africa</span>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Explore</h4>
                    <Link href="/institutions">Institutions</Link>
                    <Link href="/assessment">Career Assessment</Link>
                    <Link href="/financial-aid">Bursaries & Aid</Link>
                    <Link href="/compare">Compare</Link>
                </div>
                <div className="footer-col">
                    <h4>Tools</h4>
                    <Link href="/cv-builder">CV Builder</Link>
                    <Link href="/tools">Academic Tools</Link>
                    <Link href="/freebies">Free Resources</Link>
                    <Link href="/nsfas-guide">NSFAS Guide</Link>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <Link href="/about">About UniGuide</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                    <a href="mailto:hello@uniguide.co.za">Contact Us</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} UniGuide. All rights reserved. Not affiliated with any government body.</p>
                <div className="social-links">
                    <a href="https://twitter.com/uniguide_za" target="_blank" rel="noopener noreferrer" aria-label="Twitter">𝕏</a>
                    <a href="https://instagram.com/uniguide_za" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
                    <a href="https://tiktok.com/@uniguide_za" target="_blank" rel="noopener noreferrer" aria-label="TikTok">🎵</a>
                </div>
            </div>
        </footer>
    );
}
