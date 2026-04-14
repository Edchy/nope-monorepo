# NOPE Monorepo Context

## What this is

A monorepo containing two Astro sites that share content and UI components. The goal is a single source of truth: edit content or components once, both sites update on next build.

## Repo structure

```text
nope-monorepo/
  content/               <- shared markdown content (single source of truth)
    artificial/
      links/             <- AI resource links (links collection)
      notes/             <- AI research notes (notes collection)
    blog/                <- blog posts (blog collection)
    internetgoodies/     <- internet finds (internetgoodies collection)
    work/                <- portfolio items (work collection)
  packages/
    ui/                  <- shared Astro components
      src/
        Footer.astro
        DebugScrollOverlay.astro
      package.json       (name: "@nope/ui")
  nope-blog/             <- blog/content Astro site (name: "@nope/blog")
    src/
      components/        <- VoxelWork.astro, Header.astro, Section.astro
      data/              <- quotes.ts
      layouts/           <- BaseLayout.astro, BlogLayout.astro
      pages/             <- index, about, room, writing/[...slug], work/, artificial/, internetgoodies
      styles/
      types/             <- heerich.d.ts (voxel lib type stubs)
      content.config.ts
    astro.config.mjs
    netlify.toml
    package.json
  nope-main/             <- main Astro site (name: "@nope/main")
    src/
      components/        <- Header.astro, LiftButton.astro, LiftSurface.astro
      layouts/           <- BaseLayout.astro
      pages/             <- index, about, work
      styles/            <- global.css, tokens.css
      config.ts          <- SITE_TITLE constant
      content.config.ts
    astro.config.mjs
    netlify.toml
    package.json
  docs/
    agent-context.md     <- this file
    pages-cms.md
  package.json           <- npm workspace root
  CLAUDE.md
```

## Tech stack

- Framework: Astro v6 for both sites
- Zod: v4 (accessed as `import { z } from "zod"` or `import { z } from "astro/zod"`)
- Deployment: Netlify for both sites, builds run from monorepo root
- Source: GitHub monorepo
- Package manager: npm workspaces

## Content sharing

Content lives in `/content` at the monorepo root. Both sites point their Astro v5 content collections at this shared folder using glob loaders with relative `base` paths.

### nope-blog collections

All five collections in `nope-blog/src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/blog' }),
  schema: z.object({ title: z.string(), date: z.date(), ... }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/work' }),
  schema: ({ image }) => z.object({ ... }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/artificial/notes' }),
  schema: z.object({ ... }),
});

const links = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/artificial/links' }),
  schema: z.object({ ... }),
});

const internetgoodies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/internetgoodies' }),
  schema: ({ image }) => z.object({ ... }),
});

export const collections = { blog, work, notes, links, internetgoodies };
```

### nope-main collections

Only `work` in `nope-main/src/content.config.ts`:

```ts
import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "../content/work" }),
  schema: ({ image }) => z.object({ ... }),
});

export const collections = { work };
```

### Zod v4 URL validation

Use `z.url()` (standalone) not `z.string().url()` (deprecated in Zod v4):

```ts
url: z.url().optional(),
images: z.array(z.union([image(), z.url()])).default([]),
```

## Shared UI components

Shared components live in `/packages/ui/src`. Import them using the workspace package name:

```astro
---
import Footer from '@nope/ui/src/Footer.astro';
import DebugScrollOverlay from '@nope/ui/src/DebugScrollOverlay.astro';
---
<Footer />
<DebugScrollOverlay />  <!-- activated with ?debug-scroll=1 query param -->
```

Site-specific components (headers, layout shells) live inside each site, not in the shared package.

## Netlify config

Builds run from the **monorepo root**, not per-site base directories. Each site has its own `netlify.toml` with root-relative paths.

`nope-blog/netlify.toml`:

```toml
[build]
  command = "npm run build:blog"
  publish = "nope-blog/dist"

[build.environment]
  NODE_VERSION = "22.12.0"

[context.production]
  ignore = "git diff --quiet \"$CACHED_COMMIT_REF\" \"$COMMIT_REF\" -- nope-blog packages/ui content package.json package-lock.json"
```

`nope-main/netlify.toml`:

```toml
[build]
  command = "npm run build:main"
  publish = "nope-main/dist"

[build.environment]
  NODE_VERSION = "22.12.0"

[context.production]
  ignore = "git diff --quiet \"$CACHED_COMMIT_REF\" \"$COMMIT_REF\" -- nope-main packages/ui content/work package.json package-lock.json"
```

In Netlify site settings, both sites should have **no base directory set** — the build runs from root and the `command` in `netlify.toml` scopes to the right workspace.

## Root workspace scripts

```json
{
  "build": "npm run build --workspaces --if-present",
  "build:blog": "npm run build --workspace @nope/blog",
  "build:main": "npm run build --workspace @nope/main",
  "dev:blog": "npm run dev --workspace @nope/blog",
  "dev:main": "npm run dev --workspace @nope/main",
  "preview:blog": "npm run preview --workspace @nope/blog",
  "preview:main": "npm run preview --workspace @nope/main"
}
```

## Day-to-day workflow

### Content changes
1. Add or edit a file in `content/blog`, `content/work`, `content/artificial/`, or `content/internetgoodies`.
2. Commit and push.
3. Netlify detects the change and rebuilds the affected site(s) automatically.

### Shared UI changes
Changing `/packages/ui` triggers rebuilds for both sites (both `ignore` scripts watch `packages/ui`).

### Site-specific changes
Each site's `ignore` script only watches its own folder + shared deps, so changes to `nope-blog` do not trigger a `nope-main` rebuild and vice versa.

### TypeScript checks
Run from each site directory:

```bash
cd nope-blog && npx astro check
cd nope-main && npx astro check
```

## Key component notes

### VoxelWork.astro (nope-blog)
- Uses `heerich` + `three.js` for 3D voxel scenes
- Always renders the SVG; gates the animation loop on device capability separately
- Uses `window.__nopeVoxelWork` for state, cleans up on `astro:before-swap`
- Run init immediately AND on `astro:page-load` to handle both first load and navigation

### BaseLayout.astro (nope-blog)
- Manages mobile menu (aside drawer), desktop sidebar collapse, and nav indicator animation
- Nav indicator uses `?.` optional chaining on `navList` before attaching listeners (navList is typed as possibly null)
- Mobile header height is a shared token; pad the shell by that offset

### DebugScrollOverlay.astro (packages/ui)
- Tracks scroll, viewport, and resize events
- Activated with `?debug-scroll=1` query param
- Useful for diagnosing Chrome mobile scroll anchoring issues

## Known issues

### Chrome mobile scroll jump (BUGREPORT.md)
Pages with long document-like content jump upward on Chrome mobile. Current mitigation: `overflow-anchor: none` on long-content containers. Debug with `?debug-scroll=1`.
