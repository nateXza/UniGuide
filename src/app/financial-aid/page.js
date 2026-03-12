'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FinancialAidPage() {
    const [bursaries, setBursaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [income, setIncome] = useState('');
    const [field, setField] = useState('');
    const [type, setType] = useState('');
    const [level, setLevel] = useState('');

    useEffect(() => {
        fetch('/api/bursaries')
            .then(r => r.json())
            .then(d => { setBursaries(d.data || []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const allFields = [...new Set(bursaries.flatMap(b => b.fields))].filter(f => f !== 'All fields').sort();
    const typeCounts = {};
    bursaries.forEach(b => { typeCounts[b.type] = (typeCounts[b.type] || 0) + 1; });

    const matches = (b) => {
        let match = true;
        if (field && !b.fields.includes('All fields') && !b.fields.some(f => f.toLowerCase().includes(field.toLowerCase()))) match = false;
        if (type && b.type !== type) match = false;
        if (level && b.level && b.level !== level) match = false;
        if (income) {
            const inc = parseFloat(income);
            if (b.name === 'NSFAS' && inc > 350000) match = false;
        }
        return match;
    };

    const matched = bursaries.filter(matches);
    const others = bursaries.filter(b => !matches(b));
    const hasFilters = income || field || type || level;

    if (loading) return <div className="page"><div className="loading"><div className="loading-spinner" /><div style={{ color: 'var(--text2)' }}>Loading bursaries...</div></div></div>;

    return (
        <div className="page">
            <div className="page-header">
                <div className="section-label">Financial Aid</div>
                <h1>Bursaries & Financial Aid</h1>
                <p>{bursaries.length} bursary opportunities from government, SETAs, corporations, and NGOs</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(48,217,128,0.06), rgba(79,142,247,0.06))', borderBottom: '1px solid var(--border)', padding: '24px 48px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🔍 Find bursaries that match you</div>
                <div className="aid-filters">
                    <div className="form-group">
                        <label className="form-label" htmlFor="income">Household Income (R/year)</label>
                        <input id="income" className="form-input" type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 200000" aria-label="Annual household income" />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="field">Field of Study</label>
                        <select id="field" className="form-select" value={field} onChange={e => setField(e.target.value)} aria-label="Field of study">
                            <option value="">All Fields</option>
                            {allFields.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="type">Bursary Type</label>
                        <select id="type" className="form-select" value={type} onChange={e => setType(e.target.value)} aria-label="Bursary type">
                            <option value="">All Types</option>
                            <option value="government">Government ({typeCounts.government || 0})</option>
                            <option value="seta">SETA ({typeCounts.seta || 0})</option>
                            <option value="corporate">Corporate ({typeCounts.corporate || 0})</option>
                            <option value="ngo">NGO / Trust ({typeCounts.ngo || 0})</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="level">Study Level</label>
                        <select id="level" className="form-select" value={level} onChange={e => setLevel(e.target.value)} aria-label="Study level">
                            <option value="">All Levels</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="aid-wrap">
                {/* NSFAS Banner */}
                <Link href="/nsfas-guide" style={{ display: 'block', textDecoration: 'none', color: 'inherit', marginBottom: 28 }}>
                    <div style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.12), rgba(123,95,255,0.12))', border: '1px solid rgba(79,142,247,0.3)', borderRadius: 'var(--r)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer', transition: 'border-color 0.2s' }}>
                        <span style={{ fontSize: 36 }}>🏛️</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, marginBottom: 4 }}>NSFAS Application Guide</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)' }}>Step-by-step guide to applying for NSFAS — eligibility, documents, tracking, and managing your allowances.</div>
                        </div>
                        <div className="btn btn-primary btn-sm">Read Guide →</div>
                    </div>
                </Link>

                {hasFilters && (
                    <div style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 20 }}>
                        Showing <strong style={{ color: 'var(--green)' }}>{matched.length}</strong> matching bursaries
                    </div>
                )}

                <div className="aid-cards">
                    {(hasFilters ? matched : bursaries).map(b => (
                        <BursaryCard key={b.id} b={b} isMatch={hasFilters} />
                    ))}
                </div>

                {hasFilters && others.length > 0 && (
                    <>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: '40px 0 16px', color: 'var(--text3)' }}>Other Available Bursaries</h3>
                        <div className="aid-cards">
                            {others.map(b => <BursaryCard key={b.id} b={b} isMatch={false} />)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function BursaryCard({ b, isMatch }) {
    const typeColors = { government: '#4F8EF7', seta: '#30D980', corporate: '#F5C842', ngo: '#7B5FFF' };
    const typeLabels = { government: 'Government', seta: 'SETA', corporate: 'Corporate', ngo: 'NGO / Trust' };

    return (
        <div className={`aid-card${isMatch ? ' highlight' : ''}`} role="article" aria-label={b.name}>
            <div className="aid-header">
                <div className="aid-logo" style={{ background: `${typeColors[b.type] || 'var(--accent)'}22` }}>{b.logo}</div>
                <div style={{ flex: 1 }}>
                    <div className="aid-name">{b.name}</div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginTop: 4 }}>
                        <span className="aid-type" style={{ background: `${typeColors[b.type] || 'var(--accent)'}22`, color: typeColors[b.type] }}>{typeLabels[b.type] || b.type}</span>
                        {b.provider && <span style={{ fontSize: 11, color: 'var(--text3)' }}>by {b.provider}</span>}
                    </div>
                </div>
                {isMatch && <div className="match-badge">✓ Match</div>}
            </div>
            <div className="aid-amount">{b.amount}</div>
            <div className="aid-detail"><span style={{ flexShrink: 0 }}>📋</span> {b.criteria}</div>
            {b.level && <div className="aid-detail"><span>🎓</span> {b.level}</div>}
            {b.province && <div className="aid-detail"><span>📍</span> {b.province} residents only</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, margin: '10px 0' }}>
                {b.fields.slice(0, 4).map(f => <span key={f} className="tag" style={{ fontSize: 10 }}>{f}</span>)}
                {b.fields.length > 4 && <span className="tag" style={{ fontSize: 10, opacity: 0.6 }}>+{b.fields.length - 4}</span>}
            </div>
            <div className="aid-deadline">
                <span>⏰ Deadline: <span className={b.closingSoon ? 'deadline-closing' : 'deadline-val'}>{b.deadline}</span></span>
                {b.closingSoon && <span style={{ fontSize: 11, color: 'var(--red)', fontWeight: 700 }}>⚡ Closing Soon!</span>}
            </div>
            {b.website && (
                <a href={b.website} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', marginTop: 12, textAlign: 'center', padding: '8px 16px', background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: 8, color: 'var(--accent)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                    Visit & Apply →
                </a>
            )}
        </div>
    );
}
