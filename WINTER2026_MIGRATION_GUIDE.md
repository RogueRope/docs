# Winter 2026 Migration Guide

## Project Overview
This document outlines the complete migration process from Rogue Rope Camp Summer 2025 to "Oh Bondage! Up Yours!" Winter 2026 edition, detailing all steps, changes, and files modified.

## Migration Summary
- **Source**: Summer 2025 camping edition (master branch)
- **Target**: Winter 2026 indoor edition (winter26 branch)  
- **Event Name**: "Rogue Rope Camp" → "Oh Bondage! Up Yours!"
- **Dates**: Aug 5-10, 2025 → Feb 18-22, 2026
- **Format**: Outdoor camping → Indoor bunk bed accommodations

## Branch Structure Created

### Main Branches
- `main` - Current default branch (renamed from master)
- `summer25` - Complete summer 2025 edition with latest updates
- `winter26` - Winter 2026 edition ready for deployment

### Archive Tags
- `v2025-summer` - Permanent archive of summer 2025 content

## Step-by-Step Migration Process

### Phase 1: Initial Setup
1. **Created winter26 branch from master**
   ```bash
   git checkout master
   git checkout -b winter26
   ```

2. **Updated basic configuration**
   - Modified `hugo.toml`: Title → "Rogue Rope Winter 2026"
   - Updated `config/_default/params.toml`: GitHub URL reference

### Phase 2: Homepage Transformation
3. **Updated homepage content** (`content/_index.md`)
   - Changed event title and dates to Feb 18-22, 2026
   - Rewrote intro content with winter-themed messaging
   - Updated image reference to use rrw26 folder structure

### Phase 3: Practical Content Migration
4. **Replaced camping with accommodations**
   - **Removed**: `content/practical/camping.md`
   - **Created**: `content/practical/accommodations.md`
   - **Updated**: `content/practical/_index.md` navigation links

5. **Updated things to bring** (`content/practical/things-to-bring.md`)
   - Replaced camping gear sections with indoor living essentials
   - Added winter comfort items (bedding, warm clothes, slippers)
   - Updated for dormitory-style shared accommodations

### Phase 4: Asset Management
6. **Created winter asset structure**
   ```bash
   mkdir -p static/images/rrw26
   ```
   - Updated all image references from rrc25 to rrw26
   - Preserved existing rrc25 folder for summer content

### Phase 5: Content Preservation
7. **Preserved wellbeing content unchanged**
   - All self-care, emotional support, consent content maintained
   - Updated image references to rrw26 folder

### Phase 6: Technical Validation
8. **Hugo build testing**
   - Installed Hugo v0.124.0
   - Initialized git submodules for themes
   - Validated successful build (46 pages generated)

## Key Files Modified

### Configuration Files
- `hugo.toml` - Site title and basic settings
- `config/_default/params.toml` - GitHub source URL
- `config/_default/menus/menu.en.toml` - Navigation structure

### Content Files
#### Homepage
- `content/_index.md` - Complete rewrite for winter theme

#### Concept Section  
- `content/concept/_index.md` - Branding updated to "Oh Bondage! Up Yours!"
- `content/concept/new-here.md` - Updated for indoor winter setting
- `content/concept/play.md` - Minor adjustments for indoor context
- All concept files updated with new branding

#### Practical Section
- `content/practical/_index.md` - Navigation links updated
- `content/practical/accommodations.md` - **NEW FILE** - Indoor bunk bed info
- `content/practical/camping.md` - **REMOVED** 
- `content/practical/things-to-bring.md` - Complete winter/indoor rewrite
- `content/practical/build-day.md` - Updated references
- `content/practical/filming-and-photography.md` - Updated references
- `content/practical/performances.md` - Updated references
- `content/practical/unconference.md` - Updated references

#### Wellbeing Section
- `content/wellbeing/_index.md` - Image reference updated
- `content/wellbeing/bagage.md` - Updated references
- `content/wellbeing/emotional.md` - Updated references  
- `content/wellbeing/fwb.md` - Updated references
- `content/wellbeing/partners.md` - Updated references

### Asset Structure
```
static/images/
├── rrc25/          # Summer 2025 images (preserved)
└── rrw26/          # Winter 2026 images (new)
```

## Content Review Checklist

### Critical Validation Points
- [ ] Homepage dates: February 18-22, 2026
- [ ] Event name consistency: "Oh Bondage! Up Yours!"
- [ ] Accommodations: Indoor bunk beds, not camping
- [ ] Things to bring: Winter indoor essentials
- [ ] Image references: All pointing to rrw26/
- [ ] Navigation: All internal links functional
- [ ] Hugo build: Successful with no errors
- [ ] Wellbeing content: Preserved and complete
- [ ] Branding: Consistent throughout all sections
- [ ] Tone: Winter intimacy vs summer outdoor energy

## Technical Requirements

### Development Environment
- Hugo v0.124.0 (extended)
- Node.js v20.5.1
- Go v1.21.0
- Git with submodule support

### Build Commands
```bash
# Local development
hugo server

# Production build  
hugo --gc --minify

# With base URL for Netlify
hugo --gc --minify --baseURL https://docs.roguerope.be/
```

### Git Workflow
```bash
# Switch to winter26
git checkout winter26

# Pull latest changes
git pull origin winter26

# Push changes
git push origin winter26
```

## Deployment Configuration

### Netlify Settings
- **Hugo version**: 0.124.0
- **Node version**: 20.5.1  
- **Go version**: 1.21.0
- **Build command**: `hugo --gc --minify`
- **Publish directory**: `public`

### Theme Dependencies
- Uses Compose theme as git submodule
- Requires `git submodule update --init --recursive`

## Archive and Backup Strategy

### Summer 2025 Preservation
1. **Tag**: `v2025-summer` - Permanent archive
2. **Branch**: `summer25` - Active branch with latest updates
3. **Accessibility**: Both remain accessible for future reference

### Branch Naming Convention
- `main` - Current default (production ready)
- `summer25` - Summer edition
- `winter26` - Winter edition
- `v2025-summer` - Archive tag

## Post-Migration Tasks

### GitHub Repository Setup
1. Update default branch from `master` to `main`
2. Consider removing old `master` branch after verification
3. Update branch protection rules if needed
4. Update any external references to master → main

### Content Validation
1. Use content review checklist for systematic validation
2. Test all internal links and navigation
3. Verify image loading and asset references
4. Validate Hugo build in clean environment
5. Review responsive design on mobile/tablet

## Lessons Learned

### Successful Strategies
- Systematic approach with todo tracking
- Preserved existing content structure where possible
- Used git submodules for theme management
- Created comprehensive backup strategy

### Technical Notes
- Future dates in front matter can cause build issues
- Git submodules must be initialized for theme functionality  
- Image reference updates require systematic find/replace
- Hugo build validation essential for catching errors

---

*This migration was completed on August 27, 2025, creating a complete winter edition while preserving all summer content for future access.*