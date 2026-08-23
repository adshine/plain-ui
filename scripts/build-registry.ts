import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ============================================================================
// Schemas (Conforming to shadcn/ui Registry Specification & Plain UI CLI)
// ============================================================================

export const registryFileTypeSchema = z.enum([
  'registry:ui',
  'registry:style',
  'registry:script',
  'registry:lib',
  'registry:token',
  'registry:hook',
  'registry:block',
  'registry:component',
]);

export const registryFileSchema = z.object({
  name: z.string(),
  path: z.string(),
  content: z.string(),
  type: registryFileTypeSchema,
  target: z.string().optional(),
});

export const registryItemSchema = z.object({
  $schema: z.string().optional().default('https://ui.shadcn.com/schema/registry-item.json'),
  name: z.string(),
  type: registryFileTypeSchema.or(z.string()).default('registry:ui'),
  title: z.string().optional(),
  description: z.string().optional(),
  version: z.string().default('1.0.0'),
  dependencies: z.array(z.string()).optional().default([]),
  devDependencies: z.array(z.string()).optional().default([]),
  registryDependencies: z.array(z.string()).optional().default([]),
  files: z.array(registryFileSchema),
  categories: z.array(z.string()).optional().default([]),
  meta: z.record(z.any()).optional().default({}),
  cssVars: z
    .object({
      light: z.record(z.string()).optional(),
      dark: z.record(z.string()).optional(),
    })
    .optional(),
});

export const registryIndexSchema = z.object({
  $schema: z.string().optional().default('https://ui.shadcn.com/schema/registry.json'),
  name: z.string().default('plain-ui'),
  homepage: z.string().default('https://plain-ui.dev'),
  version: z.string().default('1.0.0'),
  description: z.string().default('Zero-JS Pure HTML5 & Tailwind CSS v4 Component Registry'),
  items: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      dependencies: z.array(z.string()).optional().default([]),
      devDependencies: z.array(z.string()).optional().default([]),
      registryDependencies: z.array(z.string()).optional().default([]),
      files: z.array(
        z.object({
          name: z.string(),
          path: z.string(),
          type: z.string(),
          target: z.string().optional(),
        })
      ),
      categories: z.array(z.string()).optional().default([]),
      meta: z.record(z.any()).optional().default({}),
    })
  ),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;

// ============================================================================
// Known Component Catalog Metadata
// ============================================================================

interface KnownItemConfig {
  title: string;
  description: string;
  category: string;
  type: z.infer<typeof registryFileTypeSchema>;
  registryDependencies?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  zeroJs: boolean;
  modernApis?: string[];
  companionScripts?: string[];
  companionStyles?: string[];
}

