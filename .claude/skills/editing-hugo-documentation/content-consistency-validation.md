# Content Consistency Validation

Framework for checking consistency in voice, terminology, structure, formatting, and metadata across your Hugo documentation site.

## Consistency Dimensions

### 1. Voice & Tone Consistency

Ensuring consistent brand voice and tone across all documentation sections.

**What to Check**
- [ ] **Formality Level**: Is the tone consistent across pages? (too casual on one page, too formal on another)
- [ ] **Perspective**: Are pronouns consistent? (mixing "you," "we," "one" randomly)
- [ ] **Emotional Tone**: Does emotional resonance match across similar content types?
- [ ] **Confidence Level**: Is authority calibrated similarly across pages?
- [ ] **Engagement Style**: Is reader engagement consistent (friendly vs. formal)?

**Questions to Ask**
- Would a reader recognize this as part of the same documentation suite?
- Does a reader switching between sections notice a jarring tone shift?
- Are similar topics handled with similar voice and approach?

**How to Validate**
1. Read opening paragraphs from different sections back-to-back
2. Compare how similar topics are introduced in different sections
3. Check how instructions are framed (imperative vs. optional)
4. Review emotional language usage across pages
5. Note first/second person consistency

**Integration**: Use the `tov-editor` skill for detailed brand voice alignment review

### 2. Terminology & Language Consistency

Ensuring consistent terminology and language use throughout documentation.

**What to Check**
- [ ] **Key Concepts**: Are important concepts named consistently? (not "event" vs. "gathering" randomly)
- [ ] **Alternative Names**: If concepts have multiple valid names, is one chosen and used consistently?
- [ ] **Jargon**: Is specialized terminology explained the same way everywhere?
- [ ] **Abbreviations**: Are abbreviations expanded the first time? Same expansion format?
- [ ] **Pronoun Usage**: Consistent use of "you," "we," "they," etc.
- [ ] **Time References**: Consistent language for past/future/ongoing situations

**Word Consistency Audit**
Create a terminology audit by checking how key concepts are referenced:

| Concept | Term Used | Consistency | Notes |
|---------|-----------|-------------|-------|
| The event/gathering | "gathering" / "event" | Mixed | Use "gathering" consistently |
| Participation type | "participant" / "attendee" | Mixed | Choose one term |
| Safety protocols | "safety" / "consent" / "care" | Inconsistent scope | Define boundaries |

**Questions to Ask**
- Would a reader understand that "event" and "gathering" mean the same thing?
- Are technical terms explained the same way each time they're introduced?
- Is there a glossary/index that defines key terms consistently?

**How to Validate**
1. List 10-15 key concepts from your domain
2. Search for each concept across documentation
3. Note all variations and contexts
4. Identify which variation should be canonical
5. Flag inconsistencies for standardization

### 3. Structural Consistency

Ensuring similar content types follow similar structures.

**What to Check**
- [ ] **Page Structure**: Do similar content types (guides, references, FAQs) follow similar structures?
- [ ] **Heading Hierarchy**: Is heading hierarchy consistent across sections?
- [ ] **Section Patterns**: Do overview pages follow a similar pattern?
- [ ] **List Formatting**: Consistent use of bullets vs. numbered lists
- [ ] **Code Block Usage**: Consistent formatting for code examples
- [ ] **Callout Patterns**: Warnings, tips, notes formatted consistently

**Page Type Structure Template**

For each content type, document the standard structure:

```
## Guide Page Structure
1. Introduction (establish context and purpose)
2. Prerequisites or assumptions
3. Step-by-step instructions
4. Expected outcome/result
5. Troubleshooting (if applicable)
6. Next steps/related content

## Reference Page Structure
1. Definition/overview
2. Key parameters or components
3. Examples
4. Related references

## FAQ Entry Structure
1. Question (clear and specific)
2. Direct answer
3. Explanation or context
4. Links to related content
```

