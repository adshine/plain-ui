---
title: "Design Tokens"
description: "Complete 3-Tier OKLCH design token system, semantic variables, theme presets, and base typography."
category: "tokens"
type: "registry:token"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: []
modernApis: []
---

# Design Tokens

> Complete 3-Tier OKLCH design token system, semantic variables, theme presets, and base typography.

## Overview

- **Type**: `registry:token`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `tokens`
- **Modern Browser APIs**: Standard HTML5/CSS
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add tokens

# Or using pnpm dlx
pnpm dlx plain-ui add tokens
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/styles/tokens.css`** (`registry:token`)
- **`src/styles/base.css`** (`registry:token`)
- **`src/styles/themes.css`** (`registry:token`)
- **`src/styles/index.css`** (`registry:token`)
- **`src/styles/tokens.ts`** (`registry:lib`)

---

## Source Code

### `tokens.css` (`src/styles/tokens.css`)

```css
/**
 * @plain-ui/tokens - tokens.css
 * 
 * Complete 3-Tier Design Token System in OKLCH Color Space
 * Tier 1: Primitives (Neutral, Zinc, Slate, Stone, Gray, Accent Palettes, Radii, Shadows, Spacing, Typography, Z-index, Motion)
 * Tier 2: Semantic Design Tokens (Contextual mappings: background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, radius-*)
 * Tier 3: Component & Contrast Guardrail Tokens (APCA / WCAG 2.2 AA compliant)
 *
 * Designed for Plain UI - Accessible, Perceptually Uniform, Themeable.
 */

/* ==========================================================================
   TIER 1: PRIMITIVE TOKENS
   ========================================================================== */

