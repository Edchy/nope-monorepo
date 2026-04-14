# Gotchas

Lessons learned, mistakes made, and things to remember for this project.

---

## Format

Each entry should include:
- **Date**
- **What happened**
- **Why it happened**
- **How to avoid it next time**

---

## Entries

### 2026-04-14: Shared nav indicators must target the hovered link and use valid list markup

**What:** The sidebar nav indicator was added as a sliding green highlight, but hover did not move it to the hovered item and the indicator element was inserted as a `div` directly inside the `ul`.

**Why:** The hover handler always recalculated from the active link instead of the hovered link, so hover never changed the target. Putting a non-`li` element directly inside the list also made the structure invalid and easier to position inconsistently across browsers.

**Fix:** Keep decorative list overlays as `li` elements with `aria-hidden`, and make the indicator update function accept an explicit hovered or focused link before falling back to the active item.

### 2026-04-14: Gate voxel animation, not voxel rendering

**What:** The homepage/work voxel scene could appear completely blank on devices or browsers that did not match the desktop fine-pointer media query.

**Why:** `VoxelWork.astro` used the same capability check for both loading the SVG scene and running the camera animation, so non-hover or coarse-pointer contexts cleared the stage instead of falling back to a static render.

**Fix:** Always render the voxel SVG when the component is present, and use input/media capability checks only to decide whether the animation loop should run.

### 2026-04-13: Shared blog posts should not repeat the layout title as a body `#` heading

**What:** AI series posts rendered the article title twice: once from `BlogLayout.astro` and again from the first Markdown heading inside the shared content file.

**Why:** The writing route already prints the frontmatter title and description above the Markdown body. Leaving a leading `#` in the content duplicates the title and lets it inherit body prose styling, which can make the two titles appear in different fonts.

**Fix:** For blog entries that use the shared writing layout, keep the canonical title in frontmatter and start the Markdown body with the opening paragraph or the first `##` section instead of another top-level `#`.

### 2026-04-13: Fixed mobile headers in the shared shell must reserve layout space

**What:** The mobile toolbar in `BaseLayout.astro` was fixed to the top of the viewport, but the shell content and mobile menu still started at `0`, so page content slid underneath the header and felt visually overlapped.

**Why:** A fixed header is removed from normal document flow. If the shared shell does not add a matching top offset, every page has to compensate manually and regressions spread across routes.

**Fix:** Keep the mobile header height as a shared layout token, pad the mobile shell by that offset, and align any fixed mobile overlays to the same top boundary.

### 2026-04-13: Astro transition scripts need immediate init, not just `astro:page-load`

**What:** The homepage voxel scene failed to appear on first entry and only showed up after a manual refresh.

**Why:** Route-level scripts inside pages and components can miss the first usable render window if they only wait on `astro:page-load`, especially when view transitions defer layout and the same document persists across navigations.

**Fix:** For page-specific interactive code, run the initializer immediately and also register the `astro:page-load` hook. Pair that with `astro:before-swap` cleanup so repeated visits do not stack timers, RAF loops, or stale DOM state.

### 2026-04-11: Full-screen gallery routes need their own exit chrome

**What:** The gallery used a fixed full-viewport wrapper, which made the normal site navigation effectively unavailable once you entered the route.

**Why:** Immersive canvas pages sit above the regular shell unless they provide their own persistent controls or intentionally preserve the shell layer.

**Fix:** Keep an explicit back path and pause/resume controls inside the gallery chrome whenever a route takes over the viewport.

### 2026-04-02: Initial Setup

**What:** Started project without design tokens. Hardcoded values in global.css.

**Why:** Moved fast without setting up foundations first.

**Fix:** Setting up design tokens now as part of kickoff. In future, always set up tokens before writing any component styles.

### 2026-04-14: Zod v4 — `z.string().url()` is deprecated; use `z.url()` instead

**What:** `astro check` reported deprecation warnings on `.url()` calls in content config schemas, even after switching from `z` imported from `astro:content` to `z` imported from `zod` or `astro/zod`.

**Why:** Zod v4 deprecated the `.url()` refinement on `z.string()`. The replacement is the standalone `z.url()` schema.

**Fix:** Replace `z.string().url()` with `z.url()` in all collection schemas. The `image()` union pattern becomes:
```ts
images: z.array(z.union([image(), z.url()])).default([]),
```

Also note: importing `z` directly from `astro:content` is deprecated in Astro v6. Import from `"zod"` or `"astro/zod"` instead.

---

*Add new entries above this line*
