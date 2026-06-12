# Cinematic Editor Portfolio — Build Plan

Three routes only. Video is the focus everywhere; structure stays out of the way.

## Routes

```
src/routes/
├─ __root.tsx       — shell: minimal top nav, grain overlay, fonts, footer mark
├─ index.tsx        — / Home: hero reel + tiny intro line
├─ portfolio.tsx    — /portfolio: all works, by category
└─ contact.tsx      — /contact: bio + email
```

Top nav (in `__root.tsx`): wordmark on left, three links on right — `Index · Works · Contact`. Mono, small, lowercase, ember-on-hover. Sticky, transparent over hero, gains a faint backdrop blur after scroll. Same footer everywhere: email · year · "edited by [name]".

Each route sets its own `head()` with distinct title, description, og:title, og:description.

## 1 — Home (`/`)

- **Hero reel** (Vimeo `1162197723`) fills the viewport edge-to-edge, autoplay muted loop, no controls, slight darkening overlay, persistent film grain on top.
- Centered title set in a refined serif (e.g. Fraunces / PP Editorial), letter-by-letter fade-in. Beneath: one mono line — "editor · moving image · {city/year}" (placeholder you fill in).
- Bottom-left: small "scroll" cue that links to nothing (this page is just the reel). Bottom-right: tiny "↗ sound on" toggle.
- Just below the hero, a single quiet block: 2–3 lines of intro and a single link `→ enter the works` to `/portfolio`. No grid of thumbnails on home — keeps the reel as the primary element.

## 2 — Portfolio (`/portfolio`)

One scrolling page, mood-ordered:

```
00  Index strip (sticky left rail, scrollspy)
01  Music Videos        — staggered editorial, 2 horizontals
02  Trailer             — staggered editorial, 1 horizontal (near full-bleed)
03  Alo Yoga            — staggered editorial, 4 horizontals
04  Jubilee             — staggered editorial, 4 horizontals
05  Digital / Shorts    — single tall 9:16 focus + 3 thumbnail swap
```

### Staggered editorial layout (used by 01–04)

Asymmetric 12-col grid, generous negative space. Within each section the videos vary in width and have vertical y-offsets so nothing aligns into a grid:

```
┌──────────────────────────────────────────────────────────┐
│ 01                                                       │
│ ──                  [ video A — cols 2..8 ]              │
│ MUSIC                                                    │
│ VIDEOS                                                   │
│                                                          │
│                              [ video B — cols 6..12 ]    │
│                                  offset down ~30vh       │
│              caption · year · role (mono, small)         │
└──────────────────────────────────────────────────────────┘
```

- Huge `01`/`02`… index numbers anchor the left margin (sticky within section).
- Category title set vertically or oversized serif.
- Soft fade/translate-up on each tile as it enters viewport (framer-motion + intersection observer).

### Shorts section (vertical-only)

- One large 9:16 player on the right (~38vw, near viewport height).
- Three vertical thumbnails stacked on the left as a "program list": still frame + title + duration.
- Click swaps the focused video (cross-fade). Hover on a thumbnail starts its muted preview in place.

### Video playback behavior (everywhere)

- Default: **still poster frame** (YouTube `hqdefault`/`maxresdefault`, Vimeo via oEmbed).
- **Hover** (pointer: fine) → swap poster for a muted, loop, controls-off preview iframe (YT `mute=1&autoplay=1&controls=0&loop=1&playlist=<id>`, Vimeo `background=1`). Unmount on mouse leave.
- **Click** → fullscreen dark modal (shadcn Dialog restyled: near-black bg, grain overlay, no border, large close mark). Full embed with sound, letterboxed for horizontal, pillarboxed for vertical, title + meta below.
- Mobile / `prefers-reduced-motion`: skip hover preview; tap opens modal.

## 3 — Contact (`/contact`)

Quiet single column, max ~640px, centered, lots of negative space.

- Oversized serif heading: "Get in touch" (or similar — placeholder).
- Short bio: 2–4 sentences (placeholder text you'll edit), set in the serif at comfortable size.
- Below: mono block —
  - `email · you@domain.com` (mailto link, ember underline on hover)
  - `instagram · @handle` (optional)
  - `based in · [city]`
- No form. No "let's work together" CTA. Just the address.

## Visual direction

- **Palette**: near-black bg `oklch(0.14 0.01 60)`, warm bone text `oklch(0.92 0.02 75)`, single ember accent `oklch(0.62 0.18 35)` used sparingly (indices, hover marks, active link). No gradients.
- **Type**: serif display (Fraunces or PP Editorial via Google Fonts) + JetBrains Mono for metadata/nav. No Inter/Poppins.
- **Texture**: persistent low-opacity SVG film-grain overlay (`mix-blend-overlay`), subtle vignette at viewport edges.
- **Motion**: framer-motion, slow easings (0.6–0.9s), no bounce. Letter-by-letter title reveal on hero only.

## Content (locked in mood order)

```
01 Music Videos  — kZqPIIBZ4tg, Ma-RHYU3LOA
02 Trailer       — 6bqtZcvfuws
03 Alo Yoga      — 6UIHj_-YPEE, 2QSdVPY2688, Sry0blCEB8U, SdtKDy8-Ph4
04 Jubilee       — u4gEBRSKi2E, BlpiRAAVB1A, 3Eu80w5W2GI, k94sfLpRTpY
05 Shorts        — gW5RIOzweo4, UNK_33ex4ZY, HePZSxN5kZM, c4dq0q7Ehv0
```

Titles, years, roles, bio, email — placeholders for you to fill in after first pass.

## Technical notes

- Data lives in `src/data/works.ts`: typed `categories: Category[]` with `{ id, index, title, items: { id, platform: 'youtube'|'youtube-shorts'|'vimeo'|'mp4', videoId|src, title?, year?, role?, orientation }[] }`. Easy to swap a YouTube ID for a self-hosted MP4 later.
- New components in `src/components/portfolio/`:
  - `Nav.tsx`, `Footer.tsx`, `GrainOverlay.tsx`
  - `HeroReel.tsx` — Vimeo background player + title reveal
  - `SectionIndex.tsx` — sticky side rail w/ scrollspy
  - `CategorySection.tsx` — staggered editorial grid
  - `ShortsSection.tsx` — focus + thumbnail swap
  - `VideoTile.tsx` — poster + hover preview
  - `VideoModal.tsx` — fullscreen player dialog
- Design tokens added to `src/styles.css` (bg, ink, ember, grain, serif/mono families). No raw color classes in components.
- Fonts via `<link>` in `__root.tsx` head.
- `framer-motion` added if not present.
- Existing shadcn Dialog reused for the modal (restyled via className).
- A11y: tiles are real `<button>`s with aria-labels; Radix modal traps focus; `prefers-reduced-motion` disables hover previews.

## Out of scope

- CMS / database — content is a typed file.
- Self-hosted uploads — pluggable later via the `mp4` platform variant.
- Per-work detail pages — modal is the detail view.