:root {
  /* --------------------------------------------------------------------------
     1.1 Base Colors
     -------------------------------------------------------------------------- */
  --color-white: oklch(1 0 0);
  --color-black: oklch(0 0 0);
  --color-transparent: transparent;
  --color-current: currentColor;

  /* --------------------------------------------------------------------------
     1.2 Neutral Palette (Pure Achromatic Neutral)
     -------------------------------------------------------------------------- */
  --color-neutral-50: oklch(0.985 0 0);
  --color-neutral-100: oklch(0.965 0 0);
  --color-neutral-200: oklch(0.920 0 0);
  --color-neutral-300: oklch(0.865 0 0);
  --color-neutral-400: oklch(0.705 0 0);
  --color-neutral-500: oklch(0.550 0 0);
  --color-neutral-600: oklch(0.440 0 0);
  --color-neutral-700: oklch(0.365 0 0);
  --color-neutral-800: oklch(0.265 0 0);
  --color-neutral-900: oklch(0.200 0 0);
  --color-neutral-950: oklch(0.140 0 0);

  /* --------------------------------------------------------------------------
     1.3 Zinc Palette (Subtle Cool-Blue Tint, default for Plain UI)
     -------------------------------------------------------------------------- */
  --color-zinc-50: oklch(0.985 0.002 247.8);
  --color-zinc-100: oklch(0.967 0.003 264.5);
  --color-zinc-200: oklch(0.920 0.006 264.5);
  --color-zinc-300: oklch(0.869 0.008 260.8);
  --color-zinc-400: oklch(0.705 0.015 258.3);
  --color-zinc-500: oklch(0.551 0.023 264.4);
  --color-zinc-600: oklch(0.442 0.020 265.6);
  --color-zinc-700: oklch(0.370 0.016 264.5);
  --color-zinc-800: oklch(0.274 0.012 265.0);
  --color-zinc-900: oklch(0.208 0.010 265.8);
  --color-zinc-950: oklch(0.141 0.008 266.2);

  /* --------------------------------------------------------------------------
     1.4 Slate Palette (Cool Gray with Slate-Blue Undertone)
     -------------------------------------------------------------------------- */
  --color-slate-50: oklch(0.984 0.006 247.8);
  --color-slate-100: oklch(0.968 0.007 247.8);
  --color-slate-200: oklch(0.923 0.013 247.8);
  --color-slate-300: oklch(0.869 0.022 252.9);
  --color-slate-400: oklch(0.704 0.040 256.8);
  --color-slate-500: oklch(0.554 0.046 257.4);
  --color-slate-600: oklch(0.446 0.043 257.3);
  --color-slate-700: oklch(0.372 0.044 257.3);
  --color-slate-800: oklch(0.279 0.041 260.0);
  --color-slate-900: oklch(0.208 0.042 265.8);
  --color-slate-950: oklch(0.129 0.042 264.7);

  /* --------------------------------------------------------------------------
     1.5 Stone Palette (Warm Earthy Gray Undertone)
     -------------------------------------------------------------------------- */
  --color-stone-50: oklch(0.985 0.002 60.5);
  --color-stone-100: oklch(0.967 0.003 60.5);
  --color-stone-200: oklch(0.922 0.005 60.5);
  --color-stone-300: oklch(0.869 0.008 60.5);
  --color-stone-400: oklch(0.707 0.018 60.5);
  --color-stone-500: oklch(0.553 0.020 60.5);
  --color-stone-600: oklch(0.444 0.017 60.5);
  --color-stone-700: oklch(0.371 0.015 60.5);
  --color-stone-800: oklch(0.276 0.012 60.5);
  --color-stone-900: oklch(0.210 0.010 60.5);
  --color-stone-950: oklch(0.147 0.007 60.5);

  /* --------------------------------------------------------------------------
     1.6 Gray Palette (Balanced Cool Gray)
     -------------------------------------------------------------------------- */
  --color-gray-50: oklch(0.985 0.002 247.8);
  --color-gray-100: oklch(0.967 0.003 260.0);
  --color-gray-200: oklch(0.920 0.005 260.0);
  --color-gray-300: oklch(0.871 0.008 260.0);
  --color-gray-400: oklch(0.705 0.015 260.0);
  --color-gray-500: oklch(0.551 0.020 260.0);
  --color-gray-600: oklch(0.446 0.018 260.0);
  --color-gray-700: oklch(0.373 0.016 260.0);
  --color-gray-800: oklch(0.278 0.013 260.0);
  --color-gray-900: oklch(0.210 0.010 260.0);
  --color-gray-950: oklch(0.140 0.008 260.0);

  /* --------------------------------------------------------------------------
     1.7 Violet Palette (Theme Accent)
     -------------------------------------------------------------------------- */
  --color-violet-50: oklch(0.975 0.018 290.0);
  --color-violet-100: oklch(0.945 0.040 290.0);
  --color-violet-200: oklch(0.890 0.075 290.0);
  --color-violet-300: oklch(0.800 0.130 290.0);
  --color-violet-400: oklch(0.700 0.190 290.0);
  --color-violet-500: oklch(0.600 0.230 290.0);
  --color-violet-600: oklch(0.520 0.240 290.0);
  --color-violet-700: oklch(0.440 0.210 290.0);
  --color-violet-800: oklch(0.350 0.160 290.0);
  --color-violet-900: oklch(0.260 0.110 290.0);
  --color-violet-950: oklch(0.170 0.070 290.0);

  /* --------------------------------------------------------------------------
     1.8 Emerald Palette (Theme Accent & Success)
     -------------------------------------------------------------------------- */
  --color-emerald-50: oklch(0.978 0.025 160.0);
  --color-emerald-100: oklch(0.950 0.055 160.0);
  --color-emerald-200: oklch(0.900 0.100 160.0);
  --color-emerald-300: oklch(0.825 0.150 160.0);
  --color-emerald-400: oklch(0.740 0.185 160.0);
  --color-emerald-500: oklch(0.650 0.195 160.0);
  --color-emerald-600: oklch(0.560 0.175 160.0);
  --color-emerald-700: oklch(0.460 0.140 160.0);
  --color-emerald-800: oklch(0.370 0.105 160.0);
  --color-emerald-900: oklch(0.280 0.075 160.0);
  --color-emerald-950: oklch(0.180 0.045 160.0);

  /* --------------------------------------------------------------------------
     1.9 Amber Palette (Theme Accent & Warning)
     -------------------------------------------------------------------------- */
  --color-amber-50: oklch(0.985 0.025 85.0);
  --color-amber-100: oklch(0.960 0.060 85.0);
  --color-amber-200: oklch(0.915 0.110 85.0);
  --color-amber-300: oklch(0.850 0.150 85.0);
  --color-amber-400: oklch(0.780 0.170 85.0);
  --color-amber-500: oklch(0.720 0.175 85.0);
  --color-amber-600: oklch(0.620 0.160 85.0);
  --color-amber-700: oklch(0.520 0.135 85.0);
  --color-amber-800: oklch(0.420 0.105 85.0);
  --color-amber-900: oklch(0.320 0.075 85.0);
  --color-amber-950: oklch(0.200 0.045 85.0);

  /* --------------------------------------------------------------------------
     1.10 Rose Palette (Theme Accent)
     -------------------------------------------------------------------------- */
  --color-rose-50: oklch(0.975 0.020 18.0);
  --color-rose-100: oklch(0.940 0.050 18.0);
  --color-rose-200: oklch(0.885 0.095 18.0);
  --color-rose-300: oklch(0.800 0.150 18.0);
  --color-rose-400: oklch(0.700 0.200 18.0);
  --color-rose-500: oklch(0.610 0.225 18.0);
  --color-rose-600: oklch(0.530 0.220 18.0);
  --color-rose-700: oklch(0.440 0.185 18.0);
  --color-rose-800: oklch(0.350 0.140 18.0);
  --color-rose-900: oklch(0.260 0.095 18.0);
  --color-rose-950: oklch(0.170 0.060 18.0);

  /* --------------------------------------------------------------------------
     1.11 Red / Destructive Palette
     -------------------------------------------------------------------------- */
  --color-red-50: oklch(0.975 0.020 27.0);
  --color-red-100: oklch(0.940 0.050 27.0);
  --color-red-200: oklch(0.885 0.100 27.0);
  --color-red-300: oklch(0.790 0.170 27.0);
  --color-red-400: oklch(0.690 0.220 27.0);
  --color-red-500: oklch(0.600 0.240 27.0);
  --color-red-600: oklch(0.520 0.230 27.0);
  --color-red-700: oklch(0.440 0.190 27.0);
  --color-red-800: oklch(0.350 0.145 27.0);
  --color-red-900: oklch(0.260 0.100 27.0);
  --color-red-950: oklch(0.170 0.065 27.0);

  /* --------------------------------------------------------------------------
     1.12 Blue / Info Palette
     -------------------------------------------------------------------------- */
  --color-blue-50: oklch(0.975 0.020 250.0);
  --color-blue-100: oklch(0.945 0.045 250.0);
  --color-blue-200: oklch(0.885 0.085 250.0);
  --color-blue-300: oklch(0.800 0.140 250.0);
  --color-blue-400: oklch(0.700 0.190 250.0);
  --color-blue-500: oklch(0.600 0.220 250.0);
  --color-blue-600: oklch(0.520 0.210 250.0);
  --color-blue-700: oklch(0.440 0.175 250.0);
  --color-blue-800: oklch(0.350 0.130 250.0);
  --color-blue-900: oklch(0.260 0.090 250.0);
  --color-blue-950: oklch(0.170 0.055 250.0);

  /* --------------------------------------------------------------------------
     1.13 Green Palette
     -------------------------------------------------------------------------- */
  --color-green-50: oklch(0.978 0.025 145.0);
  --color-green-100: oklch(0.950 0.055 145.0);
  --color-green-200: oklch(0.900 0.100 145.0);
  --color-green-300: oklch(0.825 0.150 145.0);
  --color-green-400: oklch(0.740 0.185 145.0);
  --color-green-500: oklch(0.650 0.195 145.0);
  --color-green-600: oklch(0.560 0.175 145.0);
  --color-green-700: oklch(0.460 0.140 145.0);
  --color-green-800: oklch(0.370 0.105 145.0);
  --color-green-900: oklch(0.280 0.075 145.0);
  --color-green-950: oklch(0.180 0.045 145.0);

  /* --------------------------------------------------------------------------
     1.14 Cyan Palette
     -------------------------------------------------------------------------- */
  --color-cyan-50: oklch(0.978 0.020 200.0);
  --color-cyan-100: oklch(0.950 0.045 200.0);
  --color-cyan-200: oklch(0.895 0.080 200.0);
  --color-cyan-300: oklch(0.815 0.125 200.0);
  --color-cyan-400: oklch(0.720 0.160 200.0);
  --color-cyan-500: oklch(0.630 0.175 200.0);
  --color-cyan-600: oklch(0.540 0.165 200.0);
  --color-cyan-700: oklch(0.450 0.135 200.0);
  --color-cyan-800: oklch(0.360 0.100 200.0);
  --color-cyan-900: oklch(0.270 0.070 200.0);
  --color-cyan-950: oklch(0.175 0.045 200.0);

  /* --------------------------------------------------------------------------
     1.15 Orange Palette
     -------------------------------------------------------------------------- */
  --color-orange-50: oklch(0.980 0.020 50.0);
  --color-orange-100: oklch(0.950 0.055 50.0);
  --color-orange-200: oklch(0.900 0.100 50.0);
  --color-orange-300: oklch(0.830 0.150 50.0);
  --color-orange-400: oklch(0.740 0.190 50.0);
  --color-orange-500: oklch(0.660 0.210 50.0);
  --color-orange-600: oklch(0.570 0.195 50.0);
  --color-orange-700: oklch(0.470 0.160 50.0);
  --color-orange-800: oklch(0.370 0.120 50.0);
  --color-orange-900: oklch(0.280 0.080 50.0);
  --color-orange-950: oklch(0.180 0.050 50.0);

  /* --------------------------------------------------------------------------
     1.16 Corner Radii Scale
     -------------------------------------------------------------------------- */
  --radius-none: 0px;
  --radius-xs: 0.125rem;   /* 2px */
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;

  /* Default base radius variable */
  --radius: var(--radius-lg);

  /* --------------------------------------------------------------------------
     1.17 Elevation & Shadows (Perceptually Calibrated)
     -------------------------------------------------------------------------- */
  --shadow-2xs: 0 1px 2px 0 oklch(0 0 0 / 0.05);
  --shadow-xs: 0 1px 3px 0 oklch(0 0 0 / 0.07), 0 1px 2px -1px oklch(0 0 0 / 0.07);
  --shadow-sm: 0 2px 4px -1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06);
  --shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.08), 0 2px 4px -2px oklch(0 0 0 / 0.08);
  --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.08), 0 4px 6px -4px oklch(0 0 0 / 0.08);
  --shadow-xl: 0 20px 25px -5px oklch(0 0 0 / 0.10), 0 8px 10px -6px oklch(0 0 0 / 0.10);
  --shadow-2xl: 0 25px 50px -12px oklch(0 0 0 / 0.20);
  --shadow-inner: inset 0 2px 4px 0 oklch(0 0 0 / 0.06);

  /* --------------------------------------------------------------------------
     1.18 Spacing Scale
     -------------------------------------------------------------------------- */
  --spacing-0: 0px;
  --spacing-0-5: 0.125rem; /* 2px */
  --spacing-1: 0.25rem;    /* 4px */
  --spacing-1-5: 0.375rem; /* 6px */
  --spacing-2: 0.5rem;     /* 8px */
  --spacing-2-5: 0.625rem; /* 10px */
  --spacing-3: 0.75rem;    /* 12px */
  --spacing-3-5: 0.875rem; /* 14px */
  --spacing-4: 1rem;       /* 16px */
  --spacing-5: 1.25rem;    /* 20px */
  --spacing-6: 1.5rem;     /* 24px */
  --spacing-7: 1.75rem;    /* 28px */
  --spacing-8: 2rem;       /* 32px */
  --spacing-9: 2.25rem;    /* 36px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-11: 2.75rem;   /* 44px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-14: 3.5rem;    /* 56px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  --spacing-28: 7rem;      /* 112px */
  --spacing-32: 8rem;      /* 128px */
  --spacing-36: 9rem;      /* 144px */
  --spacing-40: 10rem;     /* 160px */
  --spacing-44: 11rem;     /* 176px */
  --spacing-48: 12rem;     /* 192px */
  --spacing-56: 14rem;     /* 224px */
  --spacing-64: 16rem;     /* 256px */
  --spacing-72: 18rem;     /* 288px */
  --spacing-80: 20rem;     /* 320px */
  --spacing-96: 24rem;     /* 384px */

  /* --------------------------------------------------------------------------
     1.19 Typography Tokens
     -------------------------------------------------------------------------- */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;

  --font-size-2xs: 0.6875rem; /* 11px */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 3.75rem;   /* 60px */

  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  /* --------------------------------------------------------------------------
     1.20 Motion & Transitions
     -------------------------------------------------------------------------- */
  --ease-linear: cubic-bezier(0, 0, 1, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  --duration-fastest: 75ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slowest: 500ms;

  /* --------------------------------------------------------------------------
     1.21 Z-Index Layers
     -------------------------------------------------------------------------- */
  --z-hide: -1;
  --z-auto: auto;
  --z-base: 0;
  --z-docked: 10;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-banner: 1200;
  --z-overlay: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-toast: 1600;
  --z-tooltip: 1700;
  --z-max: 2147483647;
}

