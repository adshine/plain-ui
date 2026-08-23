import path from 'node:path';
import pc from 'picocolors';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { loadConfig } from '../utils/config.js';
import { loadLockfile } from '../utils/lockfile.js';
import { getAvailableComponents } from '../utils/registry.js';

export interface ListOptions {
  registry?: string;
  cwd?: string;
}

export async function listCommand(options: ListOptions = {}) {
  const cwd = path.resolve(options.cwd || process.cwd());
  const config = await loadConfig(cwd);
  const lockfile = await loadLockfile(cwd);

  const registryUrl = options.registry || config?.registry;
  const spinner = ora('Fetching available components...').start();

  try {
    const components = await getAvailableComponents(registryUrl);
    spinner.stop();

    logger.break();
    console.log(pc.bold(pc.cyan('Available Plain UI Components')));
    console.log(pc.dim('═'.repeat(65)));
    logger.break();

    for (const comp of components) {
      const isInstalled = Boolean(lockfile.components[comp.name]);
      const statusBadge = isInstalled
        ? pc.green('[Installed]')
        : pc.dim('[Available]');

      console.log(`  ${pc.bold(comp.name.padEnd(16))} ${pc.dim(`v${comp.version}`.padEnd(10))} ${statusBadge}`);
      if (comp.description) {
        console.log(`    ${pc.dim(comp.description)}`);
      }
    }

    logger.break();
    logger.info(`Use ${pc.bold(pc.cyan('npx plain add <name>'))} to add any component.`);
    logger.break();
  } catch (err) {
    spinner.fail('Failed to list components.');
    logger.error(err instanceof Error ? err.message : String(err));
  }
}
