# Content Analysis Scripts Reference

Optimized Node.js scripts for quick content analysis and editorial tasks.

## Quick Start

All scripts are located in `./scripts/` and use Node.js (v18+) with modern ESM syntax.

### Running Scripts

```bash
# From your Hugo site root directory
node ./.claude/skills/editing-hugo-documentation/scripts/analyze-content-structure.js

# Or with arguments
node ./.claude/skills/editing-hugo-documentation/scripts/find-content-by-keyword.js "search term" ./content
```

## Available Scripts

### 1. analyze-content-structure.js
**Purpose:** Get a bird's eye view of your content organization

**Usage:**
```bash
node scripts/analyze-content-structure.js [contentPath]
```

**Output:**
- Total pages and word count statistics
- Section breakdown with page counts and metrics
- Organizational insights:
  - Missing index pages
  - Pages without descriptions
  - Very short pages (<100 words)
  - Pages without weight/ordering
  - Undersized or oversized sections

**When to use:**
- Content structure audit
- Identifying organizational issues
- Getting site overview
- Planning reorganization

**Example:**
```
Analyzing content structure at: ./content

=== CONTENT STRUCTURE OVERVIEW ===

Total Pages: 28
Total Words: 45,230
Average Page Length: 1,616 words
Sections: 4

=== SECTION BREAKDOWN ===

✓ concept
  Pages: 5 | Words: 8,450 | Avg: 1,690 words/page
✓ practical
  Pages: 12 | Words: 18,900 | Avg: 1,575 words/page
⚠ wellbeing
  Pages: 8 | Words: 12,450 | Avg: 1,556 words/page
✓ schedule
  Pages: 3 | Words: 5,430 | Avg: 1,810 words/page
```

---

### 2. find-content-by-keyword.js
**Purpose:** Search for specific keywords, phrases, or patterns

**Usage:**
```bash
node scripts/find-content-by-keyword.js "search term" [contentPath] [--context=3]
```

**Arguments:**
- `search term`: The text or regex pattern to find
- `[contentPath]`: Path to content (default: ./content)
- `[--context=N]`: Lines of context to show (default: 2)

**Regex Support:**
- Use `/pattern/` format for regex: `/consent|permission/`
- Patterns are case-insensitive by default

**Output:**
- Files containing matches
- Line numbers and matching lines
- Context before/after matches
- Total match count

**When to use:**
- Finding where a concept is discussed
- Locating inconsistent terminology
- Searching for specific phrases
- Identifying redundant content
- Finding broken references

**Example:**
```bash
# Find all mentions of "consent"
node scripts/find-content-by-keyword.js "consent"

# Find with regex for consent-related terms
node scripts/find-content-by-keyword.js "/consent|permission|boundaries/" ./content --context=3

# Output:
Searching for: consent

Found in 5 file(s):

📄 concept/philosophy.md
   Line 12: Our consent-forward approach prioritizes participant autonomy
   Line 45: Consent is foundational to all interactions

📄 wellbeing/consent.md
   Line 8: Consent practices and communication
   ...
```

---

### 3. validate-frontmatter.js
**Purpose:** Check frontmatter completeness and consistency

**Usage:**
```bash
node scripts/validate-frontmatter.js [contentPath]
```

**Checks:**
- Required fields: `title`, `description`
- Field lengths (minimum 3 characters)
- Date format validation (YYYY-MM-DD)
- Weight/ordering format
- Overall field consistency

**Output:**
- Valid vs. invalid file counts
- Files with specific issues
- Field usage statistics
- Format validation errors

**When to use:**
- Frontmatter audit
- Preparing for Hugo deployment
- Ensuring metadata consistency
- Identifying incomplete pages
- Validating field formats

**Example:**
```
=== FRONTMATTER VALIDATION SUMMARY ===

Total files: 28
✓ Valid: 24
✗ Issues: 4
⚠ No frontmatter: 0

Files with issues:

  content/concept/philosophy.md
    ✗ Missing required field: description

  content/practical/faq.md
    ✗ Field too short: description (8 chars)
    ✗ Invalid date format: 2024/11/01 (expected YYYY-MM-DD)

=== FIELD USAGE ANALYSIS ===

Field usage (% of files with frontmatter):
  title: 28/28 (100%)
  description: 24/28 (86%)
  weight: 18/28 (64%)
  date: 12/28 (43%)
```

---

### 4. find-broken-references.js
**Purpose:** Identify broken internal links and references

**Usage:**
```bash
node scripts/find-broken-references.js [contentPath]
```

**Detects:**
- Broken markdown links: `[text](path)`
- Broken Hugo relref: `{{< relref "path" >}}`
- Invalid relative paths
- Non-existent file references
- Path resolution issues

