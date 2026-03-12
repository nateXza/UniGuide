'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ─── CAPS Curriculum Data (Grade 8–12) ───────────────────────────────────────
const GRADE_SUBJECTS = {
    '8': {
        color: '#4F8EF7',
        subjects: {
            'Mathematics': ['Whole Numbers', 'Integers', 'Fractions', 'Decimals', 'Exponents', 'Patterns & Algebra', 'Geometry', 'Data Handling', 'Graphs', 'Ratio & Rate'],
            'Natural Sciences': ['Atoms & Elements', 'Compounds', 'Chemical Reactions', 'Particle Model', 'Cells', 'Systems in the Body', 'Photosynthesis', 'Ecosystems', 'Energy & Change', 'Electric Circuits'],
            'English': ['Reading Comprehension', 'Creative Writing', 'Transactional Writing', 'Grammar & Syntax', 'Literature Study', 'Poetry Analysis', 'Visual Literacy', 'Summary Writing'],
            'Afrikaans': ['Leesbegrip', 'Kreatiewe Skryfwerk', 'Taalstrukture', 'Opstel', 'Letterkunde', 'Poësie', 'Opsomming'],
            'Social Sciences (History)': ['Ancient Civilisations', 'Slave Trade', 'Colonialism in Africa', 'Industrial Revolution', 'Source Analysis', 'Essay Writing'],
            'Social Sciences (Geography)': ['Population Growth', 'Natural Hazards', 'Settlement', 'River Systems', 'Weather & Climate', 'Map Skills', 'Development'],
            'Economic & Management Sciences': ['The Economy', 'Entrepreneurship', 'Financial Literacy', 'Government & the Economy', 'Markets & Trade'],
            'Technology': ['Structures', 'Processing', 'Systems & Control', 'Design Process', 'Communication of Design Ideas'],
            'Life Orientation': ['Self-Concept', 'Peer Pressure', 'Goal Setting', 'Study Skills', 'Physical Fitness', 'Healthy Lifestyle', 'Rights & Responsibilities'],
        }
    },
    '9': {
        color: '#30D980',
        subjects: {
            'Mathematics': ['Equations & Inequalities', 'Number Patterns', 'Functions & Relationships', 'Geometry of 2D Shapes', 'Geometry of 3D Objects', 'Transformation Geometry', 'Theorem of Pythagoras', 'Data Handling', 'Probability'],
            'Natural Sciences': ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Chemical Reactions', 'Forces & Motion', 'Electric Circuits', 'Cost of Electricity', 'Reproductive Systems', 'Inheritance', 'Evolution'],
            'English': ['Essay Writing', 'Discursive Writing', 'Short Stories', 'Novel Study', 'Drama', 'Poetry Analysis', 'Editing & Proofreading', 'Comprehension'],
            'Afrikaans': ['Opstel & Verhandeling', 'Taalstrukture', 'Leesbegrip', 'Letterkunde', 'Poësie', 'Transaksionele Tekste'],
            'Social Sciences (History)': ['World War I', 'World War II', 'Apartheid South Africa', 'The Cold War', 'Source Work', 'Extended Writing'],
            'Social Sciences (Geography)': ['Development Issues', 'Resources', 'Mapwork & GIS', 'People & Places', 'Climate & Weather'],
            'Economic & Management Sciences': ['Economy & Business', 'Savings & Investment', 'Trade Unions', 'Government Revenue', 'Basic Accounting'],
            'Technology': ['Impact of Technology', 'Mechanical Systems', 'Electrical Systems', 'Hydraulic & Pneumatic Systems'],
            'Life Orientation': ['Self-Image', 'Healthy Relationships', 'Substance Abuse', 'Career Choices', 'Environmental Health'],
        }
    },
    '10': {
        color: '#F5C842',
        subjects: {
            'Mathematics': ['Algebraic Expressions', 'Equations & Inequalities', 'Number Patterns', 'Functions', 'Finance & Growth', 'Trigonometry', 'Euclidean Geometry', 'Analytical Geometry', 'Statistics', 'Probability'],
            'Mathematical Literacy': ['Finance', 'Measurement', 'Maps & Plans', 'Data Handling', 'Probability', 'Patterns & Relationships'],
            'Physical Sciences': ['Mechanics (Motion)', 'Waves & Sound', 'Electromagnetic Radiation', 'Magnetism', 'Electrostatics', 'Electric Circuits', 'Matter & Materials', 'Atomic Models', 'Periodic Table', 'Chemical Bonding'],
            'Life Sciences': ['Chemistry of Life', 'Cells: Basic Units of Life', 'Cell Division', 'Plant & Animal Tissues', 'Biodiversity', 'Classification', 'History of Life on Earth', 'Biosphere to Ecosystems'],
            'Accounting': ['Recording Financial Information', 'Financial Statements', 'Bank Reconciliations', 'Analysis & Interpretation', 'VAT', 'Year-End Adjustments'],
            'Business Studies': ['Business Environments', 'Business Operations', 'Entrepreneurship', 'Business Plans', 'Creative Thinking'],
            'Economics': ['Micro Economics', 'Macro Economics', 'Economic Pursuits', 'Contemporary Economic Issues'],
            'Geography': ['Climatology', 'Geomorphology', 'Population', 'Water Resources', 'Mapwork & GIS'],
            'History': ['The World Around 1600', 'Colonialism', 'The French Revolution', 'Transformations in Southern Africa after 1750', 'Source-Based Questions'],
            'English Home Language': ['Essays', 'Transactional Writing', 'Literature', 'Poetry', 'Language Structures', 'Visual Literacy'],
            'Computer Applications Technology': ['Basic Concepts', 'System Software', 'Internet', 'Word Processing', 'Spreadsheets', 'Databases', 'Information Management'],
            'Information Technology': ['Data & Information', 'Hardware & Software', 'Delphi Programming', 'Databases & SQL', 'Internet & Networking'],
            'Life Orientation': ['Self-Development', 'Citizenship', 'Recreation & Physical Well-being', 'Careers & Career Choices', 'Study Skills'],
        }
    },
    '11': {
        color: '#7B5FFF',
        subjects: {
            'Mathematics': ['Exponents & Surds', 'Equations & Inequalities', 'Number Patterns', 'Functions (Quadratic, Hyperbola, Exponential)', 'Finance (Compound Interest)', 'Trigonometry (Reduction, Graphs, Identities)', 'Euclidean Geometry (Circle Geometry)', 'Analytical Geometry', 'Statistics', 'Probability'],
            'Mathematical Literacy': ['Finance (Tax, Budgets)', 'Measurement (Volume, Conversions)', 'Maps, Plans & Other Representations', 'Data Handling (Measures of Central Tendency)', 'Probability'],
            'Physical Sciences': ['Vectors & Scalars', 'Newton\'s Laws', 'Momentum & Impulse', 'Work, Energy & Power', 'Doppler Effect', 'Electrostatics', 'Electric Circuits', 'Electromagnetism', 'Intermolecular Forces', 'Organic Chemistry Intro', 'Reaction Rates', 'Stoichiometry'],
            'Life Sciences': ['Photosynthesis', 'Cellular Respiration', 'Animal Nutrition', 'Gaseous Exchange', 'Excretion', 'Population Ecology', 'Biodiversity & Classification', 'Human Impact on Environment'],
            'Accounting': ['Company Financial Statements', 'Manufacturing', 'Cash Budgets', 'Cost Accounting', 'Reconciliations', 'Audit Reports'],
            'Business Studies': ['Business Operations', 'Legislation', 'Entrepreneurship', 'Business Plans', 'Human Resources', 'Insurance'],
            'Economics': ['Macro Economics', 'Micro Economics', 'Economic Growth', 'Industrial Development & Policies', 'International Trade'],
            'Geography': ['Climate & Weather SA', 'Geomorphology (Drainage Systems)', 'Development Geography', 'Resources & Sustainability', 'Mapwork'],
            'History': ['Communism in Russia', 'Capitalism in the USA', 'The Cold War', 'Civil Society Protests (1950s–1990s)', 'Civil Rights Movement', 'Source Analysis'],
            'English Home Language': ['Essays & Creative Writing', 'Literature (Novel, Drama, Poetry)', 'Comprehension & Summary', 'Language Conventions'],
            'Information Technology': ['Object-Oriented Programming', 'Database Design', 'SQL Queries', 'Boolean Logic', 'Arrays & File Handling'],
            'Life Orientation': ['Social & Environmental Responsibility', 'Democracy & Human Rights', 'Careers & Career Choices', 'Study Methods'],
        }
    },
    '12': {
        color: '#FF6B6B',
        subjects: {
            'Mathematics': ['Number Patterns & Sequences', 'Functions & Inverses', 'Finance (Future & Present Value, Annuities)', 'Trigonometry (Compound Angles, Sine/Cosine Rule)', 'Calculus (Limits, Differentiation, Integration)', 'Euclidean Geometry', 'Analytical Geometry', 'Statistics (Regression & Correlation)', 'Probability (Counting Principles)'],
            'Mathematical Literacy': ['Finance (Loans, Tax, Exchange Rates)', 'Measurement (Volume, Area)', 'Maps & Plans', 'Data Handling (Distributions, Quartiles)', 'Probability'],
            'Physical Sciences': ['Momentum & Impulse', 'Vertical Projectile Motion', 'Organic Chemistry', 'Work, Energy & Power', 'Electrostatics', 'Electric Circuits', 'Electrodynamics (Motors, Generators, AC)', 'Optical Phenomena', 'Electrochemistry', 'Chemical Equilibrium', 'Acids & Bases', 'Fertilisers'],
            'Life Sciences': ['DNA, Meiosis & Protein Synthesis', 'Genetics & Inheritance', 'Evolution (Evidence & Theories)', 'Human Endocrine & Nervous System', 'Human Reproduction & Development', 'Responding to the Environment (Plants & Animals)'],
            'Accounting': ['Company Financial Statements', 'Cash Flow Statement', 'Manufacturing Accounts', 'Cost Accounting', 'Budgeting', 'Analysis & Interpretation of Financial Statements'],
            'Business Studies': ['Business Environment', 'Business Ventures', 'Business Roles', 'Business Operations', 'Legislation (BBBEE, Employment Equity)', 'Corporate Social Responsibility'],
            'Economics': ['Circular Flow', 'Business Cycles', 'Public Sector', 'Industrial Development', 'International Trade', 'Globalisation', 'Economic Growth'],
            'Geography': ['Climate & Weather (Synoptic Charts)', 'Geomorphology (Fluvial Processes)', 'Settlement Geography', 'Economic Geography', 'Mapwork & GIS'],
            'History': ['The Cold War', 'Independent Africa', 'Civil Resistance in SA (1970s–1990s)', 'The End of the Cold War & a New World Order', 'Globalisation', 'Extended Writing'],
            'English Home Language': ['Paper 1: Language in Context', 'Paper 2: Literature (Set Works)', 'Paper 3: Writing (Essay, Transactional)', 'Oral Assessment'],
            'Information Technology': ['Advanced OOP (Java/Delphi)', 'Databases & SQL (Complex Queries)', 'Problem Solving & Algorithms', 'Software Engineering Concepts'],
            'Life Orientation': ['Self-Concept & Esteem', 'Career & Study Opportunities (Post-matric)', 'Democracy & Human Rights', 'Social & Environmental Responsibility', 'Physical Education'],
        }
    }
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const readFileAsBase64 = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(',')[1]);
    r.onerror = () => rej(new Error('Read failed'));
    r.readAsDataURL(file);
});

