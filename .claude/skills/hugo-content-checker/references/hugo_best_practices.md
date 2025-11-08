# Hugo Content Best Practices and Structure

## Hugo Content Organization

### Directory Structure
Hugo content is organized in the `/content/` directory. Key concepts:

- **Sections**: Top-level directories represent content sections (e.g., `content/concept/`, `content/wellbeing/`)
- **Pages**: Individual markdown files within sections
- **Bundles**: Directories with `_index.md` represent page bundles (can contain child pages and assets)
- **Leaf Bundles**: Directories with `index.md` contain only a single page with assets

### File Naming Conventions
- **Lowercase with hyphens**: `my-page.md` (not `MyPage.md` or `my page.md`)
- **Index files**: Use `_index.md` for section pages, `index.md` for leaf bundles
- **Slugs**: Filename (without extension) becomes the URL slug

## Frontmatter Best Practices

### Required Fields
Every content file should have:
- **title**: Page title (string)
- **description**: Brief page description (string)
- **date**: Publication/modification date (YYYY-MM-DD format)
- **draft**: Publication status (true/false)

### Optional Common Fields
- **author**: Content author name
- **tags**: Array of topic tags
- **categories**: Content category
- **weight**: Ordering weight (lower = earlier in menu)
- **aliases**: Alternative URLs for redirects
- **lastmod**: Last modification date
- **toc**: Table of contents (true/false)

### Frontmatter Format
```yaml
---
title: Page Title
description: A brief description of the page content
date: 2024-01-15
lastmod: 2024-10-31
draft: false
weight: 1
tags: [tag1, tag2]
---
```

## Content Reference Patterns

### Internal Links
Hugo supports several ways to link to internal content:

```markdown
# Using ref shortcode (recommended)
[Link Text]({{< ref "path/to/page" >}})

# Using relref shortcode (relative reference)
[Link Text]({{< relref "path/to/page" >}})

# Using markdown link with path
[Link Text](/path/to/page/)
```

### Image and Asset References
```markdown
# Images in static folder
![Alt text](/images/my-image.png)

# Images in page bundle
![Alt text](./images/my-image.png)
```

## Common Consistency Issues

### 1. Orphaned Content
- Pages that exist but are never referenced from other pages
- May indicate incomplete navigation setup
- Check if page should be removed or linked from parent/menu

### 2. Broken Internal Links
- References to non-existent pages or paths
- Can break user navigation
- Verify correct path and that referenced page exists

### 3. Inconsistent Frontmatter
- Missing required fields across content
- Inconsistent field formats (e.g., dates in different formats)
- Duplicate or misspelled field names

### 4. Duplicate Content
- Similar content in multiple files
- May indicate need for consolidation or cross-referencing
- Could cause duplicate content issues in search

### 5. Naming Convention Violations
- Uppercase letters in filenames
- Spaces or special characters instead of hyphens
- Inconsistent naming patterns across sections

## Hugo Configuration Considerations

### Content Sections
Sections are defined by directory structure. Configure in `hugo.toml`:

```toml
[params]
contentSections = ["concept", "wellbeing", "practical"]
```

### URL Structure
By default, content URLs follow this pattern:
- `/content/section-name/page-name/` → `/section-name/page-name/`
- Modify with `slug` in frontmatter to change URL

### Search and Indexing
- Search configuration affects which pages are indexed
- Ensure `draft: false` for pages that should appear in search
- Use `robots` frontmatter field to control indexing if needed

## Navigation and Menus

### Menu Configuration
Link pages to menus in frontmatter:
```yaml
menu:
  main:
    weight: 1
```

Or configure in `hugo.toml`:
```toml
[[menu.main]]
name = "Section"
pageRef = "path/to/page"
weight = 1
```

### Weight and Ordering
- Lower weight = appears first in menus/listings
- Consistent weighting prevents navigation confusion

## Performance and Build Considerations

### Large Content Directories
- Nested directory structure is more maintainable than flat
- Consider breaking into multiple section directories
- Use page bundles for complex pages with assets

### Building and Deployment
- Hugo processes all content at build time
- Broken links won't prevent builds but will be in generated HTML
- Regular consistency checks prevent issues in production

## Recommended Workflow

1. **Pre-commit checks**: Run content analyzer before commits
2. **Regular audits**: Check for orphaned and duplicate content
3. **Consistency templates**: Use consistent frontmatter across sections
4. **Link verification**: Validate all internal links before deployment
5. **Search testing**: Test that all intended pages appear in search
