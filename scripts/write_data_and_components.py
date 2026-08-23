import os
import json

base_dir = '/home/daytona/plain-ui/apps/docs/src'

def write_file(rel_path, content):
    full_path = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print(f'Wrote {rel_path}')

# -------------------------------------------------------------
# 1. src/data/components.ts
# -------------------------------------------------------------
components_ts = '''export interface ComponentVariant {
  name: string;
  description: string;
  html: string;
  css?: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  category: Core Primitives | Overlays