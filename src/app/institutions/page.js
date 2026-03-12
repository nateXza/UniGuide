'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { TYPE_META } from '@/lib/constants';

export default function InstitutionsPage() {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [province, setProvince] = useState('');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('rank');
    const [selected, setSelected] = useState(null);
    const [compareList, setCompareList] = useState([]);
    const [collapsed, setCollapsed] = useState({});

    useEffect(() => {
        fetch('/api/institutions')
            .then(r => r.json())
            .then(d => { setInstitutions(d.data || []); setLoading(false); })
            .catch(() => setLoading(false));
        // Load compare list from localStorage
        try { const saved = localStorage.getItem('compareList'); if (saved) setCompareList(JSON.parse(saved)); } catch { }
    }, []);

    // Persist compare list
    useEffect(() => { try { localStorage.setItem('compareList', JSON.stringify(compareList)); } catch { } }, [compareList]);

    const toggleCompare = useCallback((inst, e) => {
        e?.stopPropagation();
        setCompareList(prev => {
            if (prev.find(c => c.id === inst.id)) return prev.filter(c => c.id !== inst.id);
            if (prev.length >= 3) return prev;
            return [...prev, { id: inst.id, name: inst.name, abbr: inst.abbr, logo: inst.logo }];
        });
    }, []);

    const filtered = institutions.filter(i => {
        if (filter !== 'all' && i.type !== filter) return false;
        if (province && i.province !== province) return false;
        if (search) { const s = search.toLowerCase(); return i.name.toLowerCase().includes(s) || i.city.toLowerCase().includes(s) || (i.abbr && i.abbr.toLowerCase().includes(s)); }
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'rank') return (a.rank || 999) - (b.rank || 999);
        if (sortBy === 'tuition-asc') return a.tuition - b.tuition;
        if (sortBy === 'tuition-desc') return b.tuition - a.tuition;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'students') return (b.students || 0) - (a.students || 0);
        return 0;
    });

    // Enforce order: universities first
    const typeOrder = ['university', 'uot', 'tvet', 'private'];
    const grouped = {};
    typeOrder.forEach(t => { grouped[t] = []; });
    sorted.forEach(i => { if (!grouped[i.type]) grouped[i.type] = []; grouped[i.type].push(i); });

    const provinces = [...new Set(institutions.map(i => i.province))].sort();
    const types = ['all', 'university', 'uot', 'tvet', 'private'];
    const typeLabels = { all: 'All', university: 'Universities', uot: 'UoT', tvet: 'TVET', private: 'Private' };

    const counts = { university: 0, uot: 0, tvet: 0, private: 0 };
    institutions.forEach(i => counts[i.type]++);

    if (loading) return (
        <div className="page">
            <div className="page-header"><div className="section-label">Institutions</div><h1>South African Institutions</h1></div>
            <div className="inst-grid">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="inst-card" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                            <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <div className="skeleton skeleton-text" />
                                <div className="skeleton skeleton-text-sm" />
                            </div>
                        </div>
                        <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 6, marginBottom: 8 }} />
                        <div className="skeleton" style={{ height: 14, width: '60%', borderRadius: 6, marginBottom: 16 }} />
                        <div style={{ display: 'flex', gap: 6 }}>
                            {[1, 2, 3].map(j => <div key={j} className="skeleton" style={{ height: 22, width: 60, borderRadius: 100 }} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": sorted.map((inst, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "EducationalOrganization",
                "name": inst.name,
                "url": inst.website || `https://uniguide.co.za/institutions/${inst.id}`
            }
        }))
    };

    return (
        <div className="page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="page-header">
                <div className="section-label" aria-hidden="true">Directory</div>
                <h1>Institutions</h1>
                <p>{counts.university} universities · {counts.uot} universities of technology · {counts.tvet} TVET colleges · {counts.private} private colleges</p>
            </div>

            <div className="filter-bar" role="toolbar" aria-label="Filter institutions">
                {types.map(t => (
                    <button key={t} className={`filter-btn${filter === t ? ' active' : ''}`} onClick={() => setFilter(t)} aria-pressed={filter === t}>
                        {typeLabels[t]}
                    </button>
                ))}
                <select className="sort-select" value={province} onChange={e => setProvince(e.target.value)} aria-label="Filter by province">
                    <option value="">All Provinces</option>
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort institutions">
                    <option value="rank">Sort: Ranking</option>
                    <option value="name">Sort: Name A-Z</option>
                    <option value="tuition-asc">Sort: Tuition (Low → High)</option>
                    <option value="tuition-desc">Sort: Tuition (High → Low)</option>
                    <option value="students">Sort: Student Count</option>
                </select>
                <input className="filter-search" placeholder="🔍  Search name, city, abbreviation..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Search institutions" />
            </div>

            {filter === 'all' ? (
                typeOrder.map(type => {
                    const insts = grouped[type] || [];
                    if (insts.length === 0) return null;
                    const meta = TYPE_META[type] || {};
                    return (
                        <div key={type}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 48px 4px', cursor: 'pointer' }}
                                onClick={() => setCollapsed(c => ({ ...c, [type]: !c[type] }))}
                                role="button" aria-expanded={!collapsed[type]} aria-controls={`section-${type}`}>
                                <span style={{ fontSize: 20 }}>{meta.icon}</span>
                                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800 }}>{meta.label}</h2>
                                <span style={{ fontSize: 13, color: 'var(--text3)' }}>{insts.length} institutions</span>
                                <span style={{ marginLeft: 'auto', color: 'var(--text3)', fontSize: 14, transition: 'transform 0.2s', transform: collapsed[type] ? 'rotate(-90deg)' : 'none' }}>▼</span>
                            </div>
                            {!collapsed[type] && (
                                <div className="inst-grid" id={`section-${type}`}>
                                    {insts.map(inst => <InstitutionCard key={inst.id} inst={inst} onSelect={setSelected} compareList={compareList} onToggleCompare={toggleCompare} />)}
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="inst-grid">
                    {sorted.map(inst => <InstitutionCard key={inst.id} inst={inst} onSelect={setSelected} compareList={compareList} onToggleCompare={toggleCompare} />)}
                </div>
            )}

            {sorted.length === 0 && <div className="empty"><div className="empty-icon">🔍</div><h3>No institutions found</h3><p>Try adjusting your search or filters</p></div>}

            {/* Compare floating bar */}
            <div className={`compare-bar${compareList.length > 0 ? ' visible' : ''}`} role="status" aria-live="polite">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1 }}>
                    <span style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>Compare ({compareList.length}/3):</span>
                    {compareList.map(c => (
                        <span key={c.id} style={{ padding: '4px 12px', background: 'rgba(79,142,247,0.12)', borderRadius: 100, fontSize: 13, color: 'var(--accent)', fontWeight: 600, display: 'flex', gap: 6, alignItems: 'center' }}>
                            {c.abbr || c.name}
                            <button onClick={() => setCompareList(l => l.filter(x => x.id !== c.id))} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 11, padding: 0 }} aria-label={`Remove ${c.name} from compare`}>✕</button>
                        </span>
                    ))}
                </div>
                <a href="/compare" className="btn btn-primary btn-sm">Compare Now →</a>
            </div>

            {/* Detail Modal */}
            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label={`${selected.name} details`}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                            {selected.logoUrl ? (
                                <Image src={selected.logoUrl} alt={`${selected.name} logo`} width={52} height={52} unoptimized style={{ borderRadius: 12, objectFit: 'contain', background: 'white', padding: 4 }} />
                            ) : (
                                <div className="inst-logo" style={{ background: selected.color || 'var(--accent)', width: 52, height: 52, fontSize: 20 }}>
                                    {selected.abbr ? selected.abbr.slice(0, 2) : selected.logo}
                                </div>
                            )}
                            <div>
                                <h2>{selected.name}</h2>
                                <div className="modal-sub">{selected.city}, {selected.province} · Est. {selected.founded || 'N/A'}</div>
                                <span className="pill pill-blue">{TYPE_META[selected.type]?.label || selected.type}</span>
                            </div>
                        </div>

                        <div className="modal-stats">
                            <div className="modal-stat"><div className="modal-stat-val">R{selected.tuition?.toLocaleString()}</div><div className="modal-stat-label">Tuition / year</div></div>
                            <div className="modal-stat"><div className="modal-stat-val">{selected.students?.toLocaleString() || '—'}</div><div className="modal-stat-label">Students</div></div>
                            <div className="modal-stat"><div className="modal-stat-val">{selected.acceptance ? `${selected.acceptance}%` : '—'}</div><div className="modal-stat-label">Acceptance Rate</div></div>
                        </div>

                        {selected.rank && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                                <span style={{ color: 'var(--gold)', fontSize: 16 }}>★</span>
                                <span style={{ fontWeight: 700, fontSize: 14 }}>National Rank: #{selected.rank}</span>
                            </div>
                        )}

                        {selected.description && (
                            <div className="modal-section">
                                <h4>About</h4>
                                <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.7 }}>{selected.description}</p>
                            </div>
                        )}

                        {selected.aps && (
                            <div className="modal-section">
                                <h4>Minimum APS Score</h4>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{selected.aps}</span>
                                    <span style={{ fontSize: 13, color: 'var(--text2)' }}>points (varies by programme)</span>
                                </div>
                            </div>
                        )}

                        {selected.admissionDates && (
                            <div className="modal-section">
                                <h4>Key Dates</h4>
                                <p style={{ color: 'var(--text2)', fontSize: 14 }}>{selected.admissionDates}</p>
                            </div>
                        )}

                        <div className="modal-section">
                            <h4>Courses / Faculties</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {(selected.courses || []).map(c => <span key={c} className="tag">{c}</span>)}
                            </div>
                        </div>

                        <div className="modal-cta">
                            {selected.website && (
                                <a href={selected.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Visit Website →
                                </a>
                            )}
                            {selected.applyUrl && (
                                <a href={selected.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ color: 'var(--green)' }}>
                                    Apply Now
                                </a>
                            )}
                            <button className="btn btn-ghost" onClick={(e) => { toggleCompare(selected, e); setSelected(null); }}>
                                {compareList.find(c => c.id === selected.id) ? '✓ In Compare' : '⚖️ Add to Compare'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function InstitutionCard({ inst, onSelect, compareList, onToggleCompare }) {
    const inCompare = compareList.some(c => c.id === inst.id);
    const courses = inst.courses || [];
    const abbr = inst.abbr || inst.name.slice(0, 3);

    return (
        <div className="inst-card" onClick={() => onSelect(inst)} role="article" aria-label={inst.name} tabIndex={0} onKeyDown={e => e.key === 'Enter' && onSelect(inst)}>
            <button
                className={`compare-toggle${inCompare ? ' selected' : ''}`}
                onClick={e => onToggleCompare(inst, e)}
                aria-label={inCompare ? `Remove ${inst.name} from compare` : `Add ${inst.name} to compare`}
                aria-pressed={inCompare}
                title={inCompare ? 'Remove from compare' : 'Add to compare'}
            >
                {inCompare ? '✓' : '⚖'}
            </button>
            <div className="inst-top">
                {inst.logoUrl ? (
                    <Image src={inst.logoUrl} alt={`${inst.name} logo`} width={64} height={64} unoptimized className="inst-logo-img" onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                ) : null}
                <div className="inst-logo" style={{ background: inst.color || 'var(--accent)', display: inst.logoUrl ? 'none' : 'flex' }}>
                    {abbr.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    {inst.rank && <div className="inst-rank" style={{ marginBottom: 2 }}>★ #{inst.rank}</div>}
                    <div className="inst-name">{inst.name}</div>
                    <div className="inst-meta">{inst.city} · {inst.province}</div>
                </div>
            </div>
            <div className="inst-tags">
                {courses.slice(0, 3).map(c => <span key={c} className="tag">{c}</span>)}
                {courses.length > 3 && <span className="tag" style={{ opacity: 0.6 }}>+{courses.length - 3}</span>}
            </div>
            <div className="inst-footer">
                <div className="inst-tuition">R{inst.tuition?.toLocaleString()}<span>per year</span></div>
                {inst.website && (
                    <a href={inst.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                        style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
                        Visit Site →
                    </a>
                )}
            </div>
        </div>
    );
}