const CATALOG: Record<string, KnownItemConfig> = {
  accordion: {
    title: 'Accordion',
    description: 'Zero-JS vertically collapsing accordion built with HTML5 details[name] and interpolate-size transitions.',
    category: 'disclosure',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ['details::details-content', 'interpolate-size', 'details[name]'],
  },
  'bento-grid': {
    title: 'Bento Grid',
    description: 'Modern responsive bento grid layouts with dynamic aspect ratios and hover effects.',
    category: 'layout',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: ['grid-template-columns', 'subgrid'],
  },
  'border-beam': {
    title: 'Border Beam',
    description: 'Animated border beam highlighting using Houdini CSS @property angle rotations.',
    category: 'effects',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ['@property', 'conic-gradient'],
  },
  button: {
    title: 'Button',
    description: 'Zero-JS button primitives with primary, secondary, outline, ghost, destructive, and link variants.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: [':focus-visible', ':active'],
  },
  checkbox: {
    title: 'Checkbox',
    description: 'Accessible zero-JS custom checkboxes, card selectors, swatches, and multi-select chips.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: [':has()', ':checked'],
  },
  combobox: {
    title: 'Combobox',
    description: 'Accessible autocomplete and searchable select dropdown with keyboard navigation and filter support.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: false,
    companionScripts: ['scripts/combobox.js'],
    modernApis: ['aria-activedescendant', "role='combobox'"],
  },
  command: {
    title: 'Command Palette',
    description: 'Fast, accessible command palette and search dialog with keyboard shortcut triggers.',
    category: 'navigation',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'dialog'],
    zeroJs: false,
    companionScripts: ['scripts/command.js'],
    modernApis: ['<dialog>', 'keyboard-shortcuts'],
  },
  dialog: {
    title: 'Dialog / Modal',
    description: 'Zero-JS modal dialog built on HTML5 native <dialog> with @starting-style entrance animations and backdrop blur.',
    category: 'overlay',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    companionStyles: ['ui/dialog.css'],
    zeroJs: true,
    modernApis: ['<dialog>', '@starting-style', '::backdrop', 'allow-discrete'],
  },
  dock: {
    title: 'Dock',
    description: 'macOS-style interactive magnification dock with pure CSS smooth scaling.',
    category: 'navigation',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: [':has()', 'transform-origin'],
  },
  'dropdown-menu': {
    title: 'Dropdown Menu',
    description: 'Zero-JS dropdown menu utilizing Popover API (popover="auto") and CSS Anchor Positioning.',
    category: 'navigation',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ["popover='auto'", 'anchor()', 'position-anchor'],
  },
  'glow-card': {
    title: 'Glow Card',
    description: 'Interactive spotlight and glow cards powered by Houdini conic gradients and hover physics.',
    category: 'cards',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ['@property', 'radial-gradient', 'conic-gradient'],
  },
  'input-addons': {
    title: 'Input Addons',
    description: 'Input controls with prefix, suffix icons, inline currency badges, and embedded action buttons.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: [':focus-within', 'flexbox'],
  },
  'input-floating': {
    title: 'Floating Label Input',
    description: 'Pure CSS zero-JS floating label text inputs using :placeholder-shown transitions.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: [':placeholder-shown', ':focus'],
  },
  'input-password': {
    title: 'Password Input',
    description: 'Password input with real-time strength indicators and zero-JS CSS :has() validation checklist.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: [':has()', ':valid', 'pattern'],
  },
  'input-search': {
    title: 'Search Input',
    description: 'Search inputs with quick-clear triggers, shortcut badges, and async loading spinners.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: ["type='search'", ':placeholder-shown'],
  },
  marquee: {
    title: 'Marquee',
    description: 'Smooth, infinitely scrolling marquee track with pause-on-hover and GPU acceleration.',
    category: 'effects',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ['keyframes', 'mask-image'],
  },
  'otp-input': {
    title: 'OTP Input',
    description: 'Segmented one-time PIN and verification code input with auto-focus and digit grouping.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: ["inputmode='numeric'", ':focus'],
  },
  popover: {
    title: 'Popover',
    description: 'Zero-JS native popover with CSS Anchor Positioning and automatic light-dismiss.',
    category: 'overlay',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ["popover='auto'", 'anchor()', 'position-anchor'],
  },
  radio: {
    title: 'Radio Group',
    description: 'Accessible radio cards, segmented selector bars, and custom radio dots.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: [':checked', ':has()'],
  },
  'scroll-reveal': {
    title: 'Scroll Reveal',
    description: 'Zero-JS scroll-driven viewport reveals and progress animations using CSS animation-timeline: view() and scroll().',
    category: 'effects',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ['animation-timeline: view()', 'animation-timeline: scroll()', 'animation-range'],
  },
  sheet: {
    title: 'Sheet / Drawer',
    description: 'Slide-over sheet drawers (left, right, top, bottom) with Popover API and backdrop dismiss.',
    category: 'overlay',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ["popover='auto'", '@starting-style', 'allow-discrete'],
  },
  'shimmer-button': {
    title: 'Shimmer Button',
    description: 'High-performance glowing shimmer button with Houdini angle interpolation.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ['@property', 'conic-gradient'],
  },
  skeleton: {
    title: 'Skeleton',
    description: 'Theme-aware shimmer loading skeleton with CSS color-mix() gradient sweep.',
    category: 'feedback',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ['color-mix()', 'keyframes'],
  },
  slider: {
    title: 'Slider / Range',
    description: 'Custom HTML5 range input sliders with tick marks, multi-step intervals, and numeric badges.',
    category: 'inputs',
    type: 'registry:ui',
    registryDependencies: ['tokens'],
    zeroJs: true,
    modernApis: ['::-webkit-slider-thumb', '::-moz-range-thumb'],
  },
  tabs: {
    title: 'Tabs',
    description: 'Accessible keyboard-navigable tabs with roving tabindex and smooth panel transitions.',
    category: 'navigation',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: false,
    companionScripts: ['scripts/tabs.js'],
    modernApis: ["role='tablist'", 'roving-tabindex'],
  },
  toast: {
    title: 'Toast Notification',
    description: 'Lightweight, accessible toast notifications with auto-dismiss, progress timer, and action buttons.',
    category: 'feedback',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: false,
    companionScripts: ['scripts/toast.js'],
    modernApis: ["aria-live='polite'", "role='status'"],
  },
  tooltip: {
    title: 'Tooltip',
    description: 'Zero-JS tooltip using popover="hint" and CSS Anchor Positioning or pure CSS pseudo-elements.',
    category: 'overlay',
    type: 'registry:ui',
    registryDependencies: ['tokens', 'motion'],
    zeroJs: true,
    modernApis: ["popover='hint'", 'anchor()', 'position-anchor'],
  },
};

