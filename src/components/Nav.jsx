'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
    const pathname = usePathname();
    const [toolsOpen, setToolsOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile nav on route change
    useEffect(() => { setMobileOpen(false); }, [pathname]);
    // Prevent body scroll when mobile nav open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/institutions', label: 'Institutions' },
        { href: '/assessment', label: 'Career Assessment' },
        { href: '/financial-aid', label: 'Financial Aid' },
        { href: '/compare', label: 'Compare' },
        { href: '/cv-builder', label: 'CV Builder' },
        { href: '/tutoring', label: 'Tutoring' },
    ];

    const toolLinks = [
        { href: '/tools', label: '🛠️  Academic Tools' },
        { href: '/freebies', label: '🎁  Free Resources' },
        { href: '/nsfas-guide', label: '🏛️  NSFAS Guide' },
    ];

    const isToolPage = ['/tools', '/freebies', '/nsfas-guide'].includes(pathname);

    return (
        <>
            <nav className="nav" role="navigation" aria-label="Main navigation">
                <Link href="/" className="nav-logo" aria-label="UniGuide home">
                    <span>Uni</span>Guide
                </Link>
                <div className="nav-links">
                    {links.map(l => (
                        <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`} aria-current={pathname === l.href ? 'page' : undefined}>
                            {l.label}
                        </Link>
                    ))}
                    <div style={{ position: 'relative' }} onMouseLeave={() => setToolsOpen(false)}>
                        <button
                            className={`nav-link${isToolPage ? ' active' : ''}`}
                            onMouseEnter={() => setToolsOpen(true)}
                            onClick={() => setToolsOpen(o => !o)}
                            aria-expanded={toolsOpen}
                            aria-haspopup="true"
                        >
                            Student Hub ▾
                        </button>
                        {toolsOpen && (
                            <div style={{
                                position: 'absolute', top: '100%', left: 0,
                                background: 'var(--card2)', border: '1px solid var(--border2)',
                                borderRadius: 10, minWidth: 210, zIndex: 200, overflow: 'hidden',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
                            }} role="menu">
                                {toolLinks.map(t => (
                                    <Link key={t.href} href={t.href} className="dropdown-item"
                                        role="menuitem"
                                        style={{ display: 'block', width: '100%', textAlign: 'left', color: 'var(--text)', padding: '12px 16px', fontSize: 14 }}
                                        onClick={() => setToolsOpen(false)}>
                                        {t.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="nav-flag" aria-hidden="true">🇿🇦</div>
                <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen}>
                    ☰
                </button>
            </nav>

            {/* Mobile nav */}
            <div className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <div className={`mobile-nav-panel${mobileOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
                <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
                {links.map(l => (
                    <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''} aria-current={pathname === l.href ? 'page' : undefined}>
                        {l.label}
                    </Link>
                ))}
                <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0', paddingTop: 8 }}>
                    <div style={{ padding: '8px 16px', fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 2 }}>Student Hub</div>
                    {toolLinks.map(t => (
                        <Link key={t.href} href={t.href} className={pathname === t.href ? 'active' : ''}>
                            {t.label}
                        </Link>
                    ))}
                </div>
                <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0', paddingTop: 8 }}>
                    <Link href="/about">About UniGuide</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                </div>
                <div style={{ marginTop: 'auto', padding: '16px', fontSize: 22, textAlign: 'center' }}>🇿🇦</div>
            </div>
        </>
    );
}
