import Link from 'next/link';

export const metadata = {
    title: 'About UniGuide — South Africa\'s Student Platform',
    description: 'Learn about UniGuide — our mission to make higher education accessible to every South African student.',
};

export default function AboutPage() {
    return (
        <div className="page">
            <div className="page-header">
                <div className="section-label">About</div>
                <h1>About UniGuide</h1>
                <p>Our mission is to make higher education accessible to every South African student</p>
            </div>
            <div className="prose">
                <h2>🇿🇦 Why UniGuide Exists</h2>
                <p>
                    South Africa has one of the most complex higher education landscapes in the world — with 26 public universities, 9 universities of technology, 50 TVET colleges, and over 100 private institutions. Navigating this system is overwhelming, especially for first-generation students who lack access to career guidance.
                </p>
                <p>
                    <strong>UniGuide was built to change that.</strong> We believe that every student — whether from Sandton or Soweto, from the Northern Cape or KwaZulu-Natal — deserves equal access to information about their educational options.
                </p>

                <h2>What We Do</h2>
                <p>UniGuide is a <strong>free, open-access platform</strong> that provides:</p>
                <ul>
                    <li><strong>Institution Directory:</strong> Detailed profiles of 80+ South African institutions with tuition, rankings, courses, and admission requirements</li>
                    <li><strong>Career Assessment:</strong> A RIASEC personality test that helps students discover career paths aligned with their interests</li>
                    <li><strong>Financial Aid Matcher:</strong> A searchable database of 60+ bursaries from NSFAS, SETAs, provincial governments, and corporations</li>
                    <li><strong>Institution Comparison:</strong> Side-by-side comparison of up to 3 institutions across key metrics</li>
                    <li><strong>CV Builder:</strong> Professional CV templates tailored for South African employers and graduate programmes</li>
                    <li><strong>Academic Tools:</strong> GPA calculator, APS calculator, Harvard citation generator, Pomodoro timer, and more</li>
                    <li><strong>NSFAS Guide:</strong> A comprehensive walkthrough of the NSFAS application process</li>
                </ul>

                <h2>Our Values</h2>
                <ul>
                    <li><strong>Access:</strong> Every tool on UniGuide is 100% free. No registration required.</li>
                    <li><strong>Accuracy:</strong> We strive to keep our data current and verified. If you spot an error, please contact us.</li>
                    <li><strong>Privacy:</strong> We do not sell your data. We do not require accounts. Your assessment results and CV data stay on your device.</li>
                    <li><strong>South African First:</strong> We are built specifically for SA students. Our content, bursaries, and tips are localised and relevant.</li>
                </ul>

                <h2>Contact Us</h2>
                <p>Have a suggestion, spotted an error, or want to partner with us?</p>
                <ul>
                    <li>Email: <a href="mailto:hello@uniguide.co.za" style={{ color: 'var(--accent)' }}>hello@uniguide.co.za</a></li>
                    <li>Twitter: <a href="https://twitter.com/uniguide_za" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">@uniguide_za</a></li>
                    <li>Instagram: <a href="https://instagram.com/uniguide_za" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">@uniguide_za</a></li>
                </ul>

                <div style={{ marginTop: 48, textAlign: 'center' }}>
                    <Link href="/" className="btn btn-primary">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
