---
title: "Floating Label Input"
description: "Pure CSS zero-JS floating label text inputs using :placeholder-shown transitions."
category: "inputs"
type: "registry:ui"
zeroJs: true
version: "1.0.0"
dependencies: []
registryDependencies: ["tokens"]
modernApis: [":placeholder-shown",":focus"]
---

# Floating Label Input

> Pure CSS zero-JS floating label text inputs using :placeholder-shown transitions.

## Overview

- **Type**: `registry:ui`
- **Zero JavaScript**: ✅ Yes (Pure HTML5 & Modern CSS)
- **Category**: `inputs`
- **Modern Browser APIs**: `:placeholder-shown`, `:focus`
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add input-floating

# Or using pnpm dlx
pnpm dlx plain-ui add input-floating
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/components/ui/input-floating.html`** (`registry:ui`)

---

## Source Code

### `input-floating.html` (`src/components/ui/input-floating.html`)

```html
<!-- 
  Plain UI - Floating Label Inputs (Origin UI Inspired)
  Zero-JS HTML5 + Tailwind CSS v4 Pure CSS Floating Labels
-->
<div class="flex flex-col gap-10 p-6 max-w-4xl mx-auto font-sans text-zinc-900 dark:text-zinc-100">

  <!-- Section Header -->
  <div class="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
    <div class="flex items-center gap-2">
      <span class="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">Form Controls</span>
      <span class="text-xs text-zinc-400">•</span>
      <span class="text-xs text-zinc-500">Pure CSS / Zero-JS</span>
    </div>
    <h2 class="text-2xl font-bold tracking-tight">Floating Label Inputs</h2>
    <p class="text-sm text-zinc-500 dark:text-zinc-400">
      Accessible floating labels utilizing HTML5 <code>placeholder-shown</code> pseudo-class, <code>peer</code> selectors, and Tailwind CSS v4.
    </p>
  </div>

  <!-- Variant 1: Outlined Floating Label (Border Notch) -->
  <div class="flex flex-col gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">01. Outlined Floating Label (Border Notch)</span>
    <div class="relative max-w-md">
      <input
        type="text"
        id="floating-outlined"
        placeholder=" "
        class="peer block w-full rounded-lg border border-zinc-300 bg-transparent px-3.5 pt-4 pb-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
      />
      <label
        for="floating-outlined"
        class="pointer-events-none absolute left-3 top-3 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-1 text-xs font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-3 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
      >
        Email address
      </label>
    </div>
  </div>

  <!-- Variant 2: Inset / Filled Floating Label -->
  <div class="flex flex-col gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">02. Inset Filled Floating Label</span>
    <div class="relative max-w-md rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors focus-within:border-zinc-900 dark:focus-within:border-zinc-300 focus-within:ring-1 focus-within:ring-zinc-900 dark:focus-within:ring-zinc-300">
      <input
        type="text"
        id="floating-filled"
        placeholder=" "
        class="peer block w-full bg-transparent px-3.5 pt-5 pb-2 text-sm text-zinc-900 focus:outline-none dark:text-zinc-100"
      />
      <label
        for="floating-filled"
        class="pointer-events-none absolute left-3.5 top-1.5 z-10 origin-[0] text-xs font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-zinc-900 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
      >
        Full name
      </label>
    </div>
  </div>

  <!-- Variant 3: Underlined Floating Label -->
  <div class="flex flex-col gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">03. Underlined Floating Label (Minimalist)</span>
    <div class="relative max-w-md">
      <input
        type="text"
        id="floating-underline"
        placeholder=" "
        class="peer block w-full border-0 border-b-2 border-zinc-300 bg-transparent px-0 py-2.5 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300"
      />
      <label
        for="floating-underline"
        class="pointer-events-none absolute left-0 top-2.5 z-10 origin-[0] -translate-y-5 scale-75 font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-2.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-2.5 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-zinc-900 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
      >
        Project title
      </label>
    </div>
  </div>

  <!-- Variant 4: Floating Label with Leading Icon -->
  <div class="flex flex-col gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">04. Floating Label with Leading Icon</span>
    <div class="relative max-w-md">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 dark:text-zinc-500">
        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
        </svg>
      </div>
      <input
        type="email"
        id="floating-leading-icon"
        placeholder=" "
        class="peer block w-full rounded-lg border border-zinc-300 bg-transparent pl-10 pr-3.5 pt-4 pb-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
      />
      <label
        for="floating-leading-icon"
        class="pointer-events-none absolute left-10 top-3 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-1 text-xs font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-3 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
      >
        Username or Email
      </label>
    </div>
  </div>

  <!-- Variant 5: Floating Label with Trailing Action -->
  <div class="flex flex-col gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">05. Floating Label with Trailing Action</span>
    <div class="relative max-w-md">
      <input
        type="text"
        id="floating-trailing-action"
        placeholder=" "
        class="peer block w-full rounded-lg border border-zinc-300 bg-transparent pl-3.5 pr-10 pt-4 pb-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
      />
      <label
        for="floating-trailing-action"
        class="pointer-events-none absolute left-3 top-3 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-1 text-xs font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-3 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
      >
        API Key
      </label>
      <button
        type="button"
        aria-label="Copy to clipboard"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
      >
        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Variant 6: Floating Label with Real-time Validation State -->
  <div class="flex flex-col gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">06. Floating Label with Real-Time Validation</span>
    <div class="relative max-w-md">
      <input
        type="email"
        id="floating-validation"
        placeholder=" "
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
        class="peer block w-full rounded-lg border border-zinc-300 bg-transparent px-3.5 pt-4 pb-2 text-sm text-zinc-900 focus:outline-none focus:ring-1 peer-invalid:border-red-500 peer-invalid:focus:border-red-500 peer-invalid:focus:ring-red-500 peer-valid:border-emerald-500 peer-valid:focus:border-emerald-500 peer-valid:focus:ring-emerald-500 dark:border-zinc-700 dark:text-zinc-100"
      />
      <label
        for="floating-validation"
        class="pointer-events-none absolute left-3 top-3 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-1 text-xs font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-3 peer-focus:-translate-y-4 peer-focus:scale-75 peer-invalid:peer-focus:text-red-500 peer-valid:peer-focus:text-emerald-600 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-valid:peer-focus:text-emerald-400"
      >
        Verified corporate email
      </label>
      <p class="mt-1 hidden text-xs text-red-500 peer-invalid:peer-[:not(:placeholder-shown)]:block">
        Please provide a valid corporate email format.
      </p>
      <p class="mt-1 hidden text-xs text-emerald-600 dark:text-emerald-400 peer-valid:peer-[:not(:placeholder-shown)]:block">
        Email format looks great!
      </p>
    </div>
  </div>

  <!-- Variant 7: Floating Label Sizes (Small, Default, Large) -->
  <div class="flex flex-col gap-4">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">07. Floating Label Sizing Scales</span>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Small -->
      <div class="relative">
        <input
          type="text"
          id="floating-sm"
          placeholder=" "
          class="peer block w-full rounded-md border border-zinc-300 bg-transparent px-2.5 pt-3 pb-1 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300"
        />
        <label
          for="floating-sm"
          class="pointer-events-none absolute left-2.5 top-2 z-10 origin-[0] -translate-y-3.5 scale-75 bg-white px-1 text-[11px] font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:text-zinc-400 peer-focus:top-2 peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
        >
          Small (sm)
        </label>
      </div>

      <!-- Medium / Default -->
      <div class="relative">
        <input
          type="text"
          id="floating-md"
          placeholder=" "
          class="peer block w-full rounded-lg border border-zinc-300 bg-transparent px-3.5 pt-4 pb-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300"
        />
        <label
          for="floating-md"
          class="pointer-events-none absolute left-3 top-3 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-1 text-xs font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-3 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
        >
          Default (md)
        </label>
      </div>

      <!-- Large -->
      <div class="relative">
        <input
          type="text"
          id="floating-lg"
          placeholder=" "
          class="peer block w-full rounded-xl border border-zinc-300 bg-transparent px-4 pt-5 pb-2.5 text-base text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300"
        />
        <label
          for="floating-lg"
          class="pointer-events-none absolute left-3.5 top-3.5 z-10 origin-[0] -translate-y-4.5 scale-75 bg-white px-1 text-sm font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:top-3.5 peer-focus:-translate-y-4.5 peer-focus:scale-75 peer-focus:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
        >
          Large (lg)
        </label>
      </div>
    </div>
  </div>

  <!-- Variant 8: Floating Label Pill / Rounded-Full -->
  <div class="flex flex-col gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">08. Floating Label Pill</span>
    <div class="relative max-w-md">
      <input
        type="text"
        id="floating-pill"
        placeholder=" "
        class="peer block w-full rounded-full border border-zinc-300 bg-transparent px-5 pt-4 pb-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300"
      />
      <label
        for="floating-pill"
        class="pointer-events-none absolute left-5 top-3 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-1.5 text-xs font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-3 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
      >
        Search tag or keyword
      </label>
    </div>
  </div>

  <!-- Variant 9: Floating Label Textarea -->
  <div class="flex flex-col gap-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">09. Floating Label Textarea</span>
    <div class="relative max-w-md">
      <textarea
        id="floating-textarea"
        rows="3"
        placeholder=" "
        class="peer block w-full rounded-lg border border-zinc-300 bg-transparent px-3.5 pt-5 pb-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300 dark:focus:ring-zinc-300 resize-none"
      ></textarea>
      <label
        for="floating-textarea"
        class="pointer-events-none absolute left-3 top-3 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-1 text-xs font-medium text-zinc-500 duration-150 peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:top-3 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:peer-focus:text-zinc-200"
      >
        Write notes or instructions...
      </label>
    </div>
  </div>

</div>
```

---

## Component Anatomy & Architecture

This component uses zero runtime JavaScript. All interactions, styling transitions, and state changes are handled natively by the browser engine via:
- **:placeholder-shown**: Native browser execution without script parsing overhead.
- **:focus**: Native browser execution without script parsing overhead.

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
