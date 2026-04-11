# Personal Website

Personal portfolio site. Built with Astro, deployed to Vercel.

## Architecture

```
src/
  components/    # Shared UI components (Header, Footer)
  layouts/       # Page shell (BaseLayout)
  pages/         # Astro pages — one file = one route
    index.astro    → /
    about.astro    → /about
    projects.astro → /projects
    contact.astro  → /contact
  styles/
    tokens.css   # Design tokens (primitives + semantic)
    global.css   # Reset + base styles (imports tokens)
brand_assets/    # Logos, fonts, imagery
```

## How to Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

## Design System

All visual values live in `src/styles/tokens.css`. Never hardcode hex values, px sizes, or font values in component files — reference tokens only.

Token hierarchy:
1. **Primitives** — raw values (`--blue-500`, `--gray-900`)
2. **Semantic** — purpose-driven (`--color-text-primary`, `--color-background-surface`)
3. **Component** — component-specific states (add as needed)

## Deployment

Deploy to Vercel. Connect the repo and it auto-deploys on push to main.
