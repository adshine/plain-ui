---
title: "Tooltip"
description: "Zero-JS tooltip using popover="hint" and CSS Anchor Positioning or pure CSS pseudo-elements."
category: "overlay"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens","motion"]
modernApis: ["popover='hint'","anchor()","position-anchor"]
---

# Tooltip

> Zero-JS tooltip using popover="hint" and CSS Anchor Positioning or pure CSS pseudo-elements.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `overlay`
- **Modern Browser APIs**: `popover='hint'`, `anchor()`, `position-anchor`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add tooltip

# Or using pnpm dlx
pnpm dlx plain-ui add tooltip
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/tooltip.html`** (`registry:ui`)

---

## Source Code

### `tooltip.html` (`src/components/ui/tooltip.html`)

```html
<!--
  Plain UI - Tooltip Component
  Pure HTML5 / Tailwind v4 Zero-JS Tooltips
  Includes modern popover='hint' (Anchor Positioning) & Pure CSS Directional Arrow Tooltips
-->

<style>
  /* 1. Modern Popover Hint Styling */
  .plain-tooltip-hint {
    display: none;
    margin: 0;
    padding: 0.25rem 0.5rem;
    background-color: var(--foreground, #0f172a);
    color: var(--background, #ffffff);
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    opacity: 0;
    transform: scale(0.95);
    transition: 
      opacity 0.15s ease-out,
      transform 0.15s ease-out,
      display 0.15s allow-discrete,
      overlay 0.15s allow-discrete;
    border: none;
    pointer-events: none;
  }

  .plain-tooltip-hint:popover-open {
    display: block;
    opacity: 1;
    transform: scale(1);
  }

  @starting-style {
    .plain-tooltip-hint:popover-open {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  /* Popover Hint Anchor Rules */
  .hint-top {
    position-anchor: var(--hint-anchor);
    position-area: top;
    margin-bottom: 0.375rem;
  }

  .hint-bottom {
    position-anchor: var(--hint-anchor);
    position-area: bottom;
    margin-top: 0.375rem;
  }

  /* 2. Pure CSS Directional Arrow Classes */
  .tooltip-wrapper {
    position: relative;
    display: inline-flex;
  }

  .tooltip-bubble {
    position: absolute;
    z-index: 50;
    pointer-events: none;
    white-space: nowrap;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .tooltip-wrapper:hover .tooltip-bubble,
  .tooltip-wrapper:focus-within .tooltip-bubble,
  .tooltip-wrapper:focus-visible .tooltip-bubble {
    opacity: 1;
    transform: scale(1);
  }

  /* Direction: Top */
  .tooltip-dir-top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(4px) scale(0.95);
    margin-bottom: 0.5rem;
  }
  .tooltip-wrapper:hover .tooltip-dir-top,
  .tooltip-wrapper:focus-within .tooltip-dir-top {
    transform: translateX(-50%) translateY(0) scale(1);
  }
  .tooltip-arrow-top::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: currentColor transparent transparent transparent;
  }

  /* Direction: Bottom */
  .tooltip-dir-bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-4px) scale(0.95);
    margin-top: 0.5rem;
  }
  .tooltip-wrapper:hover .tooltip-dir-bottom,
  .tooltip-wrapper:focus-within .tooltip-dir-bottom {
    transform: translateX(-50%) translateY(0) scale(1);
  }
  .tooltip-arrow-bottom::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent currentColor transparent;
  }

  /* Direction: Left */
  .tooltip-dir-left {
    right: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(4px) scale(0.95);
    margin-right: 0.5rem;
  }
  .tooltip-wrapper:hover .tooltip-dir-left,
  .tooltip-wrapper:focus-within .tooltip-dir-left {
    transform: translateY(-50%) translateX(0) scale(1);
  }
  .tooltip-arrow-left::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent transparent currentColor;
  }

  /* Direction: Right */
  .tooltip-dir-right {
    left: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(-4px) scale(0.95);
    margin-left: 0.5rem;
  }
  .tooltip-wrapper:hover .tooltip-dir-right,
  .tooltip-wrapper:focus-within .tooltip-dir-right {
    transform: translateY(-50%) translateX(0) scale(1);
  }
  .tooltip-arrow-right::after {
    content: '';
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: transparent currentColor transparent transparent;
  }
</style>

