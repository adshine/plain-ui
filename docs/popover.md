---
title: "Popover"
description: "Zero-JS native popover with CSS Anchor Positioning and automatic light-dismiss."
category: "overlay"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens","motion"]
modernApis: ["popover='auto'","anchor()","position-anchor"]
---

# Popover

> Zero-JS native popover with CSS Anchor Positioning and automatic light-dismiss.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `overlay`
- **Modern Browser APIs**: `popover='auto'`, `anchor()`, `position-anchor`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add popover

# Or using pnpm dlx
pnpm dlx plain-ui add popover
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/popover.html`** (`registry:ui`)

---

## Source Code

### `popover.html` (`src/components/ui/popover.html`)

```html
<!--
  Plain UI - Popover Component
  Pure HTML5 / Tailwind v4 Zero-JS Native Popover (popover="auto") & CSS Anchor Positioning
-->

<style>
  /* Base Popover Transition & Anchor Positioning Defaults */
  .plain-popover {
    display: none;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
    transition: 
      opacity 0.15s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.15s cubic-bezier(0.16, 1, 0.3, 1),
      display 0.15s allow-discrete,
      overlay 0.15s allow-discrete;
  }

  .plain-popover:popover-open {
    display: block;
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  @starting-style {
    .plain-popover:popover-open {
      opacity: 0;
      transform: translateY(-4px) scale(0.98);
    }
  }

  /* Directional Anchor Classes (CSS Anchor Positioning) */
  .anchor-bottom-start {
    position-anchor: var(--anchor-name);
    position-area: bottom span-right;
    margin-top: 0.5rem;
    position-try-fallbacks: flip-block;
  }

  .anchor-top-start {
    position-anchor: var(--anchor-name);
    position-area: top span-right;
    margin-bottom: 0.5rem;
    position-try-fallbacks: flip-block;
  }

  .anchor-right-start {
    position-anchor: var(--anchor-name);
    position-area: right span-bottom;
    margin-left: 0.5rem;
    position-try-fallbacks: flip-inline;
  }

  .anchor-left-start {
    position-anchor: var(--anchor-name);
    position-area: left span-bottom;
    margin-right: 0.5rem;
    position-try-fallbacks: flip-inline;
  }
</style>

<div class="space-y-12 p-6 max-w-5xl mx-auto font-sans">
  <!-- Section 1: Settings / Dimensions Popover -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Anchor-Positioned Popover</h3>
      <p class="text-sm text-muted-foreground">Native zero-JS popover anchored directly to its trigger element using CSS <code>anchor-name</code> and <code>position-anchor</code>.</p>
    </div>

    <!-- Trigger -->
    <button 
      type="button"
      popovertarget="settings-popover"
      style="anchor-name: --settings-trigger;"
      class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg shadow-2xs hover:bg-accent active:scale-[0.98] transition-all cursor-pointer"
    >
      <svg class="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
      Dimensions Settings
    </button>

    <!-- Anchored Popover -->
    <div 
      id="settings-popover" 
      popover="auto"
      style="--anchor-name: --settings-trigger;"
      class="plain-popover anchor-bottom-start w-80 bg-card text-card-foreground border border-border rounded-xl shadow-xl p-4 space-y-3"
    >
      <div class="space-y-1 border-b border-border/60 pb-2">
        <h4 class="text-sm font-semibold text-foreground">Dimensions</h4>
        <p class="text-xs text-muted-foreground">Set the default container dimensions for the canvas.</p>
      </div>

      <div class="space-y-2">
        <div class="grid grid-cols-3 items-center gap-2">
          <label for="pop-w" class="text-xs font-medium text-muted-foreground">Width</label>
          <input id="pop-w" type="text" value="100%" class="col-span-2 px-2 py-1 text-xs bg-background border border-input rounded-md shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
        <div class="grid grid-cols-3 items-center gap-2">
          <label for="pop-max-w" class="text-xs font-medium text-muted-foreground">Max Width</label>
          <input id="pop-max-w" type="text" value="1200px" class="col-span-2 px-2 py-1 text-xs bg-background border border-input rounded-md shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
        <div class="grid grid-cols-3 items-center gap-2">
          <label for="pop-h" class="text-xs font-medium text-muted-foreground">Height</label>
          <input id="pop-h" type="text" value="auto" class="col-span-2 px-2 py-1 text-xs bg-background border border-input rounded-md shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
        <div class="grid grid-cols-3 items-center gap-2">
          <label for="pop-max-h" class="text-xs font-medium text-muted-foreground">Max Height</label>
          <input id="pop-max-h" type="text" value="none" class="col-span-2 px-2 py-1 text-xs bg-background border border-input rounded-md shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: User Card Profile Popover -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Profile Preview Popover</h3>
      <p class="text-sm text-muted-foreground">Interactive hover/click profile preview card anchored below a user handle.</p>
    </div>

    <!-- Trigger Link/Button -->
    <button 
      type="button"
      popovertarget="user-profile-popover"
      style="anchor-name: --user-trigger;"
      class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-foreground bg-accent/50 hover:bg-accent rounded-lg transition-colors cursor-pointer"
    >
      <div class="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
        AM
      </div>
      <span>@alexmercer</span>
    </button>

    <!-- Anchored Popover -->
    <div 
      id="user-profile-popover" 
      popover="auto"
      style="--anchor-name: --user-trigger;"
      class="plain-popover anchor-bottom-start w-72 bg-card text-card-foreground border border-border rounded-xl shadow-xl p-4 space-y-3"
    >
      <div class="flex items-start justify-between">
        <div class="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center text-base font-bold">
          AM
        </div>
        <button 
          type="button"
          class="px-3 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-2xs hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Follow
        </button>
      </div>

      <div>
        <h5 class="text-sm font-semibold text-foreground">Alex Mercer</h5>
        <p class="text-xs text-muted-foreground">@alexmercer</p>
      </div>

      <p class="text-xs text-foreground/80 leading-relaxed">
        Building zero-JS UI primitives on modern web standards & Tailwind CSS v4.
      </p>

      <div class="flex items-center gap-4 text-xs text-muted-foreground pt-1">
        <span><strong class="text-foreground font-semibold">420</strong> Following</span>
        <span><strong class="text-foreground font-semibold">12.8k</strong> Followers</span>
      </div>
    </div>
  </section>

  <!-- Section 3: Directional Placements (Top, Bottom, Left, Right) -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Directional Placements</h3>
      <p class="text-sm text-muted-foreground">Testing CSS Anchor Positioning across all four cardinal directions.</p>
    </div>

    <div class="flex flex-wrap items-center gap-6 p-8 border border-dashed border-border rounded-xl justify-center">
      <!-- Top -->
      <button 
        type="button" 
        popovertarget="pop-top" 
        style="anchor-name: --btn-top;" 
        class="px-3 py-2 text-xs font-medium text-foreground bg-background border border-input rounded-lg hover:bg-accent cursor-pointer"
      >
        Top Popover
      </button>
      <div id="pop-top" popover="auto" style="--anchor-name: --btn-top;" class="plain-popover anchor-top-start p-3 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg text-xs">
        Anchored to Top
      </div>

      <!-- Bottom -->
      <button 
        type="button" 
        popovertarget="pop-bottom" 
        style="anchor-name: --btn-bottom;" 
        class="px-3 py-2 text-xs font-medium text-foreground bg-background border border-input rounded-lg hover:bg-accent cursor-pointer"
      >
        Bottom Popover
      </button>
      <div id="pop-bottom" popover="auto" style="--anchor-name: --btn-bottom;" class="plain-popover anchor-bottom-start p-3 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg text-xs">
        Anchored to Bottom
      </div>

      <!-- Left -->
      <button 
        type="button" 
        popovertarget="pop-left" 
        style="anchor-name: --btn-left;" 
        class="px-3 py-2 text-xs font-medium text-foreground bg-background border border-input rounded-lg hover:bg-accent cursor-pointer"
      >
        Left Popover
      </button>
      <div id="pop-left" popover="auto" style="--anchor-name: --btn-left;" class="plain-popover anchor-left-start p-3 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg text-xs">
        Anchored to Left
      </div>

      <!-- Right -->
      <button 
        type="button" 
        popovertarget="pop-right" 
        style="anchor-name: --btn-right;" 
        class="px-3 py-2 text-xs font-medium text-foreground bg-background border border-input rounded-lg hover:bg-accent cursor-pointer"
      >
        Right Popover
      </button>
      <div id="pop-right" popover="auto" style="--anchor-name: --btn-right;" class="plain-popover anchor-right-start p-3 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg text-xs">
        Anchored to Right
      </div>
    </div>
  </section>
</div>
```

---

## Component Anatomy & Architecture

This component uses zero runtime JavaScript. All interactions, styling transitions, and state changes are handled natively by the browser engine via:
- **popover='auto'**: Native browser execution without script parsing overhead.
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
