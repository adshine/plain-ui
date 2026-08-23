import * as Diff from 'diff';
import pc from 'picocolors';
import { hashContent } from './hasher.js';

export type DiffStatus = 'UP_TO_DATE' | 'UPSTREAM_AVAILABLE' | 'LOCAL_MODIFIED' | 'CONFLICT';

export interface DiffResult {
  filename: string;
  status: DiffStatus;
  baseHash: string;
  localHash: string;
  remoteHash: string;
  patch?: string;
  hasChanges: boolean;
}

export function evaluateDiffStatus(
  baseHash: string,
  localHash: string,
  remoteHash: string
): DiffStatus {
  const localChanged = localHash !== baseHash;
  const remoteChanged = remoteHash !== baseHash;

  if (!localChanged && !remoteChanged) {
    return 'UP_TO_DATE';
  }
  if (!localChanged && remoteChanged) {
    return 'UPSTREAM_AVAILABLE';
  }
  if (localChanged && !remoteChanged) {
    return 'LOCAL_MODIFIED';
  }
  return 'CONFLICT';
}

export function generateFileDiff(
  filename: string,
  baseContent: string,
  localContent: string,
  remoteContent: string,
  baseHash: string
): DiffResult {
  const localHash = hashContent(localContent);
  const remoteHash = hashContent(remoteContent);
  const status = evaluateDiffStatus(baseHash, localHash, remoteHash);

  let patch: string | undefined;

  if (status === 'UPSTREAM_AVAILABLE') {
    patch = Diff.createPatch(
      filename,
      localContent,
      remoteContent,
      'Installed (Base)',
      'Upstream (Latest)'
    );
  } else if (status === 'LOCAL_MODIFIED') {
    patch = Diff.createPatch(
      filename,
      baseContent,
      localContent,
      'Installed (Base)',
      'Local (Modified)'
    );
  } else if (status === 'CONFLICT') {
    patch = Diff.createPatch(
      filename,
      localContent,
      remoteContent,
      'Local (Your changes)',
      'Upstream (Latest changes)'
    );
  }

  return {
    filename,
    status,
    baseHash,
    localHash,
    remoteHash,
    patch,
    hasChanges: status !== 'UP_TO_DATE',
  };
}

export function formatPatchOutput(patch: string): string {
  const lines = patch.split('\n');
  const colored = lines.map((line) => {
    if (line.startsWith('---') || line.startsWith('+++')) {
      return pc.bold(pc.white(line));
    }
    if (line.startsWith('@@')) {
      return pc.cyan(line);
    }
    if (line.startsWith('+')) {
      return pc.green(line);
    }
    if (line.startsWith('-')) {
      return pc.red(line);
    }
    return pc.dim(line);
  });
  return colored.join('\n');
}
