# NOPE Main

## Hard rules

- Keep changes simple and composable, and solve root causes instead of symptoms.
- Plan before work with 3+ steps or architectural impact.
- Verify before done: the build succeeds and the UI looks correct.
- Use design tokens from `src/styles/tokens.css` instead of hardcoded style values.
- Do not perform recursive deletes, force pushes, direct commits to `main` or `master`, bypassed hooks, repo-wide reformats, or dependency updates without approval.
- Reinitialize client-side scripts with `document.addEventListener("astro:page-load", init)`.

## Detailed context

See `docs/agent-context.md` for red lines, task loop, style constraints, script guidance, and token hierarchy.
