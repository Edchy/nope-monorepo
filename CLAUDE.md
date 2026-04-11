# NOPE Monorepo

## Hard rules

- Treat `/content` and `/packages/ui` as shared sources of truth for both sites.
- When changing shared content, shared UI, or workspace config, consider effects on both `nope-blog` and `nope-main`.
- Prefer Astro v5 content collections that point at the root `content` directory.
- Keep Netlify assumptions aligned with the per-site base directories `nope-blog` and `nope-main`.
- Verify builds from the affected site folders before considering shared changes done.

## Detailed context

See `docs/agent-context.md` for repo structure, shared-content patterns, package layout, Netlify notes, migration history, and workflow.
