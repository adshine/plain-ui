import path from 'node:path';
import fs from 'fs-extra';
import prompts from 'prompts';
import pc from 'picocolors';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { loadConfig } from '../utils/config.js';
import { loadLockfile, writeLockfile } from '../utils/lockfile.js';
import { fetchComponent } from '../utils/registry.js';
import { generateFileDiff, formatPatchOutput, type DiffStatus } from '../utils/diff-engine.js';
import { hashContent } from '../utils/hasher.js';

export interface DiffOptions {
  all?: boolean;
  update?: boolean;
  yes?: boolean;
  cwd?: string;
}

export async function diffCommand(componentName?: string, options: DiffOptions = {}) {
  const cwd = path.resolve(options.cwd || process.cwd());
  const config = await loadConfig(cwd);

  if (!config) {
    logger.error(`No ${pc.cyan('components.json')} found.`);
    return;
  }

  const lockfile = await loadLockfile(cwd);
  const installedComponentNames = Object.keys(lockfile.components);

  if (installedComponentNames.length === 0) {
    logger.info('No components recorded in hui.lock. Add components first with plain add.');
    return;
  }

  const targetComponents = componentName
    ? [componentName]
    : installedComponentNames;

  const spinner = ora('Checking 3-way component diffs against upstream registry...').start();

  try {
    const summary: {
      component: string;
      file: string;
      status: DiffStatus;
      path: string;
      patch?: string;
      remoteContent?: string;
    }[] = [];

    for (const compName of targetComponents) {
      const lockEntry = lockfile.components[compName];
      if (!lockEntry) {
        logger.warn(`Component "${compName}" is not recorded in hui.lock.`);
        continue;
      }

      const remoteComponent = await fetchComponent(compName, lockEntry.registry || config.registry);

      for (const [fileName, fileLock] of Object.entries(lockEntry.files)) {
        const localFilePath = path.resolve(cwd, fileLock.path);
        let localContent = '';

        if (await fs.pathExists(localFilePath)) {
          localContent = await fs.readFile(localFilePath, 'utf8');
        }

        const remoteFile = remoteComponent.files.find((f) => f.name === fileName);
        const remoteContent = remoteFile ? remoteFile.content : '';
        const baseHash = fileLock.upstreamHash || fileLock.hash;

        // Base content is the upstream template content at install time
        const baseContent = remoteContent;

        const diffResult = generateFileDiff(
          fileLock.path,
          baseContent,
          localContent,
          remoteContent,
          baseHash
        );

        summary.push({
          component: compName,
          file: fileName,
          status: diffResult.status,
          path: fileLock.path,
          patch: diffResult.patch,
          remoteContent,
        });
      }
    }

    spinner.stop();

    logger.break();
    logger.step('3-Way Diff Audit Results');
    logger.break();

    let updatesAvailableCount = 0;
    let conflictsCount = 0;
    let localModifiedCount = 0;
    let upToDateCount = 0;

    for (const item of summary) {
      let statusBadge = pc.green('UP-TO-DATE');
      if (item.status === 'UPSTREAM_AVAILABLE') {
        statusBadge = pc.cyan('UPDATE AVAILABLE');
        updatesAvailableCount++;
      } else if (item.status === 'LOCAL_MODIFIED') {
        statusBadge = pc.yellow('LOCAL CUSTOMIZED');
        localModifiedCount++;
      } else if (item.status === 'CONFLICT') {
        statusBadge = pc.red(pc.bold('CONFLICT (3-WAY MODIFIED)'));
        conflictsCount++;
      } else {
        upToDateCount++;
      }

      console.log(`  ${pc.bold(item.component)} / ${pc.white(item.file)}: [${statusBadge}]`);
      console.log(`    ${pc.dim('Path:')} ${item.path}`);

      if (item.patch) {
        console.log(`\n${formatPatchOutput(item.patch)}\n`);
      }
    }

    logger.break();
    logger.info(`Summary: ${upToDateCount} up-to-date, ${updatesAvailableCount} update(s) available, ${localModifiedCount} locally modified, ${conflictsCount} conflict(s).`);

    if (options.update && (updatesAvailableCount > 0 || conflictsCount > 0)) {
      logger.break();
      for (const item of summary) {
        if (item.status === 'UPSTREAM_AVAILABLE' && item.remoteContent) {
          const fullPath = path.resolve(cwd, item.path);
          await fs.writeFile(fullPath, item.remoteContent, 'utf8');
          const newHash = hashContent(item.remoteContent);
          lockfile.components[item.component].files[item.file].hash = newHash;
          lockfile.components[item.component].files[item.file].upstreamHash = newHash;
          logger.success(`Updated ${pc.cyan(item.path)} to latest upstream version.`);
        } else if (item.status === 'CONFLICT' && item.remoteContent) {
          if (options.yes) {
            logger.warn(`Skipping conflicted file ${pc.cyan(item.path)} in non-interactive mode.`);
          } else {
            const answer = await prompts({
              type: 'select',
              name: 'resolution',
              message: `How do you want to resolve conflict in ${pc.cyan(item.path)}?`,
              choices: [
                { title: 'Keep my local version (skip update)', value: 'keep' },
                { title: 'Overwrite with upstream latest', value: 'overwrite' },
                { title: 'Write upstream copy to .upstream file', value: 'backup' },
              ],
            });

            if (answer.resolution === 'overwrite') {
              const fullPath = path.resolve(cwd, item.path);
              await fs.writeFile(fullPath, item.remoteContent, 'utf8');
              const newHash = hashContent(item.remoteContent);
              lockfile.components[item.component].files[item.file].hash = newHash;
              lockfile.components[item.component].files[item.file].upstreamHash = newHash;
              logger.success(`Overwritten ${pc.cyan(item.path)}.`);
            } else if (answer.resolution === 'backup') {
              const backupPath = path.resolve(cwd, `${item.path}.upstream`);
              await fs.writeFile(backupPath, item.remoteContent, 'utf8');
              logger.success(`Saved upstream copy to ${pc.cyan(backupPath)}.`);
            }
          }
        }
      }

      await writeLockfile(cwd, lockfile);
      logger.success('Lockfile updated successfully.');
    }
  } catch (err) {
    spinner.fail('Diff inspection failed.');
    logger.error(err instanceof Error ? err.message : String(err));
  }
}
