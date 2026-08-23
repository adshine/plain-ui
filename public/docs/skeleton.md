---
title: "Skeleton"
description: "Theme-aware shimmer loading skeleton with CSS color-mix() gradient sweep."
category: "feedback"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens","motion"]
modernApis: ["color-mix()","keyframes"]
---

# Skeleton

> Theme-aware shimmer loading skeleton with CSS color-mix() gradient sweep.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `feedback`
- **Modern Browser APIs**: `color-mix()`, `keyframes`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add skeleton

# Or using pnpm dlx
pnpm dlx plain-ui add skeleton
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/skeleton.html`** (`registry:ui`)

---

## Source Code

### `skeleton.html` (`src/components/ui/skeleton.html`)

```html
<!--
  Plain UI - Skeleton Component
  Pure HTML5 / Tailwind v4 Zero-JS Theme-Aware Shimmer Skeleton with CSS color-mix()
-->

<style>
  /* Zero-JS Theme-Aware Shimmer Skeleton via color-mix() */
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  .skeleton {
    background-color: color-mix(in srgb, currentColor 8%, transparent);
    background-image: linear-gradient(
      90deg,
      color-mix(in srgb, currentColor 8%, transparent) 0%,
      color-mix(in srgb, currentColor 16%, transparent) 50%,
      color-mix(in srgb, currentColor 8%, transparent) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
    border-radius: 0.375rem;
  }

  .skeleton-pulse {
    background-color: color-mix(in srgb, currentColor 10%, transparent);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
</style>

<div class="space-y-12 p-6 max-w-5xl mx-auto font-sans text-foreground">
  <!-- Section 1: Basic Skeleton Primitives -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Theme-Aware Skeleton Primitives</h3>
      <p class="text-sm text-muted-foreground">Dynamically adapts to light, dark, and custom themes using CSS <code>color-mix(in srgb, currentColor, transparent)</code> with zero JavaScript.</p>
    </div>

    <div class="flex items-center gap-4">
      <div class="skeleton w-12 h-12 rounded-full"></div>
      <div class="space-y-2 flex-1 max-w-xs">
        <div class="skeleton h-4 w-3/4"></div>
        <div class="skeleton h-3 w-1/2"></div>
      </div>
    </div>
  </section>

  <!-- Section 2: User Profile Card Skeleton -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Profile Card Skeleton</h3>
      <p class="text-sm text-muted-foreground">Placeholder layout for user bios and social profile components.</p>
    </div>

    <div class="w-full max-w-sm p-6 border border-border rounded-xl bg-card shadow-2xs space-y-4">
      <div class="flex items-center justify-between">
        <div class="skeleton w-14 h-14 rounded-full"></div>
        <div class="skeleton h-8 w-20 rounded-lg"></div>
      </div>

      <div class="space-y-2">
        <div class="skeleton h-4 w-2/3"></div>
        <div class="skeleton h-3 w-1/3"></div>
      </div>

      <div class="space-y-1.5 pt-2">
        <div class="skeleton h-3 w-full"></div>
        <div class="skeleton h-3 w-5/6"></div>
        <div class="skeleton h-3 w-4/6"></div>
      </div>

      <div class="flex items-center gap-4 pt-3 border-t border-border/60">
        <div class="skeleton h-3 w-16"></div>
        <div class="skeleton h-3 w-16"></div>
      </div>
    </div>
  </section>

  <!-- Section 3: Blog / Article Card Skeleton -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Media / Blog Article Card Skeleton</h3>
      <p class="text-sm text-muted-foreground">Hero thumbnail, metadata badge, multi-line paragraph, and author footer placeholder.</p>
    </div>

    <div class="w-full max-w-md border border-border rounded-xl bg-card shadow-2xs overflow-hidden">
      <!-- Image Thumbnail Placeholder -->
      <div class="skeleton w-full h-48 rounded-none"></div>

      <div class="p-6 space-y-4">
        <!-- Category Badge & Date -->
        <div class="flex items-center justify-between">
          <div class="skeleton h-5 w-20 rounded-md"></div>
          <div class="skeleton h-3 w-16"></div>
        </div>

        <!-- Title -->
        <div class="space-y-2">
          <div class="skeleton h-5 w-full"></div>
          <div class="skeleton h-5 w-3/4"></div>
        </div>

        <!-- Excerpt -->
        <div class="space-y-1.5">
          <div class="skeleton h-3.5 w-full"></div>
          <div class="skeleton h-3.5 w-full"></div>
          <div class="skeleton h-3.5 w-2/3"></div>
        </div>

        <!-- Author Row -->
        <div class="flex items-center gap-3 pt-3 border-t border-border/60">
          <div class="skeleton w-8 h-8 rounded-full"></div>
          <div class="space-y-1 flex-1">
            <div class="skeleton h-3 w-24"></div>
            <div class="skeleton h-2.5 w-16"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 4: Data Table Skeleton -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Data Table Skeleton</h3>
      <p class="text-sm text-muted-foreground">Tabular data skeleton with header, checkboxes, and multi-column row placeholders.</p>
    </div>

    <div class="w-full border border-border rounded-xl bg-card shadow-2xs overflow-hidden">
      <!-- Table Header Skeleton -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-muted/20">
        <div class="skeleton h-8 w-48 rounded-lg"></div>
        <div class="flex items-center gap-2">
          <div class="skeleton h-8 w-24 rounded-lg"></div>
          <div class="skeleton h-8 w-24 rounded-lg"></div>
        </div>
      </div>

      <!-- Table Rows -->
      <div class="divide-y divide-border/60">
        <!-- Row 1 -->
        <div class="flex items-center gap-4 px-6 py-3.5">
          <div class="skeleton w-4 h-4 rounded-xs"></div>
          <div class="skeleton w-8 h-8 rounded-full flex-shrink-0"></div>
          <div class="skeleton h-3.5 w-40"></div>
          <div class="skeleton h-3.5 w-24 ml-auto"></div>
          <div class="skeleton h-5 w-16 rounded-full"></div>
          <div class="skeleton w-6 h-6 rounded-md flex-shrink-0"></div>
        </div>

        <!-- Row 2 -->
        <div class="flex items-center gap-4 px-6 py-3.5">
          <div class="skeleton w-4 h-4 rounded-xs"></div>
          <div class="skeleton w-8 h-8 rounded-full flex-shrink-0"></div>
          <div class="skeleton h-3.5 w-48"></div>
          <div class="skeleton h-3.5 w-20 ml-auto"></div>
          <div class="skeleton h-5 w-16 rounded-full"></div>
          <div class="skeleton w-6 h-6 rounded-md flex-shrink-0"></div>
        </div>

        <!-- Row 3 -->
        <div class="flex items-center gap-4 px-6 py-3.5">
          <div class="skeleton w-4 h-4 rounded-xs"></div>
          <div class="skeleton w-8 h-8 rounded-full flex-shrink-0"></div>
          <div class="skeleton h-3.5 w-36"></div>
          <div class="skeleton h-3.5 w-28 ml-auto"></div>
          <div class="skeleton h-5 w-16 rounded-full"></div>
          <div class="skeleton w-6 h-6 rounded-md flex-shrink-0"></div>
        </div>

        <!-- Row 4 -->
        <div class="flex items-center gap-4 px-6 py-3.5">
          <div class="skeleton w-4 h-4 rounded-xs"></div>
          <div class="skeleton w-8 h-8 rounded-full flex-shrink-0"></div>
          <div class="skeleton h-3.5 w-52"></div>
          <div class="skeleton h-3.5 w-24 ml-auto"></div>
          <div class="skeleton h-5 w-16 rounded-full"></div>
          <div class="skeleton w-6 h-6 rounded-md flex-shrink-0"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 5: Dashboard Metric Stats Skeleton -->
  <section class="space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-foreground">Dashboard Stat Cards Skeleton</h3>
      <p class="text-sm text-muted-foreground">4-column grid of key performance metric placeholders.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Stat Card 1 -->
      <div class="p-5 border border-border rounded-xl bg-card shadow-2xs space-y-3">
        <div class="flex items-center justify-between">
          <div class="skeleton h-3 w-20"></div>
          <div class="skeleton w-6 h-6 rounded-md"></div>
        </div>
        <div class="skeleton h-7 w-28"></div>
        <div class="skeleton h-3 w-32"></div>
      </div>

      <!-- Stat Card 2 -->
      <div class="p-5 border border-border rounded-xl bg-card shadow-2xs space-y-3">
        <div class="flex items-center justify-between">
          <div class="skeleton h-3 w-24"></div>
          <div class="skeleton w-6 h-6 rounded-md"></div>
        </div>
        <div class="skeleton h-7 w-24"></div>
        <div class="skeleton h-3 w-28"></div>
      </div>

      <!-- Stat Card 3 -->
      <div class="p-5 border border-border rounded-xl bg-card shadow-2xs space-y-3">
        <div class="flex items-center justify-between">
          <div class="skeleton h-3 w-16"></div>
          <div class="skeleton w-6 h-6 rounded-md"></div>
        </div>
        <div class="skeleton h-7 w-32"></div>
        <div class="skeleton h-3 w-36"></div>
      </div>

      <!-- Stat Card 4 -->
      <div class="p-5 border border-border rounded-xl bg-card shadow-2xs space-y-3">
        <div class="flex items-center justify-between">
          <div class="skeleton h-3 w-22"></div>
          <div class="skeleton w-6 h-6 rounded-md"></div>
        </div>
        <div class="skeleton h-7 w-20"></div>
        <div class="skeleton h-3 w-26"></div>
      </div>
    </div>
  </section>
</div>
```

---

## Component Anatomy & Architecture

This component uses zero runtime JavaScript. All interactions, styling transitions, and state changes are handled natively by the browser engine via:
- **color-mix()**: Native browser execution without script parsing overhead.
- **keyframes**: Native browser execution without script parsing overhead.

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
