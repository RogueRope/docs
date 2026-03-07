# docs Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-07

## Active Technologies

- Hugo static site
- PostCSS / Tailwind toolchain
- hugo-book theme
- 001-modern-light-theme

## Project Structure

```text
content/docs/concept/    - philosophy, vibe, who-it's-for
content/docs/practical/  - logistics, schedule, tickets, camping
content/docs/wellbeing/  - consent, support, emotional care
layouts/                 - overrides hugo-book templates
assets/                  - SCSS styling (edit assets/_custom.scss)
static/images/           - static images
themes/hugo-book/        - local theme copy (do not edit directly)
```

## Commands

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

## Code Style

- Frontmatter Requirements: Every content file must include the following structure:
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
- Always bump `lastmod` when editing a page. Use UTC ISO timestamps.
- Weights within a section must be unique to avoid undefined sort order.
- Internal Links: Always use the full `/docs/section/page` path for internal links.

## Recent Changes

- 001-modern-light-theme: Added

<!-- MANUAL ADDITIONS START -->
- Architecture: `assets/_custom.scss` is where all custom rules go — edit this, not `book.scss`.
- Branch Convention: One branch per event edition (`roguerope-summer26`, `winter26`).
<!-- MANUAL ADDITIONS END -->