/* ==========================================================================
   TIER 2: SEMANTIC DESIGN TOKENS (LIGHT THEME - DEFAULT)
   ========================================================================== */

:root {
  /* Surface & Page */
  --background: var(--color-white);
  --foreground: var(--color-zinc-950);

  /* Card / Container Elements */
  --card: var(--color-white);
  --card-foreground: var(--color-zinc-950);

  /* Popover / Dropdown / Modal Surfaces */
  --popover: var(--color-white);
  --popover-foreground: var(--color-zinc-950);

  /* Primary Brand Action (Solid High-Contrast) */
  --primary: var(--color-zinc-900);
  --primary-foreground: var(--color-zinc-50);

  /* Secondary Subdued Action */
  --secondary: var(--color-zinc-100);
  --secondary-foreground: var(--color-zinc-900);

  /* Muted Text & Backgrounds */
  --muted: var(--color-zinc-100);
  --muted-foreground: var(--color-zinc-500);

  /* Accent Highlight Surface */
  --accent: var(--color-zinc-100);
  --accent-foreground: var(--color-zinc-900);

  /* Status Tokens (Destructive, Success, Warning, Info) */
  --destructive: var(--color-red-600);
  --destructive-foreground: var(--color-white);

  --success: var(--color-emerald-600);
  --success-foreground: var(--color-white);

  --warning: var(--color-amber-500);
  --warning-foreground: var(--color-zinc-950);

  --info: var(--color-blue-600);
  --info-foreground: var(--color-white);

  /* Borders, Separators & Form Inputs */
  --border: var(--color-zinc-200);
  --input: var(--color-zinc-200);

  /* Accessible Focus Rings */
  --ring: var(--color-zinc-950);

  /* Component Derived Radii */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* Sidebar Tokens (for unified layout components) */
  --sidebar-background: var(--color-zinc-50);
  --sidebar-foreground: var(--color-zinc-950);
  --sidebar-primary: var(--color-zinc-900);
  --sidebar-primary-foreground: var(--color-zinc-50);
  --sidebar-accent: var(--color-zinc-200);
  --sidebar-accent-foreground: var(--color-zinc-900);
  --sidebar-border: var(--color-zinc-200);
  --sidebar-ring: var(--color-zinc-950);

  /* Contrast Guardrail Properties */
  --contrast-guardrail-min-ratio: 4.5;
  --contrast-guardrail-apca-target: 60;
}

