#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

/**
 * Finds broken internal references and markdown links
 * Usage: node find-broken-references.js [contentPath]
 */

const contentPath = process.argv[2] || './content';

async function getAllMarkdownFiles(dirPath, basePath = '') {
  const files = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await getAllMarkdownFiles(fullPath, relativePath);
      files.push(...subFiles);
    } else if (entry.name.endsWith('.md')) {
      files.push({
        fullPath,
        relativePath,
        fileName: entry.name
      });
    }
  }

  return files;
}

function extractLinks(content) {
  const links = [];

  // Markdown links: [text](path)
  const mdRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = mdRegex.exec(content)) !== null) {
    const target = match[2];
    if (!target.startsWith('http') && !target.startsWith('mailto:')) {
      links.push({
        type: 'markdown',
        text: match[1],
        target: target.split('#')[0], // Remove anchors
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }

  // Hugo relref: {{< relref ...>}}
  const refRegex = /\{\{<\s*relref\s+"([^"]+)"\s*>\}\}/g;
  while ((match = refRegex.exec(content)) !== null) {
    const target = match[1].split('#')[0];
    links.push({
      type: 'relref',
      target: target,
      line: content.substring(0, match.index).split('\n').length
    });
  }

  return links;
}

async function main() {
  try {
    console.log(`Finding broken references in: ${contentPath}\n`);

    const allFiles = await getAllMarkdownFiles(contentPath);
    const fileMap = {};
    const issues = [];

    // Build file map
    for (const file of allFiles) {
      // Normalize path
      const normalized = file.relativePath.replace(/\\/g, '/');
      fileMap[normalized] = file;
      fileMap[normalized.replace(/_index\.md$/, '')] = file;
      fileMap[normalized.replace(/\.md$/, '')] = file;
    }

    // Check references
    for (const file of allFiles) {
      const content = await fs.readFile(file.fullPath, 'utf-8');
      const links = extractLinks(content);

      for (const link of links) {
        let target = link.target.replace(/\\/g, '/');

        // Skip external links and anchors
        if (!target || target.startsWith('http') || target.startsWith('/images') || target.startsWith('/static')) {
          continue;
        }

        // Resolve relative paths
        if (target.startsWith('./')) {
          const dirName = path.dirname(file.relativePath);
          target = path.normalize(path.join(dirName, target)).replace(/\\/g, '/');
        } else if (target.startsWith('../')) {
          const dirName = path.dirname(file.relativePath);
          target = path.normalize(path.join(dirName, target)).replace(/\\/g, '/');
        }

        // Check if target exists
        if (!fileMap[target] && !fileMap[target + '/_index.md']) {
          issues.push({
            file: file.relativePath,
            line: link.line,
            type: link.type,
            target: link.target,
            resolved: target
          });
        }
      }
    }

    if (issues.length === 0) {
      console.log('✓ No broken references found!');
      return;
    }

    console.log(`Found ${issues.length} broken reference(s):\n`);

    const issuesByFile = {};
    for (const issue of issues) {
      if (!issuesByFile[issue.file]) {
        issuesByFile[issue.file] = [];
      }
      issuesByFile[issue.file].push(issue);
    }

    for (const [file, fileIssues] of Object.entries(issuesByFile)) {
      console.log(`📄 ${file}`);
      for (const issue of fileIssues) {
        console.log(`  Line ${issue.line}: ${issue.type}`);
        console.log(`    Target: ${issue.target}`);
        console.log(`    Resolved to: ${issue.resolved}`);
      }
      console.log();
    }

  } catch (error) {
    console.error('Error finding broken references:', error.message);
    process.exit(1);
  }
}

main();
