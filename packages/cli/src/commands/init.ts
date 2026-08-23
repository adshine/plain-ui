import path from 'node:path';
import fs from 'fs-extra';
import prompts from 'prompts';
import pc from 'picocolors';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { printBanner } from '../utils/banner.js';
import { detectProjectType } from '../utils/detector.js';
import { getDefaultConfig, writeConfig, hasConfig } from '../utils/config.js';
import { writeLockfile, loadLockfile } from '../utils/lockfile.js';
import { TOKENS_CSS } from '../templates/tokens.css.js';
import { MOTION_CSS } from '../templates/motion.css.js';
import type { Config, ProjectType } from '../types/index.js';

export interface InitOptions {
  yes?: boolean;
  cwd?: string;
  defaults?: boolean;
  force?: boolean;
}

export async function initCommand(options: InitOptions = {}) {
  const cwd = path.resolve(options.cwd || process.cwd());

  printBanner();
  logger.info('Initializing Plain UI in your project...');
  logger.break();

  const isConfigured = await hasConfig(cwd);
  if (isConfigured && !options.force && !options.yes) {
    const confirm = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: 'components.json already exists. Do you want to re-initialize and overwrite?',
      initial: false,
    });
    if (!confirm.overwrite) {
      logger.info('Initialization cancelled.');
      return;
    }
  }

  const detection = await detectProjectType(cwd);
  logger.step('Project detection', pc.bold(detection.details));

  let finalConfig: Config;

  if (options.yes || options.defaults) {
    finalConfig = getDefaultConfig(detection.projectType, {
      typescript: detection.isTypeScript,
    });
  } else {
    const answers = await prompts([
      {
        type: 'select',
        name: 'projectType',
        message: 'Which project flavor are you using?',
        choices: [
          { title: 'Tailwind CSS v4', value: 'tailwind-v4' },
          { title: 'Pure CSS (Zero dependency)', value: 'pure-css' },
          { title: 'Astro', value: 'astro' },
          { title: 'Vite', value: 'vite' },
          { title: 'Next.js', value: 'next' },
          { title: 'Vanilla HTML/JS', value: 'vanilla' },
        ],
        initial: ['tailwind-v4', 'pure-css', 'astro', 'vite', 'next', 'vanilla'].indexOf(detection.projectType),
      },
      {
        type: 'text',
        name: 'components',
        message: 'Where should UI components be placed?',
        initial: detection.suggestedComponents,
      },
      {
        type: 'text',
        name: 'styles',
        message: 'Where should global styles and tokens be placed?',
        initial: detection.suggestedStyles,
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Are you using TypeScript?',
        initial: detection.isTypeScript,
      },
    ]);

    if (!answers.projectType) {
      logger.error('Prompt cancelled.');
      return;
    }

    finalConfig = getDefaultConfig(answers.projectType as ProjectType, {
      typescript: answers.typescript,
      aliases: {
        components: answers.components || 'src/components/ui',
        styles: answers.styles || 'src/styles',
        scripts: 'src/scripts',
        tokens: path.join(answers.styles || 'src/styles', 'tokens.css'),
        motion: path.join(answers.styles || 'src/styles', 'motion.css'),
      },
    });
  }

  const spinner = ora('Writing configuration and design tokens...').start();

  try {
    // 1. Write components.json
    await writeConfig(cwd, finalConfig);

    // 2. Ensure directories exist
    const stylesDir = path.resolve(cwd, finalConfig.aliases.styles);
    const componentsDir = path.resolve(cwd, finalConfig.aliases.components);
    await fs.ensureDir(stylesDir);
    await fs.ensureDir(componentsDir);

    // 3. Write tokens.css
    const tokensPath = path.resolve(cwd, finalConfig.aliases.tokens);
    await fs.writeFile(tokensPath, TOKENS_CSS, 'utf8');

    // 4. Write motion.css
    const motionPath = path.resolve(cwd, finalConfig.aliases.motion);
    await fs.writeFile(motionPath, MOTION_CSS, 'utf8');

    // 5. Inject @import into main CSS file
    const mainCssPath = path.resolve(cwd, finalConfig.tailwind.css);
    await fs.ensureDir(path.dirname(mainCssPath));

    let existingCss = '';
    if (await fs.pathExists(mainCssPath)) {
      existingCss = await fs.readFile(mainCssPath, 'utf8');
    }

    const tokenImport = `@import "./tokens.css";\n@import "./motion.css";\n`;
    if (!existingCss.includes('tokens.css')) {
      if (finalConfig.projectType === 'tailwind-v4' || existingCss.includes('@import "tailwindcss"')) {
        if (existingCss.includes('@import "tailwindcss";')) {
          existingCss = existingCss.replace('@import "tailwindcss";', `@import "tailwindcss";\n${tokenImport}`);
        } else {
          existingCss = `@import "tailwindcss";\n${tokenImport}\n` + existingCss;
        }
      } else {
        existingCss = tokenImport + '\n' + existingCss;
      }
      await fs.writeFile(mainCssPath, existingCss.trim() + '\n', 'utf8');
    }

    // 6. Initialize hui.lock
    const lockfile = await loadLockfile(cwd);
    await writeLockfile(cwd, lockfile);

    spinner.succeed('Project initialized successfully!');

    logger.break();
    logger.success('Plain UI is ready.');
    logger.info(`Configuration: ${pc.cyan('components.json')}`);
    logger.info(`Design tokens: ${pc.cyan(finalConfig.aliases.tokens)}`);
    logger.info(`Motion physics: ${pc.cyan(finalConfig.aliases.motion)}`);
    logger.info(`Lockfile: ${pc.cyan('hui.lock')}`);
    logger.break();
    logger.step('Next steps', `Add your first component: ${pc.bold(pc.cyan('npx plain add button'))}`);
    logger.step('Audit system', `Run doctor: ${pc.bold(pc.cyan('npx plain doctor'))}`);
    logger.break();
  } catch (err) {
    spinner.fail('Initialization failed.');
    logger.error(err instanceof Error ? err.message : String(err));
  }
}
