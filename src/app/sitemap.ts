import type { MetadataRoute } from 'next';
import { schools, programmes } from '@/lib/content';
import { glossaryEntries } from '@/lib/glossary';

// TEMP: oryxinstitute.org DNS not yet configured. Use Vercel domain until .na resolves.
// TODO: Switch back to oryxinstitute.org once DNS is configured.

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://oryxinstitute.org';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/schools`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/programmes`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/rpl`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/wil`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/advisory-research`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/updates`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/founder`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/brand`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/research`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/register`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${base}/partners`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/partners/employers`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/partners/wil`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/partners/corporate`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/partners/research`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/partners/funding`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/accessibility`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/site-map`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const schoolRoutes: MetadataRoute.Sitemap = schools.map((s) => ({
    url: `${base}/schools/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const programmeRoutes: MetadataRoute.Sitemap = programmes.map((p) => ({
    url: `${base}/programmes/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = glossaryEntries.map((e) => ({
    url: `${base}/glossary/${e.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...schoolRoutes, ...programmeRoutes, ...glossaryRoutes];
}