**Questions to Ask**
- If I see a page that looks like a guide, would I expect it to follow a specific structure?
- Can users predict where information will be located based on page type?
- Would a new contributor know how to structure a similar page?

**How to Validate**
1. Categorize pages by type (guide, reference, overview, FAQ, narrative, etc.)
2. Check structure of 2-3 pages of each type
3. Note variations and deviations
4. Identify the "standard" structure for each type
5. Flag pages that don't follow the standard

### 4. Formatting & Markdown Consistency

Ensuring consistent use of formatting elements across documentation.

**What to Check**
- [ ] **Heading Levels**: No skipped heading levels (H1 > H2 > H3, not H1 > H3)
- [ ] **List Format**: Consistent use of bullets (-) vs. asterisks (*) vs. plus signs (+)
- [ ] **Emphasis**: Consistent use of bold (**) vs. italic (*) for similar purposes
- [ ] **Code Formatting**: Backticks for inline code, consistent fence format (``` vs. ~~~)
- [ ] **Callout Format**: Consistent format for notes, warnings, tips (blockquote vs. shortcode)
- [ ] **Link Format**: Consistent format for internal links ([text](path) vs. Hugo links)
- [ ] **Image References**: Consistent path format and alt text inclusion

**Quick Scan Checklist**
Look for patterns like:
- Some pages use `**bold**` for emphasis, others use `*italic*` for same purpose
- Some code blocks use `, others use ```
- Inconsistent capitalization in list items
- Some links use Hugo syntax, others use markdown

**Questions to Ask**
- Would a reader see consistent formatting for similar elements?
- Would a contributor know how to format new content?
- Is the markdown clean and consistent?

**How to Validate**
1. Review 5-10 randomly selected pages
2. Note formatting choices for each element type
3. Check if choices are consistent across pages
4. Create a style guide showing the standard for each element
5. Flag pages that don't follow the standard

### 5. Frontmatter Consistency

Ensuring consistent and complete metadata across all pages.

**What to Check**
- [ ] **Required Fields**: All pages have required frontmatter fields
- [ ] **Optional Fields**: Consistent use of optional fields across similar pages
- [ ] **Field Format**: Date formats, author names, tags all consistent
- [ ] **Weights/Ordering**: Consistent use of weights for ordering
- [ ] **Menu Fields**: Consistent navigation metadata
- [ ] **Custom Fields**: Consistency in project-specific frontmatter fields

**Frontmatter Audit Template**

```yaml
Required Fields:
- title: [Check all pages have this]
- description: [Check all pages have this]
- date: [Format consistency: YYYY-MM-DD]

Optional Fields:
- weight: [Only some pages? Pattern?]
- draft: [Only pages in development?]
- tags: [Capitalization consistency?]
- menu: [Which pages use this?]

Project Fields:
- [custom field]: [Usage and consistency]
```

**Questions to Ask**
- Are all pages consistently described?
- Would Hugo correctly order pages based on weight fields?
- Are menu items set up consistently?
- Would a new contributor know what frontmatter fields are needed?

**How to Validate**
1. Run a script to extract all frontmatter from all pages
2. Check which fields appear on which pages
3. Verify date formats are consistent
4. Check for required fields on all pages
5. Validate field values are consistent (e.g., tag capitalization)

**Integration**: Use the `hugo-content-checker` skill for detailed technical frontmatter validation

### 6. Cross-Section Consistency

Ensuring consistency across major sections of the documentation.

**What to Check**
- [ ] **Overview Pages**: Do section overviews follow similar structure and depth?
- [ ] **Navigation Patterns**: Similar sections organized similarly?
- [ ] **Depth/Detail**: Similar pages have similar level of detail across sections?
- [ ] **Tone Appropriateness**: Tone appropriate for similar content types across sections?
- [ ] **Related Links**: Cross-section references handled consistently?
- [ ] **Examples**: Similar types of examples across sections?

**Section Consistency Audit**

| Element | Section A | Section B | Section C | Consistency Issue? |
|---------|-----------|-----------|-----------|-------------------|
| Overview page exists | ✓ | ✓ | ✗ | Missing in C |
| Intro style | Narrative | Q&A | Tutorial | Too varied |
| Avg page depth | 1500 words | 800 words | 1200 words | Variable |
| Example type | Real-world | Simplified | Code-first | Inconsistent |

**Questions to Ask**
- Would a reader expect sections to be organized similarly?
- Is there a coherent "documentation personality" across sections?
- Do sections feel like they were written by different people with different standards?

**How to Validate**
1. Select 2-3 parallel content items from each section
2. Compare structure, depth, tone, approach
3. Note variations and what causes them
4. Assess whether variations are intentional or accidental
5. Recommend standardization where appropriate

## Consistency Validation Workflow

### Quick Consistency Check (30 minutes)

1. **Terminology Scan** (10 min): Search for 5-10 key concepts; note if used consistently
2. **Tone Check** (10 min): Read opening paragraphs from different sections; spot tone shifts
3. **Structure Scan** (5 min): Check if similar page types follow similar structures
4. **Frontmatter Spot Check** (5 min): Quick look at 3-4 pages' frontmatter completeness

### Comprehensive Consistency Audit (2-3 hours)

1. **Terminology Audit** (30-40 min): Systematic check of key concepts using search
2. **Tone Analysis** (20-30 min): Read substantial sections from each major area
3. **Structure Review** (20-30 min): Check all page types for consistency
4. **Formatting Review** (20-30 min): Scan for markdown and formatting consistency
5. **Frontmatter Validation** (20-30 min): Complete frontmatter audit
6. **Cross-Section Review** (20-30 min): Compare parallel sections
7. **Recommendations** (15-20 min): Prioritize consistency improvements

## Common Consistency Issues

### Terminology Issues
- Concept referred to as "event," "gathering," "retreat," and "workshop" interchangeably
- Safety described as "consent," "safety," "care," or "boundaries" without clear distinction
- Participant types called "attendee," "participant," or "member" inconsistently

### Tone Issues
- Some sections feel informal and friendly; others feel corporate and formal
- Some pages use "you" directly; others use passive voice
- Mix of instructive tone and narrative tone without clear reason

### Structural Issues
- Guide pages have different numbers of steps and different step structures
- Overview pages vary widely in length and organization
- FAQ entries formatted differently (some with explanations, others minimal)

### Formatting Issues
- Some code examples use ``` with language specifier, others use ` with no language
- Emphasis inconsistent (some use **bold** for concepts, others use *italic*)
- Link formats mixed (some use [text](url), some use {{< relref >}})

### Frontmatter Issues
- Some pages have descriptions, others don't
- Date formats vary (YYYY-MM-DD vs. MM/DD/YYYY)
- Weights missing on some pages in a series
- Tag capitalization inconsistent

## Consistency Standards Document

Create a living reference for consistency standards:

```markdown
# Content Consistency Standards

## Key Terminology
- "Gathering" - our primary event name (not "event," "retreat," "workshop")
- "Participant" - person attending (not "attendee," "member")
- "Consent-forward" - our approach to safety and boundaries

## Tone & Voice
- Warm and welcoming but professional
- Direct address using "you"
- Explanatory but not condescending
- Acknowledging participant agency and autonomy

## Frontmatter Requirements
- All pages must have: title, description
- Optional but consistent: weight (for order), tags
- Date format: YYYY-MM-DD

## Structure Standards
- Guide pages: [see template above]
- Reference pages: [see template above]
- Section overviews: [see template above]

## Formatting Standards
- Code: Use ``` with language specifier
- Emphasis: **bold** for concepts, *italic* for emphasis
- Links: Use Hugo relref for internal links
- Lists: Use - for unordered, 1. for ordered
```

Maintain this as a reference for future content creation and updates.
