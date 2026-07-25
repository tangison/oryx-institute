import type { MetadataRoute } from 'next';

// TEMP: oryxinstitute.na DNS not yet configured. Use Vercel domain until .na resolves.
// TODO: Switch back to oryxinstitute.na once DNS is configured.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://oryx-institute.vercel.app/sitemap.xml',
    host: 'https://oryx-institute.vercel.app',
  };
}
