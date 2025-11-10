# Hugo Content Structure Analysis

Methodology for conducting a bird's eye view audit of your Hugo documentation site's content organization, hierarchy, and relationships.

## Structure Analysis Framework

### 1. Content Hierarchy Mapping
Map the complete content structure from root to leaves:

```
docs/
├── concept/
│   ├── _index.md (concept overview)
│   ├── belonging.md
│   ├── experience.md
│   └── philosophy.md
├── practical/
│   ├── _index.md (practical overview)
│   ├── faq.md
│   └── policies.md
├── wellbeing/
│   └── _index.md (wellbeing overview)
└── schedule/
    └── _index.md (schedule overview)
```

**What to assess:**
- Main section organization (concept, practical, wellbeing, schedule, etc.)
- Subsection depth and breadth
- Index pages and their role
- Navigation flow between sections

### 2. Content Section Inventory

Create a detailed inventory of all content sections:

| Section | Index Page | Number of Pages | Primary Purpose | Status |
|---------|-----------|-----------------|-----------------|--------|
| concept | ✓ | 4 | Conceptual foundation | Active |
| practical | ✓ | 8 | Implementation details | Mixed (some deleted) |
| wellbeing | ✓ | 3 | Support and care | Developing |
| schedule | ✓ | 1 | Timeline info | Active |

**What to assess:**
- Completeness of sections
- Balance across sections
- Active vs. deprecated content
- Orphaned or undersized sections

### 3. Content Relationships

Identify how content sections relate to each other:

- **Hierarchical**: Parent-child relationships (concept > belonging)
- **Sequential**: Content progression (first read this, then that)
- **Topical**: Thematic connections (consent appears in both safety and integration)
- **Functional**: Support relationships (FAQ answers questions raised elsewhere)

**What to assess:**
- Are related concepts grouped together?
- Is the reading order logical?
- Are cross-section dependencies clear?
- Could content be reorganized for better flow?

### 4. Content Type Distribution

Categorize pages by function:

- **Overview/Index pages**: Provide section summaries and navigation
- **Conceptual/Foundation**: Explain "why" and core principles
- **Practical/How-To**: Explain "how" and provide steps
- **Reference/FAQ**: Answer specific questions
- **Narrative/Story**: Share experiences or context

**What to assess:**
- Is the balance appropriate for your audience?
- Are content types clearly distinguished?
- Does each page have a clear purpose?

## Questions to Answer During Structure Audit

### Organization & Flow
- [ ] Is the top-level section organization clear and logical?
- [ ] Does the hierarchical structure match user mental models?
- [ ] Are there orphaned pages (pages not linked from anywhere)?
- [ ] Is the reading order intuitive?

### Completeness
- [ ] Are there obvious gaps in coverage?
- [ ] Are there sections that feel undersized or oversized?
- [ ] Is there redundant content that could be consolidated?
- [ ] Are deleted pages properly archived or removed?

### Navigation & Discoverability
- [ ] Can users find content from the main structure?
- [ ] Are there missing links between related content?
- [ ] Do index pages effectively guide users?
- [ ] Is the structure reflected in the navigation menu?

### Audience Alignment
- [ ] Does the structure match how the audience thinks about the subject?
- [ ] Is important content easily discoverable?
- [ ] Is the progression from introduction to advanced clear?

## Output: Structure Overview Report

When auditing structure, provide:

```
# Content Structure Overview

## Organization Summary
- Total sections: X
- Total pages: X
- Approximate content volume: X words
- Main navigation categories: [list]

## Section Breakdown
[Detailed inventory table]

## Key Findings

### Strengths
- Clear hierarchical organization
- Good balance between concept and practical content
- [etc]

### Areas for Improvement
- Gap: Missing content about [topic]
- Redundancy: [Topic] covered in both sections
- Navigation: [Section] is hard to find from main nav
- [etc]

### Recommended Actions
1. [Specific reorganization or content creation]
2. [Specific consolidation or deletion]
3. [Specific navigation improvement]
```

## Common Structure Issues to Identify

### Organizational Issues
- **Unclear Hierarchy**: Sections at same level that should be nested
- **Orphaned Content**: Pages with no clear parent or navigation path
- **Awkward Nesting**: Content nested too deeply or shallowly
- **Inconsistent Organization**: Similar content organized differently in different sections

### Gap Issues
- **Missing Overview**: Sections without index/overview pages
- **Missing Foundation**: Concept pages missing before practical pages
- **Missing Integration**: No bridging content between sections
- **Missing Reference**: No FAQ or glossary for complex terminology

### Redundancy Issues
- **Duplicated Content**: Same information in multiple places
- **Overlapping Scope**: Sections that cover same topics
- **Unclear Boundaries**: Where does one section end and another begin?

### Scale Issues
- **Too Shallow**: Section with only 1-2 pages
- **Too Deep**: Section with excessive nesting levels
- **Imbalanced**: Some sections huge, others tiny without clear reason

## Tips for Effective Structure Analysis

1. **Start with the User**: How would your audience naturally organize this information?
2. **Follow the Navigation**: What does the actual Hugo menu structure show? Does it match the file structure?
3. **Look for Patterns**: Are organizational patterns consistent across sections?
4. **Check Metadata**: Review frontmatter to understand intended organization (weight, menu settings, etc.)
5. **Consider Future Growth**: Will this structure scale as you add more content?
6. **Test Navigation**: Can you find content through multiple paths? Or is there only one way to discover things?
