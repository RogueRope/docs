#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { readFileSync } from 'fs';

/**
 * Analyzes Hugo content structure and generates a comprehensive overview
 * Usage: node analyze-content-structure.js [contentPath]
 */

const contentPath = process.argv[2] || './content';

/**
 * @typedef {Object} PageMetadata
 * @property {string} filePath
 * @property {string} relativePath
 * @property {string} title
 * @property {string} description
 * @property {number|null} weight
 * @property {boolean} isIndex
 * @property {number} wordCount
 * @property {number} frontmatterSize
 */

/**
 * @typedef {Object} SectionInfo
 * @property {string} name
 * @property {string} path
 * @property {number} pageCount
 * @property {number} totalWords
 * @property {number} avgWordCount
 * @property {boolean} hasIndex
 * @property {PageMetadata[]} pages
 */

async function readFrontmatter(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const fm = match[1];
    const title = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || '';
    const description = fm.match(/^description:\s*["']?(.+?)["']?\s*$/m)?.[1] || '';
    const weight = fm.match(/^weight:\s*(\d+)/m)?.[1];

    return {
      title,
      description,
      weight: weight ? parseInt(weight) : null
    };
  } catch (e) {
    return {};
  }
}

function getWordCount(content) {
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  return body.trim().split(/\s+/).length;
}

async function analyzePath(dirPath, basePath = '') {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const pages = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const subPages = await analyzePath(fullPath, relativePath);
      pages.push(...subPages);
    } else if (entry.name.endsWith('.md')) {
      const content = await fs.readFile(fullPath, 'utf-8');
      const fm = await readFrontmatter(fullPath);
      const wordCount = getWordCount(content);

      pages.push({
        filePath: fullPath,
        relativePath,
        title: fm.title || entry.name.replace('.md', ''),
        description: fm.description || '',
        weight: fm.weight || null,
        isIndex: entry.name === '_index.md',
        wordCount,
        frontmatterSize: content.match(/^---\n[\s\S]*?\n---/)?.[0].length || 0
      });
    }
  }

  return pages;
}

function groupBySection(pages) {
  const sections = {};

  for (const page of pages) {
    const dir = path.dirname(page.relativePath);
    const section = dir === '.' ? '_root' : dir.split(path.sep)[0];

    if (!sections[section]) {
      sections[section] = {
        name: section,
        path: section === '_root' ? '/' : section,
        pages: [],
        pageCount: 0,
        totalWords: 0,
        avgWordCount: 0,
        hasIndex: false
      };
    }

    sections[section].pages.push(page);
    if (page.isIndex) sections[section].hasIndex = true;
  }

  // Calculate stats
  for (const section of Object.values(sections)) {
    section.pageCount = section.pages.length;
    section.totalWords = section.pages.reduce((sum, p) => sum + p.wordCount, 0);
    section.avgWordCount = Math.round(section.totalWords / section.pageCount);
  }

  return sections;
}

async function main() {
  try {
    console.log(`Analyzing content structure at: ${contentPath}\n`);

    const pages = await analyzePath(contentPath);
    const sections = groupBySection(pages);

    const totalPages = pages.length;
    const totalWords = pages.reduce((sum, p) => sum + p.wordCount, 0);
    const avgPageLength = Math.round(totalWords / totalPages);

    console.log('=== CONTENT STRUCTURE OVERVIEW ===\n');
    console.log(`Total Pages: ${totalPages}`);
    console.log(`Total Words: ${totalWords.toLocaleString()}`);
    console.log(`Average Page Length: ${avgPageLength} words`);
    console.log(`Sections: ${Object.keys(sections).length}\n`);

    console.log('=== SECTION BREAKDOWN ===\n');

    for (const section of Object.values(sections).sort((a, b) =>
      a.path.localeCompare(b.path)
    )) {
      const indexStatus = section.hasIndex ? '✓' : '✗';
      console.log(`${indexStatus} ${section.path}`);
      console.log(`  Pages: ${section.pageCount} | Words: ${section.totalWords.toLocaleString()} | Avg: ${section.avgWordCount} words/page`);

      // List pages (sorted by weight or name)
      const sorted = [...section.pages].sort((a, b) => {
        if (a.isIndex) return -1;
        if (b.isIndex) return 1;
        return (a.weight ?? Infinity) - (b.weight ?? Infinity);
      });

      for (const page of sorted.slice(0, 5)) {
        const prefix = page.isIndex ? '[INDEX]' : '';
        console.log(`    ${prefix} ${page.title} (${page.wordCount} words)`);
      }

      if (sorted.length > 5) {
        console.log(`    ... and ${sorted.length - 5} more`);
      }
      console.log();
    }

    console.log('=== CONTENT QUALITY METRICS ===\n');

    // Pages without descriptions
    const noDesc = pages.filter(p => !p.description);
    if (noDesc.length > 0) {
      console.log(`⚠ Pages without descriptions: ${noDesc.length}`);
      console.log(`  ${noDesc.map(p => p.relativePath).slice(0, 5).join('\n  ')}`);
      if (noDesc.length > 5) console.log(`  ... and ${noDesc.length - 5} more`);
      console.log();
    }

    // Very short pages
    const short = pages.filter(p => p.wordCount < 100 && !p.isIndex);
    if (short.length > 0) {
      console.log(`⚠ Very short pages (<100 words): ${short.length}`);
      console.log(`  ${short.map(p => `${p.relativePath} (${p.wordCount} words)`).slice(0, 5).join('\n  ')}`);
      if (short.length > 5) console.log(`  ... and ${short.length - 5} more`);
      console.log();
    }

    // Pages without weight (ordering)
    const noWeight = pages.filter(p => p.weight === null && !p.isIndex);
    if (noWeight.length > 0) {
      console.log(`ℹ Pages without weight/ordering: ${noWeight.length}`);
      console.log();
    }

    // Sections without index
    const noIndexSections = Object.values(sections).filter(s => !s.hasIndex);
    if (noIndexSections.length > 0) {
      console.log(`⚠ Sections without _index.md: ${noIndexSections.length}`);
      console.log(`  ${noIndexSections.map(s => s.path).join(', ')}`);
      console.log();
    }

  } catch (error) {
    console.error('Error analyzing content:', error.message);
    process.exit(1);
  }
}

main();
