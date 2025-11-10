#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

/**
 * Finds content by keyword or phrase
 * Usage: node find-content-by-keyword.js "search term" [contentPath] [--context=3]
 */

const searchTerm = process.argv[2];
const contentPath = process.argv[3] || './content';
const contextLines = parseInt(
  process.argv.find(arg => arg.startsWith('--context='))?.split('=')[1] || '2'
);

if (!searchTerm) {
  console.error('Usage: node find-content-by-keyword.js "search term" [contentPath]');
  process.exit(1);
}

async function searchFiles(dirPath, searchPattern) {
  const results = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const subResults = await searchFiles(fullPath, searchPattern);
      results.push(...subResults);
    } else if (entry.name.endsWith('.md')) {
      const content = await fs.readFile(fullPath, 'utf-8');
      const lines = content.split('\n');
      const matches = [];

      lines.forEach((line, idx) => {
        if (searchPattern.test(line)) {
          matches.push({
            lineNum: idx + 1,
            line: line.trim(),
            context: {
              before: lines.slice(Math.max(0, idx - contextLines), idx),
              after: lines.slice(idx + 1, Math.min(lines.length, idx + contextLines + 1))
            }
          });
        }
      });

      if (matches.length > 0) {
        results.push({
          file: fullPath,
          matches
        });
      }
    }
  }

  return results;
}

async function main() {
  try {
    const isRegex = searchTerm.startsWith('/') && searchTerm.endsWith('/');
    const pattern = isRegex
      ? new RegExp(searchTerm.slice(1, -1), 'i')
      : new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    console.log(`Searching for: ${searchTerm}`);
    console.log(`Content path: ${contentPath}\n`);

    const results = await searchFiles(contentPath, pattern);

    if (results.length === 0) {
      console.log('No matches found.');
      return;
    }

    console.log(`Found in ${results.length} file(s):\n`);

    for (const result of results) {
      const relativePath = result.file.replace(contentPath, '').replace(/^\//, '');
      console.log(`📄 ${relativePath}`);

      for (const match of result.matches) {
        console.log(`   Line ${match.lineNum}: ${match.line}`);
      }
      console.log();
    }

    console.log(`\nTotal matches: ${results.reduce((sum, r) => sum + r.matches.length, 0)}`);

  } catch (error) {
    console.error('Error searching content:', error.message);
    process.exit(1);
  }
}

main();
