import { Command } from 'commander';
import pc from 'picocolors';
import { printBanner, getBanner } from './utils/banner.js';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { diffCommand } from './commands/diff.js';
import { doctorCommand } from './commands/doctor.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('plain')
  .description('Plain UI CLI — Zero-dependency, headless UI component engine')
  .version('0.1.0', '-v, --version', 'Output the current version of Plain UI CLI')
  .addHelpText('before', getBanner());

program
  .command('init')
  .description('Initialize Plain UI, tokens.css, motion.css, and components.json')
  .option('-y, --yes', 'Skip prompts and use recommended defaults', false)
  .option('-d, --defaults', 'Use standard defaults', false)
  .option('-f, --force', 'Force overwrite existing configuration', false)
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    await initCommand(options);
  });

program
  .command('add [components...]')
  .description('Add components to your project from the registry')
  .option('-a, --all', 'Add all available components', false)
  .option('-o, --overwrite', 'Overwrite existing component files', false)
  .option('-p, --path <path>', 'Custom component destination directory')
  .option('-r, --registry <url>', 'Custom registry URL')
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (components, options) => {
    await addCommand(components, options);
  });

program
  .command('diff [component]')
  .description('3-way hash diffing against hui.lock to check upstream updates')
  .option('-a, --all', 'Check all installed components', false)
  .option('-u, --update', 'Interactively apply upstream updates', false)
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (component, options) => {
    await diffCommand(component, options);
  });

program
  .command('doctor')
  .description('Audit token coverage, orphan variables, and accessibility tags')
  .option('-s, --strict', 'Exit with non-zero code on warnings/errors', false)
  .option('--fix', 'Attempt safe automated fixes', false)
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    await doctorCommand(options);
  });

program
  .command('list')
  .description('List all available components in the registry')
  .option('-r, --registry <url>', 'Custom registry URL')
  .option('-c, --cwd <path>', 'Working directory', process.cwd())
  .action(async (options) => {
    await listCommand(options);
  });

// Handle unknown commands
program.on('command:*', (commands) => {
  console.error(pc.red(`\nUnknown command: ${commands[0]}\n`));
  console.log(`Run ${pc.cyan('plain --help')} for a list of available commands.\n`);
  process.exit(1);
});

// Default to help if no arguments
if (!process.argv.slice(2).length) {
  printBanner();
  program.outputHelp();
  process.exit(0);
}

program.parse(process.argv);
