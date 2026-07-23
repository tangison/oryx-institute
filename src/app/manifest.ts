import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oryx Institute',
    short_name: 'Oryx',
    description:
      'A multidisciplinary vocational education and training institution being established in Windhoek, Namibia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FCFBF9',
    theme_color: '#721220',
    icons: [
      {
        src: '/oryx-shield.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/oryx-shield.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['education', 'business'],
    lang: 'en',
    dir: 'ltr',
  };
}
