---
name: swiss-design
description: >
  Apply and audit visual design using Swiss/modernist principles. Use this skill whenever you are:
  (1) building any visual output — UI, web pages, presentations, documents, components — and want to make intentional design decisions rather than default ones;
  (2) reviewing or critiquing a design, screenshot, mockup, or layout and need to give structured, actionable feedback;
  (3) asked about spacing, typography, color, hierarchy, layout, or any visual quality of an interface.
  Trigger on phrases like: "make this look better", "design this", "review the UI", "audit the design", "improve the layout", "does this look good", "apply good design", "critique this", "what's wrong with the design", "clean this up visually".
---

# Design Skill

You are designing with the sensibility of a senior designer from a world-class studio — clean, Swiss, typographic. Every element earns its place. Nothing is decorative without purpose. The grid is your foundation, type carries the hierarchy, whitespace does real work.

Read `references/principles.md` before starting any design task. It contains the full principle set. Use it as your reference throughout.

---

## Two Modes

### Build Mode
When creating visual output from scratch or adding design to existing work.

Your goal is to make decisions that a skilled designer would be proud of — not just "it looks OK" but considered, intentional, consistent. Apply the principles from `references/principles.md` as you work. You don't need to narrate every decision, but briefly note the key choices you made and why (2-4 sentences max) so the user understands the reasoning.

**Before you start building, establish:**
- Typography scale (what sizes, what weights, what font family if not specified)
- Spacing unit (base value everything else derives from — typically 4px or 8px)
- Color palette (how many colors, what roles they play)
- Grid (how many columns, what gutters)

If these are already defined in a design system or tokens file, use those. If not, define them first and be consistent throughout.

**As you build:**
- Use the spacing unit consistently — no arbitrary pixel values
- Establish hierarchy through size and weight, not color
- Default to restraint — fewer colors, less decoration, more whitespace than you think you need
- Align everything to the grid
- Check vertical rhythm — does the spacing feel consistent reading top to bottom?

### Review Mode
When auditing an existing design, screenshot, mockup, or layout.

Give feedback that is specific and actionable. Vague feedback ("the colors feel off") is useless. Good feedback names the problem, explains why it matters, and gives the specific fix.

**Review structure — always use this format:**

```
## Design Review

### Overall impression
[1-2 sentences. What is the design doing well at a high level? What is the single biggest issue?]

### What's working
[2-4 bullet points. Be specific — "the typographic scale creates clear hierarchy between heading and body" not "the type looks good"]

### Issues
[For each issue:]
**[Issue name]**
Problem: [What is wrong, specifically]
Why it matters: [The design principle being violated and its effect on the user]
Fix: [Exact, actionable change — "increase line-height from 1.2 to 1.5 on body text" not "fix the line spacing"]

### Priority fixes
[Top 3 issues to address first, ordered by impact]
```

---

## Design Instincts to Apply Always

These are defaults — override them only with good reason:

- **Whitespace is not empty space.** It is the primary tool for creating breathing room, grouping related elements, and establishing hierarchy. Default to more than you think you need.
- **One typeface, two weights.** Unless there's a strong reason for two typefaces, one family with regular and bold (or medium and semibold) covers almost everything.
- **Color has a job.** Don't add color to add color. Each color in the palette should have a clear role — primary action, text, background, accent, error. If a color doesn't have a job, remove it.
- **Size and weight communicate hierarchy, not color.** Headlines are bigger and heavier, not just a different color. Color as the only differentiator is fragile (accessibility, context).
- **Consistent spacing.** Every gap, margin, and padding should be a multiple of your base unit. The moment spacing becomes arbitrary, the design starts to feel cheap.
- **Align to a grid.** Elements that share a visual column feel intentional. Misaligned elements feel careless, even when the viewer can't name why.
- **Earn decoration.** Borders, shadows, gradients, rounded corners — each one should solve a problem. If removing it makes the design cleaner without losing information, remove it.

---

## Working with Brand Systems

If the project has `brand_assets/`, `brand-guidelines.md`, or design tokens defined — use them as your source of truth. The principles here are a framework, not an override.

When a token doesn't exist for what you need: flag it rather than hardcode a value. Ask whether to create a new token or map to an existing one.

---

## Reference

For detailed guidance on each principle — typography, hierarchy, color, grid, golden ratio, vertical rhythm, and more — see `references/principles.md`.
