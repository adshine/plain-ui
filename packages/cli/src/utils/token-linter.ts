import type { DoctorFinding, Config } from '../types/index.js';
import type { FileToCheck } from './a11y-linter.js';

export function auditTokens(
  config: Config,
  tokenCssFiles: { path: string; content: string }[],
  allFiles: FileToCheck[]
): DoctorFinding[] {
  const findings: DoctorFinding[] = [];

  // 1. Extract defined CSS variables from CSS files & inline style tags
  const definedTokens = new Set<string>();

  const scanForDef = (content: string) => {
    const varDefRegex = /(--[a-zA-Z0-9_-]+)\s*:/g;
    let match;
    while ((match = varDefRegex.exec(content)) !== null) {
      definedTokens.add(match[1]);
    }
    const propDefRegex = /@property\s+(--[a-zA-Z0-9_-]+)/g;
    while ((match = propDefRegex.exec(content)) !== null) {
      definedTokens.add(match[1]);
    }
  };

  for (const tokenFile of tokenCssFiles) {
    scanForDef(tokenFile.content);
  }

  for (const file of allFiles) {
    if (file.path.endsWith('.html') || file.path.endsWith('.astro') || file.path.endsWith('.vue')) {
      const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
      let match;
      while ((match = styleTagRegex.exec(file.content)) !== null) {
        scanForDef(match[1]);
      }
    }
  }

  // 2. Scan all project files for var(--...) usages
  const usedTokens = new Map<string, { file: string; line: number; col: number; snippet: string }[]>();

  // Known fallback/standard aliases or component custom props
  const allowedVariablePrefixes = [
    '--color-',
    '--spacing-',
    '--radius-',
    '--shadow-',
    '--font-',
    '--line-height-',
    '--z-',
    '--motion-',
    '--plain-',
    '--tw-',
    '--bg-',
    '--text-',
    '--border-',
    '--dock-',
    '--beam-',
    '--shimmer-',
    '--slider-',
    '--tab-',
  ];

  for (const file of allFiles) {
    const lines = file.content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const varUsageRegex = /var\(\s*(--[a-zA-Z0-9_-]+)\s*(?:,[^)]+)?\)/g;
      let match;
      while ((match = varUsageRegex.exec(line)) !== null) {
        const tokenName = match[1];
        if (!usedTokens.has(tokenName)) {
          usedTokens.set(tokenName, []);
        }
        usedTokens.get(tokenName)!.push({
          file: file.path,
          line: i + 1,
          col: match.index + 1,
          snippet: line.trim(),
        });

        const isAllowedPrefix = allowedVariablePrefixes.some((p) => tokenName.startsWith(p));
        const hasFallback = line.includes(`var(${tokenName},`) || line.includes(`var(${tokenName} ,`);

        if (definedTokens.size > 0 && !definedTokens.has(tokenName) && !isAllowedPrefix && !hasFallback) {
          findings.push({
            category: 'tokens',
            severity: 'warning',
            file: file.path,
            line: i + 1,
            column: match.index + 1,
            rule: 'tokens/undefined-variable',
            message: `CSS variable "${tokenName}" is used without a definition in tokens or local styles.`,
            snippet: line.trim(),
            suggestion: `Define ${tokenName} in ${config.aliases.tokens} or add a fallback.`,
          });
        }
      }
    }
  }

  // 3. Find orphan variables
  for (const defToken of definedTokens) {
    if (!usedTokens.has(defToken)) {
      const isSystemToken = allowedVariablePrefixes.some((prefix) => defToken.startsWith(prefix));
      if (!isSystemToken) {
        findings.push({
          category: 'orphans',
          severity: 'info',
          file: config.aliases.tokens,
          line: 1,
          rule: 'tokens/orphan-variable',
          message: `Custom CSS property "${defToken}" is defined but never referenced in project files.`,
          suggestion: `Remove unused variable or reference it via var(${defToken}).`,
        });
      }
    }
  }

  return findings;
}
