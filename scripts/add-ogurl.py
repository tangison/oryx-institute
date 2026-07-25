#!/usr/bin/env python3
"""Add openGraph.url overrides to all Oryx Institute sub-pages that have alternates.canonical."""

import re
import os

SITE_URL = "https://oryx-institute.vercel.app"

# Find all page.tsx files under src/app
pages_dir = "/home/z/my-project/src/app"
files_to_fix = []

for root, dirs, files in os.walk(pages_dir):
    for f in files:
        if f == "page.tsx":
            filepath = os.path.join(root, f)
            if filepath == "/home/z/my-project/src/app/page.tsx":
                continue  # homepage already has og:url from layout
            files_to_fix.append(filepath)

for filepath in sorted(files_to_fix):
    content = open(filepath).read()
    
    # Extract canonical URL
    canon_match = re.search(r"alternates:\s*\{\s*canonical:\s*['\"`]([^'\"]+)['\"`]", content)
    if not canon_match:
        # Try template literal
        canon_match = re.search(r"alternates:\s*\{\s*canonical:\s*`([^`]+)`", content)
    
    if not canon_match:
        print(f"SKIP (no canonical): {filepath}")
        continue
    
    canon_url = canon_match.group(1)
    
    # Check if openGraph.url already exists
    if "openGraph" in content and "url" in content:
        print(f"SKIP (already has openGraph): {filepath}")
        continue
    
    # For template literal canonicals (dynamic pages), skip
    if "${" in canon_url:
        print(f"SKIP (dynamic): {filepath}")
        continue
    
    # Determine og:url from canonical
    og_url = canon_url
    
    # Add openGraph.url to metadata
    # Find the metadata object end (closing of alternates)
    # Insert openGraph config after alternates
    
    # Strategy: add openGraph.url right before the closing of metadata object
    # Find the alternates line and add openGraph after it
    
    if "alternates:" in content:
        # Replace alternates section to include openGraph
        old_alternates = canon_match.group(0)
        new_block = old_alternates + ",\n  openGraph: { url: '" + og_url + "' },"
        content = content.replace(old_alternates, new_block)
        
        open(filepath, 'w').write(content)
        print(f"FIXED: {filepath} → og:url = {og_url}")
    else:
        print(f"SKIP (no alternates found): {filepath}")

print(f"\nDone. Fixed {len([f for f in files_to_fix if 'openGraph' in open(f).read()])} files.")
