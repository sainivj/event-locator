import os

# --- Configuration ---
OUTPUT_FILENAME = "combined_code.txt"
SCRIPT_NAME = os.path.basename(__file__)

# Directories to ignore (add any build folders or virtual envs here)
IGNORE_DIRS = {
    "node_modules", ".git", "__pycache__", "venv", "env", 
    ".idea", ".vscode", "dist", "build", "coverage", "tmp"
}

# Files to ignore (system files, images, locks, etc.)
IGNORE_FILES = {
    ".DS_Store", "package-lock.json", "yarn.lock", ".gitignore", ".env" 
}

# Extensions to likely skip (binary/media files)
BINARY_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', 
    '.ttf', '.eot', '.mp4', '.mp3', '.pdf', '.zip', '.tar', '.gz', '.pyc', '.exe'
}

def should_ignore(file_name):
    """
    Determines if a file should be ignored.
    Checks against the script name, output filename, specific ignore list, and extensions.
    """
    # 1. Exclude this script and the output file (case-insensitive for safety)
    if file_name.lower() == SCRIPT_NAME.lower():
        return True
    if file_name.lower() == OUTPUT_FILENAME.lower():
        return True
        
    # 2. Check exact matches in ignore list
    if file_name in IGNORE_FILES:
        return True
        
    # 3. Check binary extensions
    if any(file_name.lower().endswith(ext) for ext in BINARY_EXTENSIONS):
        return True
        
    return False

def generate_tree(startpath):
    """Generates a visual directory tree string."""
    tree_str = "PROJECT FILE TREE\n=================\n\n"
    tree_str += f"{os.path.basename(os.getcwd())}/\n"
    
    for root, dirs, files in os.walk(startpath):
        # Modify dirs in-place to prevent walking into ignored directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        subindent = ' ' * 4 * (level + 1)
        
        # Don't print the root folder again, it's already printed
        if root != startpath:
             tree_str += f"{indent}{os.path.basename(root)}/\n"
             
        for f in files:
            if not should_ignore(f):
                tree_str += f"{subindent}{f}\n"
                
    tree_str += "\n" + "="*80 + "\n\n"
    return tree_str

def main():
    root_dir = os.getcwd()
    combined_content = []
    
    print(f"Starting code combination in: {root_dir}")
    print(f"Excluding script: {SCRIPT_NAME}")
    print(f"Excluding output: {OUTPUT_FILENAME}")
    
    # 1. Generate the Tree
    try:
        tree = generate_tree(root_dir)
        combined_content.append(tree)
        print("✓ File tree generated.")
    except Exception as e:
        print(f"Error generating tree: {e}")

    # 2. Walk and Read Files
    file_count = 0
    
    for root, dirs, files in os.walk(root_dir):
        # Skip ignored directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            if should_ignore(file):
                continue
                
            file_path = os.path.join(root, file)
            relative_path = os.path.relpath(file_path, root_dir)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Create the separator and header
                separator = f"\n{'='*80}\nFILE: {relative_path}\n{'='*80}\n"
                combined_content.append(separator)
                combined_content.append(content + "\n")
                file_count += 1
                
            except UnicodeDecodeError:
                print(f"Skipping binary file (detected during read): {relative_path}")
            except Exception as e:
                print(f"Could not read {relative_path}: {e}")

    # 3. Write Output
    try:
        with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as outfile:
            outfile.write("".join(combined_content))
        print(f"\n✓ Success! Combined {file_count} files into '{OUTPUT_FILENAME}'")
    except Exception as e:
        print(f"Error writing output file: {e}")

if __name__ == "__main__":
    main()