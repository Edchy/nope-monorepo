# NOPE Blog

A personal site by NOPE Digital. Writing is the primary purpose. Everything else — resources, links, art, video, and whatever comes next — lives here too.

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
├── layouts/          # Page layouts (Base, Blog)
├── pages/            # Routes
└── styles/           # Global CSS with design tokens

content/              # Shared content root (monorepo root)
└── blog/             # Blog posts (Markdown)
```

### Content Collections

Defined in `src/content.config.ts` with Zod validation:

- **blog** — `title`, `description?`, `date`, `draft`

Add a `.md` file to `content/blog/` to publish a new post.

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
| `/` | Home — post listing or editorial landing |
| `/blog` | All posts |
| `/blog/[slug]` | Individual post |

Future sections (not yet built) are tracked in the PRD.

## Tech Stack

- **Astro** — Static site generation, zero JS by default
- **Vanilla CSS** — Design tokens, no framework
- **Markdown** — All content

## License

Private project.
