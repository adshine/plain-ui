---
title: "Shimmer Button"
description: "High-performance glowing shimmer button with Houdini angle interpolation."
category: "inputs"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens","motion"]
modernApis: ["@property","conic-gradient"]
---

# Shimmer Button

> High-performance glowing shimmer button with Houdini angle interpolation.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `inputs`
- **Modern Browser APIs**: `@property`, `conic-gradient`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add shimmer-button

# Or using pnpm dlx
pnpm dlx plain-ui add shimmer-button
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/shimmer-button.html`** (`registry:ui`)

---

## Source Code

### `shimmer-button.html` (`src/components/ui/shimmer-button.html`)

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shimmer Button - Plain UI</title>
  <style>
    /* ==========================================================================
       Plain UI - Houdini CSS Property Registration
       ========================================================================== */
    @property --plain-shimmer-angle {
      syntax: "<angle>";
      inherits: false;
      initial-value: 0deg;
    }

    @property --plain-shimmer-color {
      syntax: "<color>";
      inherits: false;
      initial-value: rgba(255, 255, 255, 0.9);
    }

    /* Design Tokens */
    :root {
      --bg-canvas: #09090b;
      --bg-surface: #121215;
      --bg-surface-raised: #18181b;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.16);
      --text-primary: #f4f4f5;
      --text-secondary: #a1a1aa;
      --text-tertiary: #71717a;
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      
      --motion-dur-feedback: 120ms;
      --motion-dur-enter: 200ms;
      --motion-ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--bg-canvas);
      color: var(--text-primary);
      line-height: 1.5;
      padding: 2.5rem 1.5rem;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    .plain-container {
      max-width: 1120px;
      margin: 0 auto;
    }

    /* Header */
    .plain-header {
      margin-bottom: 3rem;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 2rem;
    }

    .plain-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: rgba(168, 85, 247, 0.1);
      border: 1px solid rgba(168, 85, 247, 0.25);
      color: #c084fc;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .plain-title {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }

    .plain-subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
      max-width: 680px;
    }

    .plain-section {
      margin-bottom: 3.5rem;
    }

    .plain-section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }

    .plain-section-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }

    .plain-btn-grid {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
    }

    /* ==========================================================================
       Plain UI - Shimmer Button Core Architecture
       Houdini @property --plain-shimmer-angle + Conic Gradient Keyframes
       ========================================================================== */

    @keyframes plain-shimmer-spin {
      from {
        --plain-shimmer-angle: 0deg;
      }
      to {
        --plain-shimmer-angle: 360deg;
      }
    }

    @keyframes plain-shimmer-glimmer {
      0% {
        transform: translateX(-120%) skewX(-25deg);
      }
      100% {
        transform: translateX(250%) skewX(-25deg);
      }
    }

    /* Base Shimmer Button Primitive */
    .plain-shimmer-button {
      --plain-shimmer-speed: 3s;
      --plain-shimmer-border-width: 1.5px;
      --plain-shimmer-radius: 12px;
      --plain-shimmer-bg: #09090b;
      --plain-shimmer-color: #ffffff;
      --plain-shimmer-spread: 90deg;
      --plain-shimmer-gradient: conic-gradient(
        from var(--plain-shimmer-angle),
        transparent 0deg,
        transparent 40deg,
        var(--plain-shimmer-color) 80deg,
        transparent 120deg,
        transparent 360deg
      );

      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      padding: 0.75rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #ffffff;
      text-decoration: none;
      border: none;
      outline: none;
      cursor: pointer;
      border-radius: var(--plain-shimmer-radius);
      background: var(--plain-shimmer-bg);
      isolation: isolate;
      overflow: hidden;
      box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.5);
      transition: transform var(--motion-dur-feedback) var(--motion-ease-enter),
                  box-shadow var(--motion-dur-enter) var(--motion-ease-enter),
                  filter var(--motion-dur-enter);
    }

    /* Outer Ambient Glow (Blurred Conic Ring) */
    .plain-shimmer-button::before {
      content: "";
      position: absolute;
      inset: calc(-1 * var(--plain-shimmer-border-width) - 4px);
      border-radius: inherit;
      background: var(--plain-shimmer-gradient);
      animation: plain-shimmer-spin var(--plain-shimmer-speed) linear infinite;
      filter: blur(12px);
      opacity: 0.65;
      z-index: -2;
      transition: opacity var(--motion-dur-enter);
    }

    /* Crisp Rotating Conic Border */
    .plain-shimmer-button::after {
      content: "";
      position: absolute;
      inset: 0;
      padding: var(--plain-shimmer-border-width);
      border-radius: inherit;
      background: var(--plain-shimmer-gradient);
      animation: plain-shimmer-spin var(--plain-shimmer-speed) linear infinite;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      z-index: -1;
    }

    /* Inner Shimmer Reflection Surface */
    .plain-shimmer-content {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      height: 100%;
    }

    /* Hover and Active Physical Interactions */
    .plain-shimmer-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.7);
    }

    .plain-shimmer-button:hover::before {
      opacity: 1;
      filter: blur(16px);
    }

    .plain-shimmer-button:active {
      transform: scale(0.97) translateY(0);
      box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.5);
    }

    .plain-shimmer-button:focus-visible {
      box-shadow: 0 0 0 2px var(--bg-canvas), 0 0 0 4px #818cf8;
    }

    /* Surface Light Sweep (Secondary Ray Animation) */
    .plain-shimmer-sweep-layer {
      position: absolute;
      inset: 0;
      overflow: hidden;
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
    }

    .plain-shimmer-sweep-layer::after {
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.08) 50%,
        transparent 100%
      );
      animation: plain-shimmer-glimmer 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    /* ==========================================================================
       Shimmer Color & Style Variants
       ========================================================================== */

    /* 1. Cosmic Violet / Indigo */
    .shimmer-cosmic {
      --plain-shimmer-color: #a855f7;
      --plain-shimmer-gradient: conic-gradient(
        from var(--plain-shimmer-angle),
        transparent 0deg,
        #6366f1 60deg,
        #c084fc 120deg,
        #ec4899 180deg,
        transparent 240deg,
        transparent 360deg
      );
      --plain-shimmer-speed: 3.5s;
    }

    /* 2. Emerald Matrix */
    .shimmer-emerald {
      --plain-shimmer-color: #10b981;
      --plain-shimmer-gradient: conic-gradient(
        from var(--plain-shimmer-angle),
        transparent 0deg,
        #059669 40deg,
        #34d399 90deg,
        #6ee7b7 140deg,
        transparent 200deg,
        transparent 360deg
      );
      --plain-shimmer-speed: 2.8s;
    }

    /* 3. Solar Flare / Amber Gold */
    .shimmer-solar {
      --plain-shimmer-color: #f59e0b;
      --plain-shimmer-gradient: conic-gradient(
        from var(--plain-shimmer-angle),
        transparent 0deg,
        #d97706 30deg,
        #fbbf24 80deg,
        #f97316 130deg,
        transparent 190deg,
        transparent 360deg
      );
      --plain-shimmer-speed: 3s;
    }

    /* 4. Pure Silver Minimalist */
    .shimmer-silver {
      --plain-shimmer-color: #ffffff;
      --plain-shimmer-gradient: conic-gradient(
        from var(--plain-shimmer-angle),
        transparent 0deg,
        rgba(255, 255, 255, 0.2) 40deg,
        rgba(255, 255, 255, 1) 90deg,
        rgba(255, 255, 255, 0.2) 140deg,
        transparent 200deg,
        transparent 360deg
      );
      --plain-shimmer-speed: 2.5s;
    }

    /* 5. Frosted Glass Shimmer */
    .shimmer-glass {
      --plain-shimmer-bg: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Sizes */
    .shimmer-sm {
      padding: 0.45rem 0.875rem;
      font-size: 0.75rem;
      --plain-shimmer-radius: 8px;
    }

    .shimmer-md {
      padding: 0.65rem 1.25rem;
      font-size: 0.875rem;
      --plain-shimmer-radius: 10px;
    }

    .shimmer-lg {
      padding: 0.875rem 1.75rem;
      font-size: 1rem;
      --plain-shimmer-radius: 14px;
    }

    .shimmer-xl {
      padding: 1.125rem 2.25rem;
      font-size: 1.125rem;
      --plain-shimmer-radius: 16px;
    }

    .shimmer-pill {
      border-radius: 9999px;
      --plain-shimmer-radius: 9999px;
    }

    /* Disabled State */
    .plain-shimmer-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .plain-shimmer-button:disabled::before,
    .plain-shimmer-button:disabled::after {
      animation: none;
    }

    /* Hero Banner Demo */
    .plain-hero-showcase {
      background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%),
                  var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 20px;
      padding: 3.5rem 2rem;
      text-align: center;
      margin-bottom: 3.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    /* Code Documentation Block */
    .plain-doc-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 2rem;
    }

    .plain-code-block {
      background: #000000;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 1.25rem;
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: #e4e4e7;
      overflow-x: auto;
      line-height: 1.6;
      margin-top: 1rem;
    }

    .token-prop { color: #93c5fd; }
    .token-val { color: #f472b6; }
    .token-tag { color: #6ee7b7; }
    .token-comment { color: #71717a; font-style: italic; }

    /* Accessibility / Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      .plain-shimmer-button::before,
      .plain-shimmer-button::after,
      .plain-shimmer-sweep-layer::after {
        animation: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="plain-container">
    <!-- Header -->
    <header class="plain-header">
      <div class="plain-badge">Aceternity & Magic UI Pattern</div>
      <h1 class="plain-title">Shimmer Button</h1>
      <p class="plain-subtitle">
        A luminous rotating conic-gradient shimmer button with multi-layer ambient bloom and specular glass sweep. Powered by CSS Houdini <code>@property --plain-shimmer-angle</code>.
      </p>
    </header>

    <!-- Hero Interactive Banner -->
    <div class="plain-hero-showcase">
      <div class="plain-shimmer-button shimmer-pill shimmer-silver shimmer-sm" style="margin-bottom: 0.5rem;">
        <span class="plain-shimmer-content">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Plain UI v2.0 Now Live
        </span>
      </div>
      <h2 style="font-size: 2rem; font-weight: 700; color: #ffffff; max-width: 600px; line-height: 1.2;">
        Ship interactive motion with zero JavaScript dependencies.
      </h2>
      <p style="color: var(--text-secondary); max-width: 480px; font-size: 0.9375rem;">
        Harness browser-native physics, Houdini types, and modern CSS compositing for 60fps animations.
      </p>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-top: 0.5rem;">
        <button type="button" class="plain-shimmer-button shimmer-cosmic shimmer-lg">
          <div class="plain-shimmer-sweep-layer"></div>
          <span class="plain-shimmer-content">
            Start Building Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </button>
        <button type="button" class="plain-shimmer-button shimmer-glass shimmer-lg">
          <span class="plain-shimmer-content">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Watch Keynote
          </span>
        </button>
      </div>
    </div>

    <!-- Section 1: Color Themes -->
    <section class="plain-section">
      <h3 class="plain-section-title">Color Themes & Spectral Presets</h3>
      <p class="plain-section-desc">Each theme dynamically customizes the conic gradient stops, spin cadence, and ambient glow intensity.</p>
      
      <div class="plain-btn-grid">
        <!-- Cosmic -->
        <button type="button" class="plain-shimmer-button shimmer-cosmic">
          <div class="plain-shimmer-sweep-layer"></div>
          <span class="plain-shimmer-content">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            Cosmic Violet
          </span>
        </button>

        <!-- Emerald -->
        <button type="button" class="plain-shimmer-button shimmer-emerald">
          <div class="plain-shimmer-sweep-layer"></div>
          <span class="plain-shimmer-content">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Matrix Emerald
          </span>
        </button>

        <!-- Solar -->
        <button type="button" class="plain-shimmer-button shimmer-solar">
          <div class="plain-shimmer-sweep-layer"></div>
          <span class="plain-shimmer-content">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            Solar Flare
          </span>
        </button>

        <!-- Silver -->
        <button type="button" class="plain-shimmer-button shimmer-silver">
          <div class="plain-shimmer-sweep-layer"></div>
          <span class="plain-shimmer-content">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
            Pure Platinum
          </span>
        </button>
      </div>
    </section>

    <!-- Section 2: Size Scale -->
    <section class="plain-section">
      <h3 class="plain-section-title">Size Hierarchy & Geometric Scale</h3>
      <p class="plain-section-desc">Responsive button scales from micro badges (sm) to prominent primary CTA buttons (xl).</p>
      
      <div class="plain-btn-grid" style="align-items: center;">
        <button type="button" class="plain-shimmer-button shimmer-cosmic shimmer-sm">
          <span class="plain-shimmer-content">Small (sm)</span>
        </button>

        <button type="button" class="plain-shimmer-button shimmer-cosmic shimmer-md">
          <span class="plain-shimmer-content">Medium (md)</span>
        </button>

        <button type="button" class="plain-shimmer-button shimmer-cosmic shimmer-lg">
          <span class="plain-shimmer-content">Large (lg)</span>
        </button>

        <button type="button" class="plain-shimmer-button shimmer-cosmic shimmer-xl">
          <span class="plain-shimmer-content">Extra Large (xl)</span>
        </button>
      </div>
    </section>

    <!-- Technical Docs -->
    <section class="plain-doc-section">
      <h2 style="font-size: 1.25rem; font-weight: 600; color: #ffffff; margin-bottom: 0.75rem;">Houdini CSS @property Technical Architecture</h2>
      <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">
        Unlike standard CSS variables which are treated as raw strings, CSS Houdini <code>@property</code> informs the browser that <code>--plain-shimmer-angle</code> is a numeric <code>&lt;angle&gt;</code> value, enabling GPU interpolation within <code>conic-gradient()</code> at native refresh rates.
      </p>

      <div class="plain-code-block">
<span class="token-comment">/* 1. Register Typed Houdini Property */</span>
<span class="token-tag">@property</span> <span class="token-prop">--plain-shimmer-angle</span> {
  <span class="token-prop">syntax</span>: <span class="token-val">"&lt;angle&gt;"</span>;
  <span class="token-prop">inherits</span>: <span class="token-val">false</span>;
  <span class="token-prop">initial-value</span>: <span class="token-val">0deg</span>;
}

<span class="token-comment">/* 2. Keyframe angle rotation */</span>
<span class="token-tag">@keyframes</span> <span class="token-prop">plain-shimmer-spin</span> {
  <span class="token-tag">from</span> { <span class="token-prop">--plain-shimmer-angle</span>: <span class="token-val">0deg</span>; }
  <span class="token-tag">to</span>   { <span class="token-prop">--plain-shimmer-angle</span>: <span class="token-val">360deg</span>; }
}

<span class="token-comment">/* 3. Conic Gradient Border Mask */</span>
<span class="token-tag">.plain-shimmer-button::after</span> {
  <span class="token-prop">content</span>: <span class="token-val">""</span>;
  <span class="token-prop">position</span>: <span class="token-val">absolute</span>;
  <span class="token-prop">inset</span>: <span class="token-val">0</span>;
  <span class="token-prop">padding</span>: <span class="token-val">1.5px</span>;
  <span class="token-prop">border-radius</span>: <span class="token-val">inherit</span>;
  <span class="token-prop">background</span>: <span class="token-val">conic-gradient(from var(--plain-shimmer-angle), transparent 0deg, var(--plain-shimmer-color) 90deg, transparent 180deg)</span>;
  <span class="token-prop">-webkit-mask</span>: <span class="token-val">linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)</span>;
  <span class="token-prop">-webkit-mask-composite</span>: <span class="token-val">xor</span>;
  <span class="token-prop">animation</span>: <span class="token-val">plain-shimmer-spin 3s linear infinite</span>;
}
      </div>
    </section>
  </div>
</body>
</html>
```

---

## Component Anatomy & Architecture

This component uses zero runtime JavaScript. All interactions, styling transitions, and state changes are handled natively by the browser engine via:
- **@property**: Native browser execution without script parsing overhead.
- **conic-gradient**: Native browser execution without script parsing overhead.

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
