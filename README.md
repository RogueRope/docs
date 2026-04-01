# Bottoms Up! Gathering Documentation

A Hugo Hextra documentation site for Rogue Rope Camp, styled with the project's custom palette and layout overrides. The site supports light and dark mode, shows a visible theme toggle, and defaults to the visitor's system preference.

## Features
- Hextra theme with project-specific styling overrides
- Light and dark mode with a visible theme toggle
- System theme as the default color mode
- Full-text search, breadcrumbs, and per-page reading time
- Structured sections for concept, practical details, and wellbeing support
- Responsive layout with images, tables, and callouts authored in Markdown
- Hugo static generation for fast builds and easy hosting

## Project Structure
- `content/` — Markdown pages. Core sections live in `content/docs/concept/`, `content/docs/practical/`, and `content/docs/wellbeing/`.
- `layouts/` — Hugo template overrides for Hextra, including local partial customizations.
- `assets/` — Processed CSS, JS, and images for the site's styling and behavior overrides.
- `static/` — Passthrough files (images, downloads) served as-is.
- `hugo.toml` — Site configuration, navigation, Hextra settings, and theme mode defaults.

## Prerequisites
- Hugo **extended**
- Node.js 18+ (for linting and optional build tooling)

## Local Development
1. Install dependencies (optional, for linting and PostCSS tooling):
   ```bash
   npm install
   ```
2. Start the live preview:
   ```bash
   hugo server -D --disableFastRender
   ```
   The site will be available at http://localhost:1313/.

## Building
- Production-like build:
  ```bash
  hugo --gc --minify --printPathWarnings
  ```
- CI build with stricter warnings:
  ```bash
  npm run build:ci
  ```

## Linting & Formatting
- Markdown lint (content only):
  ```bash
  npm run lint
  ```
- Format common file types:
  ```bash
  npm run format
  ```

## Adding or Updating Pages
1. Create a Markdown file in the appropriate section, for example:
   ```bash
   hugo new docs/practical/new-page.md
   ```
2. Include complete front matter using UTC ISO timestamps and update `lastmod` when editing:
   ```yaml
   ---
   title: "Page Title"
   description: "Short summary of the page."
   lead: "One-sentence lead-in."
   date: 2025-11-12T20:16:00+00:00
   lastmod: 2025-11-12T20:16:00+00:00
   weight: 10
   toc: true
   ---
   ```
3. Write content in Markdown. Use relative links for internal references and keep paragraphs concise.

## Deployment
Any static host works. Common options:
- **Netlify** — set the build command to `hugo --gc --minify` and the publish directory to `public/`.
- **GitHub Pages or traditional hosting** — run `hugo --gc --minify` and upload the `public/` directory to your server.

## Contact
For questions about the gathering, use the "✉️ Contact" link in the site navigation or edit `content/docs/contact.md`.
