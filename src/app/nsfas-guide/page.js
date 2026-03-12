const faqs = [
    ['Can I apply for NSFAS at a private college?', 'No. NSFAS only funds students at public universities and TVET colleges.'],
    ['What if my parents are unemployed?', 'You are still eligible. Submit an affidavit confirming unemployment and any SASSA grant confirmation.'],
    ['Can postgrad students apply?', 'NSFAS currently only funds undergraduate and TVET students. For postgrad, look at NRF, university bursaries, or SETA funding.'],
    ['What if I\'m rejected?', 'You can appeal within 30 days. Submit additional supporting documents and a motivation letter explaining your circumstances.'],
    ['Is NSFAS a loan or a bursary?', 'For students who started from 2018 onwards, NSFAS is a full bursary (does not need to be repaid). For students who started before 2018, it may be a loan.'],
];

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(([q, a]) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": a
        }
    }))
};

export default function NsfasGuidePage() {
    return (
        <div className="page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="page-header">
                <div className="section-label">Financial Aid</div>
                <h1>Complete NSFAS Guide 2026</h1>
                <p>Everything you need to know about applying for, tracking, and managing your NSFAS bursary</p>
            </div>

            <div className="guide-wrap">
                <div style={{ background: 'linear-gradient(135deg, rgba(48,217,128,0.08), rgba(79,142,247,0.08))', border: '1px solid rgba(48,217,128,0.2)', borderRadius: 'var(--r)', padding: 28, marginBottom: 32 }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>🏛️ What is NSFAS?</h2>
                    <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8 }}>
                        The <strong>National Student Financial Aid Scheme (NSFAS)</strong> is a South African government bursary that pays for tuition fees, accommodation, meals, books, and a personal allowance at public universities and TVET colleges. It is available to South African citizens from households earning less than <strong>R350,000 per year</strong>.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginTop: 20 }}>
                        {[['Tuition', '✅ Fully covered'], ['Accommodation', '✅ Up to R45,000'], ['Book Allowance', '✅ R5,200/year'], ['Meals', '✅ R15,000/year'], ['Living Allowance', '✅ R29,500/year'], ['Transport', '✅ R7,500/year']].map(([label, val]) => (
                            <div key={label} style={{ background: 'var(--card)', borderRadius: 10, padding: '12px 16px', textAlign: 'center' }}>
                                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>{label}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>{val}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Step-by-Step Application Process</h2>

                {[
                    { title: 'Check Your Eligibility', content: 'You must be a South African citizen with a combined household income below R350,000 per year. You must also be registered at or have applied to a public university or TVET college. SASSA grant recipients are automatically eligible. You need a valid SA ID number and an active cellphone number.' },
                    { title: 'Create Your myNSFAS Account', content: 'Go to my.nsfas.org.za and click "Register". Enter your ID number, create a username and password, and verify your cellphone number with the OTP sent to you. Keep your login details safe — you will need them to check your status.' },
                    { title: 'Complete the Online Application', content: 'Log in to myNSFAS and click "Apply". Fill in all required fields: personal details, household income, parent/guardian information, institution you plan to attend, and course of study. Upload supporting documents: certified ID copy, parents\' IDs, proof of income (payslips, SASSA letter, or affidavit for unemployed parents).' },
                    { title: 'Submit Before the Deadline', content: 'NSFAS applications typically open in September and close in January for the following academic year. The exact dates change annually — check nsfas.org.za. Late applications are NOT accepted. Submit early to avoid last-minute technical issues.' },
                    { title: 'Track Your Application Status', content: 'Log in to myNSFAS → "Track Application". Statuses you may see: "Submitted" (received and being processed), "Provisionally Funded" (approved, pending registration), "Approved" (funding confirmed), "Awaiting documents" (you need to upload missing documents), "Rejected" (you can appeal within 30 days).' },
                    { title: 'Registration & Sign Funding Agreement', content: 'Once approved, register at your institution. Visit the financial aid office to sign your NSFAS Bursary Agreement. Your institution will receive your tuition directly from NSFAS. Your allowances will be paid via the NSFAS Wallet (previously SBUX card) after signing.' },
                    { title: 'Managing Your NSFAS Allowances', content: 'NSFAS now uses the NSFAS Wallet app for allowance payments. Download the app from your app store. Your book, living, and transport allowances are loaded monthly. You can withdraw cash at any ATM or pay at any store using the wallet. Budget carefully — allowances must last the full semester.' },
                ].map((step, i) => (
                    <div key={i} className="guide-step">
                        <div className="guide-step-num">{i + 1}</div>
                        <h3>{step.title}</h3>
                        <p>{step.content}</p>
                    </div>
                ))}

                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 28, marginTop: 32 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📞 NSFAS Contact Information</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                        {[
                            ['📱 Toll-free', '08000 67327'],
                            ['✉️ Email', 'info@nsfas.org.za'],
                            ['🌐 Website', 'my.nsfas.org.za'],
                            ['📍 Office', '10 Brodie Rd, House Vincent, Cape Town'],
                        ].map(([label, val]) => (
                            <div key={label} style={{ display: 'flex', gap: 10, fontSize: 14 }}>
                                <span style={{ color: 'var(--text3)', minWidth: 80 }}>{label}</span>
                                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ background: 'rgba(255,90,90,0.06)', border: '1px solid rgba(255,90,90,0.2)', borderRadius: 'var(--r)', padding: 24, marginTop: 24 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--red)', marginBottom: 10 }}>⚠️ Common NSFAS Pitfalls</h3>
                    <ul style={{ paddingLeft: 20, color: 'var(--text2)', fontSize: 14, lineHeight: 2 }}>
                        <li>Applying after the deadline — NSFAS does <strong>not</strong> accept late applications</li>
                        <li>Not uploading required documents — check your portal regularly for requests</li>
                        <li>Not signing your bursary agreement at your institution</li>
                        <li>Losing login credentials — use a screenshot or password manager</li>
                        <li>Providing incorrect household income — this can lead to rejection</li>
                        <li>Not re-applying if you failed or switched courses — you may still qualify</li>
                    </ul>
                </div>

                <div style={{ background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: 'var(--r)', padding: 24, marginTop: 24 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>💡 NSFAS FAQ</h3>
                    {faqs.map(([q, a]) => (
                        <div key={q} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: 'var(--text)' }}>{q}</div>
                            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{a}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: 'NSFAS Guide 2026 — How to Apply, Track & Manage | UniGuide',
    description: 'Complete step-by-step guide to applying for NSFAS in South Africa. Eligibility, application process, tracking, allowances, and common pitfalls.',
};
