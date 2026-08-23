import path from 'node:path';
import fs from 'fs-extra';
import type { ProjectType } from '../types/index.js';

export interface ProjectDetectionResult {
  projectType: ProjectType;
  details: string;
  isTypeScript: boolean;
  hasTailwindV4: boolean;
  suggestedCss: string;
  suggestedComponents: string;
  suggestedStyles: string;
}

export async function detectProjectType(cwd: string = process.cwd()): Promise<ProjectDetectionResult> {
  let projectType: ProjectType = 'vanilla';
  let details = 'Standard HTML/CSS Project';
  let isTypeScript = false;
  let hasTailwindV4 = false;

  // Check tsconfig.json
  const hasTsConfig = await fs.pathExists(path.resolve(cwd, 'tsconfig.json'));
  isTypeScript = hasTsConfig;

  // Check package.json
  const pkgPath = path.resolve(cwd, 'package.json');
  let dependencies: Record<string, string> = {};
  let devDependencies: Record<string, string> = {};

  if (await fs.pathExists(pkgPath)) {
    try {
      const pkg = await fs.readJson(pkgPath);
      dependencies = pkg.dependencies || {};
      devDependencies = pkg.devDependencies || {};
    } catch {
      // ignore
    }
  }

  const allDeps = { ...dependencies, ...devDependencies };

  // Check for Tailwind v4
  if (
    allDeps['tailwindcss']?.startsWith('^4') ||
    allDeps['tailwindcss']?.startsWith('4') ||
    allDeps['@tailwindcss/vite'] ||
    allDeps['@tailwindcss/postcss']
  ) {
    hasTailwindV4 = true;
  }

  // Check CSS files for Tailwind v4 directives (@import "tailwindcss" or @theme)
  const candidateCssFiles = [
    'src/styles/index.css',
    'src/styles/global.css',
    'src/styles/globals.css',
    'src/index.css',
    'src/app.css',
    'src/style.css',
    'styles/globals.css',
    'styles/index.css',
  ];

  let detectedMainCss: string | null = null;

  for (const relPath of candidateCssFiles) {
    const fullPath = path.resolve(cwd, relPath);
    if (await fs.pathExists(fullPath)) {
      detectedMainCss = relPath;
      const content = await fs.readFile(fullPath, 'utf8');
      if (content.includes('@import "tailwindcss"') || content.includes('@theme') || content.includes('@import \'tailwindcss\'')) {
        hasTailwindV4 = true;
      }
      break;
    }
  }

  // Check Astro
  const hasAstroConfig =
    (await fs.pathExists(path.resolve(cwd, 'astro.config.mjs'))) ||
    (await fs.pathExists(path.resolve(cwd, 'astro.config.ts'))) ||
    (await fs.pathExists(path.resolve(cwd, 'astro.config.js')));

  if (allDeps['astro'] || hasAstroConfig) {
    projectType = 'astro';
    details = hasTailwindV4 ? 'Astro with Tailwind CSS v4' : 'Astro Project';
    return {
      projectType,
      details,
      isTypeScript: isTypeScript || true,
      hasTailwindV4,
      suggestedCss: detectedMainCss || 'src/styles/global.css',
      suggestedComponents: 'src/components/ui',
      suggestedStyles: 'src/styles',
    };
  }

  // Check Vite
  const hasViteConfig =
    (await fs.pathExists(path.resolve(cwd, 'vite.config.ts'))) ||
    (await fs.pathExists(path.resolve(cwd, 'vite.config.js'))) ||
    (await fs.pathExists(path.resolve(cwd, 'vite.config.mjs')));

  if (allDeps['vite'] || hasViteConfig) {
    projectType = hasTailwindV4 ? 'tailwind-v4' : 'vite';
    details = hasTailwindV4 ? 'Vite with Tailwind CSS v4' : 'Vite Project';
    return {
      projectType,
      details,
      isTypeScript,
      hasTailwindV4,
      suggestedCss: detectedMainCss || 'src/styles/index.css',
      suggestedComponents: 'src/components/ui',
      suggestedStyles: 'src/styles',
    };
  }

  // Check Next.js
  if (allDeps['next']) {
    projectType = 'next';
    details = hasTailwindV4 ? 'Next.js with Tailwind CSS v4' : 'Next.js Project';
    return {
      projectType,
      details,
      isTypeScript,
      hasTailwindV4,
      suggestedCss: detectedMainCss || 'src/app/globals.css',
      suggestedComponents: 'src/components/ui',
      suggestedStyles: 'src/styles',
    };
  }

  if (hasTailwindV4) {
    projectType = 'tailwind-v4';
    details = 'Tailwind CSS v4 Project';
    return {
      projectType,
      details,
      isTypeScript,
      hasTailwindV4,
      suggestedCss: detectedMainCss || 'src/styles/index.css',
      suggestedComponents: 'src/components/ui',
      suggestedStyles: 'src/styles',
    };
  }

  // Default to Pure CSS / Vanilla
  return {
    projectType: 'pure-css',
    details: 'Pure CSS / Vanilla Project',
    isTypeScript,
    hasTailwindV4: false,
    suggestedCss: detectedMainCss || 'src/styles/index.css',
    suggestedComponents: 'src/components/ui',
    suggestedStyles: 'src/styles',
  };
}
