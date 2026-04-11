# NOPE Digital Website

A static Astro site for NOPE Digital with four public sections: home, blog, resources, and gallery.

## Quick Start

```bash
npm install
npm run dev       # Start dev server at localhost:4321
```

**Requirements:** Node >= 22.12.0

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro` | Run Astro CLI |

## Architecture

```
src/
├── components/       # Shared UI (Header, Footer, Nav)
├── content/          # Markdown content collections
│   ├── blog/         # Blog posts
│   └── work/         # Portfolio/gallery source content
├── layouts/          # Page layouts (Base, Blog)
├── pages/            # Routes
└── styles/           # Global CSS with design tokens
```

### Content Collections

Defined in `src/content.config.ts` with Zod validation:

- **blog** — `title`, `description?`, `date`, `draft`
- **work** — `title`, `description?`, `date?`, `section?`, `tags?`, `url?`, `images?`, `tech?`, `effort`

Add a `.md` file to the appropriate folder to publish new content.

### Styling

Vanilla CSS with design tokens in `src/styles/global.css`. No Tailwind or preprocessors.

Key tokens:
- Colors: `--color-text-primary`, `--color-background`, `--color-border`
- Spacing: `--space-1` through `--space-16`
- Typography: `--font-size-sm` through `--font-size-3xl`
- Layout: `--max-width-content: 48rem`

### Site Sections

| Route | Description |
|-------|-------------|
| `/` | Home — primary work landing page |
| `/blog` | Post listing + individual posts |
| `/resources` | Curated tools and references |
| `/gallery` | Interactive 3D gallery built from work content |

## Tech Stack

- **Astro** — Static site generation, zero JS by default
- **Vanilla CSS** — Design tokens, no framework
- **Markdown** — Content authoring for blog and work collections

## License

Private project.