const readFileAsText = (file) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => rej(new Error('Read failed'));
    r.readAsText(file);
});

// ─── Component ──────────────────────────────────────────────────────────────
export default function TutoringPage() {
    const [screen, setScreen] = useState('welcome');
    const [step, setStep] = useState(1);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [topicInput, setTopicInput] = useState('');
    const [confirmedTopic, setConfirmedTopic] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [pendingFiles, setPendingFiles] = useState([]);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const gradeColor = selectedGrade ? GRADE_SUBJECTS[selectedGrade]?.color : 'var(--accent)';

    // Build system prompt — pedagogically sound
    const buildSystem = () => {
        const topics = selectedSubject && selectedGrade ? GRADE_SUBJECTS[selectedGrade]?.subjects[selectedSubject] : [];
        return `You are UniGuide Tutor, an expert AI academic tutor for South African high school students following the CAPS (Curriculum and Assessment Policy Statement) curriculum.

STUDENT CONTEXT:
- Grade: ${selectedGrade}
- Subject: ${selectedSubject}
- Topic/Area: ${confirmedTopic}
- Other topics in this subject: ${topics?.join(', ')}

YOUR ROLE:
You are a knowledgeable, patient, and encouraging tutor who helps Grade ${selectedGrade} students master their subjects. You have deep expertise in the CAPS curriculum for ${selectedSubject}.

PEDAGOGICAL APPROACH (Socratic Scaffolding):
1. DIAGNOSE first — ask what the student already knows before explaining
2. SCAFFOLD learning — start with what they know, build step by step toward new understanding
3. USE THE SOCRATIC METHOD — ask guiding questions to lead students to discover answers themselves, rather than just giving answers
4. WORKED EXAMPLES — when teaching procedures (especially Maths/Science), show ONE worked example step-by-step, then ask the student to try a similar one
5. MULTIPLE REPRESENTATIONS — explain concepts using:
   - Words (verbal explanation)
   - Diagrams/visual descriptions (describe what a diagram would look like)
   - Numbers/formulas (mathematical representation)
   - Real-world examples (South African context when possible)
6. CHECK UNDERSTANDING — after explaining, ask a quick check question before moving on
7. PRAISE EFFORT — celebrate correct reasoning and gently correct misconceptions with "Almost! Let's think about it this way..."
8. CONNECT TO EXAMS — reference how topics appear in CAPS exam papers, use exam-style questions for practice

SA CONTEXT:
- Reference NSC (National Senior Certificate) exam format and structure
- Use South African examples (Rand values, local geography, SA history, etc.)
- Reference the CAPS syllabus weighting and assessment standards
- For Grade 12, emphasise matric exam preparation strategies
- Mention typical mark allocation in exam-style questions

CAPABILITIES:
- Explain concepts from scratch using scaffolding
- Work through practice problems step by step
- Quiz the student to test understanding (with model answers)
- Summarize uploaded notes, textbook pages, or past papers
- Create study guides, concept maps, or revision summaries
- Simulate exam-style questions with mark allocations
- Help with assignments (guide thinking, don't write for them)

FORMAT:
- Use clear headers and bullet points for complex topics
- Show step-by-step working for calculations
- Bold key terms and definitions
- Use numbered steps for procedures

Always maintain an academic yet warm tone. Be the tutor every SA student deserves — patient, clear, and encouraging. Start by greeting the student and asking what specific aspect of ${confirmedTopic} they need help with today.`;
    };

    const startChat = async () => {
        setScreen('chat');
        setLoading(true);
        const sys = buildSystem();
        try {
            const resp = await fetch('/api/tutor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system: sys,
                    messages: [{ role: 'user', content: `I'm a Grade ${selectedGrade} student and I need help with ${confirmedTopic} in ${selectedSubject}. Please greet me and get us started.` }]
                })
            });
            const data = await resp.json();
            setMessages([{ role: 'assistant', content: data.text || `Welcome! I'm your UniGuide Tutor for **${selectedSubject}** (Grade ${selectedGrade}). What would you like to learn about ${confirmedTopic} today?` }]);
        } catch {
            setMessages([{ role: 'assistant', content: `Welcome! I'm your UniGuide Tutor for **${selectedSubject}** (Grade ${selectedGrade}). Let's work on **${confirmedTopic}** together. What would you like to start with?` }]);
        }
        setLoading(false);
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        const processed = [];
        for (const file of files) {
            if (file.type === 'application/pdf') {
                const b64 = await readFileAsBase64(file);
                processed.push({ name: file.name, type: 'pdf', base64: b64, mediaType: 'application/pdf' });
            } else if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
                const text = await readFileAsText(file);
                processed.push({ name: file.name, type: 'text', text });
            } else {
                processed.push({ name: file.name, type: 'other', note: 'File uploaded and noted.' });
            }
        }
        setPendingFiles(prev => [...prev, ...processed]);
        setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
        e.target.value = '';
    };

    const sendMessage = useCallback(async () => {
        if ((!input.trim() && pendingFiles.length === 0) || loading) return;
        const userText = input.trim();
        setInput('');
        setLoading(true);

        let userContent = [];
        for (const f of pendingFiles) {
            if (f.type === 'pdf') {
                userContent.push({ type: 'document', source: { type: 'base64', media_type: f.mediaType, data: f.base64 } });
            } else if (f.type === 'text') {
                userContent.push({ type: 'text', text: `[Uploaded file: ${f.name}]\n${f.text}\n---` });
            } else {
                userContent.push({ type: 'text', text: `[Uploaded file: ${f.name} - ${f.note}]` });
            }
        }
        if (userText) userContent.push({ type: 'text', text: userText });
        if (userContent.length === 0) { setLoading(false); return; }

        const displayMsg = { role: 'user', content: userText || `📎 ${pendingFiles.map(f => f.name).join(', ')}` };
        const newMessages = [...messages, displayMsg];
        setMessages(newMessages);
        setPendingFiles([]);

        const apiMessages = newMessages.map((m, i) => {
            if (i === newMessages.length - 1 && userContent.length > 0) {
                return { role: 'user', content: userContent };
            }
            return { role: m.role, content: m.content };
        });

        try {
            const resp = await fetch('/api/tutor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ system: buildSystem(), messages: apiMessages })
            });
            const data = await resp.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.text || "I'm here to help. Could you rephrase that?" }]);
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: "Hmm, I had a connection issue. Please try again!" }]);
        }
        setLoading(false);
    }, [input, pendingFiles, loading, messages, buildSystem]);

    const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code style="background:rgba(79,142,247,0.15);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em;color:#93c5fd">$1</code>')
            .replace(/^### (.*)/gm, '<h3 style="margin:14px 0 6px;font-size:1em;color:#60a5fa;font-family:var(--font-display)">$1</h3>')
            .replace(/^## (.*)/gm, '<h2 style="margin:16px 0 8px;font-size:1.1em;color:#93c5fd;font-family:var(--font-display)">$1</h2>')
            .replace(/^# (.*)/gm, '<h1 style="margin:18px 0 10px;font-size:1.2em;color:#bfdbfe;font-family:var(--font-display)">$1</h1>')
            .replace(/^- (.*)/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#4F8EF7;margin-top:2px;flex-shrink:0">▸</span><span>$1</span></div>')
            .replace(/^\d+\. (.*)/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#4F8EF7;font-weight:bold;min-width:16px;flex-shrink:0">•</span><span>$1</span></div>')
            .replace(/\n\n/g, '<br/><br/>')
            .replace(/\n/g, '<br/>');
    };

    // Preset quick actions for chat
    const quickActions = [
        { label: '🎯 Explain this topic', prompt: `Can you explain ${confirmedTopic} to me from scratch? Start with the basics.` },
        { label: '📝 Practice question', prompt: `Give me a practice question on ${confirmedTopic} at Grade ${selectedGrade} level, like what I'd see in an exam. Include the mark allocation.` },
        { label: '📋 Summary', prompt: `Can you give me a concise study summary of ${confirmedTopic}? Include key definitions, formulas, and important points to remember.` },
        { label: '❓ Quiz me', prompt: `Quiz me on ${confirmedTopic}. Ask me 3 questions to test my understanding, starting easy and getting harder.` },
    ];

    // ── SCREEN: Welcome ──
    if (screen === 'welcome') return (
        <div className="page tutor-welcome">
            <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, var(--accent), #7B5FFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 0 40px rgba(79,142,247,0.4)' }}>📚</div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.7em', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 2 }}>UniGuide</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8em', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>AI Tutor</div>
                    </div>
                </div>
                <p style={{ color: 'var(--text2)', fontSize: '1.05em', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
                    Your personal AI tutor for the CAPS curriculum — Grade 8 to 12. Get step-by-step explanations, practice questions, and exam prep, 24/7.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
                    {[
                        { icon: '🎓', title: 'Grade 8–12', desc: 'Full CAPS curriculum' },
                        { icon: '🧠', title: 'Socratic Method', desc: 'Guided discovery learning' },
                        { icon: '📄', title: 'Upload Notes', desc: 'PDFs & documents' },
                        { icon: '📝', title: 'Exam Prep', desc: 'NSC-style questions' },
                    ].map(f => (
                        <div key={f.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 16px' }}>
                            <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                            <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.85em', marginBottom: 4 }}>{f.title}</div>
                            <div style={{ color: 'var(--text3)', fontSize: '0.75em' }}>{f.desc}</div>
                        </div>
                    ))}
                </div>

                <button onClick={() => setScreen('setup')} className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '1em', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Start Tutoring Session →
                </button>
            </div>
        </div>
    );

    // ── SCREEN: Setup ──
    if (screen === 'setup') {
        const gradeData = selectedGrade ? GRADE_SUBJECTS[selectedGrade] : null;
        const subjects = gradeData ? Object.keys(gradeData.subjects) : [];
        const topics = (gradeData && selectedSubject) ? gradeData.subjects[selectedSubject] || [] : [];

        return (
            <div className="page tutor-setup">
                <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <div style={{ fontSize: '0.7em', letterSpacing: '0.3em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8 }}>UniGuide AI Tutor</div>
                        <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.8em', fontWeight: 800, margin: 0 }}>Set Up Your Session</h1>
                        <p style={{ color: 'var(--text3)', marginTop: 8 }}>Tell us your grade, subject, and topic so we can tailor the experience</p>
                    </div>

                    {/* Progress */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 32, justifyContent: 'center' }}>
                        {[1, 2, 3].map(s => (
                            <div key={s} style={{ height: 4, width: 60, borderRadius: 2, background: step >= s ? (gradeColor) : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
                        ))}
                    </div>

                    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 32 }}>

                        {/* Step 1: Grade */}
                        <div style={{ marginBottom: 28 }}>
                            <label style={{ display: 'block', color: 'var(--text3)', fontSize: '0.78em', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                                Step 1 — Select Your Grade
                            </label>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {Object.keys(GRADE_SUBJECTS).map(grade => {
                                    const isSelected = selectedGrade === grade;
                                    const color = GRADE_SUBJECTS[grade].color;
                                    return (
                                        <button key={grade} onClick={() => { setSelectedGrade(grade); setSelectedSubject(''); setTopicInput(''); setStep(Math.max(step, 2)); }}
                                            style={{ background: isSelected ? `${color}22` : 'rgba(255,255,255,0.03)', border: `2px solid ${isSelected ? color : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, padding: '14px 24px', cursor: 'pointer', color: isSelected ? color : 'var(--text2)', fontSize: '1em', fontWeight: isSelected ? 800 : 500, transition: 'all 0.2s', fontFamily: 'var(--font-display)' }}>
                                            Grade {grade}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Subject */}
                        {selectedGrade && (
                            <div style={{ marginBottom: 28, borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                                <label style={{ display: 'block', color: 'var(--text3)', fontSize: '0.78em', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                                    Step 2 — Select Your Subject
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8, maxHeight: 300, overflowY: 'auto' }}>
                                    {subjects.map(sub => {
                                        const isSelected = selectedSubject === sub;
                                        return (
                                            <button key={sub} onClick={() => { setSelectedSubject(sub); setTopicInput(''); setStep(Math.max(step, 3)); }}
                                                style={{ background: isSelected ? `${gradeColor}22` : 'rgba(255,255,255,0.03)', border: `1px solid ${isSelected ? gradeColor : 'rgba(255,255,255,0.08)'}`, borderRadius: 10, padding: '10px 14px', cursor: 'pointer', textAlign: 'left', color: isSelected ? gradeColor : 'var(--text2)', fontSize: '0.85em', fontWeight: isSelected ? 700 : 400, transition: 'all 0.2s' }}>
                                                {sub}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Topic */}
                        {selectedSubject && (
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                                <label style={{ display: 'block', color: 'var(--text3)', fontSize: '0.78em', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                                    Step 3 — Choose Your Topic
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                                    {topics.map(t => (
                                        <button key={t} onClick={() => setTopicInput(t)}
                                            style={{ background: topicInput === t ? `${gradeColor}33` : 'rgba(255,255,255,0.04)', border: `1px solid ${topicInput === t ? gradeColor : 'rgba(255,255,255,0.1)'}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer', color: topicInput === t ? gradeColor : 'var(--text3)', fontSize: '0.8em', transition: 'all 0.2s' }}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <input value={topicInput} onChange={e => setTopicInput(e.target.value)} placeholder="Or type a custom topic..."
                                    className="form-input" style={{ width: '100%' }} />
                            </div>
                        )}
                    </div>

                    {/* Start Button */}
                    {topicInput.trim() && (
                        <div style={{ textAlign: 'center', marginTop: 24 }}>
                            <button onClick={() => { setConfirmedTopic(topicInput.trim()); startChat(); }}
                                className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '1em', fontWeight: 700 }}>
                                Begin Tutoring Session 🚀
                            </button>
                        </div>
                    )}

                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <button onClick={() => setScreen('welcome')} className="btn btn-ghost" style={{ fontSize: '0.85em' }}>← Back</button>
                    </div>
                </div>
            </div>
        );
    }

    // ── SCREEN: Chat ──
    return (
        <div className="tutor-chat-container">
            {/* Header */}
            <div className="tutor-chat-header">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${gradeColor}, #7B5FFF)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>📚</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95em', fontFamily: 'var(--font-display)' }}>UniGuide AI Tutor</div>
                    <div style={{ color: 'var(--text3)', fontSize: '0.72em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <span style={{ color: gradeColor }}>Grade {selectedGrade}</span> · {selectedSubject} · {confirmedTopic}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => { setScreen('setup'); setMessages([]); setUploadedFiles([]); setPendingFiles([]); }}
                        className="tutor-header-btn">New Session</button>
                    <button onClick={() => { setScreen('welcome'); setMessages([]); setUploadedFiles([]); setPendingFiles([]); setSelectedGrade(''); setSelectedSubject(''); setTopicInput(''); setStep(1); }}
                        className="tutor-header-btn">🏠 Home</button>
                </div>
            </div>

            {/* Quick Actions (shown when few messages) */}
            {messages.length <= 1 && (
                <div style={{ padding: '0 20px', display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                    {quickActions.map(qa => (
                        <button key={qa.label} onClick={() => { setInput(qa.prompt); }}
                            style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: 20, padding: '6px 14px', cursor: 'pointer', color: 'var(--accent)', fontSize: '0.78em', transition: 'all 0.2s' }}>
                            {qa.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Messages */}
            <div className="tutor-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`tutor-msg ${msg.role}`}>
                        {msg.role === 'assistant' && (
                            <div className="tutor-avatar" style={{ background: `linear-gradient(135deg, ${gradeColor}, #7B5FFF)` }}>📚</div>
                        )}
                        <div className={`tutor-bubble ${msg.role}`} style={msg.role === 'user' ? { background: `${gradeColor}18`, borderColor: `${gradeColor}44` } : {}}
                            dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                        {msg.role === 'user' && (
                            <div className="tutor-avatar user">👤</div>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="tutor-msg assistant">
                        <div className="tutor-avatar" style={{ background: `linear-gradient(135deg, ${gradeColor}, #7B5FFF)` }}>📚</div>
                        <div className="tutor-bubble assistant" style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '14px 18px' }}>
                            {[0, 1, 2].map(d => <div key={d} className="tutor-dot" style={{ animationDelay: `${d * 0.2}s`, background: gradeColor }} />)}
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Pending files */}
            {pendingFiles.length > 0 && (
                <div className="tutor-pending-files">
                    <span style={{ color: 'var(--accent)', fontSize: '0.75em' }}>📎 Ready to send:</span>
                    {pendingFiles.map((f, i) => (
                        <div key={i} className="tutor-pending-chip">
                            {f.name}
                            <button onClick={() => setPendingFiles(prev => prev.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: 0, fontSize: '0.9em' }}>×</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Session files */}
            {uploadedFiles.length > 0 && pendingFiles.length === 0 && (
                <div className="tutor-session-files">
                    <span style={{ color: 'var(--text3)', fontSize: '0.72em' }}>Session files:</span>
                    {uploadedFiles.map((f, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: '2px 8px', fontSize: '0.72em', color: 'var(--text3)' }}>📄 {f}</div>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="tutor-input-area">
                <div className="tutor-input-row">
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple accept=".pdf,.txt,.md,.pptx,.ppt,.docx,.doc" style={{ display: 'none' }} />
                    <button onClick={() => fileInputRef.current?.click()} className="tutor-upload-btn" title="Upload notes, PDFs, or slides" aria-label="Upload files">📎</button>
                    <textarea
                        value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                        placeholder={`Ask anything about ${confirmedTopic}... (Enter to send)`}
                        rows={1}
                        className="tutor-textarea"
                        onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
                        aria-label="Message input"
                    />
                    <button onClick={sendMessage} disabled={loading || (!input.trim() && pendingFiles.length === 0)}
                        className="tutor-send-btn"
                        style={{ background: loading || (!input.trim() && pendingFiles.length === 0) ? 'rgba(255,255,255,0.08)' : `linear-gradient(135deg, ${gradeColor}, #7B5FFF)` }}
                        aria-label="Send message">
                        {loading ? '⏳' : '↑'}
                    </button>
                </div>
                <div style={{ textAlign: 'center', marginTop: 8, color: 'var(--text3)', fontSize: '0.7em', opacity: 0.6 }}>
                    Upload PDFs or notes · UniGuide AI Tutor may make mistakes · Always verify with your textbook
                </div>
            </div>
        </div>
    );
}
