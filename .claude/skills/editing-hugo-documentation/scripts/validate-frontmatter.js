#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

/**
 * Validates frontmatter completeness and consistency across content
 * Usage: node validate-frontmatter.js [contentPath]
 */

const contentPath = process.argv[2] || './content';

const REQUIRED_FIELDS = ['title', 'description'];
const OPTIONAL_FIELDS = ['weight', 'draft', 'date', 'tags', 'menu'];

async function analyzePath(dirPath, basePath = '') {
  const results = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const subResults = await analyzePath(fullPath, relativePath);
      results.push(...subResults);
    } else if (entry.name.endsWith('.md')) {
      const content = await fs.readFile(fullPath, 'utf-8');
      const match = content.match(/^---\n([\s\S]*?)\n---/);

      if (!match) {
        results.push({
          file: fullPath,
          relativePath,
          hasFrontmatter: false,
          issues: ['No frontmatter found']
        });
        continue;
      }

      const fm = match[1];
      const issues = [];
      const fields = {};

      // Parse YAML fields
      for (const line of fm.split('\n')) {
        const fieldMatch = line.match(/^(\w+):\s*(.+?)(?:\s*#.*)?$/);
        if (fieldMatch) {
          fields[fieldMatch[1]] = fieldMatch[2].replace(/^["']|["']$/g, '');
        }
      }

      // Check required fields
      for (const field of REQUIRED_FIELDS) {
        if (!fields[field]) {
          issues.push(`Missing required field: ${field}`);
        } else if (fields[field].length < 3) {
          issues.push(`Field too short: ${field} (${fields[field].length} chars)`);
        }
      }

      // Check field formats
      if (fields.date && !/^\d{4}-\d{2}-\d{2}/.test(fields.date)) {
        issues.push(`Invalid date format: ${fields.date} (expected YYYY-MM-DD)`);
      }

      if (fields.weight && !/^\d+$/.test(fields.weight)) {
        issues.push(`Invalid weight format: ${fields.weight} (expected number)`);
      }

      results.push({
        file: fullPath,
        relativePath,
        hasFrontmatter: true,
        fields,
        issues,
        fieldCount: Object.keys(fields).length
      });
    }
  }

  return results;
}

async function main() {
  try {
    console.log(`Validating frontmatter in: ${contentPath}\n`);

    const results = await analyzePath(contentPath);

    const valid = results.filter(r => r.issues.length === 0);
    const invalid = results.filter(r => r.issues.length > 0);
    const noFrontmatter = results.filter(r => !r.hasFrontmatter);

    console.log('=== FRONTMATTER VALIDATION SUMMARY ===\n');
    console.log(`Total files: ${results.length}`);
    console.log(`✓ Valid: ${valid.length}`);
    console.log(`✗ Issues: ${invalid.length}`);
    console.log(`⚠ No frontmatter: ${noFrontmatter.length}\n`);

    if (noFrontmatter.length > 0) {
      console.log('Files without frontmatter:');
      noFrontmatter.forEach(r => {
        console.log(`  ${r.relativePath}`);
      });
      console.log();
    }

    if (invalid.length > 0) {
      console.log('Files with issues:');
      invalid.forEach(r => {
        console.log(`\n  ${r.relativePath}`);
        r.issues.forEach(issue => {
          console.log(`    ✗ ${issue}`);
        });
      });
      console.log();
    }

    // Analyze field usage
    console.log('=== FIELD USAGE ANALYSIS ===\n');

    const fieldUsage = {};
    for (const result of results.filter(r => r.hasFrontmatter)) {
      for (const field of Object.keys(result.fields)) {
        fieldUsage[field] = (fieldUsage[field] || 0) + 1;
      }
    }

    const totalWithFM = results.filter(r => r.hasFrontmatter).length;
    console.log('Field usage (% of files with frontmatter):');

    for (const field of [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]) {
      if (fieldUsage[field]) {
        const percentage = Math.round((fieldUsage[field] / totalWithFM) * 100);
        console.log(`  ${field}: ${fieldUsage[field]}/${totalWithFM} (${percentage}%)`);
      }
    }

    const avgFieldCount = Math.round(
      results.filter(r => r.hasFrontmatter)
        .reduce((sum, r) => sum + r.fieldCount, 0) /
      results.filter(r => r.hasFrontmatter).length
    );
    console.log(`\nAverage fields per file: ${avgFieldCount}`);

  } catch (error) {
    console.error('Error validating frontmatter:', error.message);
    process.exit(1);
  }
}

main();
