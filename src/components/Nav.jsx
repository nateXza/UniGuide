'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, Shield, ChevronDown } from 'lucide-react';

export default function Nav() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [toolsOpen, setToolsOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    // Close mobile nav on route change
    useEffect(() => { setMobileOpen(false); setUserMenuOpen(false); }, [pathname]);
    // Prevent body scroll when mobile nav open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);
    // Close user menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

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

                {/* Auth Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
                    {status === 'loading' ? (
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--border)', animation: 'pulse 1.5s infinite' }} />
                    ) : session ? (
                        <div ref={userMenuRef} style={{ position: 'relative' }}>
                            <button
                                onClick={() => setUserMenuOpen(o => !o)}
                                aria-expanded={userMenuOpen}
                                aria-haspopup="true"
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    background: 'var(--card2)', border: '1px solid var(--border)',
                                    borderRadius: 100, padding: '6px 14px 6px 8px',
                                    cursor: 'pointer', color: 'var(--text)', fontSize: 13, fontWeight: 500,
                                    transition: 'border-color 0.2s',
                                }}
                            >
                                <div style={{
                                    width: 28, height: 28, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--accent), #a855f7)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontSize: 12, fontWeight: 700,
                                }}>
                                    {(session.user.name || session.user.email || '?')[0].toUpperCase()}
                                </div>
                                <span className="nav-user-name" style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {session.user.name || session.user.email?.split('@')[0]}
                                </span>
                                <ChevronDown size={14} style={{ color: 'var(--text3)' }} />
                            </button>

                            {userMenuOpen && (
                                <div style={{
                                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                                    background: 'var(--card)', border: '1px solid var(--border)',
                                    borderRadius: 12, minWidth: 200, zIndex: 300, overflow: 'hidden',
                                    boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                                }} role="menu">
                                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text3)' }}>
                                        {session.user.email}
                                    </div>
                                    {session.user.role === 'admin' && (
                                        <Link
                                            href="/admin"
                                            role="menuitem"
                                            onClick={() => setUserMenuOpen(false)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 10,
                                                padding: '12px 16px', color: 'var(--accent)', fontSize: 14,
                                                fontWeight: 500,
                                            }}
                                        >
                                            <Shield size={16} /> Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        role="menuitem"
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            padding: '12px 16px', width: '100%', textAlign: 'left',
                                            background: 'none', border: 'none', cursor: 'pointer',
                                            color: 'var(--red)', fontSize: 14,
                                        }}
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'var(--accent)', color: '#fff',
                                borderRadius: 100, padding: '7px 18px',
                                fontSize: 13, fontWeight: 600,
                                textDecoration: 'none',
                                transition: 'opacity 0.2s',
                            }}
                        >
                            <User size={15} /> Log In
                        </Link>
                    )}
                    <div className="nav-flag" aria-hidden="true">🇿🇦</div>
                </div>

                <button className="nav-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen}>
                    ☰
                </button>
            </nav>

            {/* Mobile nav */}
            <div className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <div className={`mobile-nav-panel${mobileOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
                <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>

                {session && (
                    <div style={{ padding: '12px 16px', marginBottom: 8, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--accent), #a855f7)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontSize: 13, fontWeight: 700,
                        }}>
                            {(session.user.name || session.user.email || '?')[0].toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{session.user.name || 'User'}</div>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{session.user.email}</div>
                        </div>
                    </div>
                )}

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

                {/* Auth section in mobile */}
                <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0', paddingTop: 8 }}>
                    {session ? (
                        <>
                            {session.user.role === 'admin' && (
                                <Link href="/admin" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                                    🛡️ Admin Dashboard
                                </Link>
                            )}
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    padding: '12px 16px', color: 'var(--red)', fontSize: 14,
                                }}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={{ fontWeight: 600, color: 'var(--accent)' }}>Log In</Link>
                            <Link href="/register">Create Account</Link>
                        </>
                    )}
                </div>

                <div style={{ marginTop: 'auto', padding: '16px', fontSize: 22, textAlign: 'center' }}>🇿🇦</div>
            </div>
        </>
    );
}
