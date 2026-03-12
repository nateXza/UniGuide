'use client';

import { useState, useEffect } from 'react';
import { MATRIC_SUBJECTS } from '@/lib/constants';

export default function AcademicToolsPage() {
    const [activeTool, setActiveTool] = useState(null);
    const [gpa, setGpa] = useState([{ subject: '', mark: '', credits: '' }]);
    const [cite, setCite] = useState({ author: '', year: '', title: '', publisher: '', city: '', url: '', type: 'book', format: 'harvard' });
    const [pomodoro, setPomodoro] = useState({ running: false, seconds: 25 * 60, mode: 'work', sessions: 0 });
    const [wordCount, setWordCount] = useState('');
    const [gradeConv, setGradeConv] = useState('');
    const [apsSubjects, setApsSubjects] = useState([
        { name: 'Home Language', mark: '' },
        { name: 'First Additional Language', mark: '' },
        { name: 'Mathematics', mark: '' },
        { name: 'Life Orientation', mark: '' },
        { name: '', mark: '' },
        { name: '', mark: '' },
        { name: '', mark: '' },
    ]);

    // Load from localStorage
    useEffect(() => {
        try {
            const savedGpa = localStorage.getItem('gpa_data');
            const savedAps = localStorage.getItem('aps_data');
            if (savedGpa) setGpa(JSON.parse(savedGpa));
            if (savedAps) setApsSubjects(JSON.parse(savedAps));
        } catch { }
    }, []);

    // Save to localStorage
    useEffect(() => {
        try { localStorage.setItem('gpa_data', JSON.stringify(gpa)); } catch { }
    }, [gpa]);
    useEffect(() => {
        try { localStorage.setItem('aps_data', JSON.stringify(apsSubjects)); } catch { }
    }, [apsSubjects]);

    useEffect(() => {
        if (!pomodoro.running) return;
        const t = setInterval(() => {
            setPomodoro(p => {
                if (p.seconds <= 1) {
                    const isWork = p.mode === 'work';
                    return { ...p, seconds: isWork ? 5 * 60 : 25 * 60, mode: isWork ? 'break' : 'work', sessions: isWork ? p.sessions + 1 : p.sessions, running: false };
                }
                return { ...p, seconds: p.seconds - 1 };
            });
        }, 1000);
        return () => clearInterval(t);
    }, [pomodoro.running]);

    const addSubject = () => setGpa(g => [...g, { subject: '', mark: '', credits: '' }]);
    const updateSubject = (i, f, v) => { const n = [...gpa]; n[i][f] = v; setGpa(n); };
    const removeSubject = (i) => setGpa(g => g.filter((_, j) => j !== i));

    const calcWA = () => {
        const valid = gpa.filter(g => g.mark && g.credits);
        if (!valid.length) return null;
        const total = valid.reduce((s, g) => s + parseFloat(g.mark) * parseFloat(g.credits), 0);
        const credits = valid.reduce((s, g) => s + parseFloat(g.credits), 0);
        return (total / credits).toFixed(2);
    };

    const saGrade = (pct) => {
        const n = parseFloat(pct);
        if (isNaN(n)) return '';
        if (n >= 80) return 'Distinction (Level 8)';
        if (n >= 70) return 'Merit (Level 7)';
        if (n >= 60) return 'Pass with Credit (Level 6)';
        if (n >= 50) return 'Pass (Level 5)';
        if (n >= 40) return 'Sub-minimum (Level 4)';
        if (n >= 30) return 'Conditional Pass (Level 3)';
        return 'Fail';
    };

    const markToAPS = (mark) => {
        const n = parseInt(mark);
        if (isNaN(n)) return 0;
        if (n >= 90) return 8;
        if (n >= 80) return 7;
        if (n >= 70) return 6;
        if (n >= 60) return 5;
        if (n >= 50) return 4;
        if (n >= 40) return 3;
        if (n >= 30) return 2;
        return 1;
    };

    const calcAPS = () => {
        let total = 0;
        apsSubjects.forEach((s, i) => {
            if (!s.mark) return;
            if (s.name === 'Life Orientation') {
                // LO is counted but capped at a lower value by some institutions
                total += markToAPS(s.mark);
            } else {
                total += markToAPS(s.mark);
            }
        });
        return total;
    };

    const genCitation = () => {
        const c = cite;
        if (!c.author || !c.year || !c.title) return 'Please fill in Author, Year, and Title.';
        if (c.format === 'harvard') {
            if (c.type === 'book') return `${c.author} ${c.year}. ${c.title}. ${c.city ? c.city + ': ' : ''}${c.publisher || '[Publisher]'}.`;
            if (c.type === 'journal') return `${c.author} ${c.year}. ${c.title}. [Journal Name], [Volume](Issue), pp. [Pages].`;
            if (c.type === 'website') return `${c.author} ${c.year}. ${c.title}. [Online] Available at: ${c.url || '[URL]'} [Accessed: [Date]].`;
        } else {
            // APA 7th
            if (c.type === 'book') return `${c.author} (${c.year}). *${c.title}*. ${c.publisher || '[Publisher]'}.`;
            if (c.type === 'journal') return `${c.author} (${c.year}). ${c.title}. *[Journal Name]*, *[Volume]*(Issue), [Pages]. https://doi.org/[DOI]`;
            if (c.type === 'website') return `${c.author} (${c.year}). *${c.title}*. [Website Name]. ${c.url || '[URL]'}`;
        }
        return '';
    };

    const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    const wc = wordCount.trim() ? wordCount.trim().split(/\s+/).length : 0;
    const charCount = wordCount.length;
    const charNoSpaces = wordCount.replace(/\s/g, '').length;
    const sentences = wordCount.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = wordCount.split(/\n\n+/).filter(s => s.trim()).length;
    const speakTime = Math.max(1, Math.round(wc / 150));
    const wa = calcWA();
    const apsTotal = calcAPS();

    const tools = [
        { id: 'aps', icon: '🎓', label: 'APS Calculator', desc: 'Calculate your Admission Point Score from your matric marks.' },
        { id: 'gpa', icon: '📊', label: 'GPA / Weighted Average', desc: 'Calculate your semester or year-end weighted average across all subjects.' },
        { id: 'cite', icon: '📖', label: 'Citation Generator', desc: 'Generate Harvard or APA 7th formatted references for your assignments.' },
        { id: 'pomodoro', icon: '⏱️', label: 'Pomodoro Study Timer', desc: 'Stay focused with 25-minute study blocks and 5-minute breaks.' },
        { id: 'wordcount', icon: '🔤', label: 'Word & Character Counter', desc: 'Count words, characters, sentences, paragraphs, and speaking time.' },
        { id: 'grade', icon: '🎯', label: 'Grade Converter', desc: 'Convert percentage marks to SA letter grades with context.' },
        { id: 'planner', icon: '📅', label: 'Study Tips & Exam Planning', desc: 'Evidence-based study strategies and advice for SA students.' },
    ];

    const updateApsSubject = (i, f, v) => { const n = [...apsSubjects]; n[i][f] = v; setApsSubjects(n); };
    const remainingSubjects = MATRIC_SUBJECTS.filter(s => !apsSubjects.some(a => a.name === s));

    return (
        <div className="page">
            <div className="page-header">
                <div className="section-label">Student Hub</div>
                <h1>Academic Tools</h1>
                <p>Free tools to help you study smarter, write better, and plan effectively</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 180px)' }}>
                <div style={{ borderRight: '1px solid var(--border)', padding: '24px 0' }} role="tablist" aria-label="Available tools">
                    {tools.map(t => (
                        <button key={t.id} onClick={() => setActiveTool(t.id)} role="tab" aria-selected={activeTool === t.id} aria-controls={`panel-${t.id}`}
                            style={{
                                width: '100%', textAlign: 'left', padding: '14px 24px', background: activeTool === t.id ? 'rgba(79,142,247,0.1)' : 'none',
                                border: 'none', borderLeft: activeTool === t.id ? '3px solid var(--accent)' : '3px solid transparent',
                                color: activeTool === t.id ? 'var(--accent)' : 'var(--text2)', cursor: 'pointer',
                                fontFamily: 'var(--font-body)', fontSize: 14
                            }}>
                            <div style={{ fontSize: 18, marginBottom: 4 }}>{t.icon}</div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{t.label}</div>
                        </button>
                    ))}
                </div>
                <div style={{ padding: '36px 48px' }} role="tabpanel">
                    {!activeTool && (
                        <div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Select a tool to get started</div>
                            <p style={{ color: 'var(--text2)', marginBottom: 32 }}>All tools are free, run in your browser, and require no account. Your data is saved locally.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                                {tools.map(t => (
                                    <div key={t.id} className="feat-card" onClick={() => setActiveTool(t.id)} tabIndex={0} onKeyDown={e => e.key === 'Enter' && setActiveTool(t.id)} role="button" aria-label={t.label}>
                                        <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>{t.icon}</span>
                                        <h3 style={{ fontSize: 15, marginBottom: 6 }}>{t.label}</h3>
                                        <p style={{ fontSize: 13 }}>{t.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* APS Calculator */}
                    {activeTool === 'aps' && (
                        <div style={{ maxWidth: 600 }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>🎓 Matric APS Calculator</h2>
                            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 8 }}>Enter your matric subject marks to calculate your Admission Point Score.</p>
                            <p style={{ color: 'var(--text3)', fontSize: 12, marginBottom: 24 }}>Your APS is used by most SA universities to determine admission eligibility. Each mark converts to a point value (30–39% = 2, 40–49% = 3, ... 90–100% = 8).</p>

                            {apsSubjects.map((s, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 60px 40px', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                                    {i < 4 ? (
                                        <input className="form-input" value={s.name} readOnly style={{ opacity: 0.7 }} />
                                    ) : (
                                        <select className="form-select" value={s.name} onChange={e => updateApsSubject(i, 'name', e.target.value)}>
                                            <option value="">Select subject</option>
                                            {remainingSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                            {s.name && !MATRIC_SUBJECTS.includes(s.name) && <option value={s.name}>{s.name}</option>}
                                        </select>
                                    )}
                                    <input className="form-input" type="number" min="0" max="100" value={s.mark} onChange={e => updateApsSubject(i, 'mark', e.target.value)} placeholder="Mark %" />
                                    <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: markToAPS(s.mark) >= 6 ? 'var(--green)' : markToAPS(s.mark) >= 4 ? 'var(--accent)' : 'var(--text3)' }}>
                                        {s.mark ? markToAPS(s.mark) : '–'}
                                    </div>
                                    {i >= 4 && (
                                        <button onClick={() => setApsSubjects(a => a.filter((_, j) => j !== i))} style={{ background: 'rgba(255,90,90,0.15)', border: 'none', color: 'var(--red)', borderRadius: 6, cursor: 'pointer', fontSize: 14, height: 36 }}>✕</button>
                                    )}
                                    {i < 4 && <div />}
                                </div>
                            ))}

                            <button className="btn btn-ghost" style={{ marginBottom: 28, marginTop: 8 }} onClick={() => setApsSubjects(a => [...a, { name: '', mark: '' }])}>+ Add Subject</button>

                            <div style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.08), rgba(123,95,255,0.08))', border: '1px solid rgba(79,142,247,0.25)', borderRadius: 'var(--r)', padding: 28, textAlign: 'center' }}>
                                <div style={{ fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>Your APS Score</div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 800, color: apsTotal >= 30 ? 'var(--green)' : apsTotal >= 22 ? 'var(--accent)' : 'var(--orange)' }}>{apsTotal}</div>
                                <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 8 }}>
                                    {apsTotal >= 38 ? '🏆 Excellent! You qualify for most competitive programmes (UCT, Wits Medicine/Engineering).' :
                                        apsTotal >= 32 ? '✅ Strong score. You qualify for most university programmes.' :
                                            apsTotal >= 26 ? '👍 Good score. Suitable for many diploma and degree programmes.' :
                                                apsTotal >= 20 ? '⚠️ Basic. Consider TVET colleges or Extended Curriculum Programmes (ECPs).' :
                                                    'Enter your marks above to calculate your APS.'}
                                </div>
                            </div>

                            <div style={{ marginTop: 24, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                                <div style={{ padding: '10px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text3)', background: 'var(--card2)', textTransform: 'uppercase', letterSpacing: 1 }}>Typical APS Requirements</div>
                                {[
                                    ['UCT Medicine (MBChB)', '42+'],
                                    ['Wits Engineering', '36+'],
                                    ['UP Commerce (BCom)', '30+'],
                                    ['UJ IT / Computer Science', '26+'],
                                    ['TUT Diploma Programmes', '22+'],
                                    ['TVET Colleges (N courses)', '15+'],
                                ].map(([prog, req]) => (
                                    <div key={prog} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                                        <span style={{ color: 'var(--text2)' }}>{prog}</span>
                                        <span style={{ fontWeight: 700, color: apsTotal >= parseInt(req) ? 'var(--green)' : 'var(--text3)' }}>{req} {apsTotal >= parseInt(req) ? '✓' : ''}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTool === 'gpa' && (
                        <div style={{ maxWidth: 600 }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>📊 Weighted Average Calculator</h2>
                            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 28 }}>Enter each subject&apos;s mark and credit load to calculate your weighted average.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 40px', gap: 8, marginBottom: 8 }}>
                                {['Subject', 'Mark (%)', 'Credits', ''].map(h => <div key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</div>)}
                            </div>
                            {gpa.map((g, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 40px', gap: 8, marginBottom: 8 }}>
                                    <input className="form-input" value={g.subject} onChange={e => updateSubject(i, 'subject', e.target.value)} placeholder="e.g. Mathematics" aria-label="Subject name" />
                                    <input className="form-input" value={g.mark} onChange={e => updateSubject(i, 'mark', e.target.value)} placeholder="75" type="number" min="0" max="100" aria-label="Mark percentage" />
                                    <input className="form-input" value={g.credits} onChange={e => updateSubject(i, 'credits', e.target.value)} placeholder="16" type="number" min="1" aria-label="Credit value" />
                                    <button onClick={() => removeSubject(i)} style={{ background: 'rgba(255,90,90,0.15)', border: 'none', color: 'var(--red)', borderRadius: 6, cursor: 'pointer', fontSize: 14 }} aria-label="Remove subject">✕</button>
                                </div>
                            ))}
                            <button className="btn btn-ghost" style={{ marginBottom: 28 }} onClick={addSubject}>+ Add Subject</button>
                            {wa && (
                                <div style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.25)', borderRadius: 'var(--r)', padding: 24, textAlign: 'center' }}>
                                    <div style={{ fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>Weighted Average</div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 800, color: parseFloat(wa) >= 75 ? 'var(--green)' : parseFloat(wa) >= 50 ? 'var(--accent)' : 'var(--red)' }}>{wa}%</div>
                                    <div style={{ color: 'var(--text2)', marginTop: 4 }}>{saGrade(wa)}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTool === 'cite' && (
                        <div style={{ maxWidth: 600 }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>📖 Citation Generator</h2>
                            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>Generate correctly formatted references. Supports Harvard and APA 7th.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                <div className="form-group">
                                    <label className="form-label">Source Type</label>
                                    <select className="form-select" value={cite.type} onChange={e => setCite(c => ({ ...c, type: e.target.value }))}>
                                        <option value="book">Book</option>
                                        <option value="journal">Journal Article</option>
                                        <option value="website">Website</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Format</label>
                                    <select className="form-select" value={cite.format} onChange={e => setCite(c => ({ ...c, format: e.target.value }))}>
                                        <option value="harvard">Harvard</option>
                                        <option value="apa7">APA 7th Edition</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                {[['Author(s) — Surname, Initials', 'author'], ['Year of Publication', 'year'], ['Title', 'title'], ['Publisher', 'publisher'], ['City of Publication', 'city'], [cite.type === 'website' ? 'URL' : 'Edition', 'url']].map(([label, field]) => (
                                    <div key={field} className="form-group" style={['title', 'url'].includes(field) ? { gridColumn: '1 / -1' } : {}}>
                                        <label className="form-label">{label}</label>
                                        <input className="form-input" value={cite[field]} onChange={e => setCite(c => ({ ...c, [field]: e.target.value }))} placeholder={label} />
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 10, padding: 20, marginTop: 8 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text3)', marginBottom: 10 }}>Generated Reference ({cite.format === 'harvard' ? 'Harvard' : 'APA 7th'})</div>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{genCitation()}</div>
                                <button className="btn btn-ghost" style={{ marginTop: 14, padding: '6px 14px', fontSize: 13 }} onClick={() => navigator.clipboard?.writeText(genCitation())}>📋 Copy to Clipboard</button>
                            </div>
                        </div>
                    )}

                    {activeTool === 'pomodoro' && (
                        <div style={{ maxWidth: 420, textAlign: 'center' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>⏱️ Pomodoro Study Timer</h2>
                            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 40 }}>25 minutes of focused study → 5-minute break.</p>
                            <div style={{
                                width: 200, height: 200, borderRadius: '50%', border: `8px solid ${pomodoro.mode === 'work' ? 'var(--accent)' : 'var(--green)'}`,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', background: 'var(--card)',
                                boxShadow: `0 0 40px ${pomodoro.mode === 'work' ? 'rgba(79,142,247,0.3)' : 'rgba(48,217,128,0.3)'}`
                            }}>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800 }}>{fmtTime(pomodoro.seconds)}</div>
                                <div style={{ fontSize: 12, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>{pomodoro.mode === 'work' ? 'Focus' : 'Break'}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
                                <button className="btn btn-primary" onClick={() => setPomodoro(p => ({ ...p, running: !p.running }))}>
                                    {pomodoro.running ? '⏸ Pause' : '▶ Start'}
                                </button>
                                <button className="btn btn-ghost" onClick={() => setPomodoro({ running: false, seconds: 25 * 60, mode: 'work', sessions: 0 })}>↺ Reset</button>
                            </div>
                            <div style={{ fontSize: 14, color: 'var(--text3)' }}>Sessions completed: <strong style={{ color: 'var(--gold)' }}>{pomodoro.sessions}</strong></div>
                        </div>
                    )}

                    {activeTool === 'wordcount' && (
                        <div style={{ maxWidth: 600 }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>🔤 Word & Character Counter</h2>
                            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 20 }}>Paste your essay or assignment text below.</p>
                            <textarea className="form-textarea" rows={10} style={{ width: '100%', marginBottom: 16 }} value={wordCount} onChange={e => setWordCount(e.target.value)} placeholder="Paste your text here..." aria-label="Text to count" />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
                                {[['Words', wc], ['Characters', charCount], ['No Spaces', charNoSpaces], ['Sentences', sentences], ['Paragraphs', paragraphs], ['Read Time', `~${Math.max(1, Math.round(wc / 200))} min`], ['Speak Time', `~${speakTime} min`]].map(([label, val]) => (
                                    <div key={label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>{val}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTool === 'grade' && (
                        <div style={{ maxWidth: 400 }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>🎯 Grade Converter</h2>
                            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 24 }}>Enter your percentage mark to see what it means in SA grading terms.</p>
                            <input className="form-input" type="number" min="0" max="100" value={gradeConv} onChange={e => setGradeConv(e.target.value)} placeholder="Enter percentage e.g. 68" style={{ fontSize: 18, marginBottom: 20, width: '100%' }} aria-label="Percentage mark" />
                            {gradeConv && (
                                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 24 }}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 800, textAlign: 'center', color: parseFloat(gradeConv) >= 75 ? 'var(--green)' : parseFloat(gradeConv) >= 50 ? 'var(--accent)' : 'var(--red)', marginBottom: 8 }}>{gradeConv}%</div>
                                    <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{saGrade(gradeConv)}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
                                        {parseFloat(gradeConv) >= 75 ? '🏆 Excellent! You qualify for Honours or Distinction recognition. Many competitive bursaries require 75%+.' :
                                            parseFloat(gradeConv) >= 70 ? '✅ Strong mark. Many postgraduate programmes require 70%+.' :
                                                parseFloat(gradeConv) >= 60 ? '👍 Good pass. Above average for most SA university programmes. Most corporate bursaries require 65%.' :
                                                    parseFloat(gradeConv) >= 50 ? '⚠️ Pass, but aim higher — many bursaries require 60–65%.' :
                                                        '❌ Below the pass mark. Consider speaking to your lecturer or tutor.'}
                                    </div>
                                </div>
                            )}
                            <div style={{ marginTop: 24, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                                {[['80–100%', 'Distinction (Level 8)', 'var(--green)'], ['70–79%', 'Merit (Level 7)', 'var(--accent)'], ['60–69%', 'Pass with Credit (Level 6)', '#A992FF'], ['50–59%', 'Pass (Level 5)', 'var(--gold)'], ['40–49%', 'Sub-minimum (Level 4)', 'var(--orange)'], ['30–39%', 'Conditional (Level 3)', 'var(--red)'], ['0–29%', 'Fail', 'var(--red)']].map(([range, label, color]) => (
                                    <div key={range} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                                        <span style={{ color: 'var(--text2)' }}>{range}</span>
                                        <span style={{ fontWeight: 700, color }}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTool === 'planner' && (
                        <div style={{ maxWidth: 680 }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 6 }}>📅 Study Strategies for SA Students</h2>
                            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 28 }}>Evidence-based advice that works, even with limited resources.</p>
                            {[
                                { icon: '🧠', title: 'Spaced Repetition', desc: 'Study the same content across multiple sessions spread over days. Reviewing material after 1 day, 3 days, and 7 days is proven to increase long-term retention by up to 80%.' },
                                { icon: '✍️', title: 'Active Recall Over Re-reading', desc: 'Instead of reading your notes again, close them and write down everything you remember. Use past exam papers — your university library has them.' },
                                { icon: '📱', title: 'Use Free Learning Apps', desc: 'Khan Academy (free, covers maths, science, finance), Coursera (audit courses for free), YouTube (MIT OpenCourseWare, Crash Course).' },
                                { icon: '👥', title: 'Form a Study Group', desc: 'Teaching content to others is the single most effective way to identify gaps. Keep groups to 3–5 people.' },
                                { icon: '😴', title: 'Sleep Is Not Negotiable', desc: 'Memory consolidation happens during sleep. Aim for 7–8 hours before an exam.' },
                                { icon: '🏫', title: "Use Your Institution's Free Resources", desc: 'Library access, tutoring centres, writing labs, mental health counsellors, and career centres are all free as a registered student.' },
                                { icon: '📝', title: 'Exam Planning Framework', desc: '3 weeks before: identify all topics. 2 weeks before: work through past papers. 1 week before: do full timed past papers. 2 days before: light review only.' },
                            ].map(tip => (
                                <div key={tip.title} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{tip.icon}</span>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{tip.title}</div>
                                        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{tip.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
