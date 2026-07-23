import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://oryxinstitute.na/sitemap.xml',
    host: 'https://oryxinstitute.na',
  };
}