// ============================================================================
// Helper Utilities
// ============================================================================

function readIfExists(filePath: string): string | null {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return null;
}

function ensureDirSync(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function toTitleCase(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ============================================================================
// Registry Assembly
// ============================================================================

export async function buildRegistry(): Promise<{ items: RegistryItem[]; index: RegistryIndex }> {
  console.log('📦 Starting Plain UI Registry Build...');
  const registryBaseDir = path.resolve(rootDir, 'packages/registry');
  const uiDir = path.resolve(registryBaseDir, 'ui');
  const scriptsDir = path.resolve(registryBaseDir, 'scripts');
  const tokensDir = path.resolve(registryBaseDir, 'tokens');
  const motionDir = path.resolve(registryBaseDir, 'motion');

  const items: RegistryItem[] = [];

  // --------------------------------------------------------------------------
  // 1. Build Token Registry Items
  // --------------------------------------------------------------------------
  if (fs.existsSync(tokensDir)) {
    const tokenFiles: z.infer<typeof registryFileSchema>[] = [];

    const tokensCss = readIfExists(path.join(tokensDir, 'tokens.css'));
    if (tokensCss) {
      tokenFiles.push({
        name: 'tokens.css',
        path: 'tokens/tokens.css',
        content: tokensCss,
        type: 'registry:token',
        target: 'src/styles/tokens.css',
      });
    }

    const baseCss = readIfExists(path.join(tokensDir, 'base.css'));
    if (baseCss) {
      tokenFiles.push({
        name: 'base.css',
        path: 'tokens/base.css',
        content: baseCss,
        type: 'registry:token',
        target: 'src/styles/base.css',
      });
    }

    const themesCss = readIfExists(path.join(tokensDir, 'themes.css'));
    if (themesCss) {
      tokenFiles.push({
        name: 'themes.css',
        path: 'tokens/themes.css',
        content: themesCss,
        type: 'registry:token',
        target: 'src/styles/themes.css',
      });
    }

    const indexCss = readIfExists(path.join(tokensDir, 'index.css'));
    if (indexCss) {
      tokenFiles.push({
        name: 'index.css',
        path: 'tokens/index.css',
        content: indexCss,
        type: 'registry:token',
        target: 'src/styles/index.css',
      });
    }

    const indexTs = readIfExists(path.join(tokensDir, 'index.ts'));
    if (indexTs) {
      tokenFiles.push({
        name: 'tokens.ts',
        path: 'tokens/index.ts',
        content: indexTs,
        type: 'registry:lib',
        target: 'src/styles/tokens.ts',
      });
    }

    if (tokenFiles.length > 0) {
      const tokensItem: RegistryItem = {
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: 'tokens',
        type: 'registry:token',
        title: 'Design Tokens',
        description: 'Complete 3-Tier OKLCH design token system, semantic variables, theme presets, and base typography.',
        version: '1.0.0',
        dependencies: [],
        devDependencies: [],
        registryDependencies: [],
        files: tokenFiles,
        categories: ['tokens', 'theme'],
        meta: {
          zeroJs: true,
          colorSpace: 'oklch',
          tailwind: 'v4',
        },
      };

      registryItemSchema.parse(tokensItem);
      items.push(tokensItem);
      console.log(`  ✓ Added registry item: tokens (${tokenFiles.length} files)`);
    }
  }

  // --------------------------------------------------------------------------
  // 2. Build Motion Registry Item
  // --------------------------------------------------------------------------
  if (fs.existsSync(motionDir)) {
    const motionFiles: z.infer<typeof registryFileSchema>[] = [];

    const motionCss = readIfExists(path.join(motionDir, 'motion.css'));
    if (motionCss) {
      motionFiles.push({
        name: 'motion.css',
        path: 'motion/motion.css',
        content: motionCss,
        type: 'registry:style',
        target: 'src/styles/motion.css',
      });
    }

    const motionTs = readIfExists(path.join(motionDir, 'index.ts'));
    if (motionTs) {
      motionFiles.push({
        name: 'motion.ts',
        path: 'motion/index.ts',
        content: motionTs,
        type: 'registry:lib',
        target: 'src/styles/motion.ts',
      });
    }

    if (motionFiles.length > 0) {
      const motionItem: RegistryItem = {
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: 'motion',
        type: 'registry:style',
        title: 'Motion & Physics Tokens',
        description: 'Houdini CSS properties, asymmetric easing curves, scroll-driven animations, and view transition rules.',
        version: '1.0.0',
        dependencies: [],
        devDependencies: [],
        registryDependencies: ['tokens'],
        files: motionFiles,
        categories: ['motion', 'animation'],
        meta: {
          zeroJs: true,
          houdini: true,
          scrollDriven: true,
        },
      };

      registryItemSchema.parse(motionItem);
      items.push(motionItem);
      console.log(`  ✓ Added registry item: motion (${motionFiles.length} files)`);
    }
  }

  // --------------------------------------------------------------------------
  // 3. Build Standalone Script Items
  // --------------------------------------------------------------------------
  if (fs.existsSync(scriptsDir)) {
    const scriptFiles = fs.readdirSync(scriptsDir).filter((f) => f.endsWith('.js') || f.endsWith('.ts'));

    for (const scriptFile of scriptFiles) {
      const scriptSlug = scriptFile.replace(/\.(js|ts)$/, '');
      const scriptContent = readIfExists(path.join(scriptsDir, scriptFile));
      if (!scriptContent) continue;

      const scriptItem: RegistryItem = {
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: `script-${scriptSlug}`,
        type: 'registry:script',
        title: `${toTitleCase(scriptSlug)} Script`,
        description: `Light-DOM ESM vanilla JavaScript micro-controller (<1KB) for ${scriptSlug}.`,
        version: '1.0.0',
        dependencies: [],
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            name: scriptFile,
            path: `scripts/${scriptFile}`,
            content: scriptContent,
            type: 'registry:script',
            target: `src/scripts/${scriptFile}`,
          },
        ],
        categories: ['scripts', 'controller'],
        meta: {
          zeroJs: false,
          esm: true,
          lightDom: true,
        },
      };

      registryItemSchema.parse(scriptItem);
      items.push(scriptItem);
      console.log(`  ✓ Added registry item: script-${scriptSlug}`);
    }
  }

  // --------------------------------------------------------------------------
  // 4. Build UI Component Items
  // --------------------------------------------------------------------------
  if (fs.existsSync(uiDir)) {
    const uiFiles = fs.readdirSync(uiDir).filter((f) => f.endsWith('.html'));

    for (const htmlFileName of uiFiles) {
      const componentSlug = htmlFileName.replace(/\.html$/, '');
      const htmlContent = readIfExists(path.join(uiDir, htmlFileName));
      if (!htmlContent) continue;

      const catalogEntry = CATALOG[componentSlug];
      const title = catalogEntry?.title || toTitleCase(componentSlug);
      const description =
        catalogEntry?.description ||
        `Pure HTML5 and Tailwind CSS v4 ${title} component primitive with zero-runtime JavaScript overhead.`;
      const category = catalogEntry?.category || 'ui';
      const zeroJs = catalogEntry?.zeroJs !== undefined ? catalogEntry.zeroJs : true;
      const modernApis = catalogEntry?.modernApis || [];
      const registryDeps = catalogEntry?.registryDependencies || ['tokens'];

      const componentFiles: z.infer<typeof registryFileSchema>[] = [
        {
          name: htmlFileName,
          path: `ui/${htmlFileName}`,
          content: htmlContent,
          type: 'registry:ui',
          target: `src/components/ui/${htmlFileName}`,
        },
      ];

      // Add companion styles if specified (e.g. dialog.css)
      if (catalogEntry?.companionStyles) {
        for (const companionStyle of catalogEntry.companionStyles) {
          const styleContent = readIfExists(path.join(registryBaseDir, companionStyle));
          if (styleContent) {
            const fileName = path.basename(companionStyle);
            componentFiles.push({
              name: fileName,
              path: companionStyle,
              content: styleContent,
              type: 'registry:style',
              target: `src/styles/${fileName}`,
            });
          }
        }
      }

      // Add companion scripts if specified (e.g. scripts/tabs.js)
      if (catalogEntry?.companionScripts) {
        for (const companionScript of catalogEntry.companionScripts) {
          const scriptContent = readIfExists(path.join(registryBaseDir, companionScript));
          if (scriptContent) {
            const fileName = path.basename(companionScript);
            componentFiles.push({
              name: fileName,
              path: companionScript,
              content: scriptContent,
              type: 'registry:script',
              target: `src/scripts/${fileName}`,
            });
          }
        }
      }

      const item: RegistryItem = {
        $schema: 'https://ui.shadcn.com/schema/registry-item.json',
        name: componentSlug,
        type: 'registry:ui',
        title,
        description,
        version: '1.0.0',
        dependencies: catalogEntry?.dependencies || [],
        devDependencies: catalogEntry?.devDependencies || [],
        registryDependencies: registryDeps,
        files: componentFiles,
        categories: [category],
        meta: {
          zeroJs,
          framework: 'html5',
          tailwind: 'v4',
          modernApis,
        },
      };

      registryItemSchema.parse(item);
      items.push(item);
      console.log(`  ✓ Added registry item: ${componentSlug} (${componentFiles.length} files)`);
    }
  }

  // --------------------------------------------------------------------------
  // 5. Generate Master Index
  // --------------------------------------------------------------------------
  const index: RegistryIndex = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'plain-ui',
    homepage: 'https://plain-ui.dev',
    version: '1.0.0',
    description: 'Zero-JS Pure HTML5 & Tailwind CSS v4 Component Registry with Modern Browser Primitives',
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies,
      devDependencies: item.devDependencies,
      registryDependencies: item.registryDependencies,
      files: item.files.map((f) => ({
        name: f.name,
        path: f.path,
        type: f.type,
        target: f.target,
      })),
      categories: item.categories,
      meta: item.meta,
    })),
  };

  registryIndexSchema.parse(index);
  return { items, index };
}

