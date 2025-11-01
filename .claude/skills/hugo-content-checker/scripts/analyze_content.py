#!/usr/bin/env python3
"""
Hugo Content Analyzer - Scans Hugo content folder for consistency issues.
Checks for duplicate content, orphaned files, broken links, and frontmatter consistency.
"""

import os
import re
import json
from pathlib import Path
from collections import defaultdict
import sys
from typing import Dict, List, Set, Tuple

def extract_frontmatter(content: str) -> Tuple[Dict, str]:
    """Extract YAML frontmatter from markdown file."""
    if not content.startswith('---'):
        return {}, content

    try:
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter_str = parts[1]
            body = parts[2]
            frontmatter = {}

            for line in frontmatter_str.strip().split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    frontmatter[key.strip()] = value.strip()

            return frontmatter, body
    except Exception:
        pass

    return {}, content

def find_markdown_files(content_dir: str) -> List[str]:
    """Find all markdown files in content directory."""
    files = []
    for root, dirs, filenames in os.walk(content_dir):
        for filename in filenames:
            if filename.endswith('.md'):
                files.append(os.path.join(root, filename))
    return sorted(files)

def extract_links(content: str) -> Set[str]:
    """Extract internal and external links from markdown."""
    links = set()

    # Markdown links: [text](url)
    for match in re.finditer(r'\[([^\]]+)\]\(([^)]+)\)', content):
        links.add(match.group(2))

    # Hugo ref shortcode: {{< ref "path" >}}
    for match in re.finditer(r'\{\{<\s*ref\s+"([^"]+)"\s*>\}\}', content):
        links.add(match.group(1))

    # Hugo relref shortcode: {{< relref "path" >}}
    for match in re.finditer(r'\{\{<\s*relref\s+"([^"]+)"\s*>\}\}', content):
        links.add(match.group(1))

    return links

def check_broken_links(files: List[str], content_dir: str) -> List[Dict]:
    """Check for broken internal links."""
    broken_links = []
    base_paths = set()
    static_files = set()

    # Build set of valid content paths
    for file_path in files:
        rel_path = os.path.relpath(file_path, content_dir)
        # Remove .md extension and _index suffix
        if rel_path.endswith('/_index.md'):
            base_paths.add(rel_path[:-11])  # Section path
            base_paths.add(rel_path[:-11] + '/')  # With trailing slash
        elif rel_path.endswith('.md'):
            base_paths.add(rel_path[:-3])
            base_paths.add(rel_path[:-3] + '/')

    # Build set of valid static files
    static_dir = os.path.join(os.path.dirname(content_dir), 'static')
    if os.path.isdir(static_dir):
        for root, dirs, filenames in os.walk(static_dir):
            for filename in filenames:
                file_path = os.path.relpath(os.path.join(root, filename), static_dir)
                static_files.add('/' + file_path.replace('\\', '/'))

    # Check each file's links
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        _, body = extract_frontmatter(content)
        links = extract_links(body)

        for link in links:
            # Skip external links, anchors, and special protocols
            if (link.startswith('http://') or link.startswith('https://') or
                link.startswith('#') or link.startswith('mailto:') or
                link.startswith('tel:')):
                continue

            # Clean up link
            clean_link = link.rstrip('/').lstrip('/')

            # Check if it's a static file reference
            if link.startswith('/'):
                # It's an absolute path - check if it's a static file
                if link not in static_files:
                    # Also accept if it's a content path
                    if '/' + clean_link not in base_paths and clean_link not in base_paths:
                        broken_links.append({
                            'file': os.path.relpath(file_path, content_dir),
                            'broken_link': link,
                            'severity': 'error'
                        })
            else:
                # It's a relative path - check if link exists
                if clean_link not in base_paths:
                    broken_links.append({
                        'file': os.path.relpath(file_path, content_dir),
                        'broken_link': link,
                        'severity': 'error'
                    })

    return broken_links

def check_frontmatter_consistency(files: List[str], content_dir: str) -> List[Dict]:
    """Check for missing or inconsistent frontmatter fields."""
    issues = []
    frontmatter_fields = defaultdict(list)
    required_fields = {'title', 'description'}  # Common Hugo requirements

    # Collect all frontmatter fields and their usage
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        frontmatter, _ = extract_frontmatter(content)
        rel_path = os.path.relpath(file_path, content_dir)

        for field in frontmatter.keys():
            frontmatter_fields[field].append(rel_path)

    # Check for files missing common fields
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        frontmatter, _ = extract_frontmatter(content)
        rel_path = os.path.relpath(file_path, content_dir)

        # Skip _index.md files which may have different requirements
        if not rel_path.endswith('_index.md'):
            for field in required_fields:
                if field not in frontmatter or not frontmatter[field]:
                    issues.append({
                        'file': rel_path,
                        'issue': f'Missing or empty frontmatter field: {field}',
                        'severity': 'warning'
                    })

    return issues

