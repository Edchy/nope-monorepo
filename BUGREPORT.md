# Chrome Mobile Scroll Jump Bug

## Summary

There is an unresolved mobile scroll bug that appears in Chrome but not Safari. Near the bottom of certain long pages, the page suddenly jumps upward. The behavior looks like scroll snapping or scroll anchoring, not like a footer-specific layout issue.

## Browser / device context

- Reproduced on mobile Chrome
- Not reproduced on Safari
- The issue was also reproduced from a real phone recording, not only desktop device emulation

## Affected pages

### `nope-blog`

Jumps:
- `/`
- individual blog posts via [nope-blog/src/pages/blog/[...slug].astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-blog/src/pages/blog/[...slug].astro)

Does not jump:
- `/blog`
- `/art-int`
- `/resources`

### `nope-main`

Jumps:
- `/about`
- `/work`

Does not jump:
- `/`

## Important conclusion from the page matrix

This strongly suggests:
- not the shared footer alone
- not the shared base layout alone
- not homepage-only scripts alone
- not a generic router problem alone

The current best pattern is:
- long, scrollable, document-like pages jump
- empty pages do not
- card-grid / non-document pages do not

## Debug evidence

A temporary debug overlay was added so mobile values can be read directly on the live site.

Relevant files:
- [packages/ui/src/DebugScrollOverlay.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/packages/ui/src/DebugScrollOverlay.astro)
- [nope-main/src/layouts/BaseLayout.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-main/src/layouts/BaseLayout.astro)
- [nope-blog/src/layouts/BaseLayout.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-blog/src/layouts/BaseLayout.astro)

Enable it with:
- `?debug-scroll=1`

Example:
- `https://nope.digital/about?debug-scroll=1`
- `https://blog.nope.digital/?debug-scroll=1`

The overlay shows:
- `scrollY`
- `innerHeight`
- `vv.height`
- `scrollHeight`
- `fromBottom`
- last event name

### What the recording showed

From a real phone recording on a jumping page:
- `scrollHeight` stayed constant
- `innerHeight` stayed constant
- `visualViewport.height` stayed constant
- only `scrollY` jumped
- the last event shown was `vv-scroll`

Observed sequence in one capture:
- before jump: `scrollY ~ 709`, `fromBottom ~ 78`
- then jump to: `scrollY ~ 331`
- then almost immediately to: `scrollY ~ -15 / 0`

### What that means

This does **not** look like:
- footer height changing
- content reflow changing total page height
- viewport height resizing at the moment of the jump

It looks more like:
- Chrome changing scroll position directly
- visual viewport / scroll anchoring behavior
- a browser-specific bottom-of-page snap on long content pages

## Things investigated

### Footer was suspected first

Why:
- the jump was visually obvious near the footer
- both sites share the footer

What was learned:
- the shared footer can exist without the bug
- `nope-blog /resources` is basically shell + footer and does **not** jump
- changing footer layout did not remove the bug

Conclusion:
- the footer is likely where the issue becomes visible, not the root cause

## Experiments already tried

### 1. Disable voxel loading on mobile in `nope-blog`

File:
- [nope-blog/src/components/VoxelWork.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-blog/src/components/VoxelWork.astro)

Purpose:
- unrelated performance / mobile cleanup

Result:
- successful change
- not related to the scroll jump root cause

### 2. Shared footer mobile redesign

File:
- [packages/ui/src/Footer.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/packages/ui/src/Footer.astro)

Current state:
- compact footer only on the smallest breakpoint
- mobile tagline hidden on smallest screens
- desktop / larger mobile screens still use the large wordmark version

Result:
- visual improvement kept
- did not fix the jump

### 3. Footer spacing / padding test

Purpose:
- test whether forcing the footer farther away from content changed the behavior

Result:
- did not resolve the bug
- extra padding was reverted

### 4. Mobile router / transition suspicion

Files touched earlier:
- `nope-main/src/layouts/BaseLayout.astro`
- `nope-blog/src/layouts/BaseLayout.astro`

Purpose:
- test whether Astro client transitions / router behavior caused the jump

Result:
- not enough evidence that this was the cause
- the page matrix now points elsewhere

### 5. Hidden fixed mobile nav overlays

Files:
- `nope-blog/src/layouts/BaseLayout.astro`
- `nope-main/src/components/Header.astro`

Purpose:
- avoid keeping a full-screen fixed mobile overlay mounted while closed

Result:
- reasonable cleanup
- not enough to explain the page matrix by itself

### 6. Viewport-height / footer / hero tweaks

Files touched during debugging:
- `nope-main/src/pages/index.astro`
- `packages/ui/src/Footer.astro`
- other layout-level CSS experiments

Result:
- useful for UI cleanup
- did not explain the Chrome-only jump on long content pages

## Current targeted hypothesis

The best current hypothesis is:

> Chrome mobile is re-anchoring or otherwise snapping scroll position on long, linear content containers near the bottom of the page.

This hypothesis fits:
- Chrome only
- long pages only
- `scrollY` changing while page height stays stable
- empty pages not reproducing
- document-style pages reproducing

## Current targeted patch

The latest focused test is to disable scroll anchoring on the main long-content containers that match the pages that actually jump.

Files currently changed for that test:
- [nope-blog/src/pages/index.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-blog/src/pages/index.astro)
- [nope-blog/src/layouts/BlogLayout.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-blog/src/layouts/BlogLayout.astro)
- [nope-main/src/pages/about.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-main/src/pages/about.astro)
- [nope-main/src/pages/work.astro](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-main/src/pages/work.astro)

Specifically:
- `overflow-anchor: none` on `.home-grid`
- `overflow-anchor: none` on `.post`
- `overflow-anchor: none` on `.about-page` and its `.page-grid`
- `overflow-anchor: none` on `.work-page`, `.page-grid`, and `.work-list`

This is the most evidence-driven test so far.

## Related UI issues discussed during debugging

These are adjacent but not necessarily the root bug:

- On `nope-main /`, the footer could appear too early in some mobile/Chrome states
- In Chrome device toolbar, the large homepage words could disappear while space for them remained
- The compact footer should only be used on the smallest screens

Those issues led to some homepage/footer styling adjustments, but they do not currently explain the scroll jump across the affected pages.

## Next steps if the current anchoring patch fails

1. Expand the debug overlay to include:
- `visualViewport.pageTop`
- `visualViewport.offsetTop`
- `document.scrollingElement.scrollTop`

2. Compare one jumping page and one non-jumping page with the same overlay active

3. If necessary, test Chrome-specific mitigations on long content pages:
- `overscroll-behavior`
- additional anchoring opt-outs on parent containers
- reducing fixed-position mobile chrome interactions further

## Verification status

The latest long-content anchoring changes were built successfully from both site folders:
- `nope-blog`
- `nope-main`
