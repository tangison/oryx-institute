# Oryx Institute

Training institute website with a course catalogue.

**Preview:** [https://oryx-institute.vercel.app](https://oryx-institute.vercel.app)  
**Status:** Client site  
**Visibility:** Public

## What this is

Site for the Oryx Institute presenting programmes, admissions and institutional pages.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Framer Motion
- lucide-react icons
- Prisma ORM
- sharp image pipeline

## Getting started

```bash
git clone https://github.com/tangison/oryx-institute.git
cd oryx-institute
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
| `npm run db:push` | Push the Prisma schema to the database. |
| `npm run db:generate` | Generate the Prisma client. |
| `npm run db:migrate` | Run Prisma migrations. |
| `npm run db:reset` | Drop and recreate the database. |

## Routes

25 page routes.

```
/
/about
/advisory-research
/brand
/contact
/faq
/founder
/glossary
/glossary/[slug]
/legal/accessibility
/legal/privacy
/legal/terms
/partners
/partners/[type]
/programmes
/programmes/[slug]
/register
/research
/rpl
/schools
/schools/[slug]
/site-map
/updates
/updates/[slug]
/wil
```

## Environment

Create `.env.local` for local secrets. Never commit it.

> **Security note.** This repository currently has `.env` committed to the default branch. It must be removed from the working tree and from git history, and any live value it contains must be rotated first. See `SECURITY.md` in the audit workspace for the full finding and the remediation order.

## Deployment

Deployed on Vercel. No custom domain is attached to this project.

## Maintainer

Built and maintained by **Tangison Technologies**, Windhoek, Namibia.

| | |
|---|---|
| Main line | [+264 83 411 522](tel:+264813411522) (`083411522`) |
| Email | contact@tangison.com |
| Web | https://tangison.com |

## Licence

Proprietary. Copyright Tangison Technologies. All rights reserved.
