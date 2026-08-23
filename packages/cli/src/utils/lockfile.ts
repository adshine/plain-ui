import path from 'node:path';
import fs from 'fs-extra';
import { lockfileSchema, type Lockfile, type ComponentLockEntry } from '../types/index.js';

export const LOCKFILE_NAME = 'hui.lock';

export function resolveLockfilePath(cwd: string = process.cwd()): string {
  return path.resolve(cwd, LOCKFILE_NAME);
}

export async function hasLockfile(cwd: string = process.cwd()): Promise<boolean> {
  const lockfilePath = resolveLockfilePath(cwd);
  return fs.pathExists(lockfilePath);
}

export async function loadLockfile(cwd: string = process.cwd()): Promise<Lockfile> {
  const lockfilePath = resolveLockfilePath(cwd);
  if (!(await fs.pathExists(lockfilePath))) {
    return {
      version: '1.0.0',
      updatedAt: new Date().toISOString(),
      components: {},
    };
  }

  try {
    const raw = await fs.readJson(lockfilePath);
    const parsed = lockfileSchema.parse(raw);
    return parsed;
  } catch {
    return {
      version: '1.0.0',
      updatedAt: new Date().toISOString(),
      components: {},
    };
  }
}

export async function writeLockfile(cwd: string = process.cwd(), lockfile: Lockfile): Promise<void> {
  const lockfilePath = resolveLockfilePath(cwd);
  lockfile.updatedAt = new Date().toISOString();
  await fs.ensureDir(path.dirname(lockfilePath));
  await fs.writeJson(lockfilePath, lockfile, { spaces: 2 });
}

export function updateComponentLock(
  lockfile: Lockfile,
  componentName: string,
  entry: ComponentLockEntry
): Lockfile {
  return {
    ...lockfile,
    updatedAt: new Date().toISOString(),
    components: {
      ...lockfile.components,
      [componentName]: entry,
    },
  };
}
