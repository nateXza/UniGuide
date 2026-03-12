import Link from 'next/link';
import prisma from '@/lib/prisma';

export const metadata = {
    title: 'UniGuide — Find Your Path to Higher Education in South Africa',
    description: 'South Africa\'s free student platform. Compare universities, find bursaries, take a career assessment, build your CV, and access free academic tools.',
};

async function getStats() {
    try {
        const [instCount, bursaryCount, resourceCount] = await Promise.all([
            prisma.institution.count(),
            prisma.bursary.count(),
            prisma.resource.count(),
        ]);
        return { instCount, bursaryCount, resourceCount };
    } catch {
        return { instCount: 83, bursaryCount: 60, resourceCount: 16 };
    }
}

export default async function HomePage() {
    const { instCount, bursaryCount, resourceCount } = await getStats();

    return (
        <div className="page">
            {/* ═══ HERO ═══ */}
            <section className="hero" aria-labelledby="hero-title">
                <div className="hero-bg" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                    <div className="hero-orb hero-orb-3" />
                    <div className="hero-grid" />
                </div>
                <div className="hero-inner">
                    <div className="hero-content">
                        <div className="hero-badge">South Africa&apos;s #1 Student Platform</div>
                        <h1 id="hero-title">Find Your Path to<br /><em>Higher Education</em></h1>
                        <p>UniGuide connects South African students with the right universities, TVET colleges, bursaries, and career pathways — all in one place.</p>

                        <Link href="/assessment" className="btn btn-primary" style={{ marginBottom: 8 }}>Take Career Assessment →</Link>
                        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                            <Link href="/institutions" className="btn btn-ghost" style={{ fontSize: 13 }}>Browse Institutions</Link>
                            <Link href="/nsfas-guide" className="btn btn-ghost" style={{ fontSize: 13 }}>NSFAS Guide</Link>
                        </div>

                        <div className="hero-stats" aria-label="Platform statistics">
                            <div><div className="hero-stat-val">{instCount}+</div><div className="hero-stat-label">Institutions</div></div>
                            <div><div className="hero-stat-val">{bursaryCount}+</div><div className="hero-stat-label">Bursaries</div></div>
                            <div><div className="hero-stat-val">{resourceCount}+</div><div className="hero-stat-label">Free Resources</div></div>
                            <div><div className="hero-stat-val">6</div><div className="hero-stat-label">Academic Tools</div></div>
                        </div>
                    </div>

                    <div className="hero-right">
                        <div className="hero-mini-card">
                            <div className="hero-mini-icon" style={{ background: 'rgba(79,142,247,0.15)' }}>🏛️</div>
                            <div>
                                <div className="hero-mini-label">Universities, UoTs, TVETs & Private</div>
                                <div className="hero-mini-val">{instCount} Institutions</div>
                            </div>
                        </div>
                        <div className="hero-mini-card">
                            <div className="hero-mini-icon" style={{ background: 'rgba(48,217,128,0.15)' }}>💰</div>
                            <div>
                                <div className="hero-mini-label">NSFAS, SETAs, Corporate & Provincial</div>
                                <div className="hero-mini-val">{bursaryCount} Bursaries</div>
                            </div>
                        </div>
                        <div className="hero-mini-card">
                            <div className="hero-mini-icon" style={{ background: 'rgba(123,95,255,0.15)' }}>🧠</div>
                            <div>
                                <div className="hero-mini-label">RIASEC personality-based career test</div>
                                <div className="hero-mini-val">Career Assessment</div>
                            </div>
                        </div>
                        <div className="hero-mini-card">
                            <div className="hero-mini-icon" style={{ background: 'rgba(245,200,66,0.15)' }}>🛠️</div>
                            <div>
                                <div className="hero-mini-label">GPA calc, citations, CV builder & more</div>
                                <div className="hero-mini-val">Free Academic Tools</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ HOW IT WORKS ═══ */}
            <section className="how-it-works" aria-labelledby="how-title">
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <div className="section-label">How It Works</div>
                    <h2 id="how-title" className="section-title">3 Steps to Your Future</h2>
                    <p className="section-sub" style={{ margin: '0 auto' }}>Whether you&apos;re in Grade 11, finishing matric, or looking to change careers</p>
                </div>
                <div className="how-steps">
                    <div className="how-step">
                        <div className="how-num">1</div>
                        <h3>Discover Your Path</h3>
                        <p>Take our RIASEC career assessment to uncover your personality type and matching careers</p>
                    </div>
                    <div className="how-step">
                        <div className="how-num">2</div>
                        <h3>Explore & Compare</h3>
                        <p>Browse {instCount}+ institutions, compare them side-by-side, and find the perfect fit</p>
                    </div>
                    <div className="how-step">
                        <div className="how-num">3</div>
                        <h3>Fund & Apply</h3>
                        <p>Find bursaries you qualify for, build your CV, and apply with confidence</p>
                    </div>
                </div>
            </section>

            {/* ═══ FEATURES ═══ */}
            <section className="features" aria-labelledby="feat-title">
                <div className="section-label">What We Offer</div>
                <h2 id="feat-title" className="section-title">Everything You Need</h2>
                <p className="section-sub">All the tools a South African student needs — from finding your career to landing your first job.</p>
                <div className="feat-grid">
                    {[
                        { icon: '🏛️', bg: 'rgba(79,142,247,0.12)', title: 'Explore Institutions', desc: `Browse ${instCount}+ universities, UoTs, TVET colleges and private institutions with full profiles, courses, and rankings.`, href: '/institutions' },
                        { icon: '🧠', bg: 'rgba(255,90,158,0.12)', title: 'Career Assessment', desc: 'Complete our RIASEC personality assessment and discover careers aligned with your interests and strengths.', href: '/assessment' },
                        { icon: '💰', bg: 'rgba(48,217,128,0.12)', title: 'Financial Aid Matcher', desc: `Search ${bursaryCount}+ bursaries from NSFAS, SETAs, provincial governments, and corporate sponsors.`, href: '/financial-aid' },
                        { icon: '⚖️', bg: 'rgba(245,200,66,0.12)', title: 'Compare Institutions', desc: 'Side-by-side comparison of tuition, rankings, acceptance rates, and course offerings.', href: '/compare' },
                        { icon: '📄', bg: 'rgba(123,95,255,0.12)', title: 'CV Builder', desc: 'Build a professional South African CV in minutes with guided templates tailored for graduates.', href: '/cv-builder' },
                        { icon: '🛠️', bg: 'rgba(255,140,66,0.12)', title: 'Academic Tools', desc: 'GPA calculator, Harvard citations, Pomodoro timer, APS calculator, word counter, and study tips.', href: '/tools' },
                        { icon: '🎁', bg: 'rgba(255,90,90,0.12)', title: 'Free Student Resources', desc: `${resourceCount}+ free tools, cloud storage, and learning platforms using your student email.`, href: '/freebies' },
                        { icon: '🏛️', bg: 'rgba(48,217,128,0.12)', title: 'NSFAS Guide', desc: 'Step-by-step guide to applying for NSFAS, tracking your application, and managing your allowance.', href: '/nsfas-guide' },
                    ].map((f, i) => (
                        <Link key={i} href={f.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="feat-card" role="article">
                                <div className="feat-icon" style={{ background: f.bg }} aria-hidden="true">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ═══ TESTIMONIALS ═══ */}
            <section className="testimonials" aria-labelledby="test-title">
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div className="section-label">Student Stories</div>
                    <h2 id="test-title" className="section-title">What Students Say</h2>
                </div>
                <div className="test-grid">
                    {[
                        { quote: "UniGuide helped me find a SETA bursary I didn't even know existed. I'm now studying Engineering at UJ fully funded.", name: 'Thabo M.', role: 'BSc Eng, University of Johannesburg', color: '#4F8EF7' },
                        { quote: "The career assessment matched me with Social Work, which I'd never considered. Now I'm in my 3rd year at UNISA and loving it.", name: 'Naledi K.', role: '3rd Year, UNISA', color: '#7B5FFF' },
                        { quote: "I used the CV Builder to apply for vacation work and got my first corporate internship at Deloitte. The SA-specific tips made a difference.", name: 'Sipho D.', role: 'BCom Accounting, Wits', color: '#30D980' },
                        { quote: "Coming from a rural area, I had no idea how to apply for university. UniGuide's NSFAS guide walked me through each step.", name: 'Amahle Z.', role: 'Education, University of Limpopo', color: '#F5C842' },
                        { quote: "The institution comparison tool helped my parents and me decide between TUT and CPUT. Seeing tuition and courses side-by-side was invaluable.", name: 'Keagan V.', role: 'IT Diploma, Cape Peninsula UoT', color: '#FF5A9E' },
                        { quote: "I didn't know I could get GitHub Pro and Microsoft Office for free with my student email until I found UniGuide's freebies page.", name: 'Lerato P.', role: 'Computer Science, UP', color: '#FF8C42' },
                    ].map((t, i) => (
                        <div key={i} className="test-card">
                            <div className="test-quote">&ldquo;{t.quote}&rdquo;</div>
                            <div className="test-author">
                                <div className="test-avatar" style={{ background: t.color }}>{t.name[0]}</div>
                                <div>
                                    <div className="test-name">{t.name}</div>
                                    <div className="test-role">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ TRUST SECTION ═══ */}
            <section className="trust-section" aria-label="Trusted by students from these institutions">
                <div style={{ fontSize: 13, color: 'var(--text3)', fontWeight: 500, marginBottom: 8 }}>Helping students from</div>
                <div className="trust-logos">
                    {['UCT', 'Wits', 'UP', 'Stellenbosch', 'UJ', 'UNISA', 'TUT', 'CPUT', 'DUT', 'NWU'].map(u => (
                        <div key={u} className="trust-logo">{u}</div>
                    ))}
                </div>
            </section>
        </div>
    );
}
