# NOPE Monorepo

This repo contains the two live Astro sites under `nope-main/` and `nope-blog/`, managed from a single npm workspace root.

## Structure

- `content/` shared content source
- `packages/ui/` shared UI package workspace for future extraction
- `nope-main/` main site
- `nope-blog/` blog and content site

## Commands

- `npm install`
- `npm run dev:main`
- `npm run dev:blog`
- `npm run build`

`nope-blog` reads content from the monorepo root `content/` directory.
