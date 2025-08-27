#!/bin/bash

# Script to merge all Markdown files in the content directory into one file
# Usage: ./merge-content.sh [output_file]

OUTPUT_FILE="${1:-merged-content.md}"
CONTENT_DIR="./content"

# Check if content directory exists
if [ ! -d "$CONTENT_DIR" ]; then
    echo "Error: Content directory '$CONTENT_DIR' not found!"
    exit 1
fi

# Create/clear the output file
echo "# Merged Content from $CONTENT_DIR" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "Generated on: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Add navigation menu
echo "" >> "$OUTPUT_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> "$OUTPUT_FILE"
echo "# 🧭 Navigation Menu (from config/_default/menus/menu.en.toml)" >> "$OUTPUT_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
cat "./config/_default/menus/menu.en.toml" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"


# Function to add a file to the merged output
add_file() {
    local file="$1"
    local relative_path="${file#$CONTENT_DIR/}"
    
    echo "Adding: $relative_path"
    
    # Add separator and file header
    echo "" >> "$OUTPUT_FILE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> "$OUTPUT_FILE"
    echo "# 📄 $relative_path" >> "$OUTPUT_FILE"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Extract title from frontmatter if it exists
    if head -1 "$file" | grep -q "^---$"; then
        local title=$(sed -n '/^---$/,/^---$/p' "$file" | grep -i "^title" | sed 's/.*: *"\?\(.*\)"\?$/\1/')
        if [ -n "$title" ]; then
            echo "**Title:** $title" >> "$OUTPUT_FILE"
            echo "" >> "$OUTPUT_FILE"
        fi
    fi
    
    # Add the file content
    cat "$file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Find and process all .md files, excluding CSV files
find "$CONTENT_DIR" -name "*.md" -type f | sort | while read -r file; do
    add_file "$file"
done

echo ""
echo "Merge complete! Output written to: $OUTPUT_FILE"
echo "Total files processed: $(find "$CONTENT_DIR" -name "*.md" -type f | wc -l)"