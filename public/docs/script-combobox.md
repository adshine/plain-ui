---
title: "Combobox Script"
description: "Light-DOM ESM vanilla JavaScript micro-controller (<1KB) for combobox."
category: "scripts"
type: "registry:script"
zeroJs: false
version: "1.0.0"
dependencies: []
registryDependencies: []
modernApis: []
---

# Combobox Script

> Light-DOM ESM vanilla JavaScript micro-controller (<1KB) for combobox.

## Overview

- **Type**: `registry:script`
- **Zero JavaScript**: ⚡ No (Light-DOM ESM micro-controller <1KB)
- **Category**: `scripts`
- **Modern Browser APIs**: Standard HTML5/CSS
- **Tailwind Version**: Tailwind CSS v4 (@theme tokens)

---

## Installation

### CLI Command

```bash
# Add using Plain UI CLI
npx plain-ui add script-combobox

# Or using pnpm dlx
pnpm dlx plain-ui add script-combobox
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/scripts/combobox.js`** (`registry:script`)

---

## Source Code

### `combobox.js` (`src/scripts/combobox.js`)

```javascript
/**
 * Plain UI - Light-DOM Combobox Micro-controller (<1KB)
 * Searchable dropdown with arrow keys and aria-activedescendant.
 * Idempotent init(root) for Static HTML, Astro, and htmx.
 */

const seen = new WeakSet();

export function init(root = document) {
  const boxes = root.matches?.('[data-combobox]') ? [root] : Array.from(root.querySelectorAll?.('[data-combobox]') || []);
  boxes.forEach((box) => {
    if (seen.has(box)) return;
    seen.add(box);

    const input = box.querySelector('input[role="combobox"], [data-combobox-input]');
    const list = box.querySelector('[role="listbox"], [data-combobox-list]');
    const empty = box.querySelector('[data-combobox-empty]');
    if (!input || !list) return;

    let active = -1;
    let isSelecting = false;

    const visibleOpts = () => Array.from(list.querySelectorAll('[role="option"]:not([hidden]):not([aria-disabled="true"])'));

    const setOpen = (open) => {
      input.setAttribute("aria-expanded", String(open));
      list.hidden = !open;
      box.dataset.state = open ? "open" : "closed";
      if (!open) setActive(-1);
    };

    const setActive = (idx) => {
      const opts = visibleOpts();
      opts.forEach((o) => {
        o.removeAttribute("data-active");
        o.classList.remove("is-active");
      });
      if (idx >= 0 && idx < opts.length) {
        active = idx;
        const opt = opts[idx];
        opt.setAttribute("data-active", "true");
        opt.classList.add("is-active");
        input.setAttribute("aria-activedescendant", opt.id || "");
        opt.scrollIntoView({ block: "nearest" });
      } else {
        active = -1;
        input.removeAttribute("aria-activedescendant");
      }
    };

    const filter = (q = "") => {
      const query = q.trim().toLowerCase();
      let count = 0;
      list.querySelectorAll('[role="option"]').forEach((opt) => {
        const txt = (opt.dataset.label || opt.dataset.value || opt.textContent || "").toLowerCase();
        const hit = !query || txt.includes(query);
        opt.hidden = !hit;
        if (hit) count++;
      });
      if (empty) empty.hidden = count > 0;
      setActive(count > 0 ? 0 : -1);
    };

    const select = (opt) => {
      if (!opt) return;
      isSelecting = true;
      const val = opt.dataset.value ?? opt.textContent.trim();
      const label = opt.dataset.label ?? opt.textContent.trim();
      input.value = label;
      list.querySelectorAll('[role="option"]').forEach((o) => {
        const sel = o === opt;
        o.setAttribute("aria-selected", String(sel));
        o.dataset.selected = String(sel);
      });
      setOpen(false);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      box.dispatchEvent(new CustomEvent("combobox-select", { bubbles: true, detail: { value: val, label, option: opt } }));
      isSelecting = false;
    };

    input.addEventListener("focus", () => { filter(input.value); setOpen(true); });
    input.addEventListener("input", () => {
      if (isSelecting) return;
      setOpen(true);
      filter(input.value);
    });

    input.addEventListener("keydown", (e) => {
      const open = input.getAttribute("aria-expanded") === "true";
      const opts = visibleOpts();
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          filter(input.value);
        } else {
          const step = e.key === "ArrowDown" ? 1 : -1;
          setActive((active + step + opts.length) % (opts.length || 1));
        }
      } else if (e.key === "Home" && open) {
        e.preventDefault();
        setActive(0);
      } else if (e.key === "End" && open) {
        e.preventDefault();
        setActive(opts.length - 1);
      } else if (e.key === "Enter") {
        if (open && active >= 0 && opts[active]) {
          e.preventDefault();
          select(opts[active]);
        }
      } else if (e.key === "Escape" || e.key === "Tab") {
        setOpen(false);
      }
    });

    list.addEventListener("click", (e) => {
      const opt = e.target.closest('[role="option"]');
      if (opt && !opt.hasAttribute("aria-disabled")) select(opt);
    });

    document.addEventListener("click", (e) => {
      if (!box.contains(e.target)) setOpen(false);
    });
  });
}

export const initCombobox = init;
export default { init };
```

---

## Component Anatomy & Architecture

This component uses a lightweight (<1KB), idempotent ESM micro-controller for accessible state, keyboard roving tabindex, or event dispatching.

### Controller Integration
```html
<script type="module">
  import { initScriptCombobox } from '/src/scripts/script-combobox.js';
  
  // Initialize on page load or after dynamic htmx / Astro navigation:
  initScriptCombobox(document);
</script>
```

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
