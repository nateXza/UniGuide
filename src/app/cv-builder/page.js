'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CV_TEMPLATES, EMPTY_CV } from '@/lib/constants';

export default function CVBuilderPage() {
    const [template, setTemplate] = useState(null);
    const [cv, setCv] = useState(EMPTY_CV);
    const [preview, setPreview] = useState(false);
    const [activeSection, setActiveSection] = useState('personal');
    const [isGenerating, setIsGenerating] = useState(false);
    const pdfRef = useRef(null);

    const update = (field, val) => setCv(c => ({ ...c, [field]: val }));
    const updateEdu = (i, field, val) => {
        const n = [...cv.education]; n[i] = { ...n[i], [field]: val }; setCv(c => ({ ...c, education: n }));
    };
    const updateExp = (i, field, val) => {
        const n = [...cv.experience]; n[i] = { ...n[i], [field]: val }; setCv(c => ({ ...c, experience: n }));
    };
    const addEdu = () => setCv(c => ({ ...c, education: [...c.education, { institution: '', qualification: '', year: '', average: '' }] }));
    const addExp = () => setCv(c => ({ ...c, experience: [...c.experience, { company: '', role: '', period: '', duties: '' }] }));
    const removeEdu = (i) => setCv(c => ({ ...c, education: c.education.filter((_, j) => j !== i) }));
    const removeExp = (i) => setCv(c => ({ ...c, experience: c.experience.filter((_, j) => j !== i) }));

    // Auto-save to API
    const saveCv = () => {
        const sessionId = localStorage.getItem('cv_session') || 'cv_' + Date.now();
        localStorage.setItem('cv_session', sessionId);
        fetch('/api/cv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, template, data: cv }),
        }).catch(() => { });
    };

    const downloadPDF = async () => {
        if (!pdfRef.current) return;
        setIsGenerating(true);
        try {
            // temporarily remove box-shadow for clean PDF
            const origBoxShadow = pdfRef.current.style.boxShadow;
            pdfRef.current.style.boxShadow = 'none';
            pdfRef.current.style.borderRadius = '0';

            const canvas = await html2canvas(pdfRef.current, { scale: 2, useCORS: true });

            // restore original styles
            pdfRef.current.style.boxShadow = origBoxShadow;
            pdfRef.current.style.borderRadius = '4px';

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width / 2, canvas.height / 2]
            });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
            pdf.save(`${cv.name ? cv.name.replace(/\s+/g, '_') : 'My_CV'}.pdf`);
        } catch (error) {
            console.error('Failed to generate PDF', error);
            alert('Failed to generate PDF. Please try again.');
        }
        setIsGenerating(false);
    };

    if (!template) {
        return (
            <div className="page">
                <div className="page-header">
                    <div className="section-label">CV Builder</div>
                    <h1>Build Your Professional CV</h1>
                    <p>Choose a template designed for South African employers and graduate programmes</p>
                </div>
                <div style={{ padding: '40px 48px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 900 }}>
                        {CV_TEMPLATES.map(t => (
                            <div key={t.id} className="feat-card" style={{ cursor: 'pointer', textAlign: 'center', padding: 36 }} onClick={() => setTemplate(t.id)}>
                                <div style={{ fontSize: 48, marginBottom: 16 }}>{t.icon}</div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 10 }}>{t.label}</h3>
                                <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 20 }}>{t.desc}</p>
                                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Use This Template →</button>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 48, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 28, maxWidth: 900 }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, marginBottom: 16 }}>📋 South African CV Tips</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {[
                                ['Keep it to 2 pages max', "South African employers prefer concise CVs — 1 page for fresh graduates, 2 for experienced candidates."],
                                ['Include your ID number', "Many SA employers and government positions require your SA ID number on your CV."],
                                ['Matric results matter', "Always include your Matric results and distinctions — especially for your first job or bursary application."],
                                ['Avoid a photo unless asked', "Unlike European CVs, a photo is optional in SA. Only include one if the employer explicitly requests it."],
                                ['List referees with contact details', "Include 2–3 referees with their job title, company, and phone number — not just 'available on request'."],
                                ['Use action verbs', "Start bullet points with verbs: 'Managed', 'Developed', 'Coordinated', 'Achieved', 'Implemented'."],
                            ].map(([title, desc]) => (
                                <div key={title} style={{ background: 'var(--bg3)', borderRadius: 10, padding: 16 }}>
                                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: 'var(--accent)' }}>✓ {title}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const sections = [
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'objective', label: 'Profile / Objective', icon: '🎯' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'experience', label: 'Experience', icon: '💼' },
        { id: 'skills', label: 'Skills & Languages', icon: '⚡' },
        { id: 'references', label: 'References', icon: '📞' },
    ];

    if (preview) {
        return (
            <div className="page">
                <div style={{ padding: '24px 48px', display: 'flex', gap: 12, borderBottom: '1px solid var(--border)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-ghost" onClick={() => setPreview(false)}>← Edit CV</button>
                    <button className="btn btn-primary" onClick={downloadPDF} disabled={isGenerating}>
                        {isGenerating ? 'Generating PDF...' : '📥 Download as PDF'}
                    </button>
                    <span style={{ fontSize: 12, color: 'var(--text3)' }}>A clean PDF format of your CV</span>
                </div>
                <div ref={pdfRef} style={{ maxWidth: 794, margin: '40px auto', background: 'white', color: '#111', padding: '60px 72px', borderRadius: 4, boxShadow: '0 4px 40px rgba(0,0,0,0.3)', fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.6 }}>
                    <div style={{ borderBottom: '3px solid #003B5C', paddingBottom: 20, marginBottom: 24 }}>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#003B5C', marginBottom: 4 }}>{cv.name || 'Your Name'}</div>
                        <div style={{ fontSize: 12, color: '#555', display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
                            {cv.email && <span>✉ {cv.email}</span>}
                            {cv.phone && <span>📞 {cv.phone}</span>}
                            {cv.city && <span>📍 {cv.city}</span>}
                            {cv.linkedin && <span>🔗 {cv.linkedin}</span>}
                        </div>
                    </div>
                    {cv.objective && <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#003B5C', marginBottom: 8 }}>Professional Profile</div>
                        <p style={{ color: '#333' }}>{cv.objective}</p>
                    </div>}
                    {cv.education.some(e => e.institution) && <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#003B5C', marginBottom: 10, borderBottom: '1px solid #ddd', paddingBottom: 4 }}>Education</div>
                        {cv.education.filter(e => e.institution).map((e, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>{e.qualification}</strong><span style={{ color: '#666' }}>{e.year}</span>
                                </div>
                                <div style={{ color: '#555' }}>{e.institution}{e.average ? ` · Average: ${e.average}%` : ''}</div>
                            </div>
                        ))}
                    </div>}
                    {cv.experience.some(e => e.company) && <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#003B5C', marginBottom: 10, borderBottom: '1px solid #ddd', paddingBottom: 4 }}>Work Experience</div>
                        {cv.experience.filter(e => e.company).map((e, i) => (
                            <div key={i} style={{ marginBottom: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>{e.role}</strong><span style={{ color: '#666' }}>{e.period}</span>
                                </div>
                                <div style={{ color: '#555', marginBottom: 4 }}>{e.company}</div>
                                {e.duties && <div style={{ color: '#444', whiteSpace: 'pre-line', fontSize: 12 }}>{e.duties}</div>}
                            </div>
                        ))}
                    </div>}
                    {cv.skills && <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#003B5C', marginBottom: 8, borderBottom: '1px solid #ddd', paddingBottom: 4 }}>Skills</div>
                        <div style={{ color: '#333' }}>{cv.skills}</div>
                    </div>}
                    {cv.languages && <div style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#003B5C', marginBottom: 8, borderBottom: '1px solid #ddd', paddingBottom: 4 }}>Languages</div>
                        <div style={{ color: '#333' }}>{cv.languages}</div>
                    </div>}
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, color: '#003B5C', marginBottom: 8, borderBottom: '1px solid #ddd', paddingBottom: 4 }}>References</div>
                        <div style={{ color: '#333' }}>{cv.references}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div className="section-label">CV Builder</div>
                    <h1>Build Your CV</h1>
                    <p>{CV_TEMPLATES.find(t => t.id === template)?.label} Template</p>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button className="btn btn-ghost" onClick={() => setTemplate(null)}>Change Template</button>
                    <button className="btn btn-ghost" onClick={saveCv}>💾 Save</button>
                    <button className="btn btn-primary" onClick={() => setPreview(true)}>Preview CV →</button>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 'calc(100vh - 180px)' }}>
                <div style={{ borderRight: '1px solid var(--border)', padding: '24px 0' }}>
                    {sections.map(s => (
                        <button key={s.id} onClick={() => setActiveSection(s.id)}
                            style={{
                                width: '100%', textAlign: 'left', padding: '12px 24px', background: activeSection === s.id ? 'rgba(79,142,247,0.1)' : 'none',
                                border: 'none', borderLeft: activeSection === s.id ? '3px solid var(--accent)' : '3px solid transparent',
                                color: activeSection === s.id ? 'var(--accent)' : 'var(--text2)', cursor: 'pointer', fontSize: 14,
                                fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 8
                            }}>
                            <span>{s.icon}</span> {s.label}
                        </button>
                    ))}
                </div>
                <div style={{ padding: '32px 48px', maxWidth: 700 }}>
                    {activeSection === 'personal' && (
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 24 }}>👤 Personal Information</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                {[['Full Name', 'name'], ['Email Address', 'email'], ['Phone Number', 'phone'], ['City / Town', 'city'], ['LinkedIn URL', 'linkedin']].map(([label, field]) => (
                                    <div key={field} className="form-group" style={field === 'linkedin' ? { gridColumn: '1 / -1' } : {}}>
                                        <label className="form-label">{label}</label>
                                        <input className="form-input" value={cv[field]} onChange={e => update(field, e.target.value)} placeholder={label} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeSection === 'objective' && (
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>🎯 Professional Profile</h3>
                            <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 20 }}>Write 2–4 sentences summarising who you are, what you studied, and what kind of role you are seeking.</p>
                            <textarea className="form-input" rows={6} style={{ width: '100%', resize: 'vertical' }} value={cv.objective}
                                onChange={e => update('objective', e.target.value)}
                                placeholder="E.g. Recent BCom Accounting graduate from UCT with a strong foundation in financial reporting and auditing..." />
                        </div>
                    )}
                    {activeSection === 'education' && (
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 24 }}>🎓 Education</h3>
                            {cv.education.map((e, i) => (
                                <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 20, marginBottom: 16, position: 'relative' }}>
                                    {cv.education.length > 1 && <button onClick={() => removeEdu(i)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,90,90,0.15)', border: 'none', color: 'var(--red)', borderRadius: 6, padding: '2px 8px', cursor: 'pointer', fontSize: 12 }}>Remove</button>}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                        {[['Institution', 'institution'], ['Qualification / Degree', 'qualification'], ['Year Completed', 'year'], ['Final Average (%)', 'average']].map(([label, field]) => (
                                            <div key={field} className="form-group">
                                                <label className="form-label">{label}</label>
                                                <input className="form-input" value={e[field]} onChange={ev => updateEdu(i, field, ev.target.value)} placeholder={label} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-ghost" onClick={addEdu}>+ Add Another Qualification</button>
                        </div>
                    )}
                    {activeSection === 'experience' && (
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>💼 Work Experience</h3>
                            <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 20 }}>Include internships, vacation work, part-time jobs, and community service.</p>
                            {cv.experience.map((e, i) => (
                                <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 20, marginBottom: 16, position: 'relative' }}>
                                    {cv.experience.length > 1 && <button onClick={() => removeExp(i)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,90,90,0.15)', border: 'none', color: 'var(--red)', borderRadius: 6, padding: '2px 8px', cursor: 'pointer', fontSize: 12 }}>Remove</button>}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                        {[['Company / Organisation', 'company'], ['Your Role / Title', 'role'], ['Period', 'period']].map(([label, field]) => (
                                            <div key={field} className="form-group" style={field === 'period' ? { gridColumn: '1 / -1' } : {}}>
                                                <label className="form-label">{label}</label>
                                                <input className="form-input" value={e[field]} onChange={ev => updateExp(i, field, ev.target.value)} placeholder={label} />
                                            </div>
                                        ))}
                                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                            <label className="form-label">Key Duties / Achievements (one per line)</label>
                                            <textarea className="form-input" rows={4} style={{ width: '100%', resize: 'vertical' }} value={e.duties}
                                                onChange={ev => updateExp(i, 'duties', ev.target.value)}
                                                placeholder="• Assisted with financial reconciliations&#10;• Managed customer queries" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-ghost" onClick={addExp}>+ Add Another Role</button>
                        </div>
                    )}
                    {activeSection === 'skills' && (
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 24 }}>⚡ Skills & Languages</h3>
                            <div className="form-group" style={{ marginBottom: 24 }}>
                                <label className="form-label">Technical & Soft Skills</label>
                                <textarea className="form-input" rows={5} style={{ width: '100%', resize: 'vertical' }} value={cv.skills}
                                    onChange={e => update('skills', e.target.value)}
                                    placeholder="E.g. Microsoft Excel (Advanced), Python (Intermediate), Financial Reporting..." />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Languages (include proficiency level)</label>
                                <input className="form-input" value={cv.languages} onChange={e => update('languages', e.target.value)} placeholder="E.g. English (Fluent), Zulu (Native), Afrikaans (Conversational)" />
                            </div>
                            <div style={{ marginTop: 24, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 12 }}>💡 In-Demand Skills for SA Graduates (2025)</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {['Data Analysis', 'Microsoft Excel', 'Power BI', 'SQL', 'Python', 'Project Management', 'Financial Reporting', 'Customer Service', 'Communication', 'Critical Thinking', 'SAP', 'AutoCAD', 'IFRS Compliance', 'COBIT', 'Agile / Scrum'].map(s => (
                                        <button key={s} onClick={() => update('skills', cv.skills ? cv.skills + ', ' + s : s)}
                                            style={{ padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: 'rgba(79,142,247,0.1)', color: 'var(--accent)', border: '1px solid rgba(79,142,247,0.2)', cursor: 'pointer' }}>
                                            + {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {activeSection === 'references' && (
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>📞 References</h3>
                            <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: 20 }}>South African employers typically want 2–3 referees.</p>
                            <textarea className="form-input" rows={6} style={{ width: '100%', resize: 'vertical' }} value={cv.references}
                                onChange={e => update('references', e.target.value)}
                                placeholder={"Mr John Smith\nSenior Lecturer, Department of Finance\nUniversity of Cape Town\nTel: 021 650 XXXX"} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
