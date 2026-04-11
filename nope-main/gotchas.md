# Gotchas

Log mistakes, surprises, and lessons learned here so future sessions don't repeat them.

---

<!-- Format:
## YYYY-MM-DD — Short title
**What happened:** ...
**Root cause:** ...
**Fix / lesson:** ...
-->

## 2026-04-07 — Button components are not row-layout primitives
**What happened:** A hover-lift request on the `work` page was initially implemented by reusing `LiftButton` for full project rows, which leaked inline/button presentation into the list layout.
**Root cause:** Interaction behavior and visual button styling were coupled in one component, so reusing it outside button contexts distorted spacing, display mode, and typography.
**Fix / lesson:** Keep motion utilities separate from presentation primitives. Use dedicated surface-level components for row/card hover behavior instead of forcing button components to act as layout wrappers.

## 2026-04-08 — Verify component existence before refactors
**What happened:** A refactor temporarily failed build due an import targeting a component file that had been removed in the working tree.
**Root cause:** I updated page markup before reconciling current component inventory in a dirty workspace.
**Fix / lesson:** In non-clean trees, verify component file presence before changing imports and prefer minimal-diff edits around existing structures.

## 2026-04-08 — Rebuild immediately after responsive CSS edits
**What happened:** A mobile footer layout tweak introduced a malformed selector block (`.site-footer__copy:first-child,`) and broke `astro build`.
**Root cause:** Quick edit in a media-query block left a trailing comma before declaration lines.
**Fix / lesson:** After any CSS selector refactor, run build immediately and inspect line-numbered output to catch syntax regressions before continuing with visual tuning.

## 2026-04-09 — CSS variables do not retroactively change inherited text color
**What happened:** An experimental-theme override for the `about` and `work` page text remapped `--color-text-primary` on the page section, but the `about` page body copy still rendered in the theme's green.
**Root cause:** Plain text nodes were inheriting `body`'s computed `color`, not re-evaluating `color` from the remapped custom property on the section.
**Fix / lesson:** When changing page-local text tokens below `body`, also set `color: var(--color-text-primary)` on the scoped container so inherited text resolves from the local token values.
