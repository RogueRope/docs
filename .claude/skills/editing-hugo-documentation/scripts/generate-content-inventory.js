#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

/**
 * Generates a detailed content inventory report
 * Usage: node generate-content-inventory.js [contentPath]
 */

const contentPath = process.argv[2] || './content';

async function readFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const fm = match[1];
  const result = {};

  for (const line of fm.split('\n')) {
    const fieldMatch = line.match(/^(\w+):\s*(.+?)(?:\s*#.*)?$/);
    if (fieldMatch) {
      result[fieldMatch[1]] = fieldMatch[2].replace(/^["']|["']$/g, '');
    }
  }

  return result;
}

function getWordCount(content) {
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  return body.trim().split(/\s+/).length;
}

function getHeadings(content) {
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  const headings = [];
  const lines = body.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim()
      });
    }
  }

  return headings;
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
      const fm = await readFrontmatter(content);
      const wordCount = getWordCount(content);
      const headings = getHeadings(content);

      pages.push({
        relativePath: relativePath.replace(/\\/g, '/'),
        title: fm.title || entry.name.replace('.md', ''),
        description: fm.description || '',
        weight: fm.weight || null,
        isIndex: entry.name === '_index.md',
        wordCount,
        headingCount: headings.length,
        hasDescription: !!fm.description,
        hasWeight: fm.weight !== undefined
      });
    }
  }

  return pages;
}

function generateCSV(pages) {
  const headers = ['Path', 'Title', 'Type', 'Words', 'Headings', 'Has Description?', 'Has Weight?'];
  const rows = [headers.join(',')];

  for (const page of pages) {
    const type = page.isIndex ? 'Index' : 'Content';
    const row = [
      `"${page.relativePath}"`,
      `"${page.title}"`,
      type,
      page.wordCount,
      page.headingCount,
      page.hasDescription ? 'Yes' : 'No',
      page.hasWeight ? 'Yes' : 'No'
    ];
    rows.push(row.join(','));
  }

  return rows.join('\n');
}

function generateMarkdown(pages) {
  let output = '# Content Inventory\n\n';

  const bySection = {};
  for (const page of pages) {
    const section = page.relativePath.split('/')[0];
    if (!bySection[section]) {
      bySection[section] = [];
    }
    bySection[section].push(page);
  }

  for (const [section, sectionPages] of Object.entries(bySection)) {
    output += `## ${section}/\n\n`;
    output += '| Page | Title | Words | Headings | Description |\n';
    output += '|------|-------|-------|----------|-------------|\n';

    for (const page of sectionPages) {
      const type = page.isIndex ? '**[INDEX]**' : '';
      const title = `${type} ${page.title}`;
      const desc = page.hasDescription ? '✓' : '✗';
      output += `| ${page.relativePath.replace(`${section}/`, '')} | ${title} | ${page.wordCount} | ${page.headingCount} | ${desc} |\n`;
    }

    output += '\n';
  }

  return output;
}

async function main() {
  try {
    const pages = await analyzePath(contentPath);

    console.log(`Generated inventory for ${pages.length} pages\n`);

    // Print summary
    console.log('=== INVENTORY SUMMARY ===\n');
    console.log(`Total Pages: ${pages.length}`);
    console.log(`Index Pages: ${pages.filter(p => p.isIndex).length}`);
    console.log(`Content Pages: ${pages.filter(p => !p.isIndex).length}`);
    console.log(`Total Words: ${pages.reduce((sum, p) => sum + p.wordCount, 0).toLocaleString()}`);
    console.log(`Avg Words/Page: ${Math.round(pages.reduce((sum, p) => sum + p.wordCount, 0) / pages.length)}`);
    console.log(`Pages with Description: ${pages.filter(p => p.hasDescription).length}/${pages.length}`);
    console.log(`Pages with Weight: ${pages.filter(p => p.hasWeight).length}/${pages.length}\n`);

    // Generate outputs
    const csvOutput = generateCSV(pages);
    const mdOutput = generateMarkdown(pages);

    // Write files
    await fs.writeFile('content-inventory.csv', csvOutput);
    await fs.writeFile('content-inventory.md', mdOutput);

    console.log('✓ Generated files:');
    console.log('  - content-inventory.csv');
    console.log('  - content-inventory.md');

  } catch (error) {
    console.error('Error generating inventory:', error.message);
    process.exit(1);
  }
}

main();
