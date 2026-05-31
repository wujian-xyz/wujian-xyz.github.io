# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
yarn dev                  # Start dev server (Next.js with Contentlayer2 auto-rebuild)
yarn build                # Production build (Next.js + postbuild RSS generation)
yarn serve                # Serve the production build

# Linting & formatting
yarn lint                 # ESLint across app, components, layouts, scripts
npx prettier --write .    # Prettier formatting

# Static export & deployment
yarn deploy               # Deploy `out/` to GitHub Pages via gh-pages
yarn static:serve          # Serve the static export locally
yarn analyze               # Build with @next/bundle-analyzer
```

## Architecture Overview

**Stack**: Next.js 15 App Router + Contentlayer2 + Tailwind CSS v4 + Pliny ecosystem. Package manager is **Yarn 3.6.1** with `node-modules` linker.

### Content Layer (Contentlayer2)

All content lives as MDX files in `data/`:
- `data/blog/**/*.mdx` → Blog posts (type `Blog`, generates pages at `/blog/<slug>`)
- `data/authors/**/*.mdx` → Author profiles (type `Authors`)

Contentlayer2 processes these at build time (or on file change in dev) into `.contentlayer/generated/`. The generated types and data are imported from `contentlayer/generated` throughout the app.

The `contentlayer.config.ts` file defines the document types, MDX plugins (remark for parsing, rehype for HTML output), and `onSuccess` hooks that generate:
- `app/tag-data.json` — Tag counts for the tag listing pages
- `public/search.json` — Search index for kbar

### Routing (Next.js App Router)

```
app/
├── layout.tsx          # Root layout: fonts, metadata, ThemeProviders, Analytics, SearchProvider, Header, Footer
├── page.tsx            # Home page — imports Main.tsx with sorted posts
├── Main.tsx            # Home page UI (hero, recent posts, projects, author card)
├── blog/
│   ├── page.tsx        # Blog listing (5 posts per page, uses ListLayoutWithTags)
│   ├── page/[page]/    # Paginated blog listing
│   └── [...slug]/      # Individual blog post — dynamic layout selection
├── tags/
│   ├── page.tsx        # All tags list
│   └── [tag]/page/[page]/  # Tag-filtered posts (paginated)
├── projects/page.tsx   # Projects page
├── about/page.tsx      # About page
├── api/newsletter/     # Newsletter subscription API route
├── theme-providers.tsx # 'use client' wrapper for next-themes
└── seo.tsx             # genPageMetadata() helper for page SEO
```

### Layout System (Blog Posts)

Each blog post selects its layout via frontmatter `layout` field. Three layouts available in `layouts/`:

| Layout | File | Purpose |
|--------|------|---------|
| `PostLayout` | `PostLayout.tsx` | Default — full post with TOC sidebar, metadata, prev/next |
| `PostSimple` | `PostSimple.tsx` | Minimal — title, content, no sidebar |
| `PostBanner` | `PostBanner.tsx` | Hero image banner + content |

The blog post page (`app/blog/[...slug]/page.tsx`) renders a `TocMenu` and `RightTools` sidebar (fixed positioning, hidden on mobile) alongside the selected layout.

### Key Components

- **`Header`** (`components/Header.tsx`) — Site header with nav links from `data/headerNavLinks.ts`, theme toggle, search button, mobile nav
- **`Footer`** (`components/Footer.tsx`) — Site footer
- **`Comments`** (`components/Comments.tsx`) — Giscus comment widget, configured via `siteMetadata.comments.giscusConfig`
- **`search/`** — kbar-based local search (`KBar.tsx`, `KBarModal.tsx`, `index.tsx` provider wrapper)
- **`RightTools`** (`components/RightTools.tsx`) — Floating sidebar on blog posts (scroll to top, comment button, back to list, next/prev)
- **`TocMenu`** (`components/TocMenu.tsx`) — Table of contents sidebar extracted from MDX headings
- **`Card`** (`components/Card.tsx`) — Blog post card used in listings
- **`MDXComponents`** (`components/MDXComponents.tsx`) — Custom MDX component mapping (links, images, code blocks, tables)

### Build & Deploy

- **Static export**: Set `EXPORT=true` in env to produce a fully static site in `out/` (`output: 'export'` in next.config.js)
- **RSS generation**: `scripts/postbuild.mjs` runs after `next build`, calling `scripts/rss.mjs` to generate `out/feed.xml`
- **Deployment**: `gh-pages -d out` deploys the `out/` directory to the `gh-pages` branch of the GitHub repo

### Configuration

- **`data/siteMetadata.js`** — Central site config: title, author, analytics (Umami), comments (Giscus), search (kbar), newsletter
- **`.env` / `.env.local`** — Environment variables for Giscus IDs, Umami ID, analytics keys, newsletter API keys
- **`next.config.js`** — CSP headers, security headers, SVGR webpack config, image remote patterns, Contentlayer + Bundle Analyzer plugins

### Styling

- **Tailwind CSS v4** with custom theme in `css/tailwind.css` (uses `@theme` block with `--color-xyz-*` custom colors)
- **Dark mode**: class-based via `next-themes`, toggled by `ThemeSwitch` component
- **Custom scrollbar**: `css/xyz-scrollbar.css`
- **Code highlighting**: `css/prism.css` (rehype-prism-plus theme)
- **Font**: Space Grotesk via `next/font/google`

### Content

Blog posts are MDX files in `data/blog/` with frontmatter:
- Required: `title`, `date`
- Optional: `tags`, `lastmod`, `draft`, `summary`, `images`, `authors`, `layout`, `bibliography`, `canonicalUrl`
- Draft posts (`draft: true`) are excluded from production builds via the `allCoreContent` helper