def check_orphaned_content(files: List[str], content_dir: str) -> List[Dict]:
    """Find content files that are never referenced from other files."""
    orphaned = []
    referenced = set()
    file_map = {}

    # Build map of content paths
    for file_path in files:
        rel_path = os.path.relpath(file_path, content_dir)
        if rel_path.endswith('/_index.md'):
            file_map[rel_path[:-11]] = file_path
        elif rel_path.endswith('.md'):
            file_map[rel_path[:-3]] = file_path
        file_map[rel_path] = file_path

    # Collect all referenced paths
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        _, body = extract_frontmatter(content)
        links = extract_links(body)

        for link in links:
            if not (link.startswith('http') or link.startswith('#')):
                clean_link = link.rstrip('/').lstrip('/')
                referenced.add(clean_link)

    # Find unreferenced content (except homepage and _index files)
    for file_path in files:
        rel_path = os.path.relpath(file_path, content_dir)

        # Skip index files and home page
        if rel_path.endswith('_index.md') or rel_path == '_index.md':
            continue

        base_path = rel_path[:-3] if rel_path.endswith('.md') else rel_path

        if base_path not in referenced:
            orphaned.append({
                'file': rel_path,
                'issue': 'Content file not referenced from any other file',
                'severity': 'info'
            })

    return orphaned

def check_naming_conventions(files: List[str], content_dir: str) -> List[Dict]:
    """Check for naming convention inconsistencies."""
    issues = []

    for file_path in files:
        rel_path = os.path.relpath(file_path, content_dir)
        filename = os.path.basename(file_path)

        # Check for uppercase in filenames (convention is lowercase with hyphens)
        if filename[:-3] != filename[:-3].lower() and not filename == '_index.md':
            issues.append({
                'file': rel_path,
                'issue': 'Filename contains uppercase letters (convention: lowercase)',
                'severity': 'warning'
            })

        # Check for spaces in filenames
        if ' ' in filename[:-3]:
            issues.append({
                'file': rel_path,
                'issue': 'Filename contains spaces (convention: use hyphens)',
                'severity': 'warning'
            })

    return issues

def detect_duplicate_content(files: List[str], content_dir: str, similarity_threshold: float = 0.8) -> List[Dict]:
    """Detect potentially duplicate or very similar content."""
    duplicates = []

    def get_content_hash(text: str) -> str:
        """Get a simple hash of content for comparison."""
        words = re.findall(r'\w+', text.lower())
        return set(words)

    # Compare file contents
    file_contents = {}
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        _, body = extract_frontmatter(content)
        file_contents[file_path] = body

    # Simple check for very similar content (basic implementation)
    for i, (file1, content1) in enumerate(file_contents.items()):
        words1 = set(re.findall(r'\w+', content1.lower()))
        if len(words1) < 50:  # Skip very short content
            continue

        for file2, content2 in list(file_contents.items())[i+1:]:
            words2 = set(re.findall(r'\w+', content2.lower()))
            if len(words2) < 50:
                continue

            # Calculate Jaccard similarity
            intersection = len(words1 & words2)
            union = len(words1 | words2)
            similarity = intersection / union if union > 0 else 0

            if similarity > similarity_threshold:
                rel_path1 = os.path.relpath(file1, content_dir)
                rel_path2 = os.path.relpath(file2, content_dir)
                duplicates.append({
                    'file': rel_path1,
                    'similar_to': rel_path2,
                    'similarity': round(similarity * 100, 1),
                    'severity': 'warning'
                })

    return duplicates

def main():
    if len(sys.argv) < 2:
        content_dir = 'content'
    else:
        content_dir = sys.argv[1]

    if not os.path.isdir(content_dir):
        print(f"Error: Content directory '{content_dir}' not found", file=sys.stderr)
        sys.exit(1)

    print(f"Analyzing Hugo content in: {content_dir}\n")

    files = find_markdown_files(content_dir)
    print(f"Found {len(files)} markdown files\n")

    # Run all checks
    results = {
        'broken_links': check_broken_links(files, content_dir),
        'frontmatter_issues': check_frontmatter_consistency(files, content_dir),
        'orphaned_content': check_orphaned_content(files, content_dir),
        'naming_issues': check_naming_conventions(files, content_dir),
        'duplicate_content': detect_duplicate_content(files, content_dir)
    }

    # Print results
    for category, issues in results.items():
        if issues:
            print(f"\n{category.replace('_', ' ').title()}:")
            print(f"  Found {len(issues)} issue(s)")
            for issue in issues[:10]:  # Show first 10
                if 'severity' in issue:
                    print(f"    [{issue['severity'].upper()}] {issue.get('file', 'unknown')}")
                    if 'issue' in issue:
                        print(f"              {issue['issue']}")
                    if 'similar_to' in issue:
                        print(f"              Similar to: {issue['similar_to']} ({issue['similarity']}%)")
            if len(issues) > 10:
                print(f"  ... and {len(issues) - 10} more")

    # Output JSON for programmatic use
    print("\n\nJSON Output:")
    print(json.dumps(results, indent=2))

if __name__ == '__main__':
    main()
