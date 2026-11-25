# Oryx Institute

The public website for **Oryx Polytechnic Institute**, trading as **Oryx Institute**. It presents the institute’s current research, practice, ventures and public status for Namibia.

**Website:** [www.oryxinstitute.org](https://www.oryxinstitute.org)

## Current status

Oryx is working toward NTA training-provider registration. It is not registered with the NTA, is not accredited by the NQA, and does not offer accredited qualifications, NQF credits or a public campus. The website keeps current work separate from future learning pathways.

For the authoritative public position, see [Institutional Status](https://www.oryxinstitute.org/status). The [Register](https://www.oryxinstitute.org/register) records confirmed updates.

## What is here

- **Research** — published Research Notes and market-research enquiries.
- **Practice** — current business counselling and scoped market-research work.
- **Ventures** — confirmed operating ventures, including Corner Spa.
- **Public record** — institutional status, dated Register entries, FAQ, contact routes and legal pages.
- **Languages** — English at the root URL and Afrikaans under `/af/`.

## Technology

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- Local image and font assets
- Server-rendered metadata, JSON-LD, sitemap, robots rules and Markdown shelf routes

## Run locally

Use a current Node.js LTS release and npm.

```bash
npm ci
npm run dev
```

The development server listens on [http://localhost:3000](http://localhost:3000).

## Check a change

```bash
npm run lint
npm run build
```

To inspect the production build locally:

```bash
npm run start
```

## Content and localisation

Public facts and shared content are maintained in:

- `src/lib/site.ts` — approved English contacts and institutional source material.
- `src/lib/site-af.ts` — Afrikaans equivalents.
- `src/lib/content.ts` — Research Notes.
- `src/lib/blog.ts` and `src/lib/careers.ts` — published notes and vacancies.

English is the primary public language. Afrikaans routes live below `/af/`. New public statements must be grounded in an approved source, or clearly described as future work. Do not add claims about accreditation, qualifications, enrolment, fees, dates, campuses or partnerships without confirmation.

## Project conventions

- Keep the canonical public URL as `https://www.oryxinstitute.org` in metadata and public documentation.
- Preserve the locked identity assets in `public/brand/`; do not recreate or alter them.
- Use descriptive alternative text for informative images and empty alternative text for decorative treatments.
- Follow [`docs/editorial-style.md`](docs/editorial-style.md) for public copy.
- Review [`public/AGENTS.md`](public/AGENTS.md) before automated or agent-assisted changes.

## Licence

No licence is currently included with this repository. Do not assume rights beyond the terms that apply to the repository until Oryx publishes a licence.