// ============================================================================
// Write Static Artifacts
// ============================================================================

export async function writeRegistryArtifacts(items: RegistryItem[], index: RegistryIndex) {
  const outputTargets = [
    // 1. Astro Docs public directory (served as static HTTP endpoints)
    path.resolve(rootDir, 'apps/docs/public'),
    // 2. Root public directory
    path.resolve(rootDir, 'public'),
    // 3. Registry package dist
    path.resolve(rootDir, 'packages/registry/dist'),
  ];

  for (const targetDir of outputTargets) {
    const rDir = path.join(targetDir, 'r');
    ensureDirSync(rDir);

    // Write individual /r/[name].json files
    for (const item of items) {
      const itemPath = path.join(rDir, `${item.name}.json`);
      fs.writeFileSync(itemPath, JSON.stringify(item, null, 2) + '\n', 'utf-8');
    }

    // Write master registry.json and /r/index.json
    const masterRegistryPath = path.join(targetDir, 'registry.json');
    fs.writeFileSync(masterRegistryPath, JSON.stringify(index, null, 2) + '\n', 'utf-8');

    const rIndexPath = path.join(rDir, 'index.json');
    fs.writeFileSync(rIndexPath, JSON.stringify(index, null, 2) + '\n', 'utf-8');

    console.log(`💾 Written ${items.length} items to: ${targetDir}`);
  }

  // Also write an importable registry.json inside packages/registry
  const registryPkgDir = path.resolve(rootDir, 'packages/registry');
  fs.writeFileSync(path.join(registryPkgDir, 'registry.json'), JSON.stringify(index, null, 2) + '\n', 'utf-8');
}

