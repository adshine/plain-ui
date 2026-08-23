import path from 'node:path';
import fs from 'fs-extra';
import { configSchema, type Config, type ProjectType } from '../types/index.js';

export const CONFIG_FILE_NAME = 'components.json';

export function resolveConfigPath(cwd: string = process.cwd()): string {
  return path.resolve(cwd, CONFIG_FILE_NAME);
}

export async function hasConfig(cwd: string = process.cwd()): Promise<boolean> {
  const configPath = resolveConfigPath(cwd);
  return fs.pathExists(configPath);
}

export async function loadConfig(cwd: string = process.cwd()): Promise<Config | null> {
  const configPath = resolveConfigPath(cwd);
  if (!(await fs.pathExists(configPath))) {
    return null;
  }

  try {
    const raw = await fs.readJson(configPath);
    const parsed = configSchema.parse(raw);
    return parsed;
  } catch (error) {
    throw new Error(`Failed to parse components.json at ${configPath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function writeConfig(cwd: string = process.cwd(), config: Config): Promise<void> {
  const configPath = resolveConfigPath(cwd);
  await fs.ensureDir(path.dirname(configPath));
  await fs.writeJson(configPath, config, { spaces: 2 });
}

export function getDefaultConfig(
  projectType: ProjectType,
  overrides?: Partial<Config>
): Config {
  const baseConfig: Config = {
    $schema: 'https://plain-ui.com/schema.json',
    style: 'default',
    projectType,
    tailwind: {
      version: 'v4',
      config: '',
      css: projectType === 'astro' ? 'src/styles/global.css' : 'src/styles/index.css',
      baseColor: 'zinc',
    },
    aliases: {
      components: 'src/components/ui',
      styles: 'src/styles',
      scripts: 'src/scripts',
      tokens: 'src/styles/tokens.css',
      motion: 'src/styles/motion.css',
    },
    registry: 'https://registry.plain-ui.com',
    typescript: true,
  };

  return {
    ...baseConfig,
    ...overrides,
    aliases: {
      ...baseConfig.aliases,
      ...(overrides?.aliases || {}),
    },
    tailwind: {
      ...baseConfig.tailwind,
      ...(overrides?.tailwind || {}),
    },
  };
}