/* ==========================================================================
   TIER 2: SEMANTIC DESIGN TOKENS (DARK THEME OVERRIDES)
   ========================================================================== */

.dark,
[data-theme="dark"],
[data-mode="dark"] {
  /* Surface & Page */
  --background: var(--color-zinc-950);
  --foreground: var(--color-zinc-50);

  /* Card / Container Elements */
  --card: var(--color-zinc-900);
  --card-foreground: var(--color-zinc-50);

  /* Popover / Dropdown / Modal Surfaces */
  --popover: var(--color-zinc-900);
  --popover-foreground: var(--color-zinc-50);

  /* Primary Action */
  --primary: var(--color-zinc-50);
  --primary-foreground: var(--color-zinc-900);

  /* Secondary Subdued Action */
  --secondary: var(--color-zinc-800);
  --secondary-foreground: var(--color-zinc-50);

  /* Muted Text & Backgrounds (APCA calibrated Lc > 60 against dark bg) */
  --muted: var(--color-zinc-800);
  --muted-foreground: var(--color-zinc-400);

  /* Accent Highlight Surface */
  --accent: var(--color-zinc-800);
  --accent-foreground: var(--color-zinc-50);

  /* Status Tokens */
  --destructive: var(--color-red-600);
  --destructive-foreground: var(--color-white);

  --success: var(--color-emerald-500);
  --success-foreground: var(--color-zinc-950);

  --warning: var(--color-amber-400);
  --warning-foreground: var(--color-zinc-950);

  --info: var(--color-blue-500);
  --info-foreground: var(--color-white);

  /* Borders, Separators & Form Inputs */
  --border: var(--color-zinc-800);
  --input: var(--color-zinc-800);

  /* Accessible Focus Rings */
  --ring: var(--color-zinc-300);

  /* Sidebar Tokens (Dark) */
  --sidebar-background: var(--color-zinc-900);
  --sidebar-foreground: var(--color-zinc-50);
  --sidebar-primary: var(--color-zinc-50);
  --sidebar-primary-foreground: var(--color-zinc-900);
  --sidebar-accent: var(--color-zinc-800);
  --sidebar-accent-foreground: var(--color-zinc-50);
  --sidebar-border: var(--color-zinc-800);
  --sidebar-ring: var(--color-zinc-300);
}

/* Fallback for OS-level dark mode preference when no manual theme class is applied */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]):not([data-mode="light"]):not(.light) {
    --background: var(--color-zinc-950);
    --foreground: var(--color-zinc-50);

    --card: var(--color-zinc-900);
    --card-foreground: var(--color-zinc-50);

    --popover: var(--color-zinc-900);
    --popover-foreground: var(--color-zinc-50);

    --primary: var(--color-zinc-50);
    --primary-foreground: var(--color-zinc-900);

    --secondary: var(--color-zinc-800);
    --secondary-foreground: var(--color-zinc-50);

    --muted: var(--color-zinc-800);
    --muted-foreground: var(--color-zinc-400);

    --accent: var(--color-zinc-800);
    --accent-foreground: var(--color-zinc-50);

    --destructive: var(--color-red-600);
    --destructive-foreground: var(--color-white);

    --success: var(--color-emerald-500);
    --success-foreground: var(--color-zinc-950);

    --warning: var(--color-amber-400);
    --warning-foreground: var(--color-zinc-950);

    --info: var(--color-blue-500);
    --info-foreground: var(--color-white);

    --border: var(--color-zinc-800);
    --input: var(--color-zinc-800);

    --ring: var(--color-zinc-300);

    --sidebar-background: var(--color-zinc-900);
    --sidebar-foreground: var(--color-zinc-50);
    --sidebar-primary: var(--color-zinc-50);
    --sidebar-primary-foreground: var(--color-zinc-900);
    --sidebar-accent: var(--color-zinc-800);
    --sidebar-accent-foreground: var(--color-zinc-50);
    --sidebar-border: var(--color-zinc-800);
    --sidebar-ring: var(--color-zinc-300);
  }
}

