import { z } from 'zod';

export const projectTypeSchema = z.enum([
  'tailwind-v4',
  'pure-css',
  'astro',
  'vite',
  'next',
  'vanilla',
]);

export type ProjectType = z.infer<typeof projectTypeSchema>;

export const configSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default('default'),
  projectType: projectTypeSchema.default('tailwind-v4'),
  tailwind: z
    .object({
      version: z.string().default('v4'),
      config: z.string().optional().default(''),
      css: z.string().default('src/styles/index.css'),
      baseColor: z.string().optional().default('zinc'),
    })
    .default({
      version: 'v4',
      config: '',
      css: 'src/styles/index.css',
      baseColor: 'zinc',
    }),
  aliases: z.object({
    components: z.string().default('src/components/ui'),
    styles: z.string().default('src/styles'),
    scripts: z.string().optional().default('src/scripts'),
    tokens: z.string().default('src/styles/tokens.css'),
    motion: z.string().default('src/styles/motion.css'),
  }),
  registry: z.string().default('https://registry.plain-ui.com'),
  typescript: z.boolean().default(true),
});

export type Config = z.infer<typeof configSchema>;

export const fileLockEntrySchema = z.object({
  path: z.string(),
  hash: z.string(),
  upstreamHash: z.string(),
});

export type FileLockEntry = z.infer<typeof fileLockEntrySchema>;

export const componentLockEntrySchema = z.object({
  version: z.string().default('1.0.0'),
  registry: z.string().default('https://registry.plain-ui.com'),
  installedAt: z.string(),
  files: z.record(z.string(), fileLockEntrySchema),
  dependencies: z.array(z.string()).optional().default([]),
  registryDependencies: z.array(z.string()).optional().default([]),
});

export type ComponentLockEntry = z.infer<typeof componentLockEntrySchema>;

export const lockfileSchema = z.object({
  version: z.string().default('1.0.0'),
  updatedAt: z.string(),
  components: z.record(z.string(), componentLockEntrySchema).default({}),
});

export type Lockfile = z.infer<typeof lockfileSchema>;

export const registryFileSchema = z.object({
  name: z.string(),
  type: z.enum([
    'registry:ui',
    'registry:style',
    'registry:script',
    'registry:lib',
    'registry:token',
  ]),
  content: z.string(),
  path: z.string().optional(),
  target: z.string().optional(),
});

export type RegistryFile = z.infer<typeof registryFileSchema>;

export const registryComponentSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  version: z.string().default('1.0.0'),
  title: z.string().optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional().default([]),
  type: z.string().default('components:ui'),
  files: z.array(registryFileSchema),
  dependencies: z.array(z.string()).optional().default([]),
  devDependencies: z.array(z.string()).optional().default([]),
  registryDependencies: z.array(z.string()).optional().default([]),
}).passthrough();

export type RegistryComponent = z.infer<typeof registryComponentSchema>;

export interface DoctorFinding {
  category: 'tokens' | 'orphans' | 'a11y' | 'lockfile' | 'config';
  severity: 'error' | 'warning' | 'info';
  file: string;
  line: number;
  column?: number;
  message: string;
  rule: string;
  snippet?: string;
  suggestion?: string;
}

export interface DoctorReport {
  timestamp: string;
  totalFindings: number;
  errors: number;
  warnings: number;
  infos: number;
  findings: DoctorFinding[];
  summary: {
    tokenCoverageScore: number;
    orphanVariablesCount: number;
    a11yViolationsCount: number;
    integrityValid: boolean;
  };
}
