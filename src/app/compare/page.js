'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ComparePage() {
    const [allInstitutions, setAllInstitutions] = useState([]);
    const [slots, setSlots] = useState([]);
    const [openSlot, setOpenSlot] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/institutions')
            .then(r => r.json())
            .then(d => { setAllInstitutions(d.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const removeSlot = (idx) => {
        const n = [...slots]; n.splice(idx, 1); setSlots(n);
    };
    const addToSlot = (inst) => {
        if (slots.find(s => s.id === inst.id)) return;
        const n = [...slots, inst].slice(0, 3); setSlots(n); setOpenSlot(null); setSearch('');
    };

    const rows = [
        { label: 'Type', key: inst => inst.type === 'university' ? 'University' : inst.type === 'uot' ? 'UoT' : inst.type === 'tvet' ? 'TVET College' : 'Private College' },
        { label: 'Province', key: inst => inst.province },
        { label: 'City', key: inst => inst.city },
        { label: 'Annual Tuition', key: inst => `R${inst.tuition.toLocaleString()}`, compare: 'min' },
        { label: 'Students', key: inst => inst.students?.toLocaleString() || '—' },
        { label: 'Courses Offered', key: inst => inst.courses.join(', ') },
        { label: 'National Rank', key: inst => inst.rank ? `#${inst.rank}` : '—', compare: 'min' },
        { label: 'Acceptance Rate', key: inst => inst.acceptance ? `${inst.acceptance}%` : '—', compare: 'min' },
        { label: 'Founded', key: inst => inst.founded || '—' },
    ];

    const getBest = (row) => {
        if (!row.compare || slots.length < 2) return null;
        const vals = slots.map(s => {
            const v = parseFloat(String(row.key(s)).replace(/[^0-9.]/g, ''));
            return isNaN(v) ? null : v;
        });
        const validVals = vals.filter(v => v !== null);
        if (!validVals.length) return null;
        const best = row.compare === 'min' ? Math.min(...validVals) : Math.max(...validVals);
        return vals.map(v => v === best);
    };

    const filteredAll = allInstitutions.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) && !slots.find(s => s.id === i.id)
    );

    if (loading) {
        return <div className="page"><div className="loading"><div className="loading-spinner" /><div style={{ color: 'var(--text2)' }}>Loading...</div></div></div>;
    }

    return (
        <div className="page">
            <div className="page-header">
                <div className="section-label">Side-by-Side</div>
                <h1>Compare Institutions</h1>
                <p>Select up to 3 institutions to compare side-by-side</p>
            </div>
            <div className="compare-wrap">
                <div className="compare-selector">
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`compare-slot${slots[i] ? ' filled' : ''}`} onClick={() => !slots[i] && setOpenSlot(i)}>
                            {slots[i] ? (
                                <>
                                    <button className="compare-remove" onClick={e => { e.stopPropagation(); removeSlot(i); }}>✕</button>
                                    <div style={{ fontSize: 32, marginBottom: 8 }}>{slots[i].logo}</div>
                                    <div className="compare-slot-name">{slots[i].abbr}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{slots[i].city}</div>
                                </>
                            ) : (
                                <>
                                    <div style={{ fontSize: 28, marginBottom: 8 }}>+</div>
                                    <div>Add Institution {i + 1}</div>
                                    {openSlot === i && (
                                        <div style={{
                                            position: 'absolute', top: '100%', left: 0, right: 0,
                                            background: 'var(--card2)', border: '1px solid var(--border2)',
                                            borderRadius: 10, zIndex: 50, padding: 12, marginTop: 6
                                        }} onClick={e => e.stopPropagation()}>
                                            <input autoFocus className="filter-search" style={{ width: '100%', marginBottom: 8 }}
                                                placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                                            <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                                                {filteredAll.slice(0, 12).map(inst => (
                                                    <div key={inst.id} className="dropdown-item" style={{ borderRadius: 6 }} onClick={() => addToSlot(inst)}>
                                                        {inst.logo} {inst.name}
                                                    </div>
                                                ))}
                                                {filteredAll.length === 0 && <div style={{ color: 'var(--text3)', fontSize: 13, padding: '8px 0' }}>No results</div>}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {slots.length === 0 ? (
                    <div className="empty">
                        <div className="empty-icon">⚖️</div>
                        <h3>No institutions selected</h3>
                        <p style={{ maxWidth: 360, margin: '8px auto 20px', color: 'var(--text3)', lineHeight: 1.6 }}>
                            Click the <strong style={{ color: 'var(--text)' }}>+ Add Institution</strong> buttons above to choose up to 3 institutions, or go to the Institutions page to browse and start comparing.
                        </p>
                        <Link href="/institutions" className="btn btn-primary">Browse Institutions →</Link>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="compare-table">
                            <thead>
                                <tr>
                                    <th style={{ width: 160 }}></th>
                                    {slots.map(s => (
                                        <th key={s.id}>
                                            <div className="compare-header-cell">{s.logo} {s.name}</div>
                                            <div style={{ fontWeight: 400, fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{s.type}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(row => {
                                    const best = getBest(row);
                                    return (
                                        <tr key={row.label}>
                                            <td className="row-label">{row.label}</td>
                                            {slots.map((s, i) => (
                                                <td key={s.id} className={best && best[i] ? 'compare-best' : ''}>
                                                    {row.key(s)}
                                                    {best && best[i] && <span style={{ marginLeft: 6, fontSize: 11 }}>✓ Best</span>}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