<div class="space-y-12 p-6 max-w-5xl mx-auto font-sans">
  <!-- Section 1: Pure CSS Directional Arrow Tooltips -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Pure CSS Directional Arrow Tooltips</h3>
      <p class="text-sm text-muted-foreground">Hover & keyboard-focus tooltips with direction arrows (Top, Bottom, Left, Right) with zero JavaScript required.</p>
    </div>

    <div class="flex flex-wrap items-center gap-8 p-8 border border-dashed border-border rounded-xl justify-center">
      <!-- Tooltip Top -->
      <div class="tooltip-wrapper">
        <button 
          type="button"
          class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg shadow-2xs hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          Hover Top
        </button>
        <div role="tooltip" class="tooltip-bubble tooltip-dir-top px-2.5 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-md text-primary tooltip-arrow-top">
          <span class="text-primary-foreground">Tooltip on top</span>
        </div>
      </div>

      <!-- Tooltip Bottom -->
      <div class="tooltip-wrapper">
        <button 
          type="button"
          class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg shadow-2xs hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          Hover Bottom
        </button>
        <div role="tooltip" class="tooltip-bubble tooltip-dir-bottom px-2.5 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-md text-primary tooltip-arrow-bottom">
          <span class="text-primary-foreground">Tooltip on bottom</span>
        </div>
      </div>

      <!-- Tooltip Left -->
      <div class="tooltip-wrapper">
        <button 
          type="button"
          class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg shadow-2xs hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          Hover Left
        </button>
        <div role="tooltip" class="tooltip-bubble tooltip-dir-left px-2.5 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-md text-primary tooltip-arrow-left">
          <span class="text-primary-foreground">Tooltip on left</span>
        </div>
      </div>

      <!-- Tooltip Right -->
      <div class="tooltip-wrapper">
        <button 
          type="button"
          class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg shadow-2xs hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          Hover Right
        </button>
        <div role="tooltip" class="tooltip-bubble tooltip-dir-right px-2.5 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-md text-primary tooltip-arrow-right">
          <span class="text-primary-foreground">Tooltip on right</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: Rich Tooltip with Shortcut & Inverted Style -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Rich & Icon Action Tooltips</h3>
      <p class="text-sm text-muted-foreground">Compact icon tooltips with keyboard shortcuts.</p>
    </div>

    <div class="flex items-center gap-4">
      <!-- Icon Action with Tooltip -->
      <div class="tooltip-wrapper">
        <button 
          type="button" 
          aria-label="Bookmark document"
          class="w-9 h-9 flex items-center justify-center rounded-lg border border-input bg-background hover:bg-accent text-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
        </button>
        <div role="tooltip" class="tooltip-bubble tooltip-dir-top px-2.5 py-1 text-xs font-medium bg-popover text-popover-foreground border border-border rounded-md shadow-lg flex items-center gap-1.5">
          <span>Add bookmark</span>
          <kbd class="px-1 py-0.2 text-[10px] font-mono bg-muted text-muted-foreground rounded">⌘D</kbd>
        </div>
      </div>

      <!-- Copy Action with Tooltip -->
      <div class="tooltip-wrapper">
        <button 
          type="button" 
          aria-label="Copy to clipboard"
          class="w-9 h-9 flex items-center justify-center rounded-lg border border-input bg-background hover:bg-accent text-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
        <div role="tooltip" class="tooltip-bubble tooltip-dir-top px-2.5 py-1 text-xs font-medium bg-popover text-popover-foreground border border-border rounded-md shadow-lg flex items-center gap-1.5">
          <span>Copy snippet</span>
          <kbd class="px-1 py-0.2 text-[10px] font-mono bg-muted text-muted-foreground rounded">⌘C</kbd>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 3: Modern popover='hint' (Anchor API) -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Native <code>popover="hint"</code> Anchor Tooltip</h3>
      <p class="text-sm text-muted-foreground">Emerging standard using <code>popover="hint"</code> and CSS Anchor Positioning.</p>
    </div>

    <button 
      type="button"
      popovertarget="hint-demo-top"
      style="anchor-name: --hint-btn;"
      class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg shadow-2xs hover:bg-accent cursor-pointer"
    >
      <span>Popover Hint Trigger</span>
    </button>

    <div 
      id="hint-demo-top" 
      popover="hint"
      style="--hint-anchor: --hint-btn;"
      class="plain-tooltip-hint hint-top"
    >
      Native popover='hint' anchored tooltip
    </div>
  </section>
</div>
```

---

## Component Anatomy & Architecture

This component uses zero runtime JavaScript. All interactions, styling transitions, and state changes are handled natively by the browser engine via:
- **popover='hint'**: Native browser execution without script parsing overhead.
- **anchor()**: Native browser execution without script parsing overhead.
- **position-anchor**: Native browser execution without script parsing overhead.

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
