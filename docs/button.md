---
title: "Button"
description: "Zero-JS button primitives with primary, secondary, outline, ghost, destructive, and link variants."
category: "inputs"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens"]
modernApis: [":focus-visible",":active"]
---

# Button

> Zero-JS button primitives with primary, secondary, outline, ghost, destructive, and link variants.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `inputs`
- **Modern Browser APIs**: `:focus-visible`, `:active`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add button

# Or using pnpm dlx
pnpm dlx plain-ui add button
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/button.html`** (`registry:ui`)

---

## Source Code

### `button.html` (`src/components/ui/button.html`)

```html
<!--
  Plain UI - Button Component
  Pure HTML5 / Tailwind v4 Zero-JS Button Primitives & Variants
-->

<div class="space-y-12 p-6 max-w-5xl mx-auto font-sans">
  <!-- Section 1: Standard Button Variants -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Button Variants</h3>
      <p class="text-sm text-muted-foreground">Pure CSS & semantic HTML buttons with primary, secondary, outline, ghost, destructive, and link styles.</p>
    </div>
    
    <div class="flex flex-wrap items-center gap-4">
      <!-- Default / Primary -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-xs hover:bg-primary/90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        Default
      </button>

      <!-- Secondary -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-secondary-foreground bg-secondary rounded-lg shadow-2xs hover:bg-secondary/80 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        Secondary
      </button>

      <!-- Outline -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-lg shadow-2xs hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        Outline
      </button>

      <!-- Ghost -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground rounded-lg hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        Ghost
      </button>

      <!-- Destructive -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-lg shadow-xs hover:bg-destructive/90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Destructive
      </button>

      <!-- Link -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-1.5 px-0 py-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        Link Button
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>
    </div>
  </section>

  <!-- Section 2: Button Sizes -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Button Sizes</h3>
      <p class="text-sm text-muted-foreground">Compact small, balanced medium (default), and prominent large sizing options.</p>
    </div>
    
    <div class="flex flex-wrap items-center gap-4">
      <!-- Small -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-2xs hover:bg-primary/90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        Small (sm)
      </button>

      <!-- Medium (Default) -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-xs hover:bg-primary/90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        Medium (md)
      </button>

      <!-- Large -->
      <button 
        type="button" 
        class="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 text-base font-semibold text-primary-foreground bg-primary rounded-xl shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        Large (lg)
      </button>
    </div>
  </section>

  <!-- Section 3: Icon-Only Buttons -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Icon-Only Buttons</h3>
      <p class="text-sm text-muted-foreground">Square icon triggers with accessible aria-labels across various styles and sizes.</p>
    </div>
    
    <div class="flex flex-wrap items-center gap-4">
      <!-- Icon Primary -->
      <button 
        type="button" 
        aria-label="Add new item"
        class="inline-flex items-center justify-center w-9 h-9 text-primary-foreground bg-primary rounded-lg shadow-xs hover:bg-primary/90 active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <!-- Icon Outline -->
      <button 
        type="button" 
        aria-label="Settings"
        class="inline-flex items-center justify-center w-9 h-9 text-foreground bg-background border border-input rounded-lg shadow-2xs hover:bg-accent hover:text-accent-foreground active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <!-- Icon Ghost -->
      <button 
        type="button" 
        aria-label="Bookmark"
        class="inline-flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>

      <!-- Icon Rounded / Pill -->
      <button 
        type="button" 
        aria-label="User profile"
        class="inline-flex items-center justify-center w-9 h-9 text-primary-foreground bg-primary rounded-full shadow-xs hover:bg-primary/90 active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
    </div>
  </section>

  <!-- Section 4: Split Buttons & Button Groups -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Split Buttons & Groups</h3>
      <p class="text-sm text-muted-foreground">Connected button groups and split action triggers with anchor/popover support.</p>
    </div>
    
    <div class="flex flex-wrap items-center gap-6">
      <!-- Split Button (Primary) -->
      <div class="inline-flex rounded-lg shadow-xs" role="group" aria-label="Publish options">
        <button 
          type="button" 
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-l-lg hover:bg-primary/90 active:bg-primary/95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:z-10 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Publish
        </button>
        <button 
          type="button" 
          aria-label="Select publish action"
          popovertarget="split-menu-demo"
          style="anchor-name: --split-btn-trigger;"
          class="inline-flex items-center px-2 py-2 text-sm font-medium text-primary-foreground bg-primary border-l border-primary-foreground/20 rounded-r-lg hover:bg-primary/90 active:bg-primary/95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:z-10 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      <!-- Anchored Popover Menu for Split Button -->
      <div 
        id="split-menu-demo" 
        popover="auto"
        style="position-anchor: --split-btn-trigger; position-area: bottom span-left; margin-top: 0.25rem;"
        class="w-48 p-1 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg backdrop-blur-md transition-all duration-150"
      >
        <button type="button" class="flex items-center w-full px-3 py-1.5 text-xs font-medium rounded-md text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors text-left">
          Publish now
        </button>
        <button type="button" class="flex items-center w-full px-3 py-1.5 text-xs font-medium rounded-md text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors text-left">
          Schedule for later...
        </button>
        <button type="button" class="flex items-center w-full px-3 py-1.5 text-xs font-medium rounded-md text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors text-left">
          Save as draft
        </button>
      </div>

      <!-- Segmented Button Group (Outline) -->
      <div class="inline-flex rounded-lg shadow-2xs border border-input p-0.5 bg-muted/40" role="group" aria-label="View mode">
        <button 
          type="button" 
          class="px-3 py-1.5 text-xs font-medium rounded-md bg-background text-foreground shadow-2xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Grid
        </button>
        <button 
          type="button" 
          class="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          List
        </button>
        <button 
          type="button" 
          class="px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Table
        </button>
      </div>
    </div>
  </section>

  <!-- Section 5: States & Feedback -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">States & Feedback</h3>
      <p class="text-sm text-muted-foreground">Disabled and pure-CSS loading spinner states.</p>
    </div>
    
    <div class="flex flex-wrap items-center gap-4">
      <!-- Disabled -->
      <button 
        type="button" 
        disabled
        class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-xs opacity-50 cursor-not-allowed"
      >
        Disabled Button
      </button>

      <!-- Loading State (SVG spinner) -->
      <button 
        type="button" 
        disabled
        class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-xs opacity-80 cursor-wait"
      >
        <svg class="w-4 h-4 animate-spin text-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Saving Changes...
      </button>
    </div>
  </section>
</div>
```

---

## Component Anatomy & Architecture

This component uses zero runtime JavaScript. All interactions, styling transitions, and state changes are handled natively by the browser engine via:
- **:focus-visible**: Native browser execution without script parsing overhead.
- **:active**: Native browser execution without script parsing overhead.

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
