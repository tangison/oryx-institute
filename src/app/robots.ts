import type { MetadataRoute } from 'next';

// TEMP: oryxinstitute.org DNS not yet configured. Use Vercel domain until .na resolves.
// TODO: Switch back to oryxinstitute.org once DNS is configured.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://oryxinstitute.org/sitemap.xml',
    host: 'https://oryxinstitute.org',
  };
}