// ============================================================================
// Main Execution & Verification
// ============================================================================

async function main() {
  const startTime = Date.now();
  console.log('🚀 Executing build-registry.ts...');

  try {
    const { items, index } = await buildRegistry();
    await writeRegistryArtifacts(items, index);

    // Verification check: read back and validate all generated files
    console.log('\n🔍 Verifying generated registry files...');
    const publicRDir = path.resolve(rootDir, 'apps/docs/public/r');
    const writtenFiles = fs.readdirSync(publicRDir).filter((f) => f.endsWith('.json'));

    let totalBytes = 0;
    for (const jsonFile of writtenFiles) {
      const filePath = path.join(publicRDir, jsonFile);
      const content = fs.readFileSync(filePath, 'utf-8');
      totalBytes += Buffer.byteLength(content);
      const parsed = JSON.parse(content);

      if (jsonFile === 'index.json') {
        registryIndexSchema.parse(parsed);
      } else {
        registryItemSchema.parse(parsed);
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✨ Registry build completed successfully in ${duration}s!`);
    console.log(`📊 Summary Statistics:`);
    console.log(`   • Total Registry Items: ${items.length}`);
    console.log(`   • Total JSON Endpoints: ${writtenFiles.length}`);
    console.log(`   • Total Compiled Size: ${(totalBytes / 1024).toFixed(2)} KB`);
    console.log(`   • Zero-JS Ratio: ${Math.round((items.filter((i) => i.meta?.zeroJs).length / items.length) * 100)}%`);
    console.log(`   • Endpoints available at: /registry.json, /r/index.json, /r/[name].json\n`);
  } catch (error) {
    console.error('❌ Registry build failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
