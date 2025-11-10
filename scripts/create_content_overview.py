import os
import sys

def create_content_overview():
    """
    Gathers all content from markdown files in the 'content' directory and its subdirectories,
    and compiles it into a single markdown file in the project root.
    """
    # This script assumes it's being run from the project root directory.
    project_root = os.getcwd()
    content_dir = 'content'
    output_file = 'full_content_overview.md'
    
    content_path = os.path.join(project_root, content_dir)
    output_path = os.path.join(project_root, output_file)

    if not os.path.isdir(content_path):
        print(f"Error: Content directory not found at '{content_path}'")
        sys.exit(1)

    all_content = []
    
    # Find all markdown files, sorted for consistent order
    md_files = []
    for root, _, files in os.walk(content_path):
        for file in files:
            # We are also ignoring the .csv files found in the content folder
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    md_files.sort()

    for file_path in md_files:
        relative_path = os.path.relpath(file_path, project_root)
        
        header = f"\n\n---\n\n# File: {relative_path}\n\n---\n\n"
        all_content.append(header)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                all_content.append(f.read())
        except Exception as e:
            error_message = f"Error reading file {relative_path}: {e}\n"
            all_content.append(error_message)
            print(error_message, file=sys.stderr)

    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write("".join(all_content))
        print(f"Content overview created at: {output_path}")
    except Exception as e:
        print(f"Error writing to output file {output_path}: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    create_content_overview()
