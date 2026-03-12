import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'UniGuide — South Africa\'s #1 Student Platform',
    description: 'Find universities, TVET colleges, bursaries, career guidance, and free academic tools for South African students. Compare institutions, take a career assessment, and build your CV.',
    keywords: 'south africa university, NSFAS, bursaries, TVET colleges, career assessment, student platform, institutions, compare universities',
    openGraph: {
        title: 'UniGuide — South Africa\'s #1 Student Platform',
        description: 'Find universities, bursaries, career guidance, and free academic tools for SA students.',
        siteName: 'UniGuide',
        locale: 'en_ZA',
        type: 'website',
    },
    icons: {
        icon: '/favicon.svg',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UniGuide',
    url: 'https://uniguide.co.za',
    description: 'South Africa\'s #1 student platform for universities, bursaries, career guidance, and academic tools.',
    potentialAction: {
        '@type': 'SearchAction',
        target: 'https://uniguide.co.za/institutions?search={search_term_string}',
        'query-input': 'required name=search_term_string',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en-ZA">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>
                <a href="#main-content" className="skip-link">Skip to main content</a>
                <Nav />
                <main id="main-content">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
