# Plain UI

<p align="center">
  <strong>The Zero-Runtime, Pure HTML/CSS Design System & CLI for Modern Web Development</strong>
</p>

---

## ⚡ What is Plain UI?

**Plain UI** is a copy-pasteable, zero-runtime UI component library and CLI built for pure HTML, Tailwind CSS v4, Astro, htmx, and server-rendered templates (Blade, Jinja, Rails, Django). 

Inspired by the workflow of [shadcn/ui](https://ui.shadcn.com), the craftsmanship of [Origin UI](https://originui.com), and the motion aesthetics of [Magic UI](https://magicui.design) and [Aceternity UI](https://ui.aceternity.com), Plain UI eliminates heavy JavaScript client bundles (~170KB+ saved) by harnessing modern web platform standards:

- 🪄 **Native Popover API** (popover="auto" / popover="hint") & **CSS Anchor Positioning** for dropdowns, popovers, and tooltips.
- 📐 **Native <dialog> element** with @starting-style & transition-behavior: allow-discrete for backdrop blur modals.
- ↕️ **interpolate-size: allow-keywords** for smooth zero-JS accordion expansion on native <details>.
- 💫 **Houdini CSS @property** typed angles for 60fps GPU-composited rotating border beams and conic shimmer buttons.
- 🎯 **Pure CSS :has() combinators** for macOS-style proximity dock magnification and real-time password strength checklists.
- 📜 **CSS Scroll-Driven Animations** (animation-timeline: view() / scroll(root)) and cross-document View Transitions.

---

## 🚀 Quick Start

### 1. Initialize Plain UI in your project

```bash
npx plain init
```

This detects your project setup (Tailwind v4, Pure CSS, Astro, Vite, Next.js), generates components.json, and installs:
- src/styles/tokens.css (3-tier OKLCH design tokens with 12 theme presets)
- src/styles/motion.css (Houdini registrations, easing curves, and keyframes)
- hui.lock (Deterministic SHA-256 integrity tracking)

### 2. Add Components

```bash
# Add foundational zero-JS primitives
npx plain add button dialog popover accordion sheet

# Add animated motion components
npx plain add border-beam shimmer-button dock bento-grid marquee glow-card

# Add Origin UI form controls
npx plain add input-floating input-addons input-password slider otp-input

# Add micro-JS interactive systems (<1KB Light-DOM ESM)
npx plain add tabs combobox command toast
```

### 3. Check for Upstream Updates without Overwriting Edits

```bash
npx plain diff
```

### 4. Run System Health & Accessibility Audits

```bash
npx plain doctor
```

---

## 📦 Component Taxonomy (33 Primitives / 80+ Variants)

| Category | Components | Key Web Platform Features |
| :--- | :--- | :--- |
| **Primitives** | button, dialog, popover, dropdown-menu, tooltip, sheet, accordion, skeleton | <dialog>, Popover API, CSS Anchor Positioning, interpolate-size |
| **Form Controls** | input-floating, input-addons, input-password, input-search, slider, otp-input, checkbox, radio | :has(), :placeholder-shown, custom range sliders, segmented PIN |
| **Motion & Physics** | border-beam, shimmer-button, dock, bento-grid, marquee, glow-card, scroll-reveal | @property, offset-path: rect(), :has() proximity scaling, view() |
| **Micro-JS (<1KB)** | tabs, combobox, command, toast | Light-DOM ESM, roving tabindex, Cmd+K palette, popover="manual" |

---

## 🤖 AI Coding Agent Integration

Plain UI includes standardized endpoints conforming to llmstxt.org for seamless context consumption by AI coding assistants (Claude Code, Cursor, Codex, Antigravity):

- **llms.txt**: Architectural overview, design tokens, and categorized component index.
- **llms-full.txt**: Complete 552 KB consolidated documentation and full component source code.
- **/r/[component].json**: 1-click shadcn-compatible registry endpoints.

---

## 🛠️ Monorepo Workspace

```bash
# Clone the repository
git clone https://github.com/adshine/plain-ui.git
cd plain-ui

# Install dependencies
pnpm install

# Build all packages with Turborepo
pnpm build

# Run the Astro live documentation & playground site
pnpm dev
```

---

## 📄 License

MIT © [adshine](https://github.com/adshine)
