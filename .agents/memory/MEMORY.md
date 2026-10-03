# Project Memory — Lake Como (lakecomo)

## Project Stack

- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS v4 (CSS-first, `@import "tailwindcss"`, no tailwind.config.ts)
- Sanity v4 CMS (project ID: c20abca7, dataset: production)
- Framer Motion v12, Lenis smooth scroll v1.3.17
- Lucide React icons, next-sanity v11

## Architecture — Single-Page Scrolling (redesigned 2026-03)

The site is now a **single-page scrolling app**. All multi-page routes removed.

**Active routes:**

- `/` — Single landing page (7 scroll sections)
- `/admin/[[...tool]]` — Sanity Studio
- `/api/send-email` — Contact form handler
- `/api/revalidate` — Sanity webhook revalidation
- `/sitemap.xml`

**Old routes 301 redirect:** themes→/#story, cast→/#experience, contact→/#contact, crew/gallery/movie/process/venue/faq→/, **mission-experience→/#experience**

## Key File Paths

- Main page entry: `src/app/(main)/page.tsx`
- Orchestrator: `src/app/(main)/sections/LandingPage.tsx`
- Section components: `src/app/(main)/sections/`
  - `HeroSection.tsx` — full-screen video hero
  - `StorySection.tsx` — intro + Real-Life 007 two-column
  - `ExperienceSection.tsx` — CastCarousel + gold CTA + inline MissionHero/MissionSetup/MissionPhases
  - `AssignmentSection.tsx` — mission cards
  - `PrivateEventsSection.tsx` — private events + photo/video highlights
  - `UpcomingEventsSection.tsx` — CMS-driven event grid (anchor: `#events`)
  - `EventCard.tsx` — event card sub-component (object-contain letterbox images + video)
  - `InquireSection.tsx` — contact form
- Shared carousel: `src/components/shared/CastCarousel.tsx`
- Sanity data: `src/sanity/lib/getLandingPage.ts` (single unified GROQ query — events embedded)
- Sanity schema: `src/sanity/schemaTypes/landingPage.ts` only (no standalone event schema)
- Seed script: `npm run sanity:seed -- --type=landingPage` (uses `scripts/sanity/seed-from-json.ts`)
- Mission components: `src/components/sections/mission/` (MissionHero, MissionSetup, MissionPhases, PhaseCarousel)
- Types exported from `getLandingPage.ts`: `MissionPhase`, `MissionHeroData`, `MissionSetupData`, `EventData`
- CSS variables: `src/app/globals.css`

## Design System (globals.css) — DARK THEME

- `--bg-primary: #0a0a0f` `--bg-secondary: #111118`
- `--header-bg: rgba(10,10,15,0.85)`
- `--text-primary: #e8e8ec` `--text-secondary: rgba(255,255,255,0.65)` `--text-muted: rgba(255,255,255,0.40)`
- `--accent: #c9a84c` (gold flat) `--accent-text: #0a0a0f`
- `--accent-gradient` — premium gold gradient, use on all CTA buttons/backgrounds
- `--accent-gradient-text` — for text; use with `.gold-text` CSS class
- `.gold-text` — gradient text utility (webkit-background-clip: text) in globals.css
- `--silver: #b8b8c4` `--silver-muted: rgba(184,184,196,0.4)`
- `--border-color: rgba(255,255,255,0.12)` `--divider-color: rgba(255,255,255,0.15)`
- Fonts: `--font-limelight` (Limelight), `--font-courier` (Courier Prime), Inter (body)
- Fluid type: `--fs-hero` `--fs-h2` `--fs-h3` `--fs-body` `--fs-label` `--fs-cta`
- Spacing: `--section-py` `--section-gap`

## Anchor Navigation (Header.tsx)

- Inline nav: Logo (left) | Story/Experience/Assignment/Private Events/Upcoming Events (center) | Inquire gold pill (right)
- Links starting with `/#` scroll via `lenisRef.current?.scrollTo(el, { offset: -48 })`
- Logo button scrolls to `/#hero`
- `useLenis()` exposes `{ stop, start, lenisRef }` — only `lenisRef` used in Header now (no sidebar)
- Anchors: `#story` `#experience` `#assignment` `#private-events` `#events` `#contact`
- `#mission-experience` — div injected by ExperienceSection after the carousel (CTA scrolls here)

## Sanity Schemas

**`landingPage` (singleton)** — single document for ALL page content.
Groups: `hero`, `story`, `experience`, `assignment`, `privateEvents`, `upcomingEvents`, `inquire`, `seo`

`experience.missionExperience`: hero, setup, phases[] with icon select dropdown (lock/file-text/users/key/target)

**`upcomingEvents.events[]` (embedded array in landingPage)** — events are NOT a separate document type.
Fields per event: title, badge, eventType (radio), date, time, image, videoFile, description, location, ctaLabel, pinned, displayOrder
- Query: `upcomingEvents.events[] | order(pinned desc, displayOrder asc)` inside the main landingPage query
- Event image: `object-contain` + black letterbox, never cropped
- Event video: optional `videoFile` (mp4/webm), takes priority over image when set
- Seed: `npm run sanity:seed -- --type=landingPage` (events are embedded in landingPage.json)
- `EventData._id` = array item `_key` in GROQ; `EventData.videoUrl` = `videoFile.asset.url`

**`navbar` / `footer` (singletons)**

## Sanity Studio UX (admin)

- Sidebar: "Website Content" → Landing Page | (divider) | Navigation Bar | Footer
- Events are managed inside the Landing Page → "Upcoming Events" tab
- Phase icon: radio select (no free text)
- Private event feature icon: radio select (target/map-pin/martini/briefcase)
- Advanced nested fields (SEO, form config, success state) use `collapsed: true`

## CMS Patterns

- Write token env var: `SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS`
- Client: `import { client } from "@/sanity/lib/client"` (useCdn: false)
- URL helper: `urlFor(image).auto("format").quality(85).width(W).url()`
- Caching: `unstable_cache` with `DEFAULT_REVALIDATE = 1`
- Dev: bypass cache with direct fetch; prod: use cached version

## Animation Patterns (Framer Motion)

- Section enter: `initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }}`
- Stagger: `containerVariants` with `staggerChildren: 0.2`
- Hover lift: `whileHover={{ y: -6 }}`
- Never use `motion.button` inside `Link` — use `motion.span` with `cursor-pointer`

## Sanity Migration Engine v3 (added 2026-03-16)

- Scripts: `scripts/sanity/` (11 TypeScript files)
- Runner: `tsx --tsconfig tsconfig.scripts.json`; new devDeps: `tsx`, `@sanity/client`
- Mirror: `sanity-mirror/` (documents/, schemas/, queries/, schema-map.json, generated-types.ts)
- Backups: `sanity-backups/YYYY-MM-DD/<timestamp>/` (gitignored)
- Write token env var: `SANITY_WRITE_TOKEN_WITH_EDITOR_ACCESS`
- KNOWN_TYPES: `landingPage`, `navbar`, `footer` (no `event` — events are embedded)
- Full pipeline: `npm run sanity:migrate` → snapshot → diff → plan → seed
- Safe seed rules: `createIfNotExists` (new) / `createOrReplace` (existing), never deletes
- Docs: `SANITY_MIGRATION.md`

## Build Checks

- TypeScript: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build`
- All three pass as of 2026-03-17 (post events-embedded-in-landingPage refactor)

## User Preferences

- Minimal motion, cinematic style
- No emojis unless asked
- Concise responses
