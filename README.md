# SYNCra Digital Agency — Website

Production website for SYNCra Digital Agency. Built against the approved
**SYNCra Digital Agency — Final Implementation Specification**.

Implemented through **Phase 7 (CMS / Database / Admin Foundation)**.
See "Phase status" below for exactly what exists vs. what's still ahead.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (token-driven — see below)
- PostgreSQL (Supabase) via Prisma
- Auth.js (NextAuth v4, credentials provider) — admin-only, no public accounts
- R2/S3, Resend: not installed yet — added in Phase 8/9 respectively

## Phase status

| Phase | Scope | Status |
|---|---|---|
| 1 | Project foundation, design tokens | Done |
| 2 | Global header/nav/footer | Done |
| 3 | Homepage | Done |
| 4 | Services (`/services`, `/services/[slug]`) | Done |
| 5 | Portfolio (`/portfolio`, `/portfolio/[slug]`) | Done |
| 6 | About + Contact | Done |
| 7 | Database schema, Prisma, admin auth, admin route foundation | Done |
| 8 | Full CMS CRUD (projects/services/technologies/testimonials), media upload | Not started |
| 9 | Inquiry API + Resend email workflow | Not started |
| 10 | Full SEO/sitemap/robots/error pages/accessibility QA | Not started |

The public site (`/`, `/services*`, `/portfolio*`, `/about`, `/contact`) is
fully static/content-driven from `src/content/*.ts` and does **not** depend
on the database — it works whether or not `DATABASE_URL` is configured.

## Design tokens

All color/typography/spacing token **values** live in exactly one
place: `src/app/globals.css` (CSS custom properties). Tailwind
(`tailwind.config.ts`) reads from those variables rather than
duplicating values, so a brand-color change is a one-line edit in one
file.

| Token | Value | Role |
|---|---|---|
| `--color-deep-sea` | `#156874` | Primary accent / interactive |
| `--color-deep-sea-dark` | `#0e4750` | Dark sections, footer |
| `--color-steam` | `#ede6e6` | Light backgrounds |
| `--color-surface` | `#ffffff` | Content surfaces |
| `--color-ink` | `#1b2124` | Primary text |
| `--color-muted` | `#6e7a7d` | Secondary text/metadata |

Typography: **Space Grotesk** (display/body) + **JetBrains Mono**
(functional/technical data only — tech tags, specs, timestamps; never
decorative), loaded via `next/font/google` in `src/app/layout.tsx`.

## Brand asset

The official SYNCra logo is at `public/brand/syncra-logo.png`, used
exactly as supplied — untouched, unmodified, wired into the global
header/footer since Phase 2. A simplified/favicon-scale variant
remains a known open item, deferred per the locked specification.

## Database (Phase 7)

Schema: `prisma/schema.prisma` — Admin, Service, Project, Technology,
ProjectMedia, Testimonial, Inquiry, SiteSettings, plus the
Project↔Service, Project↔Technology, and Inquiry↔Service join tables.

```bash
# Once DATABASE_URL and DIRECT_URL are set in .env.local:
npm run db:generate   # generate the Prisma client
npm run db:migrate    # create/apply the initial migration (dev)
npm run db:seed       # idempotent: seeds the six approved services;
                       # optionally bootstraps one Super Admin if
                       # ADMIN_BOOTSTRAP_EMAIL/PASSWORD are set
npm run db:studio     # Prisma Studio, for inspecting data directly
```

No migration has been applied and no seed has been run in this
environment — see the Phase 7 completion report for why (no database
credentials exist here, and none were requested from the user in
chat).

## Admin (Phase 7 foundation only)

`/admin/login` — credentials sign-in (email + bcrypt-hashed password
against the `Admin` table). `/admin` and everything under it is
session-protected by `middleware.ts` (edge-compatible JWT check) and,
redundantly, by the `(protected)` layout's own server-side session
check. The dashboard shows real Prisma counts (honestly 0 on an empty
database) with a calm "unable to connect" state if the database isn't
configured yet. Every other admin module (`/admin/projects`,
`/admin/services`, `/admin/technologies`, `/admin/testimonials`,
`/admin/inquiries`, `/admin/settings`) is currently a placeholder
route stating that full CRUD is Phase 8 — the route/auth foundation
exists, the CRUD UI doesn't yet.

There is no default admin account. One is created only by running
`npm run db:seed` with `ADMIN_BOOTSTRAP_EMAIL`/`ADMIN_BOOTSTRAP_PASSWORD`
set.

## What's intentionally not here yet (later phases)

- Full CMS CRUD for projects/services/technologies/testimonials (Phase 8)
- Media upload to object storage (Phase 8)
- Public inquiry API + Start a Project form + Resend email (Phase 9)
- Full SEO/sitemap/robots/custom error pages/accessibility QA (Phase 10)

## Environment variables

See `.env.example` for the full list. No real or placeholder-looking
credentials exist anywhere in this repository. Server-only variables
are documented in `src/lib/env.ts`.

## Getting started (once dependencies can be installed)

```bash
npm install
npm run db:generate   # after DATABASE_URL/DIRECT_URL are set
npm run dev
```

`npm install` could not be executed in the sandbox this project was
built in (registry access is blocked there) — see the phase completion
reports for details. It should install normally on your machine or in
a CI/Vercel environment with standard npm registry access.

