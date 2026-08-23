import crypto from 'node:crypto';
import fs from 'fs-extra';

export function normalizeContent(content: string): string {
  return content.replace(/\r\n/g, '\n').trimEnd();
}

export function hashContent(content: string): string {
  const normalized = normalizeContent(content);
  const hash = crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
  return `sha256:${hash}`;
}

export async function hashFile(filePath: string): Promise<string> {
  if (!(await fs.pathExists(filePath))) {
    throw new Error(`File not found: ${filePath}`);
  }
  const content = await fs.readFile(filePath, 'utf8');
  return hashContent(content);
}