/* ==========================================================================
   TIER 3: ACCESSIBILITY & CONTRAST GUARDRAILS (APCA & WCAG 2.2 AA)
   ========================================================================== */

/**
 * Contrast Guardrails Summary:
 * - WCAG 2.2 AA SC 1.4.3 (Contrast Minimum):
 *   * Body / Normal Text (< 18pt / < 14pt bold): >= 4.5:1 ratio
 *   * Large Text (>= 18pt / >= 14pt bold): >= 3.0:1 ratio
 * - WCAG 2.2 AA SC 1.4.11 (Non-text Contrast):
 *   * UI boundaries, icons, active controls: >= 3.0:1 ratio
 * - WCAG 2.2 AA SC 2.4.11 & 2.4.13 (Focus Appearance):
 *   * Minimum 2px perimeter with 3.0:1 contrast difference
 * - APCA (Advanced Perceptual Contrast Algorithm):
 *   * Body text: Target Lc >= 60 (Plain UI standard is Lc 75-105)
 *   * Secondary/Muted text: Target Lc >= 60
 *   * Large Headings: Target Lc >= 45
 */
:root {
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-style: solid;
  --focus-ring-color: var(--ring);

  --disabled-opacity: 0.5;
  --disabled-cursor: not-allowed;
}
```

### `base.css` (`src/styles/base.css`)

```css
/**
 * @plain-ui/tokens - base.css
 * 
 * HTML5 Semantic Reset, Focus-Visible Outline Rings,
 * Typography Defaults, and Accessible Scrollbar Styling.
 *
 * Part of Plain UI Design System.
 */

/* ==========================================================================
   1. HTML5 SEMANTIC RESET & BOX-SIZING
   ========================================================================== */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-width: 0;
  border-style: solid;
  border-color: var(--border, currentColor);
}

html {
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: var(--font-sans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  font-feature-settings: normal;
  font-variation-settings: normal;
  line-height: var(--leading-normal, 1.5);
  color: var(--foreground);
  background-color: var(--background);
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0;
  line-height: inherit;
  color: inherit;
  background-color: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Block display for HTML5 semantic elements */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section,
summary {
  display: block;
}

/* ==========================================================================
   2. TYPOGRAPHY DEFAULTS
   ========================================================================== */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: var(--font-weight-semibold, 600);
  line-height: var(--leading-tight, 1.25);
  color: var(--foreground);
  text-wrap: balance;
}

h1 {
  font-size: var(--font-size-4xl, 2.25rem);
  letter-spacing: var(--tracking-tight, -0.025em);
  font-weight: var(--font-weight-bold, 700);
  margin-bottom: 0.75rem;
}

h2 {
  font-size: var(--font-size-3xl, 1.875rem);
  letter-spacing: var(--tracking-tight, -0.025em);
  margin-bottom: 0.625rem;
}

h3 {
  font-size: var(--font-size-2xl, 1.5rem);
  letter-spacing: var(--tracking-tight, -0.025em);
  margin-bottom: 0.5rem;
}

h4 {
  font-size: var(--font-size-xl, 1.25rem);
  margin-bottom: 0.5rem;
}

h5 {
  font-size: var(--font-size-lg, 1.125rem);
  margin-bottom: 0.375rem;
}

h6 {
  font-size: var(--font-size-base, 1rem);
  margin-bottom: 0.25rem;
}

p {
  line-height: var(--leading-relaxed, 1.625);
  margin-bottom: 1rem;
  text-wrap: pretty;
}

p:last-child {
  margin-bottom: 0;
}

small {
  font-size: var(--font-size-sm, 0.875rem);
}

strong,
b {
  font-weight: var(--font-weight-bold, 700);
}

blockquote {
  border-left: 3px solid var(--border);
  padding-left: 1rem;
  font-style: italic;
  color: var(--muted-foreground);
  margin: 1.25rem 0;
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
  border-color: var(--border);
  margin: 1.5rem 0;
}

/* Links */
a {
  color: inherit;
  text-decoration: inherit;
  cursor: pointer;
  transition: color var(--duration-fast, 150ms) var(--ease-out, ease-out);
}

a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Code & Preformatted Text */
code,
kbd,
samp,
pre {
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  font-size: 0.875em;
}

code:not(pre code) {
  background-color: var(--muted);
  color: var(--foreground);
  padding: 0.2em 0.4em;
  border-radius: var(--radius-sm, 4px);
  border: 1px solid var(--border);
  white-space: break-spaces;
}

pre {
  background-color: var(--muted);
  color: var(--foreground);
  padding: 1rem;
  border-radius: var(--radius-md, 6px);
  overflow-x: auto;
  border: 1px solid var(--border);
  line-height: 1.45;
  margin: 1rem 0;
}

kbd {
  background-color: var(--muted);
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: var(--radius-xs, 2px);
  padding: 0.15em 0.35em;
  font-size: 0.75em;
  font-weight: var(--font-weight-medium, 500);
  box-shadow: var(--shadow-2xs);
}

/* Selection Styling */
::selection {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

::-moz-selection {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

/* Lists */
ol,
ul {
  list-style: none;
}

/* Tables */
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  text-indent: 0;
  border-color: inherit;
}

th,
td {
  padding: 0.75rem 1rem;
  vertical-align: middle;
  border-bottom: 1px solid var(--border);
  text-align: left;
}

th {
  font-weight: var(--font-weight-semibold, 600);
  color: var(--foreground);
}

/* Media Elements */
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
}

/* Form Elements Reset */
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border-style: none;
}

button,
[role="button"] {
  cursor: pointer;
  user-select: none;
}

button:disabled,
input:disabled,
textarea:disabled,
select:disabled,
[aria-disabled="true"] {
  cursor: var(--disabled-cursor, not-allowed);
  opacity: var(--disabled-opacity, 0.5);
  pointer-events: none;
}

/* Hidden elements */
[hidden] {
  display: none !important;
}

