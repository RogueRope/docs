# Repository Guidelines

## Project Structure & Module Organization
- `content/` holds all Markdown pages; keep files in section folders (for example `content/practical/cancellation-policy.md`) and use `kebab-case` filenames.
- `layouts/` contains Hugo template overrides for the Lowkey theme; share reusable UI in `layouts/partials/` and leave the theme module untouched.
- `assets/` is for processed CSS, JS, and images, while `static/` serves passthrough files; Hugo fingerprints anything in `assets/` automatically.
- `config/` and `hugo.toml` define site-wide settings; mirror any language or param changes between them for consistency.
- `public/` and `dist/` are build artifacts—never edit them by hand.

## Build, Test, and Development Commands
- `npm install` (run once) installs the PostCSS/Tailwind toolchain used when Hugo processes assets.
- `hugo server -D --disableFastRender` launches the local preview with drafts; add `--buildFuture` to review future-dated content.
- `hugo --gc --minify` replicates the Netlify production build, cleans unused resources, and emits the static site to `public/`.
- `./merge-content.sh merged-content.md` aggregates Markdown for editorial review; delete the generated file before committing.

## Coding Style & Naming Conventions
- Start each Markdown file with YAML front matter including `title`, `description`, `lead`, `date`, `lastmod`, `weight`, and `toc`; use UTC ISO timestamps and bump `lastmod` on edits.
- Keep paragraphs short, prefer sentence-case headings, and embed internal links with relative paths.
- Default to two-space indentation in Go templates and HTML; group Tailwind utility classes by layout → spacing → typography for readability.
- Store custom CSS/JS in `assets/` so the build pipeline can fingerprint and minify it.

## Testing Guidelines
- Run `hugo --gc --minify --printPathWarnings` before every pull request; treat warnings about broken paths or shortcodes as blockers.
- Validate new or changed pages in the live server across desktop and mobile breakpoints; confirm media referenced in front matter resolves from `static/` or `assets/`.
- Document any manual verification (for example, link checks or partial rendering) in the PR description because no automated tests exist today.

## Commit & Pull Request Guidelines
- Follow the existing `Type: Summary` pattern (`Fix: Add missing frontmatter`); use imperative verbs and, when helpful, scope tags such as `Content:` or `Theme:`.
- Keep commits focused on one topic and avoid checking in files from `public/`, `dist/`, or temporary merges.
- Pull requests should describe the change, list manual checks, link related issues, and include before/after screenshots for UI tweaks.
- Request review when touching `layouts/`, `config/`, or build scripts, and capture any follow-up work as unchecked list items in the PR body.

## Configuration Tips
- Hugo modules are pinned in `go.mod`; upgrade themes with `hugo mod get -u` in a dedicated branch, then run `hugo mod tidy`.
- Production builds rely on `HUGO_ENABLEGITINFO`; keep a linear Git history so page metadata (breadcrumbs, updated dates) stays accurate.
