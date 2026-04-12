# PRD: NOPE Blog

## What This Is

A personal site by NOPE Digital. The primary purpose is writing — long-form posts, notes, and essays. Secondary purpose is being a personal corner of the internet: a place for things worth sharing, things worth remembering, and things that don't fit anywhere else.

This is not a portfolio site. Work and client history live on nope-main.

## Problem and Audience

- **Problem:** No dedicated home for writing and personal curation under the NOPE Digital brand.
- **Audience:** Whoever finds it. No specific target demographic — this is a personal site, not a product.
- **Value prop:** Full control over voice, presentation, and what gets published. No algorithmic feed, no platform constraints.

## Goals

1. Make writing easy to publish and pleasant to read.
2. Give the site a personality — it should feel like a place, not a template.
3. Leave room to grow without planning every room in advance.

## Success Metrics (v1)

- Writing is easy to add (one Markdown file = one post)
- Site loads fast (< 2s)
- All pages responsive
- The design reflects the NOPE brand, not generic defaults

## Core Feature: Blog

The blog is the anchor of the site.

**Must-have:**
- Post listing page
- Individual post pages with good typography
- Date, title, description per post
- Draft support (drafts don't publish)
- RSS feed

**Nice-to-have:**
- Tags or categories
- Reading time estimate
- Prev/next post navigation
- Search

## Future Sections (Ideas — Not Scoped)

These are directional, not commitments. Add them when the content and intent are clear enough to build intentionally.

| Section | Rough idea |
|---------|------------|
| Log | Curated links — tools, articles, references worth keeping |
| Reading / Articles | Things I've read and want to remember or share |
| Videos | Interesting, fun, or inspiring video finds |
| Art | Visual work, inspiration, or personal creative output |
| AI | Dedicated space for AI-related writing, tools, or experiments |
| Shop | TBD — merchandise, digital products, or something else entirely |

None of these should be built until there's a clear answer to: what content goes here, and what does a visitor do on this page?

## Tech Stack

- **Framework:** Astro
- **Rationale:** Static, fast, content-collection-native, zero JS by default
- **Styling:** Vanilla CSS with design tokens
- **Content:** Markdown in shared `content/` directory (monorepo root)
- **Deployment:** Netlify (nope-blog base directory)

## Tier

**Personal** — no CI rigor required, but the bar for design quality is high.

## Out of Scope

- Portfolio or client work (lives on nope-main)
- User accounts or any auth
- CMS (Markdown is the CMS)
