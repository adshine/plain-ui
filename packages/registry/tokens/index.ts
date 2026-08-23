/**
 * @plain-ui/tokens - index.ts
 * 
 * Programmatic access to Plain UI OKLCH tokens, themes, and accessibility utilities.
 */

export const THEME_NAMES = [
  'zinc',
  'violet',
  'emerald',
  'amber',
  'rose',
  'slate',
  'stone',
  'gray',
  'neutral',
  'blue',
  'cyan',
  'orange',
] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

export const PALETTES = [
  'neutral',
  'zinc',
  'slate',
  'stone',
  'gray',
  'violet',
  'emerald',
  'amber',
  'rose',
  'blue',
  'green',
  'red',
  'cyan',
  'orange',
] as const;
export type PaletteName = (typeof PALETTES)[number];

export const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type Shade = (typeof SHADES)[number];

export interface OKLCHColor {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

export const SEMANTIC_TOKENS = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'info',
  'info-foreground',
  'border',
  'input',
  'ring',
  'radius',
  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-xl',
] as const;

export type SemanticToken = (typeof SEMANTIC_TOKENS)[number];

/**
 * Calculates WCAG 2.2 contrast ratio between two relative luminance values.
 */
export function getWcagContrast(lum1: number, lum2: number): number {
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Validates WCAG 2.2 AA compliance.
 */
export function isWcagAACompliant(contrastRatio: number, isLargeText = false): boolean {
  return isLargeText ? contrastRatio >= 3.0 : contrastRatio >= 4.5;
}

/**
 * Converts OKLCH color to standard sRGB array [r, g, b] (0-255).
 */
export function oklchToRgb(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const L = l_ * l_ * l_;
  const M = m_ * m_ * m_;
  const S = s_ * s_ * s_;

  const rLin = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
  const gLin = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
  const bLin = -0.0041960863 * L - 0.7034186147 * M + 1.7076147010 * S;

  const gamma = (x: number) => {
    const clamped = Math.max(0, Math.min(1, x));
    return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  return [
    Math.round(gamma(rLin) * 255),
    Math.round(gamma(gLin) * 255),
    Math.round(gamma(bLin) * 255),
  ];
}
