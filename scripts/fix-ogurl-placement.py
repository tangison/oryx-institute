#!/usr/bin/env python3
"""Fix openGraph placement in metadata — move from inside alternates to separate property."""

import re
import os

pages_dir = "/home/z/my-project/src/app"

for root, dirs, files in os.walk(pages_dir):
    for f in files:
        if f == "page.tsx":
            filepath = os.path.join(root, f)
            content = open(filepath).read()
            
            # Fix pattern: alternates: { canonical: 'URL', openGraph: { url: 'URL' }, },
            # Should be: alternates: { canonical: 'URL' }, openGraph: { url: 'URL' },
            pattern = r"alternates:\s*\{\s*canonical:\s*'([^']+)',\s*openGraph:\s*\{\s*url:\s*'([^']+)'?\s*\},?\s*\},?"
            match = re.search(pattern, content)
            if match:
                canon_url = match.group(1)
                og_url = match.group(2)
                old_str = match.group(0)
                new_str = f"alternates: {{ canonical: '{canon_url}' }},\n  openGraph: {{ url: '{og_url}' }},"
                content = content.replace(old_str, new_str)
                open(filepath, 'w').write(content)
                print(f"FIXED: {filepath}")

print("Done.")
