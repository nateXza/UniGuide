import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy — UniGuide',
    description: 'UniGuide privacy policy — how we handle your data, what we collect, and your rights.',
};

export default function PrivacyPage() {
    return (
        <div className="page">
            <div className="page-header">
                <div className="section-label">Legal</div>
                <h1>Privacy Policy</h1>
                <p>Last updated: March 2026</p>
            </div>
            <div className="prose">
                <h2>1. Introduction</h2>
                <p>UniGuide (&quot;we&quot;, &quot;our&quot;) is committed to respecting and protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our website and services. We comply with the Protection of Personal Information Act (POPIA) of South Africa.</p>

                <h2>2. Information We Collect</h2>
                <h3>Information You Provide</h3>
                <p>We may collect information that you voluntarily provide when using our tools:</p>
                <ul>
                    <li><strong>Career Assessment responses:</strong> Your answers to the RIASEC questionnaire (stored locally in your browser)</li>
                    <li><strong>CV Builder data:</strong> Personal details you enter into the CV builder (stored locally and optionally on our servers)</li>
                    <li><strong>GPA/APS calculations:</strong> Academic data you enter into our calculators (stored locally, never transmitted)</li>
                </ul>

                <h3>Information Collected Automatically</h3>
                <ul>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website</li>
                    <li>General location (country/province level only)</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <ul>
                    <li>To provide and improve our services</li>
                    <li>To generate anonymous, aggregate usage statistics</li>
                    <li>To identify and fix technical issues</li>
                </ul>
                <p><strong>We do NOT:</strong></p>
                <ul>
                    <li>Sell your personal information to third parties</li>
                    <li>Share your individual data with institutions or bursary providers</li>
                    <li>Use your data for targeted advertising</li>
                    <li>Require account registration to use our services</li>
                </ul>

                <h2>4. Data Storage and Security</h2>
                <p>Most data you enter on UniGuide (assessment results, CV data, calculator inputs) is stored in your browser&apos;s local storage and is not transmitted to our servers unless you explicitly save it. Any data stored on our servers is encrypted and protected.</p>

                <h2>5. Cookies</h2>
                <p>We use essential cookies only for basic site functionality. We do not use tracking cookies or third-party advertising cookies.</p>

                <h2>6. Third-Party Links</h2>
                <p>Our website contains links to external sites (institutions, bursary providers, free resource platforms). We are not responsible for the privacy practices of these external sites.</p>

                <h2>7. Your Rights Under POPIA</h2>
                <p>As a South African resident, you have the right to:</p>
                <ul>
                    <li>Access any personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to the processing of your personal information</li>
                    <li>Lodge a complaint with the Information Regulator</li>
                </ul>

                <h2>8. Children&apos;s Privacy</h2>
                <p>UniGuide is designed for students aged 16 and older. We do not knowingly collect personal information from children under 16. If you believe a child has provided us with personal information, please contact us.</p>

                <h2>9. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page indicates when the policy was last revised.</p>

                <h2>10. Contact Us</h2>
                <p>For privacy-related queries or requests:</p>
                <ul>
                    <li>Email: <a href="mailto:privacy@uniguide.co.za" style={{ color: 'var(--accent)' }}>privacy@uniguide.co.za</a></li>
                    <li>Information Officer: The UniGuide Team</li>
                </ul>

                <div style={{ marginTop: 48, textAlign: 'center' }}>
                    <Link href="/" className="btn btn-primary">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
