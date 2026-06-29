# MyTutorCY

A **Cyprus tutoring marketplace** prototype. Parents search tutors by subject,
location, level, price and availability; tutors register and create profiles.

It's a **static single-page app** with **no backend** — all data (auth, tutors,
reviews, favourites, enquiries) lives in the browser via `localStorage`, accessed
only through the data seam in [`src/lib/db.ts`](src/lib/db.ts). Deploys to GitHub Pages.

## Tech stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router (HashRouter — GitHub Pages has no SPA fallback)
- react-hook-form + zod for forms
- lucide-react for icons

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static build → dist/
npm run preview  # preview the production build
```

## Demo accounts

| Role   | Email            | Password   |
| ------ | ---------------- | ---------- |
| Parent | `parent@demo.cy` | `demo1234` |
| Tutor  | `tutor@demo.cy`  | `demo1234` |

You can also sign up a new parent account, or register a brand-new tutor via
**Become a Tutor** — the new profile appears in search immediately.

> ⚠️ Authentication is **cosmetic** (passwords are stored in plain text in
> `localStorage`). This is fine for a single-machine demo only — never use a real
> password.

## How the data layer works

Every component reads and writes data **only** through `src/lib/db.ts`. All of its
functions are `async`, so swapping localStorage for a real database (e.g. Supabase)
later is a **one-file change** — the function signatures stay identical and no
component needs to change.

## Design & styling

The visual system is token-driven so a restyle is a one-file change:

- **Palette & type tokens** live in [`src/index.css`](src/index.css) as Tailwind v4
  `@theme` variables — semantic `brand` (teal), `accent` (amber), `ink` (navy),
  surfaces, soft shadows. Change them there and the whole app follows. Components
  use the utilities they generate (`bg-brand-500`, `text-ink`, `shadow-soft`,
  `font-display`, …).
- **Fonts:** [Poppins](https://fonts.google.com/specimen/Poppins) (headings) and
  [Inter](https://fonts.google.com/specimen/Inter) (body), loaded from Google Fonts.
  Both are licensed under the **SIL Open Font License 1.1** — free for commercial use.
- **Illustrations:** hand-authored in-house flat SVG in
  [`src/components/Illustrations.tsx`](src/components/Illustrations.tsx) (hero, the
  three "how it works" steps, and the empty state). Original work — **no third-party
  license required**.
- **Icons:** [lucide-react](https://lucide.dev) (ISC license).

## Notes

- Data is **per browser**. Clearing site data resets the demo to its seeded state.
- Deploy happens automatically on every push to `main` via GitHub Actions
  (`.github/workflows/deploy.yml`) — no secrets required.

## Roadmap (not built in this prototype)

Online payments, booking calendar, real tutor verification, video intros,
AI matching, referral programme, school partnerships, and a mobile app.
