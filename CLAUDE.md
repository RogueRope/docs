# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Hugo static site for rope gathering event documentation (Rogue Rope Camp / Bottoms Up!). Each event edition lives on its own branch — `roguerope-summer26`, `winter26`, `summer25`, etc. The `master` branch tracks the most recently deployed edition.

## Build & Development Commands

```bash
npm install                          # install PostCSS/Tailwind toolchain (run once)
hugo server -D --disableFastRender   # local dev server with drafts at localhost:1313
hugo server -D --disableFastRender --buildFuture  # include future-dated content
hugo --gc --minify --printPathWarnings             # production build to public/
npm run build:ci                     # strict build (--panicOnWarning, matches Netlify)
npm run lint                         # markdownlint on content/**/*.md
npm run format                       # prettier on all supported file types
npm run lint:html                    # htmlproofer on ./public (run after hugo build)
```

The Netlify build command is `npm run build:ci`. Run it locally before opening a PR.

## Architecture

**Theme:** `hugo-book` — local copy in `themes/hugo-book/`. Not a Hugo module; no `go.mod`. Do not edit the theme directly.

**Content structure:** All pages live under `content/docs/` in three sections:
- `content/docs/concept/` — philosophy, vibe, who-it's-for
- `content/docs/practical/` — logistics, schedule, tickets, camping
- `content/docs/wellbeing/` — consent, support, emotional care

`content/_index.md` and `content/docs/_index.md` are the homepage and section landing page. Section `_index.md` files use `bookCollapseSection: true` in frontmatter to drive the collapsible nav.

**Layouts:** `layouts/` overrides hugo-book templates. `layouts/partials/` holds reusable fragments. `layouts/_default/single.html` and `list.html` are the main overrides.

**Styling:** `assets/book.scss` is the theme SCSS entry point (imports theme variables and custom). `assets/_custom.scss` is where all custom rules go — edit this, not `book.scss`. The pipeline is: Hugo processes SCSS → PostCSS (Tailwind + autoprefixer + cssnano in production).

**Static assets:** Images live in `static/images/`. Served as-is, not fingerprinted.

**Navigation:** Controlled by `weight` frontmatter within each section directory. Menu items in `hugo.toml` (`[[menu.before]]` / `[[menu.after]]`) add Home and Contact outside the docs tree.

## Frontmatter Requirements

Every content file must include:

```yaml
---
title: ''
description: ''
lead: ''
date: 2026-03-07T10:00:00+00:00
lastmod: 2026-03-07T10:00:00+00:00
weight: 10
toc: true
---
```

Always bump `lastmod` when editing a page. Use UTC ISO timestamps. Weights within a section must be unique to avoid undefined sort order.

## Branch Convention

One branch per event edition. Branch names follow the pattern `roguerope-summer26`, `winter26`. Create new editions by branching from the most recent edition of the same type, then updating all event-specific content (dates, venue, price, event name, dresscode theme). The two event names are:
- **Rogue Rope Camp** — summer outdoor edition
- **Bottoms Up!** — winter indoor edition

## Internal Links

Always use the full `/docs/section/page` path for internal links (e.g. `/docs/practical/participation`). Relative links work within the same section but are fragile across sections. Aliases in frontmatter handle legacy paths from older URL structures.

## CI / GitHub Actions

- **claude-code-review.yml** — runs automatic Claude code review on every PR
- **claude.yml** — triggers Claude in response to `@claude` mentions in PR comments and issues

## Key Files

| File | Purpose |
|------|---------|
| `hugo.toml` | Site title, theme, menu config, Goldmark settings |
| `assets/_custom.scss` | All custom CSS overrides |
| `netlify.toml` | Netlify build config (Hugo version, branch deploy commands) |
| `content/docs/_index.md` | Docs landing page / homepage content |
| `.markdownlint.json` | Markdownlint rule overrides (MD013, MD033, MD025 disabled) |
