import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security headers middleware — Oryx Institute production site.
 *
 * Sets comprehensive security headers on every response:
 *   - Content-Security-Policy: Restrict resource loading to trusted origins
 *   - X-Frame-Options: Prevent clickjacking via iframe embedding
 *   - X-Content-Type-Options: Prevent MIME-type sniffing
 *   - Strict-Transport-Security: Enforce HTTPS for 1 year + include subdomains
 *   - Referrer-Policy: Strip referrer on cross-origin, full on same-origin
 *   - Permissions-Policy: Disable unused browser APIs (camera, microphone, etc.)
 *
 * CSP notes:
 *   - Self-hosted fonts (Cinzel, Source Sans 3, Noto Serif via next/font)
 *   - Self-hosted images and videos (/public/ — no external image CDN)
 *   - Google Fonts is used via next/font inline CSS, so style-src needs font URLs
 *   - Vercel analytics/insights scripts are allowed for production monitoring
 *   - No external scripts, no inline scripts except Next.js runtime
 *
 * Canonical-domain note:
 *   The site currently deploys to oryx-institute.vercel.app (Vercel subdomain).
 *   The future permanent domain will be oryxinstitute.na once DNS is configured.
 *   When switching, update CSP connect-src/frame-src domains accordingly.
 */

const SECURITY_HEADERS = {
  // Content-Security-Policy — restrictive baseline for a static VET institution site
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com", // Next.js runtime + Vercel analytics
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com", // next/font Google Fonts injection
    "font-src 'self' https://fonts.gstatic.com", // Google Fonts file hosting
    "img-src 'self' data: blob:", // self-hosted images + Next.js image optimization data URIs
    "media-src 'self'", // self-hosted video (hero .mp4/.webm)
    "object-src 'none'", // no Flash/Java/PDF embeds
    "frame-src 'none'", // no iframe content (Vercel preview embeds excluded)
    "connect-src 'self' https://vitals.vercel-insights.com", // Vercel Web Vitals reporting
    "base-uri 'self'",
    "form-action 'self'", // forms submit only to own API
    "frame-ancestors 'none'", // equivalent to X-Frame-Options DENY
  ].join('; '),

  // X-Frame-Options — redundant with CSP frame-ancestors, but kept for legacy browsers
  'X-Frame-Options': 'DENY',

  // X-Content-Type-Options — prevent browsers from MIME-sniffing responses
  'X-Content-Type-Options': 'nosniff',

  // Strict-Transport-Security — enforce HTTPS for 1 year, include subdomains
  // Vercel already provides HSTS, but we set our own for self-hosted deploys
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Referrer-Policy — full referrer on same-origin, stripped on cross-origin
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions-Policy — disable APIs the site does not use
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'speaker=()',
    'sync-xhr=()', // no synchronous XMLHttpRequest
  ].join(', '),

  // X-DNS-Prefetch-Control — opt out of DNS prefetching for privacy
  'X-DNS-Prefetch-Control': 'off',
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply security headers to every response
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  return response;
}

// Middleware config — match all routes except Next.js internals
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files with extensions (.png, .jpg, .webp, .mp4, .webm, .ico, .txt)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|webp|avif|mp4|webm|ico|txt|xml|webmanifest|json)$).*)',
  ],
};
