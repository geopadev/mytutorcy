# CLAUDE.md — MyTutorCY

MyTutorCY is a Cyprus tutoring marketplace. Parents search tutors by subject,
location, level, price, availability; tutors register and create profiles.
This is a **prototype**: a static SPA on **GitHub Pages** with **NO backend** —
all data lives in the browser via **localStorage**, accessed only through
`src/lib/db.ts`.

## Tech stack
- Vite + React 19 + TypeScript (static build, no server)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v7 using **HashRouter** (Pages has no SPA fallback)
- react-hook-form + zod for forms
- lucide-react for icons

## Hard constraints
- **No backend, no server.** Don't add Next.js API routes, server actions, or any
  runtime dependency. There is no database service.
- **All data access goes through `src/lib/db.ts`.** Components must NEVER call
  `localStorage` directly. `db.ts` functions are async on purpose — keep them async
  so the future swap to Supabase is a one-file change.
- **`vite.config.ts` `base` must equal the repo name** (`/mytutorcy/`) while on
  Pages. Don't remove it.
- **HashRouter, not BrowserRouter**, while on Pages.
- Namespace any localStorage keys with `mytutorcy:` (Pages shares one origin across
  all your projects).

## Layout
```
src/lib/db.ts            # the ONLY data layer (localStorage today, Supabase later)
src/context/AuthContext  # session + current user, backed by db.ts
src/components/          # TutorCard, SearchBar, Filters, ReviewList, …
src/pages/               # Home, FindTutor, TutorProfile, BecomeTutor, Account, static pages
.github/workflows/deploy.yml
```

## Commands
- `npm run dev` — local dev
- `npm run build` — static build → dist/
- `npm run preview` — preview the build
Deploy = push to `main` (Actions builds + publishes; no secrets).

## Conventions
- Commits: casual, lowercase, imperative; one concern per commit.
- Small single-purpose components; pages compose them and own data-fetching.
- Tailwind utilities inline; rounded cards, mobile-first; palette: white bg,
  navy/deep-blue (trust), light blue/turquoise (accents), soft yellow/orange
  (highlights).
- It's a prototype: build the screens, don't build a framework. Payments, booking
  calendar, AI matching, real verification are explicitly Phase 2 — don't build them.

## Demo auth note
Auth is cosmetic (plaintext in localStorage) — fine for a single-machine demo, never
for production. Don't use real passwords. Demo accounts: parent@demo.cy /
tutor@demo.cy, password demo1234.
