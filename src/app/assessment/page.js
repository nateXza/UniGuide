'use client';

import { useState, useEffect, useRef } from 'react';
import { RIASEC_QUESTIONS, RIASEC_CAREERS, RIASEC_TYPE_COLORS } from '@/lib/constants';
import Link from 'next/link';

export default function AssessmentPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [done, setDone] = useState(false);

    // Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('riasec_answers');
            const savedDone = localStorage.getItem('riasec_done');
            if (saved) setAnswers(JSON.parse(saved));
            if (savedDone === 'true') setDone(true);
        } catch { }
    }, []);

    // Save to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('riasec_answers', JSON.stringify(answers));
            localStorage.setItem('riasec_done', done.toString());
        } catch { }
    }, [answers, done]);

    const total = RIASEC_QUESTIONS.length;
    const q = RIASEC_QUESTIONS[step];
    const opts = [
        { v: 1, label: 'Strongly Disagree', emoji: '😑' },
        { v: 2, label: 'Disagree', emoji: '😕' },
        { v: 3, label: 'Neutral', emoji: '😐' },
        { v: 4, label: 'Agree', emoji: '🙂' },
        { v: 5, label: 'Strongly Agree', emoji: '😄' },
    ];

    const answer = (val) => {
        const newAnswers = { ...answers, [step]: val };
        setAnswers(newAnswers);
        if (step < total - 1) {
            setStep(step + 1);
        } else {
            setDone(true);
            // Save to API
            const scores = calcScores(newAnswers);
            const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
            const sessionId = localStorage.getItem('session_id') || 'sess_' + Date.now();
            localStorage.setItem('session_id', sessionId);
            fetch('/api/assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, scores, topType }),
            }).catch(() => { });
        }
    };

    const goBack = () => { if (step > 0) setStep(step - 1); };

    const calcScores = (ans = answers) => {
        const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        Object.entries(ans).forEach(([idx, val]) => {
            const type = RIASEC_QUESTIONS[parseInt(idx)]?.type;
            if (type) scores[type] += val;
        });
        return scores;
    };

    const restart = () => {
        setAnswers({}); setStep(0); setDone(false);
        localStorage.removeItem('riasec_answers');
        localStorage.removeItem('riasec_done');
    };

    if (done) {
        const scores = calcScores();
        const maxScore = Math.max(...Object.values(scores));
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
        const top3 = sorted.slice(0, 3);
        const hollandCode = top3.map(([t]) => t).join('');

        return (
            <div className="page">
                <div className="riasec-wrap riasec-results">
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div className="section-label">Your Results</div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 800, marginBottom: 8 }}>Your RIASEC Profile</h1>
                        <p style={{ color: 'var(--text2)', fontSize: 15 }}>Based on your {total} responses, here&apos;s your personality profile</p>
                        <div style={{ marginTop: 16, display: 'inline-block', padding: '8px 20px', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.3)', borderRadius: 100, fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: 4, color: 'var(--accent)' }}>{hollandCode}</div>
                    </div>

                    <div className="riasec-type-grid">
                        {sorted.map(([type, score]) => {
                            const data = RIASEC_CAREERS[type];
                            const pct = maxScore > 0 ? (score / maxScore * 100) : 0;
                            const isTop = top3.some(([t]) => t === type);
                            return (
                                <div key={type} className={`riasec-type-card${isTop ? ' top' : ''}`}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: RIASEC_TYPE_COLORS[type] }}>{type}</div>
                                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{data.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{data.desc}</div>
                                    <div className="riasec-type-bar"><div className="riasec-type-fill" style={{ width: `${pct}%`, background: RIASEC_TYPE_COLORS[type] }} /></div>
                                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{score} / {6 * 5} points</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Top RIASEC career recommendations */}
                    {top3.map(([type]) => {
                        const data = RIASEC_CAREERS[type];
                        return (
                            <div key={type} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 24, marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: RIASEC_TYPE_COLORS[type], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'white', fontSize: 16 }}>{type}</div>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>{data.name} Careers</div>
                                        <div style={{ fontSize: 12, color: 'var(--text3)' }}>{data.desc}</div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text3)', marginBottom: 8 }}>Recommended Careers</div>
                                    <div className="career-chips">
                                        {data.careers.map(c => <span key={c} className="career-chip">{c}</span>)}
                                    </div>
                                </div>
                                {data.qualifications && (
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text3)', marginBottom: 8 }}>Suggested SA Qualifications</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                            {data.qualifications.map(q => (
                                                <span key={q} className="tag tag-green">{q}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
                        <button className="btn btn-ghost" onClick={restart}>↺ Retake Assessment</button>
                        <Link href="/institutions" className="btn btn-primary">Browse Institutions →</Link>
                        <Link href="/financial-aid" className="btn btn-ghost" style={{ color: 'var(--green)' }}>Find Bursaries</Link>
                    </div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => {
                            const text = `My RIASEC Profile: ${hollandCode}\n\n` +
                                top3.map(([t]) => `${t} — ${RIASEC_CAREERS[t].name}: ${RIASEC_CAREERS[t].careers.slice(0, 3).join(', ')}`).join('\n') +
                                `\n\nTake the test: ${window.location.href}`;
                            if (navigator.share) { navigator.share({ title: 'My RIASEC Career Assessment Results', text }); }
                            else { navigator.clipboard.writeText(text); alert('Results copied to clipboard!'); }
                        }}>📤 Share Results</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => {
                            const lines = [`RIASEC Career Assessment Results`, `Holland Code: ${hollandCode}`, ``,
                                ...sorted.map(([t, s]) => `${t} (${RIASEC_CAREERS[t].name}): ${s}/30`), ``,
                                `Top Career Recommendations:`,
                                ...top3.flatMap(([t]) => [`\n${RIASEC_CAREERS[t].name}:`, ...RIASEC_CAREERS[t].careers.map(c => `  • ${c}`)]),
                                ``, `Taken at: ${new Date().toLocaleDateString()}`];
                            const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
                            const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
                            a.download = `UniGuide-RIASEC-${hollandCode}.txt`; a.click();
                        }}>📥 Download Results</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="riasec-wrap">
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div className="section-label">Career Assessment</div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, marginBottom: 8 }}>Discover Your Career Path</h1>
                    <p style={{ color: 'var(--text2)', fontSize: 14 }}>Answer {total} questions to uncover careers that match your personality ({total - Object.keys(answers).length} remaining)</p>
                </div>

                <div className="riasec-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={total}>
                    <div className="riasec-progress-fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
                </div>

                <div className="riasec-q">
                    <small>Question {step + 1} of {total}</small>
                    {q.text}
                </div>

                <div className="riasec-options" role="radiogroup" aria-label="Your response">
                    {opts.map(o => (
                        <button key={o.v} className={`riasec-opt${answers[step] === o.v ? ' selected' : ''}`}
                            onClick={() => answer(o.v)} role="radio" aria-checked={answers[step] === o.v} aria-label={o.label}>
                            <span>{o.emoji}</span>{o.label}
                        </button>
                    ))}
                </div>

                <div className="riasec-nav">
                    <button className="btn btn-ghost" onClick={goBack} disabled={step === 0} style={{ opacity: step === 0 ? 0.4 : 1 }}>← Back</button>
                    <div style={{ fontSize: 13, color: 'var(--text3)' }}>{Math.round(((step + 1) / total) * 100)}% complete</div>
                    {answers[step] && step < total - 1 && (
                        <button className="btn btn-ghost" onClick={() => setStep(step + 1)}>Skip →</button>
                    )}
                </div>
            </div>
        </div>
    );
}
