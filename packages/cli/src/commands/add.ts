import path from 'node:path';
import fs from 'fs-extra';
import prompts from 'prompts';
import pc from 'picocolors';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { loadConfig } from '../utils/config.js';
import { loadLockfile, writeLockfile, updateComponentLock } from '../utils/lockfile.js';
import { fetchComponent, getAvailableComponents } from '../utils/registry.js';
import { hashContent } from '../utils/hasher.js';
import type { ComponentLockEntry, FileLockEntry } from '../types/index.js';

export interface AddOptions {
  all?: boolean;
  overwrite?: boolean;
  path?: string;
  registry?: string;
  yes?: boolean;
  cwd?: string;
}

export async function addCommand(components: string[], options: AddOptions = {}) {
  const cwd = path.resolve(options.cwd || process.cwd());
  const config = await loadConfig(cwd);

  if (!config) {
    logger.error(`No ${pc.cyan('components.json')} found.`);
    logger.info(`Run ${pc.bold(pc.cyan('npx plain init'))} first to set up your project.`);
    return;
  }

  const registryUrl = options.registry || config.registry;
  let selectedComponents: string[] = components;

  if (options.all) {
    const allAvailable = await getAvailableComponents(registryUrl);
    selectedComponents = allAvailable.map((c) => c.name);
  } else if (!selectedComponents || selectedComponents.length === 0) {
    const available = await getAvailableComponents(registryUrl);
    const lockfile = await loadLockfile(cwd);

    const choices = available.map((c) => ({
      title: `${c.title} ${lockfile.components[c.name] ? pc.dim('(installed)') : ''}`,
      value: c.name,
      description: c.description,
      selected: false,
    }));

    const response = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Select components to add to your project:',
      choices,
      min: 1,
      hint: '- Space to select. Return to submit',
    });

    if (!response.components || response.components.length === 0) {
      logger.info('No components selected.');
      return;
    }

    selectedComponents = response.components;
  }

  const spinner = ora('Fetching and installing components...').start();

  try {
    let lockfile = await loadLockfile(cwd);
    const installedList: { name: string; files: string[] }[] = [];

    const queue = [...selectedComponents];
    const processed = new Set<string>();
    const isDirectTarget = new Set<string>(selectedComponents);

    while (queue.length > 0) {
      const compName = queue.shift()!;
      if (processed.has(compName)) continue;
      processed.add(compName);

      spinner.text = `Installing ${pc.cyan(compName)}...`;
      const component = await fetchComponent(compName, registryUrl);

      if (component.registryDependencies && component.registryDependencies.length > 0) {
        for (const dep of component.registryDependencies) {
          if (!processed.has(dep) && !queue.includes(dep)) {
            queue.push(dep);
          }
        }
      }

      const filesMap: Record<string, FileLockEntry> = {};
      const writtenFilePaths: string[] = [];

      for (const file of component.files) {
        let targetPath: string;

        if (options.path && isDirectTarget.has(compName)) {
          targetPath = path.resolve(cwd, options.path, file.name);
        } else if (file.target) {
          targetPath = path.resolve(cwd, file.target);
        } else if (file.type === 'registry:style' || file.name.endsWith('.css')) {
          targetPath = path.resolve(cwd, config.aliases.styles || 'src/styles', file.name);
        } else if (file.type === 'registry:script' || file.name.endsWith('.js') || file.name.endsWith('.ts')) {
          targetPath = path.resolve(cwd, config.aliases.scripts || 'src/scripts', file.name);
        } else {
          targetPath = path.resolve(cwd, config.aliases.components || 'src/components/ui', file.name);
        }

        const fileHash = hashContent(file.content);
        const relPath = path.relative(cwd, targetPath);

        if (await fs.pathExists(targetPath)) {
          const existingContent = await fs.readFile(targetPath, 'utf8');
          if (hashContent(existingContent) === fileHash || compName === 'tokens' || compName === 'motion') {
            filesMap[file.name] = {
              path: relPath,
              hash: hashContent(existingContent),
              upstreamHash: fileHash,
            };
            writtenFilePaths.push(relPath);
            continue;
          }

          if (!options.overwrite && !options.yes) {
            spinner.stop();
            const confirm = await prompts({
              type: 'confirm',
              name: 'overwrite',
              message: `File ${pc.cyan(relPath)} already exists. Overwrite?`,
              initial: true,
            });
            spinner.start();
            if (!confirm.overwrite) {
              filesMap[file.name] = {
                path: relPath,
                hash: hashContent(existingContent),
                upstreamHash: fileHash,
              };
              continue;
            }
          }
        }

        await fs.ensureDir(path.dirname(targetPath));
        await fs.writeFile(targetPath, file.content, 'utf8');

        filesMap[file.name] = {
          path: relPath,
          hash: fileHash,
          upstreamHash: fileHash,
        };
        writtenFilePaths.push(relPath);
      }

      const lockEntry: ComponentLockEntry = {
        version: component.version || '1.0.0',
        registry: registryUrl,
        installedAt: new Date().toISOString(),
        files: filesMap,
        dependencies: component.dependencies || [],
        registryDependencies: component.registryDependencies || [],
      };

      lockfile = updateComponentLock(lockfile, compName, lockEntry);
      installedList.push({ name: compName, files: writtenFilePaths });
    }

    await writeLockfile(cwd, lockfile);
    spinner.succeed(`Successfully installed ${installedList.length} component(s)!`);

    logger.break();
    for (const item of installedList) {
      logger.success(`${pc.bold(pc.cyan(item.name))}`);
      for (const f of item.files) {
        console.log(`    ${pc.dim('└─')} ${pc.green(f)}`);
      }
    }
    logger.break();
    logger.info(`Lockfile updated: ${pc.cyan('hui.lock')}`);
  } catch (err) {
    spinner.fail('Failed to install components.');
    logger.error(err instanceof Error ? err.message : String(err));
  }
}
