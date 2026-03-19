import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service — UniGuide',
    description: 'UniGuide Terms of Service — terms and conditions for using our platform.',
};

export default function TermsPage() {
    return (
        <div className="page">
            <div className="page-header">
                <div className="section-label">Legal</div>
                <h1>Terms of Service</h1>
                <p>Last updated: October 2025</p>
            </div>
            <div className="prose">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using UniGuide, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

                <h2>2. User Conduct</h2>
                <p>You agree to use our platform only for lawful purposes related to educational and career planning.</p>
                <ul>
                    <li>You will not submit false or misleading information.</li>
                    <li>You will not attempt to exploit or hack our platform.</li>
                    <li>You will not use bots or automated scripts to scrape our data.</li>
                </ul>

                <h2>3. Intellectual Property</h2>
                <p>All content created by UniGuide, including text, logos, code, and algorithms, is our intellectual property. You may not reproduce this content without permission. Information about universities and bursaries is compiled from public sources and belongs to their respective institutions.</p>

                <h2>4. Limitation of Liability</h2>
                <p>UniGuide provides information for guidance purposes only. We make every effort to ensure accuracy, but we do not guarantee that university requirements, fees, or bursary details are 100% current. Always verify critical information directly with the institution. We are not liable for any rejected applications, lost data, or career outcomes.</p>

                <h2>5. AI Tutoring Services</h2>
                <p>Our AI Tutor is designed to assist with learning and comprehension. It is an automated system and may occasionally produce inaccurate or incomplete information. It should be used as a supplementary tool, not a replacement for official study materials or human teachers.</p>

                <h2>6. Termination</h2>
                <p>We reserve the right to suspend or terminate your access to UniGuide at any time, without notice, for violating these Terms.</p>

                <div style={{ marginTop: 48, textAlign: 'center' }}>
                    <Link href="/" className="btn btn-primary">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
