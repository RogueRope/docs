# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static site for Oh Bondage! Up Yours! documentation using the "Compose" theme. The site is built for https://docs.roguerope.be and contains event information, guidelines, and documentation for the rope camp community.

## Development Commands

### Build and Development
- **Build site**: `hugo --gc --minify` (production build with garbage collection and minification)
- **Local development**: `hugo server` (start development server)
- **Build for Netlify**: `hugo --gc --minify --baseURL https://docs.roguerope.be/`

### Dependencies
- **Install**: `npm install`
- **Go modules**: `go mod download` (for Hugo modules if needed)

## Architecture

### Site Structure
- **Content**: Located in `/content/` directory organized into sections:
  - `concept/` - Core camp concepts and philosophy
  - `wellbeing/` - Safety and wellbeing information  
  - `practical/` - Logistics and practical information
- **Configuration**: Hugo config in `hugo.toml` with additional config in `/config/_default/`
- **Theme**: Uses "Compose" theme located in `/themes/compose/`
- **Static assets**: `/static/` contains images, icons, fonts, and other assets
- **Layouts**: Custom layouts and partials in `/layouts/`

### Hugo Configuration
- **Base URL**: https://docs.roguerope.be/
- **Theme**: Compose theme with dark mode enabled by default
- **Content sections**: Defined as `["concept", "wellbeing", "practical"]` in params.toml
- **Search**: Disabled by default, can use Algolia or FuseJS
- **Git integration**: Enabled for last modified dates

- **Markdown**: All content in Markdown format with Hugo front matter
- **Shortcodes**: Uses custom shortcodes like `{{< block >}}`, `{{< column >}}`, `{{< button >}}`

### Deployment
- **Platform**: Netlify
- **Hugo version**: 0.124.0
- **Node version**: 20.5.1
- **Go version**: 1.21.0
- **Build command**: `hugo --gc --minify`
- **Publish directory**: `public`

## Important Files
- `hugo.toml` - Main Hugo configuration
- `config/_default/params.toml` - Site parameters and theme settings
- `netlify.toml` - Deployment configuration
- `content/_index.md` - Homepage content
- `package.json` - NPM dependencies