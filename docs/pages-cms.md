# Pages CMS Guide

This repo uses [Pages CMS](https://pagescms.org/) as a Git-backed editor for the shared root `content/` folder.

The source of truth is still the files in this repo. Pages CMS only edits and commits those files.

## How To Open It

1. Push your branch to GitHub.
2. Open `https://pagescms.org/`.
3. Sign in with GitHub.
4. Open this repository.
5. Select the branch you want to edit.

Pages CMS reads the repo-root [.pages.yml](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/.pages.yml) automatically.

## Collection Map

- `Blog` -> `content/blog/**/index.md`
- `Work` -> `content/work/**/index.md`
- `AI Notes` -> `content/artificial/notes/*.md`
- `AI Tools` -> `content/artificial/tools/*.md`
- `AI Links` -> `content/artificial/links/*.md`
- `Internet Goodies` -> `content/internetgoodies/*.md`

## Naming Rules

### Blog

- New blog entries are created as `slug/index.md`.
- The slug becomes the public URL under `/writing/...`.
- Use nested slugs when needed, for example `ai-series/10-some-post`.
- Once published, avoid changing slugs unless you also want the URL to change.

### Work

- New work entries are created as `slug/index.md`.
- Keep slugs stable once a project is published.
- `section` controls where the item appears:
  - `selected`
  - `archive`

### AI Notes

- Notes use date-based filenames like `2026-04-14-some-note.md`.
- The filename is mostly editorial; the page sorts by the `date` frontmatter.

### AI Tools

- Tools use flat filenames like `claude-code.md`.
- Use a short stable slug.

### AI Links

- Links use date-based filenames like `2026-04-14-interesting-link.md`.

### Internet Goodies

- Goodies use flat filenames like `01-papyrus-snl.md`.
- The public page currently sorts by filename.
- If you want to control the order, keep the numbered prefix pattern.

## Field Rules

### Drafts

- `Blog`, `AI Notes`, `AI Tools`, and `AI Links` support `draft`.
- Draft entries stay in the repo but are filtered out by the Astro pages.

### Work Images

The `images` field in `Work` must stay as plain strings.

Use one of these:

- Relative image path next to the entry, for example `./cover.jpg`
- Full URL, for example `https://example.com/cover.jpg`

Do not convert these to CMS-managed upload paths unless the Astro schema changes too.

### Tags And Tech

- `tags` and `tech` are multi-select fields.
- You can also create new values when needed.
- Prefer reusing existing values when the wording already exists.

## Publishing Flow

1. Edit content in Pages CMS.
2. Save the change.
3. Pages CMS commits the file change to GitHub.
4. Netlify rebuilds the affected site.

## What Rebuilds What

### Blog Site

[nope-blog/netlify.toml](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-blog/netlify.toml) watches:

- `nope-blog`
- `packages/ui`
- `content`
- `package.json`
- `package-lock.json`

That means any shared content change triggers a `nope-blog` rebuild.

### Main Site

[nope-main/netlify.toml](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/nope-main/netlify.toml) watches:

- `nope-main`
- `packages/ui`
- `content/work`
- `package.json`
- `package-lock.json`

That means `nope-main` only rebuilds for `work` content changes, not for blog, notes, tools, links, or internet goodies.

## Important Repo Notes

- `content/` and `packages/ui/` are shared sources of truth.
- Shared content changes can affect both `nope-blog` and `nope-main`.
- Verify builds from the affected site folders when changing shared content models.
- Pages CMS config lives in [.pages.yml](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/.pages.yml).

## When To Edit The CMS Config

Update [.pages.yml](/Users/eddietovebeppearonelsa/dev/live-projects/NØPE/nope-monorepo/.pages.yml) when:

- a collection path changes
- a frontmatter field is added, removed, or renamed
- filename rules change
- draft behavior changes
- a field should become easier or safer to edit
