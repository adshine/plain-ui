---
title: "Tabs Script"
description: "Light-DOM ESM vanilla JavaScript micro-controller (<1KB) for tabs."
category: "scripts"
type: "registry:script"
zeroJs: false
version: "1.0.0"
dependencies: []
registryDependencies: []
modernApis: []
---

# Tabs Script

> Light-DOM ESM vanilla JavaScript micro-controller (<1KB) for tabs.

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
npx plain-ui add script-tabs

# Or using pnpm dlx
pnpm dlx plain-ui add script-tabs
```

### Manual Installation

Copy the source files below directly into your project structure:
- **`src/scripts/tabs.js`** (`registry:script`)

---

## Source Code

### `tabs.js` (`src/scripts/tabs.js`)

```javascript
/**
 * Plain UI - Light-DOM Tabs Micro-controller (<1KB)
 * Accessible roving tabindex, Left/Right/Home/End keyboard navigation, aria-selected.
 * Idempotent init(root) for Static HTML, Astro, and htmx.
 */

const seen = new WeakSet();

export function selectTab(tab, focus = true) {
  const list = tab?.closest?.('[role="tablist"]');
  if (!list) return;
  list.querySelectorAll('[role="tab"]').forEach((t) => {
    const sel = t === tab;
    t.setAttribute("aria-selected", String(sel));
    t.setAttribute("tabindex", sel ? "0" : "-1");
    t.dataset.state = sel ? "active" : "inactive";
    const panelId = t.getAttribute("aria-controls");
    if (panelId) {
      const panel = document.getElementById(panelId) || list.parentElement?.querySelector(`#${panelId}`);
      if (panel) {
        panel.hidden = !sel;
        panel.dataset.state = sel ? "active" : "inactive";
      }
    }
  });
  if (focus) tab.focus();
  tab.dispatchEvent(new CustomEvent("tab-change", { bubbles: true, detail: { tab, value: tab.dataset.value || tab.id } }));
}

export function init(root = document) {
  const lists = root.matches?.('[role="tablist"]') ? [root] : Array.from(root.querySelectorAll?.('[role="tablist"]') || []);
  lists.forEach((list) => {
    if (seen.has(list)) return;
    seen.add(list);

    list.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab && list.contains(tab)) selectTab(tab, false);
    });

    list.addEventListener("keydown", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (!tab || !list.contains(tab)) return;
      const tabs = Array.from(list.querySelectorAll('[role="tab"]:not([disabled])'));
      const i = tabs.indexOf(tab);
      if (i === -1) return;

      const vert = list.getAttribute("aria-orientation") === "vertical";
      const keys = {
        [vert ? "ArrowDown" : "ArrowRight"]: (i + 1) % tabs.length,
        [vert ? "ArrowUp" : "ArrowLeft"]: (i - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };

      if (e.key in keys) {
        e.preventDefault();
        selectTab(tabs[keys[e.key]], true);
      }
    });
  });
}

export const initTabs = init;
export default { init, selectTab };
```

---

## Component Anatomy & Architecture

This component uses a lightweight (<1KB), idempotent ESM micro-controller for accessible state, keyboard roving tabindex, or event dispatching.

### Controller Integration
```html
<script type="module">
  import { initScriptTabs } from '/src/scripts/script-tabs.js';
  
  // Initialize on page load or after dynamic htmx / Astro navigation:
  initScriptTabs(document);
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
