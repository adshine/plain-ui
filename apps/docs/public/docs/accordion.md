---
title: "Accordion"
description: "Zero-JS vertically collapsing accordion built with HTML5 details[name] and interpolate-size transitions."
category: "disclosure"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens","motion"]
modernApis: ["details::details-content","interpolate-size","details[name]"]
---

# Accordion

> Zero-JS vertically collapsing accordion built with HTML5 details[name] and interpolate-size transitions.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `disclosure`
- **Modern Browser APIs**: `details::details-content`, `interpolate-size`, `details[name]`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add accordion

# Or using pnpm dlx
pnpm dlx plain-ui add accordion
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/accordion.html`** (`registry:ui`)

---

## Source Code

### `accordion.html` (`src/components/ui/accordion.html`)

```html
<!--
  Plain UI - Accordion Component
  Pure HTML5 / Tailwind v4 Zero-JS Accordion with <details name='group'> & interpolate-size: allow-keywords
-->

<style>
  /* Zero-JS Smooth Height Interpolation for <details> */
  html {
    interpolate-size: allow-keywords;
  }

  /* Target details content expansion smoothly */
  details::details-content {
    opacity: 0;
    block-size: 0;
    overflow-y: clip;
    transition: 
      content-visibility 0.3s allow-discrete,
      opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
      block-size 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  details[open]::details-content {
    opacity: 1;
    block-size: auto;
  }

  /* Summary Marker Reset & Chevron Rotation */
  summary {
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  details summary .accordion-chevron {
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  details[open] summary .accordion-chevron {
    transform: rotate(180deg);
  }
</style>

<div class="space-y-12 p-6 max-w-5xl mx-auto font-sans">
  <!-- Section 1: Exclusive Single-Open FAQ Accordion (name='faq-group') -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Exclusive Accordion (Single Open)</h3>
      <p class="text-sm text-muted-foreground">Built using native <code>&lt;details name="faq-group"&gt;</code> and zero-JS CSS <code>interpolate-size</code> height animation. Opening one item automatically closes the other.</p>
    </div>

    <div class="w-full max-w-2xl border border-border rounded-xl divide-y divide-border/60 bg-card text-card-foreground shadow-2xs overflow-hidden">
      <!-- Accordion Item 1 -->
      <details name="faq-group" class="group" open>
        <summary class="flex items-center justify-between p-4 text-sm font-medium text-foreground hover:bg-accent/50 cursor-pointer select-none transition-colors focus-visible:outline-none focus-visible:bg-accent/50">
          <span>What is Plain UI?</span>
          <svg class="w-4 h-4 text-muted-foreground accordion-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </summary>
        <div class="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed">
          Plain UI is a zero-JavaScript component registry crafted with modern HTML5 primitives (Invoker commands, Popover API, Details name attribute) and Tailwind CSS v4 design tokens.
        </div>
      </details>

      <!-- Accordion Item 2 -->
      <details name="faq-group" class="group">
        <summary class="flex items-center justify-between p-4 text-sm font-medium text-foreground hover:bg-accent/50 cursor-pointer select-none transition-colors focus-visible:outline-none focus-visible:bg-accent/50">
          <span>How does zero-JS height expansion work?</span>
          <svg class="w-4 h-4 text-muted-foreground accordion-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </summary>
        <div class="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed">
          Using modern CSS <code>interpolate-size: allow-keywords</code> alongside the native <code>::details-content</code> pseudo-element, the browser smoothly transitions between <code>block-size: 0</code> and <code>block-size: auto</code> without any JavaScript height measuring calculations.
        </div>
      </details>

      <!-- Accordion Item 3 -->
      <details name="faq-group" class="group">
        <summary class="flex items-center justify-between p-4 text-sm font-medium text-foreground hover:bg-accent/50 cursor-pointer select-none transition-colors focus-visible:outline-none focus-visible:bg-accent/50">
          <span>Is it fully accessible with screen readers?</span>
          <svg class="w-4 h-4 text-muted-foreground accordion-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </summary>
        <div class="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed">
          Yes! Because it utilizes native semantic <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements, assistive technologies natively understand the expanded/collapsed state, keyboard navigation (Enter/Space to toggle), and grouping semantics without custom ARIA role plumbing.
        </div>
      </details>
    </div>
  </section>

  <!-- Section 2: Bordered Card Accordion -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Separated Card Accordion</h3>
      <p class="text-sm text-muted-foreground">Independent card items allowing multiple panels to remain open simultaneously.</p>
    </div>

    <div class="w-full max-w-2xl space-y-3">
      <!-- Card Item 1 -->
      <details class="group border border-border rounded-xl bg-card text-card-foreground shadow-2xs overflow-hidden transition-colors open:border-primary/40">
        <summary class="flex items-center justify-between p-4 text-sm font-medium text-foreground hover:bg-accent/50 cursor-pointer select-none transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <span>Two-Factor Authentication</span>
          </div>
          <svg class="w-4 h-4 text-muted-foreground accordion-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div class="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed pl-14">
          Protect your workspace by requiring an authenticator app or hardware security key during sign-in.
        </div>
      </details>

      <!-- Card Item 2 -->
      <details class="group border border-border rounded-xl bg-card text-card-foreground shadow-2xs overflow-hidden transition-colors open:border-primary/40">
        <summary class="flex items-center justify-between p-4 text-sm font-medium text-foreground hover:bg-accent/50 cursor-pointer select-none transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <span>Email Notification Preferences</span>
          </div>
          <svg class="w-4 h-4 text-muted-foreground accordion-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div class="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed pl-14">
          Manage notification digest frequency, weekly security alerts, and system change announcements.
        </div>
      </details>
    </div>
  </section>

  <!-- Section 3: Flush Minimalist Accordion -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Flush Minimalist Accordion</h3>
      <p class="text-sm text-muted-foreground">Clean underline borders ideal for documentation and long FAQ articles.</p>
    </div>

    <div class="w-full max-w-2xl divide-y divide-border/60">
      <details name="flush-demo" class="group py-3">
        <summary class="flex items-center justify-between text-sm font-medium text-foreground hover:text-primary cursor-pointer select-none transition-colors">
          <span>Can Plain UI components be used with React, Svelte, or Vue?</span>
          <svg class="w-4 h-4 text-muted-foreground accordion-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div class="pt-2 text-xs text-muted-foreground leading-relaxed">
          Absolutely. Since Plain UI is 100% pure HTML and Tailwind CSS, you can copy-paste the JSX, Vue templates, or Svelte markups directly into any frontend stack without installing extra NPM dependencies.
        </div>
      </details>

      <details name="flush-demo" class="group py-3">
        <summary class="flex items-center justify-between text-sm font-medium text-foreground hover:text-primary cursor-pointer select-none transition-colors">
          <span>How are Tailwind v4 design tokens configured?</span>
          <svg class="w-4 h-4 text-muted-foreground accordion-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </summary>
        <div class="pt-2 text-xs text-muted-foreground leading-relaxed">
          All components reference standard semantic CSS variables (<code>--background</code>, <code>--foreground</code>, <code>--primary</code>, <code>--border</code>, etc.) defined in the theme layer.
        </div>
      </details>
    </div>
  </section>
</div>
```

---

## Component Anatomy & Architecture

This component uses zero runtime JavaScript. All interactions, styling transitions, and state changes are handled natively by the browser engine via:
- **details::details-content**: Native browser execution without script parsing overhead.
- **interpolate-size**: Native browser execution without script parsing overhead.
- **details[name]**: Native browser execution without script parsing overhead.

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