**Output:**
- Files with broken references
- Line numbers
- Target paths (both original and resolved)
- Reference type (markdown or relref)

**When to use:**
- Link validation audit
- Finding orphaned pages
- Preparing for site migration
- Validating cross-references
- Before deployment

**Example:**
```
📄 content/practical/participation.md
  Line 23: markdown
    Target: ../policies.md
    Resolved to: content/policies.md

  Line 45: relref
    Target: /wellbeing/consent
    Resolved to: content/wellbeing/consent.md
```

---

### 5. find-content-gaps.js
**Purpose:** Analyze structure for gaps, missing pages, and completeness

**Usage:**
```bash
node scripts/find-content-gaps.js [contentPath]
```

**Checks:**
- Missing expected pages (e.g., _index.md)
- Empty or stub sections
- Organizational structure completeness
- Section coherence
- Content coverage

**Output:**
- Section structure overview
- Gap analysis by severity (high/medium/low)
- Completeness assessment
- Guiding questions for editorial review

**When to use:**
- Content structure audits
- Planning new content
- Identifying missing sections
- Assessing content completeness
- Information architecture review

**Example:**
```
=== SECTION STRUCTURE ANALYSIS ===

📁 concept/
   Files: _index.md, belonging.md, experience.md, philosophy.md
   ✓ Has content

📁 practical/
   Files: _index.md, faq.md
   ⚠ Only has overview page, no content pages

=== GAP ANALYSIS ===

Found 2 gap(s):

practical:
  ⚠ Section only has overview, no content [medium]
  ⚠ Missing expected page: policies.md [high]
```

---

### 6. generate-content-inventory.js
**Purpose:** Generate comprehensive content inventory reports

**Usage:**
```bash
node scripts/generate-content-inventory.js [contentPath]
```

**Output Files:**
- `content-inventory.csv`: Spreadsheet-compatible format
- `content-inventory.md`: Markdown format for version control

**Includes:**
- Path, title, type (index/content)
- Word counts and heading counts
- Frontmatter completeness
- Section organization

**When to use:**
- Creating content audits
- Tracking content metrics
- Sharing inventory with team
- Analyzing content distribution
- Planning content updates

**Example Output:**
```
=== INVENTORY SUMMARY ===

Total Pages: 28
Index Pages: 4
Content Pages: 24
Total Words: 45,230
Avg Words/Page: 1,616
Pages with Description: 26/28
Pages with Weight: 18/28

✓ Generated files:
  - content-inventory.csv
  - content-inventory.md
```

---

## Combining Scripts for Workflows

### Complete Content Audit
```bash
# 1. Get overview
node scripts/analyze-content-structure.js

# 2. Check structure completeness
node scripts/find-content-gaps.js

# 3. Validate technical requirements
node scripts/validate-frontmatter.js
node scripts/find-broken-references.js

# 4. Generate inventory for team
node scripts/generate-content-inventory.js
```

### Consistency Review
```bash
# 1. Find inconsistent terminology
node scripts/find-content-by-keyword.js "event|gathering|retreat"

# 2. Find all safety-related mentions
node scripts/find-content-by-keyword.js "/consent|safety|boundaries/" --context=2

# 3. Inventory to see what's covered
node scripts/generate-content-inventory.js
```

### Gap & Redundancy Analysis
```bash
# 1. Identify missing content
node scripts/find-content-gaps.js

# 2. Search for redundant topics
node scripts/find-content-by-keyword.js "repeated phrase"

# 3. Check for orphaned content
node scripts/find-broken-references.js
```

---

## Script Output Files

Scripts that generate files:
- `content-inventory.csv` - Spreadsheet-compatible inventory
- `content-inventory.md` - Markdown inventory for version control

These files are generated in your current working directory.

---

## Tips & Best Practices

1. **Run from Hugo root**: Scripts expect `./content` directory by default
2. **Use in sequence**: Run structure analysis before gap analysis
3. **Keep outputs**: Version control the inventory files to track changes
4. **Search smartly**: Use regex for flexible pattern matching
5. **Context helps**: Use `--context=5` for better understanding of matches
6. **Automate**: Add scripts to your CI/CD for regular audits

---

## Troubleshooting

**Script not found**
- Ensure you're in the Hugo site root directory
- Use full path if needed: `node ./.claude/skills/editing-hugo-documentation/scripts/analyze-content-structure.js`

**Content path errors**
- Default is `./content`
- Specify explicitly: `node scripts/analyze-content-structure.js /full/path/to/content`

**No output generated**
- Check content directory exists and contains .md files
- Verify Hugo content structure

**Scripts won't run**
- Ensure Node.js v18+ is installed: `node --version`
- Check file permissions: files should be executable
