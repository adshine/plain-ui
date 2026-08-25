# Skills Visual QA Eval — Plain UI (2026-08-25)

Revised gate set (follow-up alignment with Antigravity / `agy` skill-fitness eval). **No Plain UI rewrites.**

Skills under test:
- [measured-visual-qa](https://github.com/adshine/skills/tree/master/measured-visual-qa) — **STATIC geometry (blocking)**
- [full-stack-interaction-qa](https://github.com/adshine/skills/tree/master/full-stack-interaction-qa) — **OUT of blocking set** (optional smoke / evidence gaps only)

## Repo layout (corrected)

| Path | Role |
|---|---|
| `apps/docs` | Astro docs + playground (`pnpm --filter @plain-ui/docs dev`) |
| `packages/registry/ui` | **Source-of-truth primitives** (HTML + companion CSS) |
| `packages/registry/motion/motion.css` | Houdini `@property`, motion tokens, PRM overrides |
| `packages/registry/tokens` | Design tokens |

There is **no** `packages/apps/docs`.

**Important:** `apps/docs` playground demos are simplified. Blocking gates were measured against **registry fixtures** served from `packages/registry/ui` at `http://127.0.0.1:4391/ui/<name>` (ephemeral fixture server), plus integrity probes on `apps/docs` at `http://127.0.0.1:4321`.

---

## Executive verdict

### Blocking gates (measured-visual-qa STATIC + platform behavior)

| # | Gate | Verdict | Evidence |
|---|---|---|---|
| 1 | Anchor tethering (split-button / popover) DOM vs expected ≤ **1 CSS px** | **PASS** | Split Δtop **0**; settings popover Δtop **0**, Δleft **0** |
| 2 | Dialog top-layer: `showModal`, focus trap, `::backdrop`, Escape | **PASS** | All four checks true |
| 3 | Discrete enter/exit: no 1-frame flash (`@starting-style` + `allow-discrete`) | **PASS** | rAF opacity 0 → 0.43 → 0.69 → 1; no sync full-opacity flash. **WAAPI seeking SKIPPED/INCOMPLETE** |
| 4 | Accordion `interpolate-size` / `::details-content`; exclusive `details[name]`; sibling X shift ≤1px | **PASS** | Exclusive open=1; sibling X maxΔ **0**; height changed across real-time samples. Seeking **SKIPPED** |
| 5 | `prefers-reduced-motion` zeroes transitions/keyframes in `motion.css` | **PASS** | Isolated motion.css: tokens **0ms**; transition/animation **1e-05s** under PRM |
| 6 | Zero-runtime integrity: no client JS errors / Astro hydration mismatch on core primitives | **PASS** | 0 pageerrors on fixtures + `apps/docs` button/dialog/popover/accordion |

**Blocking summary: PASS** (0 hard fails).

### Temporal seeking (explicit)

| Mode | Status |
|---|---|
| WAAPI / rAF-loop / GSAP / browser-clock seeking | **SKIPPED / INCOMPLETE** |
| Reason | `animation-adapters.md` does not cover `@starting-style`, `interpolate-size`/`::details-content`, native Popover top-layer, or CSS `@property`. **Do not block the eval** on missing CSS-native adapters. |
| What we did instead | Real-time DOM geometry + rAF opacity sampling + settled-state STATIC gates |

### full-stack-interaction-qa

| Status | Detail |
|---|---|
| **OUT OF BLOCKING SET** | Optional smoke only |
| Optional smoke | Native dialog/popover/`details[name]` covered by gates 2–4; Light-DOM toast/command/combobox fixtures load (companion scripts may be required for full interactivity) |
| HTTP / trace / DB | **Evidence gaps** (static design system) — **not a pass** |

### Warning-only (non-blocking)

| Item | Status |
|---|---|
| Anchor flip near edges | WARNING_ONLY — `position-try-fallbacks: flip-block` present; edge probe recorded |
| SDA reverse restore | WARNING_ONLY_INCOMPLETE — not fully measured |
| Houdini `@property` loop paint health | WARNING_ONLY — shimmer-button fixture; paint loop not blocking |
| Combobox/toast orphan nodes | WARNING_ONLY — best-effort; scripts may be absent in fixture wrapper |
| Component `:root` redefines `--motion-dur-*` outside PRM | WARNING_ONLY — tokens can stay non-zero on some UI pages; `!important` still kills transitions/animations |

---

## Commands & URLs

```bash
pnpm install
pnpm --filter @plain-ui/docs dev -- --port 4321
# Docs playground: http://127.0.0.1:4321/docs/components/{button,dialog,popover,accordion,...}

# Registry fixture server (eval harness, not committed):
node /tmp/skills-eval/fixture_server.mjs   # http://127.0.0.1:4391/ui/<primitive>

# Gate capture:
NODE_PATH=/tmp/node_modules node /tmp/skills-eval/capture_gates.mjs

# Official skill scripts (fetched from adshine/skills, not vendored):
python3 measured-visual-qa/scripts/measure_visual.py --help
python3 full-stack-interaction-qa/scripts/fsqa.py --help
```

Viewports used for STATIC: **1280×800** (primary). Mobile **390×844** used for edge-flip warning only.

Skills source: `https://github.com/adshine/skills/tree/master/{measured-visual-qa,full-stack-interaction-qa}`

---

## Measurements table

### G1 — Anchor tethering ≤1 CSS px

| Pair | Expected | Measured Δ (CSS px) | Verdict |
|---|---|---|---|
| Split-button chevron → `#split-menu-demo` | top ≈ trigger.bottom + 4 | **0.0** | PASS |
| Split horizontal | pop.right ≈ trigger.right (`span-left`) | **0.0** | PASS |
| Settings popover → trigger | top ≈ trigger.bottom + 8; left-aligned | **0.0 / 0.0** | PASS |

Source: `packages/registry/ui/button.html` (split), `packages/registry/ui/popover.html`  
Artifact: `evals/artifacts/gates-2026-08-25/annotated/g1-anchor-tether.png`  
Geometry: `evals/artifacts/gates-2026-08-25/geometry/g1-anchor.json`

### G2 — Dialog top-layer

| Check | Result |
|---|---|
| `showModal()` opens | true |
| Native focus stays inside dialog across Tab | true |
| `::backdrop` present (opacity/bg) | true |
| Escape closes | true |

Source: `packages/registry/ui/dialog.html` + `dialog.css`  
Artifact: `evals/artifacts/gates-2026-08-25/annotated/g2-dialog-top-layer.png`

### G3 — Discrete enter/exit (no 1-frame flash)

| Sample | opacity | transform (abbrev) |
|---|---|---|
| sync-after-showModal | **0** | scale≈0.96 |
| raf1 | **0** | scale≈0.96 |
| raf2 | **0.431** | interpolating |
| raf3 | **0.686** | interpolating |
| settled | **1** | identity |

No sync-tick full-opacity flash.  
`CSS.supports('selector(@starting-style)')` returned **false** in this Chromium even though behavior works — do not trust supports() alone.  
**Temporal seeking: SKIPPED/INCOMPLETE.**

### G4 — Accordion

| Check | Result |
|---|---|
| `html` / root `interpolate-size` | `allow-keywords` |
| Exclusive `details[name=faq-group]` | exactly one open after toggle |
| Sibling X shift on expand | maxΔ **0** (≤1) |
| Height motion | changed across real-time samples (`::details-content` path in registry CSS) |
| Seeking height timeline | **SKIPPED/INCOMPLETE** |

Source: `packages/registry/ui/accordion.html` (`details::details-content` transitions)  
Note vs playground: `apps/docs` accordion demo lacks `::details-content` rules — registry is authoritative for this gate.

### G5 — prefers-reduced-motion / `motion.css`

| Check | Result |
|---|---|
| Source `@media (prefers-reduced-motion: reduce)` | present; tokens → `0ms`; `animation-duration`/`transition-duration` → `0.01ms !important` |
| Isolated motion.css runtime under PRM | feedback/enter/exit **0ms**; transition/animation **1e-05s** |
| Component token override (warning) | e.g. `border-beam.html` redeclares `--motion-dur-feedback/enter` on `:root` outside PRM |

### G6 — Zero-runtime integrity

| Surface | pageerror / console error | hydration mismatch logs |
|---|---|---|
| fixtures: button, dialog, popover, accordion | 0 | 0 |
| `apps/docs`: same four slugs | 0 | 0 |

---

## Annotated screenshot references

1. `evals/artifacts/gates-2026-08-25/annotated/g1-anchor-tether.png`
2. `evals/artifacts/gates-2026-08-25/annotated/g2-dialog-top-layer.png`
3. `evals/artifacts/gates-2026-08-25/annotated/g3-immediate-open-ann.png` / `g3-settled-open-ann.png`
4. `evals/artifacts/gates-2026-08-25/annotated/g4-accordion.png`

Prior playground-slice stills remain under `evals/artifacts/annotated/` (button outline, dock, etc.) as supplementary STATIC context — **not** used as blocking fails under this revised gate set.

Machine-readable rollup: `evals/artifacts/gates-2026-08-25/gate-report.json`

---

## Temporal notes

- **SKIPPED/INCOMPLETE** for deterministic WAAPI/timeline seeking on CSS-native motion.
- Dialog enter proven via **rAF opacity samples** (discovery), not seek replay.
- Accordion height continuity observed in real time only; reverse exclusive restore implied by `details[name]` + settled PASS (sibling X Δ0).
- Prior playground-only accordion snap finding applies to **docs demos without `::details-content`**, not to registry `accordion.html`.

Raw webm / extracted frames remain excluded from git (see `evals/artifacts/EXCLUDED_LARGE_FILES.md`).

---

## Interaction QA (non-blocking)

`full-stack-interaction-qa` packs from the earlier pass stay under `evals/artifacts/fsqa/` as optional context:

- Docs search + clipboard: browser-lane evidence; HTTP/DB/trace = **gaps**
- `plain doctor` on empty cwd: `config/missing` terminal truth
- FSQA G2 machine gate failure = skill mismatch for static DS, **not** a Plain UI product fail

**Do not treat FSQA evidence gaps as PASS.**

---

## Skill fitness

### What measured-visual-qa caught that casual screenshots miss

1. Exact **0 CSS px** anchor tether deltas (split-button + popover).
2. Dialog enter opacity timeline proving no 1-frame full flash.
3. Accordion sibling **X** stability (0px) under exclusive expand.
4. PRM isolation vs component token override (warning).

### Poor fit / incomplete on this DS

| Platform feature | Adapter status | Eval handling |
|---|---|---|
| `@starting-style` + `allow-discrete` | Missing from `animation-adapters.md` | STATIC + rAF samples; seeking **SKIPPED** |
| `interpolate-size` / `::details-content` | Missing | Settled + real-time height; seeking **SKIPPED** |
| Native Popover / top-layer | Missing | Open/closed DOM + anchor geometry |
| CSS `@property` (Houdini) | Missing | Warning-only paint health |
| Scroll-driven animations | Partial (scroll sampling only) | Warning-only |

### Recommended skill patches (do **not** patch skills from this run; do **not** change Plain UI)

1. Extend `animation-adapters.md` with CSS-native adapters: `@starting-style`, discrete `display`/`overlay`/`content-visibility`, `interpolate-size` + `::details-content`, Popover top-layer sampling, `@property` paint sampling — mark seekability limits explicitly.
2. Treat `CSS.supports('selector(@starting-style)')` as advisory; prefer rAF opacity/transform samples.
3. Keep FSQA machines optional for static/CLI design systems; document `backend: none` so missing HTTP/DB/trace is gap, not fail, and keep FSQA out of DS blocking gates.
4. `measure_visual.py`: DOM-rect overlay mode for dark-on-light zinc UIs (brightness bbox remains brittle).

### full-stack-interaction-qa fitness

Poor primary fit for zero-runtime Plain UI. Useful only as optional correlation discipline for docs search/clipboard/CLI. **Excluded from blocking gates** by design in this revision.

---

## Defects / notes (document only — no Plain UI code changes)

| ID | Severity | Note |
|---|---|---|
| W-PRM-TOKEN | Warning | Some `packages/registry/ui/*.html` redeclare `--motion-dur-feedback/enter` outside PRM media query |
| DOCS-DEMO-GAP | Info | Playground accordion/dialog demos omit registry `::details-content` / full `@starting-style` CSS — measure registry for platform gates |
| B1 (prior) | Info (non-blocking here) | Playground outline button 38 vs 36 height — outside revised blocking set |

---

## Artifact index

```text
evals/skills-visual-qa-2026-08-25.md
evals/artifacts/gates-2026-08-25/gate-report.json
evals/artifacts/gates-2026-08-25/geometry/g1..g6*.json
evals/artifacts/gates-2026-08-25/annotated/*.png
evals/artifacts/gates-2026-08-25/raw/*.png
evals/artifacts/annotated/          # earlier playground STATIC stills
evals/artifacts/fsqa/               # optional FSQA packs (non-blocking)
evals/artifacts/EXCLUDED_LARGE_FILES.md
```
