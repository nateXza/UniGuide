import { NextResponse } from 'next/server';

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://uniguide.co.za';

    const staticRoutes = [
        '',
        '/institutions',
        '/bursaries',
        '/assessment',
        '/cv-builder',
        '/tutoring',
        '/tools',
        '/privacy',
        '/terms',
        '/about',
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticRoutes
        .map(
            (route) => `
        <url>
            <loc>${baseUrl}${route}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>${route === '' ? '1.0' : '0.8'}</priority>
        </url>`
        )
        .join('')}
</urlset>`;

    return new NextResponse(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
