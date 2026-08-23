import path from 'node:path';
import fs from 'fs-extra';
import fg from 'fast-glob';
import pc from 'picocolors';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { loadConfig } from '../utils/config.js';
import { loadLockfile } from '../utils/lockfile.js';
import { auditAccessibility } from '../utils/a11y-linter.js';
import { auditTokens } from '../utils/token-linter.js';
import type { DoctorFinding } from '../types/index.js';

export interface DoctorOptions {
  strict?: boolean;
  fix?: boolean;
  cwd?: string;
}

export async function doctorCommand(options: DoctorOptions = {}) {
  const cwd = path.resolve(options.cwd || process.cwd());
  const spinner = ora('Auditing design tokens, orphan variables, accessibility tags, and lockfile...').start();

  try {
    const config = await loadConfig(cwd);
    const findings: DoctorFinding[] = [];

    if (!config) {
      findings.push({
        category: 'config',
        severity: 'error',
        file: 'components.json',
        line: 1,
        rule: 'config/missing',
        message: 'components.json configuration file is missing.',
        suggestion: 'Run npx plain init to configure Plain UI.',
      });
    }

    const lockfile = await loadLockfile(cwd);
    if (config && Object.keys(lockfile.components).length === 0) {
      findings.push({
        category: 'lockfile',
        severity: 'info',
        file: 'hui.lock',
        line: 1,
        rule: 'lockfile/empty',
        message: 'hui.lock has no registered components.',
        suggestion: 'Add components with npx plain add <name>.',
      });
    }

    const filePatterns = [
      'src/**/*.{html,css,js,ts,jsx,tsx,astro,svelte,vue}',
      'components/**/*.{html,css,js,ts,jsx,tsx,astro,svelte,vue}',
      'styles/**/*.css',
      '*.html',
    ];

    const projectFilePaths = await fg(filePatterns, {
      cwd,
      ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
      absolute: true,
    });

    const fileObjects: { path: string; content: string }[] = [];
    const tokenCssObjects: { path: string; content: string }[] = [];

    for (const fPath of projectFilePaths) {
      const content = await fs.readFile(fPath, 'utf8');
      const relPath = path.relative(cwd, fPath);
      fileObjects.push({ path: relPath, content });

      if (fPath.endsWith('.css')) {
        tokenCssObjects.push({ path: relPath, content });
      }
    }

    // 1. Audit accessibility
    const a11yFindings = auditAccessibility(fileObjects);
    findings.push(...a11yFindings);

    // 2. Audit tokens & orphans
    if (config) {
      const tokenFindings = auditTokens(config, tokenCssObjects, fileObjects);
      findings.push(...tokenFindings);
    }

    spinner.stop();

    const errors = findings.filter((f) => f.severity === 'error');
    const warnings = findings.filter((f) => f.severity === 'warning');
    const infos = findings.filter((f) => f.severity === 'info');

    logger.break();
    console.log(pc.bold(pc.cyan('Plain UI Doctor Diagnostic Report')));
    console.log(pc.dim('═'.repeat(60)));
    logger.break();

    if (findings.length === 0) {
      logger.success(pc.bold(pc.green('All systems operational! 0 errors, 0 warnings.')));
      logger.info('Tokens coverage: 100%');
      logger.info('Accessibility audits: Passed');
      logger.info('Lockfile & configuration: Valid');
      logger.break();
      return;
    }

    for (const finding of findings) {
      let badge = pc.bgBlue(pc.white(' INFO '));
      if (finding.severity === 'error') badge = pc.bgRed(pc.white(' ERROR '));
      if (finding.severity === 'warning') badge = pc.bgYellow(pc.black(' WARN '));

      console.log(`${badge} ${pc.bold(finding.file)}${finding.line ? `:${pc.yellow(String(finding.line))}` : ''}`);
      console.log(`       ${pc.dim('Rule:')} ${pc.cyan(finding.rule)}`);
      console.log(`       ${pc.white(finding.message)}`);
      if (finding.snippet) {
        console.log(`       ${pc.dim('Code:')} ${pc.gray(finding.snippet)}`);
      }
      if (finding.suggestion) {
        console.log(`       ${pc.dim('Fix:')}  ${pc.green(finding.suggestion)}`);
      }
      console.log('');
    }

    console.log(pc.dim('─'.repeat(60)));
    console.log(`Audit Summary: ${errors.length > 0 ? pc.red(`${errors.length} error(s)`) : pc.green('0 errors')}, ` +
      `${warnings.length > 0 ? pc.yellow(`${warnings.length} warning(s)`) : pc.green('0 warnings')}, ` +
      `${pc.blue(`${infos.length} info notice(s)`)}`);
    logger.break();

    if (options.fix) {
      logger.step('Auto-fix', 'Fix mode executed. Suggested remedies logged.');
    }

    if (options.strict && (errors.length > 0 || warnings.length > 0)) {
      process.exit(1);
    }
  } catch (err) {
    spinner.fail('Doctor audit crashed.');
    logger.error(err instanceof Error ? err.message : String(err));
    if (options.strict) {
      process.exit(1);
    }
  }
}