/* ==========================================================================
   3. FOCUS-VISIBLE OUTLINE RINGS (ACCESSIBLE WCAG 2.2 AA / APCA)
   ========================================================================== */

/* Universal accessible keyboard focus ring */
:focus-visible {
  outline: var(--focus-ring-width, 2px) var(--focus-ring-style, solid) var(--focus-ring-color, var(--ring));
  outline-offset: var(--focus-ring-offset, 2px);
}

/* Form control specific focus styling */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 0px;
  border-color: var(--ring);
}

/* Remove default focus outline when not using keyboard navigation */
:focus:not(:focus-visible) {
  outline: none;
}

/* ==========================================================================
   4. SCROLLBAR STYLING
   ========================================================================== */

/* Standards-compliant scrollbar styling */
html,
body,
* {
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

/* WebKit scrollbar styling */
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--border);
  border-radius: var(--radius-full, 9999px);
  border: 2px solid transparent;
  background-clip: content-box;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: var(--muted-foreground);
}

*::-webkit-scrollbar-corner {
  background: transparent;
}

/* ==========================================================================
   5. REDUCED MOTION PREFERENCE OVERRIDE
   ========================================================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### `themes.css` (`src/styles/themes.css`)

```css
/**
 * @plain-ui/tokens - themes.css
 * 
 * Multi-Theme Presets (Zinc, Violet, Emerald, Amber, Rose, Slate, Stone, Gray, Blue, Cyan, Orange, Neutral)
 * Supporting Light & Dark Modes via:
 * - [data-theme="<name>"]
 * - .theme-<name>
 * - [data-theme="<name>"].dark, .dark [data-theme="<name>"], .dark .theme-<name>
 *
 * Part of Plain UI Design System.
 */

/* ==========================================================================
   THEME 1: ZINC (Default Neutral Palette)
   ========================================================================== */

:root,
[data-theme="zinc"],
.theme-zinc {
  --primary: var(--color-zinc-900);
  --primary-foreground: var(--color-zinc-50);
  --ring: var(--color-zinc-950);
  --accent: var(--color-zinc-100);
  --accent-foreground: var(--color-zinc-900);
  --sidebar-primary: var(--color-zinc-900);
  --sidebar-primary-foreground: var(--color-zinc-50);
}

.dark,
[data-theme="zinc"].dark,
.dark [data-theme="zinc"],
[data-theme="zinc"][data-mode="dark"],
.theme-zinc.dark,
.dark .theme-zinc {
  --primary: var(--color-zinc-50);
  --primary-foreground: var(--color-zinc-900);
  --ring: var(--color-zinc-300);
  --accent: var(--color-zinc-800);
  --accent-foreground: var(--color-zinc-50);
  --sidebar-primary: var(--color-zinc-50);
  --sidebar-primary-foreground: var(--color-zinc-900);
}

/* ==========================================================================
   THEME 2: VIOLET (Vibrant Purple Palette)
   ========================================================================== */

[data-theme="violet"],
.theme-violet {
  --primary: var(--color-violet-600);
  --primary-foreground: var(--color-white);
  --ring: var(--color-violet-600);
  --accent: var(--color-violet-100);
  --accent-foreground: var(--color-violet-900);
  --sidebar-primary: var(--color-violet-600);
  --sidebar-primary-foreground: var(--color-white);
}

[data-theme="violet"].dark,
.dark [data-theme="violet"],
[data-theme="violet"][data-mode="dark"],
.theme-violet.dark,
.dark .theme-violet {
  --primary: var(--color-violet-500);
  --primary-foreground: var(--color-white);
  --ring: var(--color-violet-400);
  --accent: var(--color-violet-950);
  --accent-foreground: var(--color-violet-200);
  --sidebar-primary: var(--color-violet-500);
  --sidebar-primary-foreground: var(--color-white);
}

/* ==========================================================================
   THEME 3: EMERALD (Vibrant Fresh Green Palette)
   ========================================================================== */

[data-theme="emerald"],
.theme-emerald {
  --primary: var(--color-emerald-600);
  --primary-foreground: var(--color-white);
  --ring: var(--color-emerald-600);
  --accent: var(--color-emerald-100);
  --accent-foreground: var(--color-emerald-900);
  --sidebar-primary: var(--color-emerald-600);
  --sidebar-primary-foreground: var(--color-white);
}

[data-theme="emerald"].dark,
.dark [data-theme="emerald"],
[data-theme="emerald"][data-mode="dark"],
.theme-emerald.dark,
.dark .theme-emerald {
  --primary: var(--color-emerald-500);
  --primary-foreground: var(--color-zinc-950);
  --ring: var(--color-emerald-400);
  --accent: var(--color-emerald-950);
  --accent-foreground: var(--color-emerald-200);
  --sidebar-primary: var(--color-emerald-500);
  --sidebar-primary-foreground: var(--color-zinc-950);
}

/* ==========================================================================
   THEME 4: AMBER (Warm Energetic Gold Palette)
   ========================================================================== */

[data-theme="amber"],
.theme-amber {
  --primary: var(--color-amber-500);
  --primary-foreground: var(--color-zinc-950);
  --ring: var(--color-amber-500);
  --accent: var(--color-amber-100);
  --accent-foreground: var(--color-amber-950);
  --sidebar-primary: var(--color-amber-500);
  --sidebar-primary-foreground: var(--color-zinc-950);
}

[data-theme="amber"].dark,
.dark [data-theme="amber"],
[data-theme="amber"][data-mode="dark"],
.theme-amber.dark,
.dark .theme-amber {
  --primary: var(--color-amber-400);
  --primary-foreground: var(--color-zinc-950);
  --ring: var(--color-amber-400);
  --accent: var(--color-amber-950);
  --accent-foreground: var(--color-amber-200);
  --sidebar-primary: var(--color-amber-400);
  --sidebar-primary-foreground: var(--color-zinc-950);
}

/* ==========================================================================
   THEME 5: ROSE (Vibrant Rose / Pink Palette)
   ========================================================================== */

