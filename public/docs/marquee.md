---
title: "Marquee"
description: "Smooth, infinitely scrolling marquee track with pause-on-hover and GPU acceleration."
category: "effects"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens","motion"]
modernApis: ["keyframes","mask-image"]
---

# Marquee

> Smooth, infinitely scrolling marquee track with pause-on-hover and GPU acceleration.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `effects`
- **Modern Browser APIs**: `keyframes`, `mask-image`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add marquee

# Or using pnpm dlx
pnpm dlx plain-ui add marquee
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/marquee.html`** (`registry:ui`)

---

## Source Code

### `marquee.html` (`src/components/ui/marquee.html`)

```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marquee - Plain UI</title>
  <style>
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
      
      --marquee-speed: 25s;
      --marquee-gap: 1.5rem;
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
      padding: 2.5rem 1.5rem 6rem;
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
      background: rgba(244, 63, 94, 0.1);
      border: 1px solid rgba(244, 63, 94, 0.25);
      color: #fb7185;
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
      margin-bottom: 4rem;
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

    /* ==========================================================================
       Plain UI - Marquee Core Engine (Pure CSS Infinite Loop)
       Zero JavaScript.
       ========================================================================== */

    @keyframes plain-marquee-x {
      from { transform: translateX(0); }
      to   { transform: translateX(calc(-100% - var(--marquee-gap))); }
    }

    @keyframes plain-marquee-x-reverse {
      from { transform: translateX(calc(-100% - var(--marquee-gap))); }
      to   { transform: translateX(0); }
    }

    @keyframes plain-marquee-y {
      from { transform: translateY(0); }
      to   { transform: translateY(calc(-100% - var(--marquee-gap))); }
    }

    /* Horizontal Marquee Container */
    .plain-marquee {
      position: relative;
      display: flex;
      overflow: hidden;
      user-select: none;
      gap: var(--marquee-gap);
      padding: 0.75rem 0;
      -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
      mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
    }

    /* Marquee Track Group */
    .plain-marquee-track {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: var(--marquee-gap);
      min-width: 100%;
      animation: plain-marquee-x var(--marquee-speed) linear infinite;
    }

    /* Reverse Marquee Modifier */
    .plain-marquee.reverse .plain-marquee-track {
      animation-name: plain-marquee-x-reverse;
    }

    /* Pause On Hover Feature */
    .plain-marquee:hover .plain-marquee-track {
      animation-play-state: paused;
    }

    /* Fast / Slow Speeds */
    .marquee-fast { --marquee-speed: 15s; }
    .marquee-normal { --marquee-speed: 25s; }
    .marquee-slow { --marquee-speed: 40s; }

    /* ==========================================================================
       Marquee Component Items (Cards, Badges, Logos)
       ========================================================================== */

    /* 1. Tech Logo Badges */
    .plain-logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 1.25rem;
      border-radius: 12px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      transition: border-color 0.2s, transform 0.2s, background-color 0.2s;
    }

    .plain-logo-badge:hover {
      border-color: var(--border-strong);
      background: var(--bg-surface-raised);
      transform: translateY(-2px);
    }

    /* 2. Testimonial / Review Cards */
    .plain-review-card {
      width: 320px;
      padding: 1.25rem;
      border-radius: 16px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: border-color 0.2s, transform 0.2s;
    }

    .plain-review-card:hover {
      border-color: var(--border-strong);
      transform: translateY(-2px);
    }

    .review-user-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .review-avatar {
      width: 38px;
      height: 38px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
      color: #ffffff;
    }

    .review-name {
      font-weight: 600;
      font-size: 0.875rem;
      color: #ffffff;
    }

    .review-handle {
      font-size: 0.75rem;
      color: var(--text-tertiary);
    }

    .review-text {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    /* ==========================================================================
       3. 3D Tilted Aceternity Perspective Marquee
       ========================================================================== */
    .perspective-stage {
      position: relative;
      width: 100%;
      height: 380px;
      overflow: hidden;
      background: #000000;
      border: 1px solid var(--border-subtle);
      border-radius: 20px;
      perspective: 1000px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.5rem;
    }

    .perspective-grid {
      transform: rotateX(20deg) rotateY(-12deg) rotateZ(6deg) scale(1.15);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    /* ==========================================================================
       4. Vertical Dual-Column Marquee
       ========================================================================== */
    .vertical-stage {
      height: 360px;
      overflow: hidden;
      position: relative;
      border: 1px solid var(--border-subtle);
      border-radius: 20px;
      background: var(--bg-surface);
      padding: 1rem 1.5rem;
      display: flex;
      gap: 1.5rem;
      -webkit-mask-image: linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent);
      mask-image: linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent);
    }

    .plain-marquee-vertical {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      gap: var(--marquee-gap);
      user-select: none;
    }

    .plain-marquee-vertical-track {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: var(--marquee-gap);
      min-height: 100%;
      animation: plain-marquee-y var(--marquee-speed) linear infinite;
    }

    .vertical-stage:hover .plain-marquee-vertical-track {
      animation-play-state: paused;
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
      .plain-marquee-track,
      .plain-marquee-vertical-track {
        animation: none !important;
      }
      .plain-marquee {
        overflow-x: auto;
      }
    }
  </style>
