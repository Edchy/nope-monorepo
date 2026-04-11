# PRD — Personal Website

## Idea Snapshot
- **Problem and audience:** Need a personal site to showcase work and make contact easy. Audience: potential collaborators, employers, anyone who Googles me.
- **Value prop vs. alternatives:** A custom site beats LinkedIn/GitHub profiles — full control over presentation and tone.
- **Impact goal:** Leave a strong impression and make it easy to reach out.

## Top Three Problems Solved
1. No central place to showcase projects
2. No easy way for people to contact me
3. No owned web presence that reflects my identity

## Assumptions to Validate
- Static site is sufficient (no auth, no CMS needed at v1)
- Contact via email/socials is enough (no contact form at v1)

## Success Metrics (v1)
- Site builds and deploys cleanly
- All three pages render correctly on mobile and desktop
- Passes manual UX sweep

## User Stories
- As a visitor, I can read about who this person is
- As a visitor, I can browse their projects with brief descriptions
- As a visitor, I can find contact info / social links

## Tech Stack
- **Framework:** Astro
- **Rationale:** Static-first, fast, great for portfolio sites, zero JS by default

## Must-Haves (v1)
- About / Bio page
- Projects / Work page
- Contact page
- Responsive layout
- Design tokens
- Shared header and footer

## Nice-to-Have (later)
- Blog / Writing section
- Dark mode toggle
- CMS-backed project entries
- Contact form with email delivery
- Analytics (PostHog or Plausible)
