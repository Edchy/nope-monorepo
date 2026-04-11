# NOPE Main Context

## Principles

- Simplicity first. Solve root causes, not symptoms.
- Composability always. If used twice, make it a component.
- Iterate toward elegance. No hacks and no bandaids.

## Red lines

These actions require explicit user approval and should never happen autonomously:

- Recursive deletes such as `rm -rf`
- Force pushes such as `--force` or `-f`
- Direct commits or merges to `main` or `master`
- Secrets in version control
- Bypassing pre-commit hooks with `--no-verify`
- Repo-wide reformats or dependency updates

## Planning

- Plan before any task with 3+ steps or architectural impact.
- Write out the plan and confirm before executing.
- If something breaks, stop and re-plan before continuing.
- Log mistakes and lessons in `gotchas.md`.

## Task loop

Plan, verify inputs, execute with progress tracking, explain changes, document results, and capture lessons.

## Quality

- Root-cause every bug. Symptoms are not solutions.
- Maintainability over speed. Use tokens, helpers, and components.
- Verify before done: build succeeds and the UI looks correct.

## Style

- No hardcoded style values. Use design tokens from `src/styles/tokens.css`.
- Load `/sop-bootstrap` for kickoff.
- Load `/i-frontend-design` for UI work.
- Look up docs before implementing.
- No borders or dividers. Use whitespace to separate sections.

## Scripts

Always wrap script logic in a function and register it with `document.addEventListener("astro:page-load", init)`. The project uses Astro's `ClientRouter`, so scripts must reinitialize on every client-side navigation.

## Design tokens

All tokens live in `src/styles/tokens.css`. Follow the three-level hierarchy:

1. Primitives such as `--blue-500` and `--gray-900`
2. Semantic tokens such as `--color-text-primary` and `--color-background-surface`
3. Component tokens such as `--button-primary-background-hover`
