# AGENTS.md

This is a living document for agents (and developers) working in this repository. It captures the conventions, patterns, and assumptions specific to this codebase. Update this file whenever overarching changes are made that affect how agents should operate here — keep it current with the actual state of the repo, not as a changelog.

---

## Handoff

Before starting any work, check whether a `HANDOFF.md` file exists at the repository root.

- **If it exists:** Read it fully, absorb the context and next steps described in it, then **delete the file** before proceeding.
- **If it does not exist:** No handoff is needed — proceed normally.

If you are stopping mid-task and want to preserve state for the next agent, create a `HANDOFF.md` at the repository root describing exactly where you left off and what the next steps are. Remove it once the work is complete.

---

## Project Overview

This is a personal website and blog for Saikat Das, built as a **statically generated site** with the following core stack:

| Technology | Role |
|---|---|
| [SvelteKit](https://kit.svelte.dev/) | Framework (static adapter) |
| [TypeScript](https://www.typescriptlang.org/) | Language |
| [TailwindCSS v2](https://tailwindcss.com/) | Styling (JIT mode) |
| [mdsvex](https://mdsvex.com/) | Markdown-in-Svelte for blog posts and project entries |
| [PostCSS](https://postcss.org/) + autoprefixer + cssnano | CSS processing |
| [lunr](https://lunrjs.com/) | Client-side full-text search index |
| [date-fns](https://date-fns.org/) | Date formatting |
| [vite-imagetools](https://github.com/JonasKruckenberg/imagetools) | Image optimization at build time |

The static adapter renders all pages at build time. There is no server-side runtime.

---

## Repository Structure

```
/
├── mdsvex.config.js          # mdsvex configuration (extensions, layouts)
├── svelte.config.js          # SvelteKit config (adapter, path aliases, vite plugins)
├── tailwind.config.cjs       # Tailwind theme extensions and plugins
├── postcss.config.cjs        # PostCSS plugins
├── tsconfig.json             # TypeScript config
├── .eslintrc.cjs             # ESLint config
├── src/
│   ├── app.html              # Root HTML shell
│   ├── app.postcss           # Global styles (Tailwind directives + Prism theme)
│   ├── types.d.ts            # Shared TypeScript types
│   ├── global.d.ts           # Global ambient declarations
│   ├── components/           # Reusable Svelte components
│   ├── icons/                # SVG icon components (Svelte wrappers)
│   ├── routes/               # SvelteKit file-based routes
│   └── utils/                # Utility functions and constants
└── static/                   # Static assets (images, logos, manifest, service worker)
```

---

## Path Aliases

Defined in `svelte.config.js` under `kit.vite.resolve.alias`. Always use these instead of relative paths where applicable:

| Alias | Resolves to |
|---|---|
| `$components` | `./src/components` |
| `$utils` | `./src/utils` |
| `$icons` | `./src/icons` |

Example import:
```ts
import BlogPostCard from "$components/BlogPostCard/BlogPostCard.svelte";
import { WIDTH_TO_AUTO_OPEN_NAVIGATION_MENU_AT } from "$utils/constants";
import GithubIcon from "$icons/logos/github-icon.svelte";
```

---

## Component Conventions

- Components live in `src/components/<ComponentName>/<ComponentName>.svelte`.
- Use `<script lang="ts">` in all Svelte components.
- Props are `export let` declarations with explicit TypeScript types.
- Scoped styles go in a `<style>` block inside the component. Tailwind utility classes are preferred for layout; scoped styles are used for custom CSS-only effects (e.g., animations, custom decorations).
- The `class` prop on icons is named `className` (not `class`) to avoid conflicts with the JS keyword.

---

## Icon Components

Icons are thin Svelte wrappers around inline SVGs, organized under `src/icons/`:

```
src/icons/
├── flat-color-icons/   # Flat UI icons (home, news, deployment, search, share)
├── logos/              # Brand/service logos (GitHub, LinkedIn, npm, etc.)
└── twemoji/            # Twemoji emoji SVGs
```

Each icon accepts a `className` prop (default `"h-4"`) to control size via Tailwind height utilities.

---

## Routes and Layouts

SvelteKit file-based routing is used. Key conventions:

- `__layout.svelte` — top-level site layout (navigation, global wrapper)
- `_layout.svelte` inside a sub-route — layout for that section only (e.g., blog posts, project entries)
- Routes prefixed with `_` (like `_index/`) are non-routable component directories, not pages
- JSON endpoints use the `.json.ts` suffix (e.g., `getBlogPosts.json.ts`, `getProjectEntries.json.ts`)

---

## Blog Posts

Blog posts live at:
```
src/routes/blog/posts/<slug>/index.md
```

The `index.md` file uses mdsvex and **must** include this frontmatter:

```yaml
---
title: "Post Title"
description: "Short description"
author: "Saikat Das"
tags:
  - tag1
  - tag2
icon: "icon-filename.png"   # filename under static/assets/icons/post-topics/
date: "YYYY-MM-DD"
---
```

- Layout is automatically applied via `mdsvex.config.js` (maps to `src/routes/blog/_layout.svelte`).
- Posts are discovered at build time via `import.meta.glob` in `getBlogPosts.json.ts`.
- Sorted newest-first by `date`.
- Slugs are derived from the directory path (e.g., `blog/posts/react-hooks-an-overview`).

---

## Project Entries

Project entries live at:
```
src/routes/projects/entries/<slug>/index.md
```

Required frontmatter:

```yaml
---
title: "Project Title"
description: "Short description"
technologiesUsed:
  - Technology1
  - Technology2
author: "Saikat Das"
coverPhoto: "<slug>/cover-image.jpg"   # relative to static/assets/images/routes/
startDate: "YYYY-MM-DD"
endDate: "YYYY-MM-DD"
layout: "projects"
---
```

- Layout is mapped to `src/routes/projects/_layout.svelte` via the `layout: "projects"` frontmatter key.
- Entries are discovered via `import.meta.glob` in `getProjectEntries.json.ts`.
- Sorted newest-first by `startDate`.

---

## Styling

- **TailwindCSS v2** with JIT mode. Config in `tailwind.config.cjs`.
- Global styles in `src/app.postcss` (imported in the root layout). This file includes Tailwind directives and the Prism **Synthwave '84** syntax highlighting theme for code blocks.
- Extended theme colors: `emerald` and `fuchsia` from Tailwind's color palette.
- Typography plugin (`@tailwindcss/typography`) is enabled; prose styles use `prose-emerald`.
- The `code::before` and `code::after` content is suppressed globally to avoid backtick artifacts around inline code.

---

## TypeScript

- Shared types are in `src/types.d.ts`:
  - `BlogPostCardDetails` — shape of a blog post card (title, description, tags, created, icon, slug)
  - `ProjectEntryCardDetails` — shape of a project entry card (title, description, technologiesUsed, coverPhoto, startDate, endDate, slug)
- ESLint uses `@typescript-eslint/parser` and `eslint-plugin-svelte3`.
- `tsconfig.json` is at the root.

---

## Build and Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build (static)
npm run build

# Preview the production build
npm run preview

# Type-check Svelte files
npm run svelte-check
```

The `postbuild` script copies `build/404/index.html` to `build/404.html` and removes the `build/404/` directory (required for static 404 handling on hosting platforms).

---

## SEO

- The `SEOMetaHeader` component (`src/components/SEO/SEOMetaHeader.svelte`) is used on listing pages.
- Individual blog and project pages render their own `<svelte:head>` with full Open Graph and Twitter Card meta tags inside their respective `_layout.svelte` files.
- A `sitemap.xml` is generated at build time via `src/routes/sitemap.xml.ts`.
- A `manifest.webmanifest` and service worker are included in `static/` for PWA support.

---

## Dev Container

The `.devcontainer/devcontainer.json` uses the `mcr.microsoft.com/devcontainers/base:noble` (Ubuntu Noble) image. No additional features are configured by default. Update `devcontainer.json` when onboarding tooling that should be pre-installed in the dev environment.

---

## Updating This File

Update `AGENTS.md` when any of the following change:

- Path aliases are added, removed, or renamed
- New content types are introduced (new frontmatter schemas, new route patterns)
- The tech stack changes (dependencies swapped, new frameworks added)
- New conventions are established for components, icons, or utilities
- Build or development commands change
- Dev container configuration changes significantly

Do **not** use this file as a changelog. It should always reflect the current state of the repository, not a history of changes.