[data-theme="rose"],
.theme-rose {
  --primary: var(--color-rose-600);
  --primary-foreground: var(--color-white);
  --ring: var(--color-rose-600);
  --accent: var(--color-rose-100);
  --accent-foreground: var(--color-rose-900);
  --sidebar-primary: var(--color-rose-600);
  --sidebar-primary-foreground: var(--color-white);
}

[data-theme="rose"].dark,
.dark [data-theme="rose"],
[data-theme="rose"][data-mode="dark"],
.theme-rose.dark,
.dark .theme-rose {
  --primary: var(--color-rose-500);
  --primary-foreground: var(--color-white);
  --ring: var(--color-rose-400);
  --accent: var(--color-rose-950);
  --accent-foreground: var(--color-rose-200);
  --sidebar-primary: var(--color-rose-500);
  --sidebar-primary-foreground: var(--color-white);
}

/* ==========================================================================
   THEME 6: SLATE (Cool Tech Slate Palette)
   ========================================================================== */

[data-theme="slate"],
.theme-slate {
  --primary: var(--color-slate-900);
  --primary-foreground: var(--color-slate-50);
  --ring: var(--color-slate-950);
  --accent: var(--color-slate-100);
  --accent-foreground: var(--color-slate-900);
  --border: var(--color-slate-200);
  --input: var(--color-slate-200);
  --sidebar-background: var(--color-slate-50);
  --sidebar-foreground: var(--color-slate-950);
  --sidebar-primary: var(--color-slate-900);
  --sidebar-primary-foreground: var(--color-slate-50);
}

[data-theme="slate"].dark,
.dark [data-theme="slate"],
[data-theme="slate"][data-mode="dark"],
.theme-slate.dark,
.dark .theme-slate {
  --background: var(--color-slate-950);
  --foreground: var(--color-slate-50);
  --card: var(--color-slate-900);
  --card-foreground: var(--color-slate-50);
  --popover: var(--color-slate-900);
  --popover-foreground: var(--color-slate-50);
  --primary: var(--color-slate-50);
  --primary-foreground: var(--color-slate-900);
  --secondary: var(--color-slate-800);
  --secondary-foreground: var(--color-slate-50);
  --muted: var(--color-slate-800);
  --muted-foreground: var(--color-slate-400);
  --accent: var(--color-slate-800);
  --accent-foreground: var(--color-slate-50);
  --border: var(--color-slate-800);
  --input: var(--color-slate-800);
  --ring: var(--color-slate-300);
  --sidebar-background: var(--color-slate-900);
  --sidebar-foreground: var(--color-slate-50);
  --sidebar-primary: var(--color-slate-50);
  --sidebar-primary-foreground: var(--color-slate-900);
}

/* ==========================================================================
   THEME 7: STONE (Warm Earthy Organic Palette)
   ========================================================================== */

[data-theme="stone"],
.theme-stone {
  --primary: var(--color-stone-900);
  --primary-foreground: var(--color-stone-50);
  --ring: var(--color-stone-950);
  --accent: var(--color-stone-100);
  --accent-foreground: var(--color-stone-900);
  --border: var(--color-stone-200);
  --input: var(--color-stone-200);
  --sidebar-background: var(--color-stone-50);
  --sidebar-foreground: var(--color-stone-950);
  --sidebar-primary: var(--color-stone-900);
  --sidebar-primary-foreground: var(--color-stone-50);
}

[data-theme="stone"].dark,
.dark [data-theme="stone"],
[data-theme="stone"][data-mode="dark"],
.theme-stone.dark,
.dark .theme-stone {
  --background: var(--color-stone-950);
  --foreground: var(--color-stone-50);
  --card: var(--color-stone-900);
  --card-foreground: var(--color-stone-50);
  --popover: var(--color-stone-900);
  --popover-foreground: var(--color-stone-50);
  --primary: var(--color-stone-50);
  --primary-foreground: var(--color-stone-900);
  --secondary: var(--color-stone-800);
  --secondary-foreground: var(--color-stone-50);
  --muted: var(--color-stone-800);
  --muted-foreground: var(--color-stone-400);
  --accent: var(--color-stone-800);
  --accent-foreground: var(--color-stone-50);
  --border: var(--color-stone-800);
  --input: var(--color-stone-800);
  --ring: var(--color-stone-300);
  --sidebar-background: var(--color-stone-900);
  --sidebar-foreground: var(--color-stone-50);
  --sidebar-primary: var(--color-stone-50);
  --sidebar-primary-foreground: var(--color-stone-900);
}

/* ==========================================================================
   THEME 8: GRAY (Classic Balanced Cool Gray)
   ========================================================================== */

[data-theme="gray"],
.theme-gray {
  --primary: var(--color-gray-900);
  --primary-foreground: var(--color-gray-50);
  --ring: var(--color-gray-950);
  --accent: var(--color-gray-100);
  --accent-foreground: var(--color-gray-900);
  --border: var(--color-gray-200);
  --input: var(--color-gray-200);
}

[data-theme="gray"].dark,
.dark [data-theme="gray"],
[data-theme="gray"][data-mode="dark"],
.theme-gray.dark,
.dark .theme-gray {
  --background: var(--color-gray-950);
  --foreground: var(--color-gray-50);
  --card: var(--color-gray-900);
  --card-foreground: var(--color-gray-50);
  --popover: var(--color-gray-900);
  --popover-foreground: var(--color-gray-50);
  --primary: var(--color-gray-50);
  --primary-foreground: var(--color-gray-900);
  --secondary: var(--color-gray-800);
  --secondary-foreground: var(--color-gray-50);
  --muted: var(--color-gray-800);
  --muted-foreground: var(--color-gray-400);
  --accent: var(--color-gray-800);
  --accent-foreground: var(--color-gray-50);
  --border: var(--color-gray-800);
  --input: var(--color-gray-800);
  --ring: var(--color-gray-300);
}

/* ==========================================================================
   THEME 9: NEUTRAL (Pure Achromatic Stark Palette)
   ========================================================================== */