</head>
<body>
  <div class="plain-container">
    <!-- Header -->
    <header class="plain-header">
      <div class="plain-badge">Magic UI Motion Primitives</div>
      <h1 class="plain-title">Infinite Marquee</h1>
      <p class="plain-subtitle">
        Seamless, hardware-accelerated infinite scrolling marquee in pure CSS. Features dynamic pause-on-hover, mask gradient edge fading, and 3D perspective orientation.
      </p>
    </header>

    <!-- Section 1: Interactive Reviews Marquee (Bi-directional) -->
    <section class="plain-section">
      <h3 class="plain-section-title">Bi-Directional Social Proof Streams</h3>
      <p class="plain-section-desc">Hover over any card to freeze the stream. CSS edge masks fade cards seamlessly into the canvas.</p>

      <!-- Row 1: Forward Direction -->
      <div class="plain-marquee marquee-normal" style="margin-bottom: 1rem;">
        <div class="plain-marquee-track">
          <!-- Card 1 -->
          <div class="plain-review-card">
            <div class="review-user-header">
              <div class="review-avatar">AK</div>
              <div>
                <div class="review-name">Alex Rivera</div>
                <div class="review-handle">@alexrivera_dev</div>
              </div>
            </div>
            <p class="review-text">Plain UI eliminated 120KB of runtime JS bundle from our landing page while keeping all the high-end polish.</p>
          </div>

          <!-- Card 2 -->
          <div class="plain-review-card">
            <div class="review-user-header">
              <div class="review-avatar" style="background: linear-gradient(135deg, #10b981, #06b6d4);">SL</div>
              <div>
                <div class="review-name">Sarah Lin</div>
                <div class="review-handle">@sarahlin_ui</div>
              </div>
            </div>
            <p class="review-text">The Houdini @property gradients are buttery smooth at 120Hz on ProMotion displays. Incredible craft.</p>
          </div>

          <!-- Card 3 -->
          <div class="plain-review-card">
            <div class="review-user-header">
              <div class="review-avatar" style="background: linear-gradient(135deg, #f59e0b, #ec4899);">MP</div>
              <div>
                <div class="review-name">Marcus Vance</div>
                <div class="review-handle">@marcusv</div>
              </div>
            </div>
            <p class="review-text">Pure CSS :has() proximity dock in pure HTML/CSS is a game changer for zero-JS web architectures.</p>
          </div>

          <!-- Card 4 -->
          <div class="plain-review-card">
            <div class="review-user-header">
              <div class="review-avatar" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6);">EK</div>
              <div>
                <div class="review-name">Elena Rostova</div>
                <div class="review-handle">@elenarostova</div>
              </div>
            </div>
            <p class="review-text">The border beam component with offset-path: rect() is sheer CSS sorcery. Zero runtime overhead!</p>
          </div>
        </div>

        <!-- Cloned Track for Seamless Gapless Loop -->
        <div class="plain-marquee-track" aria-hidden="true">
          <div class="plain-review-card">
            <div class="review-user-header">
              <div class="review-avatar">AK</div>
              <div>
                <div class="review-name">Alex Rivera</div>
                <div class="review-handle">@alexrivera_dev</div>
              </div>
            </div>
            <p class="review-text">Plain UI eliminated 120KB of runtime JS bundle from our landing page while keeping all the high-end polish.</p>
          </div>

          <div class="plain-review-card">
            <div class="review-user-header">
              <div class="review-avatar" style="background: linear-gradient(135deg, #10b981, #06b6d4);">SL</div>
              <div>
                <div class="review-name">Sarah Lin</div>
                <div class="review-handle">@sarahlin_ui</div>
              </div>
            </div>
            <p class="review-text">The Houdini @property gradients are buttery smooth at 120Hz on ProMotion displays. Incredible craft.</p>
          </div>

          <div class="plain-review-card">
            <div class="review-user-header">
              <div class="review-avatar" style="background: linear-gradient(135deg, #f59e0b, #ec4899);">MP</div>
              <div>
                <div class="review-name">Marcus Vance</div>
                <div class="review-handle">@marcusv</div>
              </div>
            </div>
            <p class="review-text">Pure CSS :has() proximity dock in pure HTML/CSS is a game changer for zero-JS web architectures.</p>
          </div>

          <div class="plain-review-card">
            <div class="review-user-header">
              <div class="review-avatar" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6);">EK</div>
              <div>
                <div class="review-name">Elena Rostova</div>
                <div class="review-handle">@elenarostova</div>
              </div>
            </div>
            <p class="review-text">The border beam component with offset-path: rect() is sheer CSS sorcery. Zero runtime overhead!</p>
          </div>
        </div>
      </div>

      <!-- Row 2: Reverse Direction -->
      <div class="plain-marquee reverse marquee-normal">
        <div class="plain-marquee-track">
          <div class="plain-logo-badge">⚡ Next.js App Router</div>
          <div class="plain-logo-badge">🚀 Astro Starlight</div>
          <div class="plain-logo-badge">💎 SvelteKit 2.0</div>
          <div class="plain-logo-badge">🔥 Remix & Vite</div>
          <div class="plain-logo-badge">✨ Nuxt & Vue 3</div>
          <div class="plain-logo-badge">🌊 Tailwind CSS v4</div>
        </div>

        <!-- Cloned Track -->
        <div class="plain-marquee-track" aria-hidden="true">
          <div class="plain-logo-badge">⚡ Next.js App Router</div>
          <div class="plain-logo-badge">🚀 Astro Starlight</div>
          <div class="plain-logo-badge">💎 SvelteKit 2.0</div>
          <div class="plain-logo-badge">🔥 Remix & Vite</div>
          <div class="plain-logo-badge">✨ Nuxt & Vue 3</div>
          <div class="plain-logo-badge">🌊 Tailwind CSS v4</div>
        </div>
      </div>
    </section>

    <!-- Section 2: 3D Tilted Aceternity Perspective Marquee -->
    <section class="plain-section">
      <h3 class="plain-section-title">3D Tilted Perspective Marquee</h3>
      <p class="plain-section-desc">Multi-tiered perspective matrix with continuous isometric depth.</p>
      
      <div class="perspective-stage">
        <div class="perspective-grid">
          <div class="plain-marquee marquee-fast">
            <div class="plain-marquee-track">
              <div class="plain-logo-badge" style="background: #18181b;">Houdini Engine</div>
              <div class="plain-logo-badge" style="background: #18181b;">Scroll-Driven Timelines</div>
              <div class="plain-logo-badge" style="background: #18181b;">Anchor Positioning</div>
              <div class="plain-logo-badge" style="background: #18181b;">Discrete Transitions</div>
              <div class="plain-logo-badge" style="background: #18181b;">Light-DOM Primitives</div>
            </div>
            <div class="plain-marquee-track" aria-hidden="true">
              <div class="plain-logo-badge" style="background: #18181b;">Houdini Engine</div>
              <div class="plain-logo-badge" style="background: #18181b;">Scroll-Driven Timelines</div>
              <div class="plain-logo-badge" style="background: #18181b;">Anchor Positioning</div>
              <div class="plain-logo-badge" style="background: #18181b;">Discrete Transitions</div>
              <div class="plain-logo-badge" style="background: #18181b;">Light-DOM Primitives</div>
            </div>
          </div>

          <div class="plain-marquee reverse marquee-fast">
            <div class="plain-marquee-track">
              <div class="plain-logo-badge" style="background: #18181b;">Zero Framer Motion</div>
              <div class="plain-logo-badge" style="background: #18181b;">Native CSS Springs</div>
              <div class="plain-logo-badge" style="background: #18181b;">Asymmetric Easings</div>
              <div class="plain-logo-badge" style="background: #18181b;">View Transitions API</div>
              <div class="plain-logo-badge" style="background: #18181b;">Zero Hydration Delay</div>
            </div>
            <div class="plain-marquee-track" aria-hidden="true">
              <div class="plain-logo-badge" style="background: #18181b;">Zero Framer Motion</div>
              <div class="plain-logo-badge" style="background: #18181b;">Native CSS Springs</div>
              <div class="plain-logo-badge" style="background: #18181b;">Asymmetric Easings</div>
              <div class="plain-logo-badge" style="background: #18181b;">View Transitions API</div>
              <div class="plain-logo-badge" style="background: #18181b;">Zero Hydration Delay</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Docs -->
    <section class="plain-doc-section">
      <h2 style="font-size: 1.25rem; font-weight: 600; color: #ffffff; margin-bottom: 0.75rem;">Pure CSS Seamless Marquee Architecture</h2>
      <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">
        To create a truly gapless infinite marquee without JavaScript loops or requestAnimationFrame, Plain UI pairs dual identical flex tracks with <code>transform: translateX(calc(-100% - var(--marquee-gap)))</code> and dynamic <code>animation-play-state: paused</code>.
      </p>

      <div class="plain-code-block">
<span class="token-comment">/* 1. Gapless infinite translation */</span>
<span class="token-tag">@keyframes</span> <span class="token-prop">plain-marquee-x</span> {
  <span class="token-tag">from</span> { <span class="token-prop">transform</span>: <span class="token-val">translateX(0)</span>; }
  <span class="token-tag">to</span>   { <span class="token-prop">transform</span>: <span class="token-val">translateX(calc(-100% - var(--marquee-gap)))</span>; }
}

<span class="token-comment">/* 2. Container mask gradient & pause on hover */</span>
<span class="token-tag">.plain-marquee</span> {
  <span class="token-prop">mask-image</span>: <span class="token-val">linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)</span>;
}

<span class="token-tag">.plain-marquee:hover .plain-marquee-track</span> {
  <span class="token-prop">animation-play-state</span>: <span class="token-val">paused</span>;
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
- **keyframes**: Native browser execution without script parsing overhead.
- **mask-image**: Native browser execution without script parsing overhead.

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
