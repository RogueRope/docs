#!/bin/bash

# Script to merge all content markdown files into a single file for review
# Usage: ./merge-content.sh [output-file]

OUTPUT_FILE="${1:-merged-content.md}"
CONTENT_DIR="content"

# Create output file with header
{
    echo "# Bottoms Up! - Complete Content Dump"
    echo ""
    echo "Generated: $(date)"
    echo "Total files: $(find "$CONTENT_DIR" -name "*.md" | wc -l)"
    echo ""
    echo "---"
    echo ""
} > "$OUTPUT_FILE"

# Find all markdown files, sorted by path
find "$CONTENT_DIR" -name "*.md" -type f | sort | while read -r file; do
    # Get relative path from content directory
    relative_path="${file#$CONTENT_DIR/}"

    # Extract section from path (concept, practical, wellbeing, etc.)
    section=$(echo "$relative_path" | cut -d'/' -f1)

    # Get filename without extension
    filename=$(basename "$file" .md)

    # Add file separator and metadata
    echo "## FILE: $relative_path" >> "$OUTPUT_FILE"
    echo "**Section:** $section | **File:** $filename" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    # Add the content of the file
    cat "$file" >> "$OUTPUT_FILE"

    # Add separator between files
    echo "" >> "$OUTPUT_FILE"
    echo "---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

# Add summary at the end
{
    echo ""
    echo "---"
    echo ""
    echo "# End of Content Dump"
    echo ""
    echo "**Total sections found:**"
    echo ""
    find "$CONTENT_DIR" -mindepth 1 -maxdepth 1 -type d | sort | while read -r section; do
        section_name=$(basename "$section")
        file_count=$(find "$section" -name "*.md" -type f | wc -l)
        echo "- **$section_name**: $file_count files"
    done
} >> "$OUTPUT_FILE"

echo "✅ Content merged successfully!"
echo "📄 Output: $OUTPUT_FILE"
echo "📊 Total lines: $(wc -l < "$OUTPUT_FILE")"
echo "💾 File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
