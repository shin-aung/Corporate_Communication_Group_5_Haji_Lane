# The Loop by 5 — Website

> PGDM Group 5 · Corporate Communication · AceTek College, Singapore

A polished, responsive editorial website built with **React + TypeScript + Vite** for the Group 5 Corporate Communication Outdoor Activity newsletter.

---

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| TypeScript | 5 |
| Vite | 5 |
| React Router | 6 |

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/         # Header, Footer, BackToTop
│   ├── home/           # Hero section
│   ├── story/          # Haji Lane story section
│   ├── programme/      # Outdoor activity programme
│   ├── team/           # Team cards + profile modal
│   ├── gallery/        # Photo gallery with lightbox
│   ├── videos/         # Video gallery
│   ├── links/          # Achievement & portfolio links
│   ├── subscribe/      # Subscribe form + social links
│   └── common/         # Shared UI components
├── data/               # All content data (TypeScript)
├── pages/              # Page-level components
├── types/              # TypeScript interfaces
├── styles/             # Global CSS + design tokens
└── utils/              # Hooks and helpers
```

---

## Adding Media

### Images
1. Download images from Google Drive: **Corporate Communication Outdoor Activities/Images**
2. Compress and rename (e.g. `haji-lane-01.jpg`, `group-photo-01.jpg`)
3. Place in `public/media/images/gallery/`
4. Update `src` paths in `src/data/media.ts`

### Videos
1. Download videos from Google Drive: **Corporate Communication Outdoor Activities/Videos**
2. Rename (e.g. `outdoor-activity-01.mp4`)
3. Place in `public/media/videos/`
4. Update `src` paths in `src/data/media.ts`

### Team Profile Photos
- Place in `public/media/images/team/`
- Filenames match entries in `src/data/teamMembers.ts`

---

## Updating Content

All website content is stored in `src/data/`:

| File | Content |
|------|---------|
| `siteMeta.ts` | Site title, dates, lecturer, college |
| `teamMembers.ts` | All 5 team member profiles |
| `media.ts` | Image and video file paths |
| `programme.ts` | Programme cards and learning outcomes |
| `storySections.ts` | Haji Lane article and destination cards |

---

## Aung Min Thant Profile

> ⚠️ **Important:** Do not remove Aung Min Thant from the About Me section.

His profile is currently marked as **pending** and shows placeholder content.
Update `src/data/teamMembers.ts` with his confirmed details before final submission:

- `from` — city and country
- `role` — current job or student role
- `strengths` — 4–6 short phrases
- `interests` — 3–5 hobbies or interests
- `values` — 3–5 values or goals
- `links` — achievement/portfolio links (if any)
- `image` — add photo to `public/media/images/team/aung-min-thant.jpg`

---

## Deployment

### Vercel (recommended)
```bash
npm run build
# Push to GitHub → connect repo to Vercel → auto-deploy
```

### Netlify
```bash
npm run build
# Drag and drop the dist/ folder to Netlify
```

### GitHub Pages
Configure Vite base path in `vite.config.ts` if deploying to a subdirectory.

---

## Environment Variables

Copy `.env.example` to `.env.local` for optional integrations:

```bash
cp .env.example .env.local
```

See `.env.example` for available variables (Google Drive API, EmailJS).

---

*© 2026 PGDM Group 5 · AceTek College Singapore*
