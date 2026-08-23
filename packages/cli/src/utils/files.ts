import path from 'node:path';
import fs from 'fs-extra';

export async function findProjectFiles(
  baseDir: string,
  extensions: string[] = ['.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.astro', '.svelte', '.vue'],
  ignoredDirs: string[] = ['node_modules', 'dist', '.git', '.astro', '.next', '.cache', 'coverage']
): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string) {
    if (!(await fs.pathExists(currentDir))) return;
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (ignoredDirs.includes(entry.name)) continue;

      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  }

  await walk(baseDir);
  return results;
}
