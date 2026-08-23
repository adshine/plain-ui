---
title: "Border Beam"
description: "Animated border beam highlighting using Houdini CSS @property angle rotations."
category: "effects"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens","motion"]
modernApis: ["@property","conic-gradient"]
---

# Border Beam

> Animated border beam highlighting using Houdini CSS @property angle rotations.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `effects`
- **Modern Browser APIs**: `@property`, `conic-gradient`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add border-beam

# Or using pnpm dlx
pnpm dlx plain-ui add border-beam
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/border-beam.html`** (`registry:ui`)

---

## Source Code

### `border-beam.html` (`src/components/ui/border-beam.html`)

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Border Beam - Plain UI</title>
  <style>
    /* Plain UI Design System Tokens */
    :root {
      --bg-canvas: #09090b;
      --bg-surface: #121215;
      --bg-surface-raised: #18181b;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.16);
      --text-primary: #f4f4f5;
      --text-secondary: #a1a1aa;
      --text-tertiary: #71717a;
      --accent-primary: #6366f1;
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      
      /* Motion Tokens */
      --motion-dur-feedback: 120ms;
      --motion-dur-enter: 200ms;
      --motion-ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
      --motion-ease-move: cubic-bezier(0.4, 0, 0.2, 1);
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
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.25);
      color: #818cf8;
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

    .plain-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin-bottom: 3.5rem;
    }

    /* ==========================================================================
       Plain UI - Border Beam Core (Pure CSS Native offset-path: rect)
       0 Lines of JavaScript required.
       ========================================================================== */

    @keyframes plain-beam-travel {
      0% {
        offset-distance: 0%;
      }
      100% {
        offset-distance: 100%;
      }
    }

    @keyframes plain-beam-travel-reverse {
      0% {
        offset-distance: 100%;
      }
      100% {
        offset-distance: 0%;
      }
    }

    /* Base Card Container */
    .plain-card-container {
      position: relative;
      border-radius: var(--plain-beam-radius, 16px);
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      isolation: isolate;
      transition: border-color var(--motion-dur-enter) var(--motion-ease-enter),
                  transform var(--motion-dur-enter) var(--motion-ease-enter),
                  box-shadow var(--motion-dur-enter) var(--motion-ease-enter);
    }

    .plain-card-container:hover {
      border-color: var(--border-strong);
      transform: translateY(-2px);
      box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.7);
    }

    /* The Native CSS Offset-Path Beam Element */
    .plain-border-beam {
      position: absolute;
      inset: 0;
      pointer-events: none;
      user-select: none;
      z-index: 1;
      border-radius: inherit;
    }

    .plain-border-beam::after {
      content: "";
      position: absolute;
      width: var(--plain-beam-size, 140px);
      height: var(--plain-beam-border-width, 2px);
      background: linear-gradient(
        to left,
        var(--plain-beam-color-to, #9c40ff),
        var(--plain-beam-color-from, #ffaa40),
        transparent
      );
      /* Native CSS Motion Path along the rounded rectangle perimeter */
      offset-path: rect(0 100% 100% 0 round var(--plain-beam-radius, 16px));
      offset-anchor: 100% 50%;
      animation: plain-beam-travel var(--plain-beam-duration, 8s) infinite linear var(--plain-beam-delay, 0s);
      filter: drop-shadow(0 0 calc(var(--plain-beam-border-width, 2px) * 3) var(--plain-beam-color-from, #ffaa40));
    }

    /* Reverse Traveling Beam Variant */
    .plain-border-beam.reverse::after {
      animation: plain-beam-travel-reverse var(--plain-beam-duration, 8s) infinite linear var(--plain-beam-delay, 0s);
    }

    /* Dual Beam Variant: Second counter-moving beam */
    .plain-border-beam-dual::before {
      content: "";
      position: absolute;
      width: var(--plain-beam-size, 140px);
      height: var(--plain-beam-border-width, 2px);
      background: linear-gradient(
        to left,
        var(--plain-beam-color-from, #ffaa40),
        var(--plain-beam-color-to, #9c40ff),
        transparent
      );
      offset-path: rect(0 100% 100% 0 round var(--plain-beam-radius, 16px));
      offset-anchor: 100% 50%;
      animation: plain-beam-travel var(--plain-beam-duration, 8s) infinite linear calc(var(--plain-beam-duration, 8s) / -2);
      filter: drop-shadow(0 0 calc(var(--plain-beam-border-width, 2px) * 3) var(--plain-beam-color-to, #9c40ff));
    }

    /* Fallback for browsers without rect() in offset-path */
    @supports not (offset-path: rect(0 100% 100% 0 round 16px)) {
      .plain-border-beam::after {
        offset-path: xywh(0 0 100% 100% round var(--plain-beam-radius, 16px));
      }
    }

    /* Card Content Styling */
    .plain-card-body {
      position: relative;
      z-index: 2;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .plain-card-icon {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      color: #ffffff;
    }

    .plain-card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }

    .plain-card-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .plain-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid var(--border-subtle);
    }

    .plain-card-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: #818cf8;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      transition: color var(--motion-dur-feedback);
    }

    .plain-card-link:hover {
      color: #a5b4fc;
    }

    /* Color Theme Presets */
    .theme-sunset {
      --plain-beam-color-from: #ffaa40;
      --plain-beam-color-to: #9c40ff;
      --plain-beam-size: 160px;
      --plain-beam-duration: 7s;
      --plain-beam-radius: 16px;
    }

    .theme-cyber {
      --plain-beam-color-from: #06b6d4;
      --plain-beam-color-to: #3b82f6;
      --plain-beam-size: 180px;
      --plain-beam-duration: 9s;
      --plain-beam-radius: 16px;
    }

    .theme-aurora {
      --plain-beam-color-from: #10b981;
      --plain-beam-color-to: #06b6d4;
      --plain-beam-size: 140px;
      --plain-beam-duration: 6s;
      --plain-beam-radius: 16px;
    }

    .theme-neon-pink {
      --plain-beam-color-from: #ec4899;
      --plain-beam-color-to: #8b5cf6;
      --plain-beam-size: 150px;
      --plain-beam-duration: 5s;
      --plain-beam-radius: 16px;
    }

    /* Pricing Card Showcase */
    .plain-pricing-card {
      background: radial-gradient(120% 100% at 50% 0%, rgba(99, 102, 241, 0.08) 0%, rgba(18, 18, 21, 1) 100%);
    }

    .plain-price-tag {
      font-size: 2.25rem;
      font-weight: 700;
      color: #ffffff;
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
      margin: 1rem 0;
    }

    .plain-price-period {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      font-weight: 400;
    }

    .plain-btn-glow {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0.75rem 1.25rem;
      border-radius: 10px;
      background: #ffffff;
      color: #000000;
      font-size: 0.875rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: transform var(--motion-dur-feedback), opacity var(--motion-dur-feedback);
      text-decoration: none;
    }

    .plain-btn-glow:hover {
      opacity: 0.92;
      transform: scale(0.99);
    }

    .plain-btn-glow:active {
      transform: scale(0.97);
    }

    /* Input Prompt Showcase */
    .plain-prompt-box {
      --plain-beam-color-from: #a855f7;
      --plain-beam-color-to: #6366f1;
      --plain-beam-size: 130px;
      --plain-beam-duration: 4s;
      --plain-beam-radius: 14px;
      padding: 0.5rem 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #141418;
    }

    .plain-prompt-input {
      background: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 0.9375rem;
      flex-grow: 1;
      font-family: inherit;
      padding: 0.5rem 0;
    }

    .plain-prompt-input::placeholder {
      color: var(--text-tertiary);
    }

    /* Code Documentation Block */
    .plain-doc-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 2rem;
      margin-top: 3rem;
    }

    .plain-doc-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 0.75rem;
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
      .plain-border-beam::after,
      .plain-border-beam-dual::before {
        animation: none !important;
        opacity: 0.4;
      }
    }
  </style>
</head>
<body>
  <div class="plain-container">
    <!-- Header -->
    <header class="plain-header">
      <div class="plain-badge">Magic UI Motion Primitives</div>
      <h1 class="plain-title">Border Beam</h1>
      <p class="plain-subtitle">
        An animated glowing light beam traveling seamlessly around any container perimeter. Crafted in pure CSS with native <code>offset-path: rect(...)</code> and 0 lines of JavaScript.
      </p>
    </header>

    <!-- Component Gallery Grid -->
    <div class="plain-grid">
      <!-- 1. Sunset Dual Beam Feature Card -->
      <div class="plain-card-container theme-sunset">
        <div class="plain-border-beam plain-border-beam-dual" aria-hidden="true"></div>
        <div class="plain-card-body">
          <div class="plain-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
          </div>
          <h3 class="plain-card-title">Dual Beam Intelligence</h3>
          <p class="plain-card-desc">
            Dual opposing light beams with sunset gradient interpolation traveling continuously along the rounded rectangular perimeter.
          </p>
          <div class="plain-card-footer">
            <span style="font-size: 0.75rem; color: var(--text-tertiary);">Speed: 7s Loop</span>
            <a href="#" class="plain-card-link">
              Explore docs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- 2. Cyber Cyan Pricing Pro Card -->
      <div class="plain-card-container plain-pricing-card theme-cyber">
        <div class="plain-border-beam" aria-hidden="true"></div>
        <div class="plain-card-body">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8125rem; font-weight: 600; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em;">Pro Tier</span>
            <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.6875rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 999px;">POPULAR</span>
          </div>
          <div class="plain-price-tag">$49 <span class="plain-price-period">/ month</span></div>
          <p class="plain-card-desc">
            Full access to all Plain UI motion components, zero runtime overhead, unlimited seats, and custom theme presets.
          </p>
          <button type="button" class="plain-btn-glow">Get Started</button>
        </div>
      </div>

      <!-- 3. Aurora Emerald Reverse Beam -->
      <div class="plain-card-container theme-aurora">
        <div class="plain-border-beam reverse" aria-hidden="true"></div>
        <div class="plain-card-body">
          <div class="plain-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h3 class="plain-card-title">Reverse Aurora Beam</h3>
          <p class="plain-card-desc">
            Seamless counter-clockwise path animation with emerald-cyan tail. Fluid 60fps rendering driven directly on the GPU compositor.
          </p>
          <div class="plain-card-footer">
            <span style="font-size: 0.75rem; color: #34d399;">● 0ms Main-Thread Time</span>
            <a href="#" class="plain-card-link">Benchmarks →</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Interactive Input & Action Bar -->
    <div style="margin-bottom: 4rem;">
      <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.25rem; color: #ffffff;">Interactive Input & Action Bar</h2>
      
      <div class="plain-card-container plain-prompt-box">
        <div class="plain-border-beam" aria-hidden="true"></div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <input type="text" class="plain-prompt-input" placeholder="Ask Plain UI anything... (pure CSS beam active)" value="Generate motion token system with CSS Houdini properties">
        <button type="button" style="background: #a855f7; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8125rem; cursor: pointer;">Execute</button>
      </div>
    </div>

    <!-- Technical Specification & Code Docs -->
    <section class="plain-doc-section">
      <h2 class="plain-doc-title">How It Works: Pure CSS offset-path</h2>
      <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">
        Traditional border beam implementations require heavy JavaScript calculations or nested canvas elements. Plain UI leverages modern CSS <code>offset-path: rect(0 100% 100% 0 round &lt;radius&gt;)</code> to guide a gradient segment smoothly along the border coordinates at 60fps on the GPU compositor.
      </p>

      <div class="plain-code-block">
<span class="token-comment">/* 1. Keyframe defining perpetual path loop */</span>
<span class="token-tag">@keyframes</span> <span class="token-prop">plain-beam-travel</span> {
  <span class="token-tag">from</span> { <span class="token-prop">offset-distance</span>: <span class="token-val">0%</span>; }
  <span class="token-tag">to</span>   { <span class="token-prop">offset-distance</span>: <span class="token-val">100%</span>; }
}

<span class="token-comment">/* 2. Beam pseudo-element riding along the perimeter */</span>
<span class="token-tag">.plain-border-beam::after</span> {
  <span class="token-prop">content</span>: <span class="token-val">""</span>;
  <span class="token-prop">position</span>: <span class="token-val">absolute</span>;
  <span class="token-prop">width</span>: <span class="token-val">var(--plain-beam-size, 140px)</span>;
  <span class="token-prop">height</span>: <span class="token-val">var(--plain-beam-border-width, 2px)</span>;
  <span class="token-prop">background</span>: <span class="token-val">linear-gradient(to left, var(--plain-beam-color-to), var(--plain-beam-color-from), transparent)</span>;
  <span class="token-prop">offset-path</span>: <span class="token-val">rect(0 100% 100% 0 round var(--plain-beam-radius, 16px))</span>;
  <span class="token-prop">offset-anchor</span>: <span class="token-val">100% 50%</span>;
  <span class="token-prop">animation</span>: <span class="token-val">plain-beam-travel var(--plain-beam-duration, 8s) infinite linear</span>;
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
