# NOPE Monorepo Context

## What this is

A monorepo containing two Astro sites that share content and UI components. The goal is a single source of truth: edit content or components once, both sites update on next build.

## Repo structure

```text
nope/
  content/           <- shared markdown content (single source of truth)
    blog/
    work/
  packages/
    ui/              <- shared Astro components
      src/
        Footer.astro
      package.json   (name: "@nope/ui")
  nope-blog/         <- blog/content Astro site
    src/
    astro.config.ts
    netlify.toml
    package.json
  nope-main/         <- main Astro site
    src/
    astro.config.ts
    netlify.toml
    package.json
  package.json       <- npm workspace root
```

## Tech stack

- Framework: Astro for both sites
- Deployment: Netlify for both sites
- Source: GitHub monorepo
- Package manager: npm workspaces

## Content sharing

Content lives in `/content` at the monorepo root. Both sites point their Astro content collections at this shared folder.

Astro v5 approach in each site's `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../../content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    // add fields as needed
  })
});

export const collections = { blog };
```

Astro v4 fallback:

```bash
ln -s ../../content src/content
```

## Shared UI components

Shared components live in `/packages/ui`. Site-specific headers live inside each site, not in the shared package.

Root `package.json`:

```json
{
  "name": "nope",
  "private": true,
  "workspaces": ["packages/*", "nope-blog", "nope-main"]
}
```

`packages/ui/package.json`:

```json
{
  "name": "@nope/ui",
  "private": true
}
```

Current shared usage in a site:

```astro
---
import Footer from '@nope/ui/src/Footer.astro';
---
<Footer variant="main" siteTitle="NOPE" />
```

## Netlify config

Each site has its own `netlify.toml`. The `ignore` field tells Netlify to skip a build if nothing changed in that site's folder or in `/content`.

`nope-blog/netlify.toml`:

```toml
[build]
  base = "nope-blog"
  command = "astro build"
  publish = "dist"

[context.production]
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- . ../content"
```

`nope-main/netlify.toml`:

```toml
[build]
  base = "nope-main"
  command = "astro build"
  publish = "dist"

[context.production]
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- . ../content"
```

In Netlify site settings, each site should have:

- Repository: this monorepo
- Base directory: `nope-blog` or `nope-main`

## Migration steps

1. Create new GitHub repo (`nope`).
2. Copy both existing site folders in as `nope-blog` and `nope-main`.
3. Move shared markdown content out of each site into `content`.
4. Create `packages/ui` and move shared components in.
5. Add root `package.json` with workspace config.
6. Update Astro content configs in each site.
7. Run `npm install` from the monorepo root to link workspaces.
8. Test locally in each site with `astro build`.
9. Push to GitHub.
10. In Netlify, update each site's repo and base directory while keeping existing domains connected.

## Day-to-day content workflow

1. Add or edit a file in `content/blog` or `content/work`.
2. Commit and push the change.
3. Both Netlify sites detect the change and rebuild automatically.
