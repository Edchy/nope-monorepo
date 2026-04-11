# NOPE Blog Context

## Principles

- Simplicity first. Solve root causes, not symptoms.
- Verify before celebrating. Run tests, check logs, and view the UI.
- Composability always. If used twice, make it a component.
- Iterate toward elegance. No hacks and no bandaids.

## Planning

- Plan before any task with 3+ steps or architectural impact.
- Write out the plan and confirm before executing.
- If something breaks, stop and re-plan before continuing.
- Log mistakes and lessons in `gotchas.md`.

## Quality

- Root-cause every bug. Symptoms are not solutions.
- Maintainability over speed. Use tokens, helpers, and components.
- Verify before done: tests pass, build succeeds, and the UI looks correct.

## Style

- No hardcoded style values. Use design tokens through CSS variables.
- Look up docs before implementing.

## Architecture

This is a NOPE Digital static site built with Astro. Content is authored in Markdown and served as fully static HTML, with targeted client-side code only where the interactive gallery needs it.

`src/content.config.ts` defines two Zod-validated collections:

- `blog`: posts with `title`, `description?`, `date`, and `draft`
- `work`: portfolio items with `title`, `description?`, `date?`, `section?`, `tags?`, `url?`, `images?`, `tech?`, and `effort`

Adding a Markdown file to `src/content/{blog,work}` is enough to publish new content. Blog entries are rendered through `src/pages/blog/[...slug].astro`. Work entries currently power the interactive gallery and other work-facing surfaces.

Layout hierarchy:

- `BaseLayout.astro`: wraps every page with header, nav, footer, and global styles
- `BlogLayout.astro`: extends `BaseLayout.astro` with per-entry metadata
