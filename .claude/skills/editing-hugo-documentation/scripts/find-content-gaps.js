#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

/**
 * Analyzes content for gaps, redundancy, and incomplete sections
 * Usage: node find-content-gaps.js [contentPath]
 */

const contentPath = process.argv[2] || './content';

// Common topics to look for in your documentation
const EXPECTED_TOPICS = {
  'philosophy': ['why', 'values', 'principles', 'mission'],
  'practical': ['how', 'steps', 'guide', 'process', 'instruction'],
  'safety': ['consent', 'boundaries', 'respect', 'care', 'support'],
  'faq': ['question', 'answer', 'common', 'troubleshoot'],
  'community': ['together', 'connection', 'belong', 'gather'],
};

const EXPECTED_PAGES = {
  'concept': ['_index.md'],
  'practical': ['_index.md', 'faq.md'],
  'wellbeing': ['_index.md'],
  'schedule': ['_index.md'],
};

async function analyzePath(dirPath, basePath = '') {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const sections = {};

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const fullPath = path.join(dirPath, entry.name);
    const sectionFiles = await fs.readdir(fullPath, { withFileTypes: true });

    sections[entry.name] = {
      name: entry.name,
      files: sectionFiles
        .filter(f => f.isFile() && f.name.endsWith('.md'))
        .map(f => f.name),
      subdirs: sectionFiles
        .filter(f => f.isDirectory())
        .map(f => f.name)
    };
  }

  return sections;
}

async function getPageContent(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content.toLowerCase();
  } catch {
    return '';
  }
}

async function main() {
  try {
    console.log(`Analyzing content gaps in: ${contentPath}\n`);

    const sections = await analyzePath(contentPath);

    console.log('=== SECTION STRUCTURE ANALYSIS ===\n');

    const gaps = [];
    const redundancy = [];
    const goodPractices = [];

    for (const [sectionName, section] of Object.entries(sections)) {
      console.log(`📁 ${sectionName}/`);
      console.log(`   Files: ${section.files.join(', ') || '(none)'}`);
      console.log(`   Subdirs: ${section.subdirs.join(', ') || '(none)'}`);

      // Check for expected pages
      if (EXPECTED_PAGES[sectionName]) {
        for (const expectedPage of EXPECTED_PAGES[sectionName]) {
          if (!section.files.includes(expectedPage)) {
            gaps.push({
              section: sectionName,
              issue: `Missing expected page: ${expectedPage}`,
              severity: 'high'
            });
            console.log(`   ⚠ Missing: ${expectedPage}`);
          } else {
            goodPractices.push(`${sectionName} has ${expectedPage}`);
          }
        }
      }

      // Check for index
      if (!section.files.includes('_index.md') && section.files.length > 1) {
        gaps.push({
          section: sectionName,
          issue: 'Section lacks overview page (_index.md)',
          severity: 'medium'
        });
        console.log(`   ⚠ No overview page (_index.md)`);
      }

      // Check for incomplete sections
      if (section.files.length === 0 && section.subdirs.length === 0) {
        gaps.push({
          section: sectionName,
          issue: 'Section is empty',
          severity: 'high'
        });
        console.log(`   ✗ Section is completely empty`);
      } else if (section.files.length === 1 && section.files[0] === '_index.md' && !section.subdirs.length) {
        gaps.push({
          section: sectionName,
          issue: 'Section only has overview, no content',
          severity: 'medium'
        });
        console.log(`   ⚠ Only has overview page, no content pages`);
      } else {
        console.log(`   ✓ Has content`);
      }

      console.log();
    }

    console.log('=== GAP ANALYSIS ===\n');

    if (gaps.length === 0) {
      console.log('✓ No major structural gaps detected!');
    } else {
      console.log(`Found ${gaps.length} gap(s):\n`);

      const bySection = {};
      for (const gap of gaps) {
        if (!bySection[gap.section]) {
          bySection[gap.section] = [];
        }
        bySection[gap.section].push(gap);
      }

      for (const [section, sectionGaps] of Object.entries(bySection)) {
        console.log(`${section}:`);
        for (const gap of sectionGaps) {
          const icon = gap.severity === 'high' ? '✗' : '⚠';
          console.log(`  ${icon} ${gap.issue} [${gap.severity}]`);
        }
        console.log();
      }
    }

    console.log('=== CONTENT COMPLETENESS QUESTIONS ===\n');

    // Questions to guide gap analysis
    const questions = [
      'Does every section have an _index.md overview page?',
      'Are there orphaned pages not linked from section overview?',
      'Do sections match the site structure in navigation?',
      'Are there placeholder or stub pages (< 50 words)?',
      'Is there content for all major user journeys?',
      'Are frequently asked questions documented in an FAQ?',
    ];

    for (const q of questions) {
      console.log(`• ${q}`);
    }

  } catch (error) {
    console.error('Error analyzing gaps:', error.message);
    process.exit(1);
  }
}

main();
