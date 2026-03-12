'use client';

import { useState, useEffect } from 'react';
import { FREEBIE_CATEGORIES } from '@/lib/constants';

export default function FreebiesPage() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cat, setCat] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('/api/resources')
            .then(r => r.json())
            .then(d => { setResources(d.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filtered = resources.filter(f => {
        if (cat !== 'All' && f.category !== cat) return false;
        if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
        return true;
    });

    if (loading) {
        return <div className="page"><div className="loading"><div className="loading-spinner" /><div style={{ color: 'var(--text2)' }}>Loading resources...</div></div></div>;
    }

    return (
        <div className="page">
            <div className="page-header">
                <div className="section-label">Student Hub</div>
                <h1>Free Resources for Students</h1>
                <p>Unlock hundreds of rands worth of premium tools using your institutional (.ac.za) student email address</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.08), rgba(123,95,255,0.08))', border: '1px solid rgba(79,142,247,0.2)', borderRadius: 0, padding: '20px 48px', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 28 }}>💡</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Your .ac.za email is your most valuable student asset</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)' }}>Every registered student at a public SA university or TVET college has an institutional email. Use it to claim these perks — most expire when you graduate, so start now.</div>
                </div>
            </div>

            <div className="filter-bar">
                {FREEBIE_CATEGORIES.map(c => (
                    <button key={c} className={`filter-btn${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
                ))}
                <input className="filter-search" placeholder="🔍  Search tools or tags..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div style={{ padding: '32px 48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {filtered.map(f => (
                        <div key={f.id} className="inst-card" style={{ cursor: 'default' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <span style={{ fontSize: 32 }}>{f.emoji}</span>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{f.name}</div>
                                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: 'rgba(79,142,247,0.1)', color: 'var(--accent)', fontWeight: 600 }}>{f.category}</span>
                                    </div>
                                </div>
                                {f.verified && <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700, background: 'rgba(48,217,128,0.1)', padding: '3px 8px', borderRadius: 100, border: '1px solid rgba(48,217,128,0.2)', flexShrink: 0 }}>✓ Verified</span>}
                            </div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--green)', marginBottom: 12 }}>{f.value}</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 14 }}>{f.how}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                                {f.tags.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                            <a href={f.link} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 16px', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.25)', borderRadius: 8, color: 'var(--accent)', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}>
                                🔗 Claim This Freebie →
                            </a>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 56, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 32 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 8 }}>🇿🇦 SA-Specific Resources You Should Know About</h3>
                    <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>These are specific to South African students and often overlooked.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                        {[
                            { icon: '🏛️', title: 'NSFAS ePortal', desc: 'Apply for or manage your NSFAS bursary at nsfas.org.za. Many students miss out simply because they don\'t apply in time.', link: 'https://www.nsfas.org.za' },
                            { icon: '📚', title: 'SACE OpenLearn SA', desc: 'The South African government\'s open educational resource portal. Free textbooks and learning content.', link: 'https://www.nwu.ac.za' },
                            { icon: '🖥️', title: 'Telkom e-learning Hub', desc: 'Telkom offers affordable or free data bundles for students accessing .ac.za and government learning portals.', link: 'https://www.telkom.co.za' },
                            { icon: '📖', title: 'SABINET & JSTOR via Libraries', desc: 'Your institutional library gives you free access to SABINET (SA journals) and JSTOR.', link: 'https://www.sabinet.co.za' },
                        ].map(r => (
                            <a key={r.title} href={r.link} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, textDecoration: 'none', color: 'inherit', display: 'block', transition: 'border-color 0.2s' }}>
                                <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
                                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{r.title}</div>
                                <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{r.desc}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