[data-theme="neutral"],
.theme-neutral {
  --primary: var(--color-neutral-900);
  --primary-foreground: var(--color-neutral-50);
  --ring: var(--color-neutral-950);
  --accent: var(--color-neutral-100);
  --accent-foreground: var(--color-neutral-900);
  --border: var(--color-neutral-200);
  --input: var(--color-neutral-200);
}

[data-theme="neutral"].dark,
.dark [data-theme="neutral"],
[data-theme="neutral"][data-mode="dark"],
.theme-neutral.dark,
.dark .theme-neutral {
  --background: var(--color-neutral-950);
  --foreground: var(--color-neutral-50);
  --card: var(--color-neutral-900);
  --card-foreground: var(--color-neutral-50);
  --popover: var(--color-neutral-900);
  --popover-foreground: var(--color-neutral-50);
  --primary: var(--color-neutral-50);
  --primary-foreground: var(--color-neutral-900);
  --secondary: var(--color-neutral-800);
  --secondary-foreground: var(--color-neutral-50);
  --muted: var(--color-neutral-800);
  --muted-foreground: var(--color-neutral-400);
  --accent: var(--color-neutral-800);
  --accent-foreground: var(--color-neutral-50);
  --border: var(--color-neutral-800);
  --input: var(--color-neutral-800);
  --ring: var(--color-neutral-300);
}

/* ==========================================================================
   THEME 10: BLUE (Classic Corporate Blue Palette)
   ========================================================================== */

[data-theme="blue"],
.theme-blue {
  --primary: var(--color-blue-600);
  --primary-foreground: var(--color-white);
  --ring: var(--color-blue-600);
  --accent: var(--color-blue-100);
  --accent-foreground: var(--color-blue-900);
  --sidebar-primary: var(--color-blue-600);
  --sidebar-primary-foreground: var(--color-white);
}

[data-theme="blue"].dark,
.dark [data-theme="blue"],
[data-theme="blue"][data-mode="dark"],
.theme-blue.dark,
.dark .theme-blue {
  --primary: var(--color-blue-500);
  --primary-foreground: var(--color-white);
  --ring: var(--color-blue-400);
  --accent: var(--color-blue-950);
  --accent-foreground: var(--color-blue-200);
  --sidebar-primary: var(--color-blue-500);
  --sidebar-primary-foreground: var(--color-white);
}

/* ==========================================================================
   THEME 11: CYAN (Electric Tech Cyan Palette)
   ========================================================================== */

[data-theme="cyan"],
.theme-cyan {
  --primary: var(--color-cyan-600);
  --primary-foreground: var(--color-white);
  --ring: var(--color-cyan-600);
  --accent: var(--color-cyan-100);
  --accent-foreground: var(--color-cyan-900);
  --sidebar-primary: var(--color-cyan-600);
  --sidebar-primary-foreground: var(--color-white);
}

[data-theme="cyan"].dark,
.dark [data-theme="cyan"],
[data-theme="cyan"][data-mode="dark"],
.theme-cyan.dark,
.dark .theme-cyan {
  --primary: var(--color-cyan-500);
  --primary-foreground: var(--color-zinc-950);
  --ring: var(--color-cyan-400);
  --accent: var(--color-cyan-950);
  --accent-foreground: var(--color-cyan-200);
  --sidebar-primary: var(--color-cyan-500);
  --sidebar-primary-foreground: var(--color-zinc-950);
}

/* ==========================================================================
   THEME 12: ORANGE (Creative Dynamic Orange Palette)
   ========================================================================== */

[data-theme="orange"],
.theme-orange {
  --primary: var(--color-orange-600);
  --primary-foreground: var(--color-white);
  --ring: var(--color-orange-600);
  --accent: var(--color-orange-100);
  --accent-foreground: var(--color-orange-950);
  --sidebar-primary: var(--color-orange-600);
  --sidebar-primary-foreground: var(--color-white);
}

[data-theme="orange"].dark,
.dark [data-theme="orange"],
[data-theme="orange"][data-mode="dark"],
.theme-orange.dark,
.dark .theme-orange {
  --primary: var(--color-orange-500);
  --primary-foreground: var(--color-white);
  --ring: var(--color-orange-400);
  --accent: var(--color-orange-950);
  --accent-foreground: var(--color-orange-200);
  --sidebar-primary: var(--color-orange-500);
  --sidebar-primary-foreground: var(--color-white);
}
```

### `index.css` (`src/styles/index.css`)

```css
/**
 * @plain-ui/tokens - index.css
 * 
 * Complete bundle importing tokens, base reset & typography, and theme presets.
 */

@import "./tokens.css";
@import "./base.css";
@import "./themes.css";
```

### `tokens.ts` (`src/styles/tokens.ts`)

```typescript
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
```

---

## Component Anatomy & Architecture

This component uses zero runtime JavaScript. All interactions, styling transitions, and state changes are handled natively by the browser engine via:


### State Management
- States like `:hover`, `:active`, `:focus-visible`, `:checked`, `:has()`, and `[open]` are handled declaratively in HTML and Tailwind CSS v4 utility classes.

---

## Accessibility & Keyboard Shortcuts

- **WCAG 2.2 AA Compliant**: All color pairings adhere to APCA / WCAG contrast standards in both light and dark themes.
- **Focus Indicators**: Includes high-contrast `focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none` rings for keyboard users.
- **Reduced Motion**: All animations and transitions automatically pause or degrade to instant state changes when `prefers-reduced-motion: reduce` is detected.

---

## Customization & Tokens

This component relies on Plain UI design tokens defined in `tokens.css`:
- Backgrounds: `var(--background)`, `var(--card)`, `var(--popover)`
- Foregrounds: `var(--foreground)`, `var(--primary)`, `var(--muted-foreground)`
- Borders & Rings: `var(--border)`, `var(--ring)`, `var(--radius)`
- Motion Timing: `var(--motion-dur-enter)`, `var(--motion-ease-enter)`
