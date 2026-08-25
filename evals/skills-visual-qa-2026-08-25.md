# Skills Visual QA Eval — Plain UI (2026-08-25)

Eval of [measured-visual-qa](https://github.com/adshine/skills/tree/master/measured-visual-qa) and [full-stack-interaction-qa](https://github.com/adshine/skills/tree/master/full-stack-interaction-qa) against **this** repo (`adshine/plain-ui`), not a rewrite of Plain UI.

## Executive verdict

| Surface | Static (1 CSS px / 2 CSS px gates) | Temporal | Notes |
|---|---|---|---|
| **Button** default + primary + disabled | **FAIL** (outline height) / PASS gaps & disabled | n/a | Outline `38×` vs filled `36×` (Δ **2.0 CSS px**). Owning cause: **box model mismatch** (1px border on outline without height compensation). Desktop `gap-4` edge gaps = **16.0** (PASS). Size-row centerY spread **0** (PASS). |
| **Dialog** open + closed | **PASS** | restore **PASS** | Open dialog centered in iframe (center Δ **0**). Closed → `display:none` / 0×0 box. Trigger geometry restored after close (Δ **0**). |
| **Accordion** open/closed | **PASS** (settled states) | **FAIL** claimed height motion | Settled open/closed heights PASS rhythm. Forward/reverse **snap** in ≤16ms; only chevron WAAPI transitions (200ms). `interpolate-size: allow-keywords` is set but **height does not interpolate** in the playground demo. |
| **Floating label input** | **PASS** | n/a | Empty labels sit inside inputs; focused/filled state captured. |
| **Dock** (motion/layout) | **PASS** | n/a | Icons **44×44**; gap-3 = **12**. Divider widens third center interval (intentional). |
| **Border-beam** | **PASS** (running animation) | adapter note | CSS `spin` exposed via `getAnimations()`; this demo is **not** Houdini `@property`-driven. |
| **Popover** open/closed | **PASS** (state) | adapter gap | Native `popover` top-layer works; no animation-adapter for popover/`@starting-style`. |

| Skill | Fitness on Plain UI |
|---|---|
| **measured-visual-qa** | **Useful** for static geometry + restore checks; **partially poor fit** for zero-runtime CSS motion (`interpolate-size`, `@starting-style`, `@property`, native popover). Scripts assume brightness-based paint bounds and WAAPI/GSAP seeking. |
| **full-stack-interaction-qa** | **Mostly poor fit** — no backend. Correctly forces **evidence gaps**. Applicable lanes: docs search (client filter), clipboard copy, CLI `doctor`/`add`. G2 machine gate fails without a custom machine (expected). |

**Do not declare pass from CSS alignment alone:** outline buttons report normal flex centering while measured border-box heights disagree by 2 CSS px.

---

## Environment & commands

```text
Repo:     /workspace (plain-ui monorepo)
Branch:   cursor/skills-visual-qa-eval-8bf7
Install:  pnpm install
Dev:      pnpm --filter @plain-ui/docs dev -- --port 4321
Playground: http://127.0.0.1:4321/  (Astro v5.18.2)
Component URLs:
  http://127.0.0.1:4321/docs/components/button
  http://127.0.0.1:4321/docs/components/dialog
  http://127.0.0.1:4321/docs/components/accordion
  http://127.0.0.1:4321/docs/components/floating-label-input
  http://127.0.0.1:4321/docs/components/border-beam
  http://127.0.0.1:4321/docs/components/dock
  http://127.0.0.1:4321/docs/components/popover
Viewports: 1280×800 (desktop), 390×844 (mobile), devicePixelRatio=1, light theme
Skills fetched: https://raw.githubusercontent.com/adshine/skills/master/{measured-visual-qa,full-stack-interaction-qa}/…
Harness (ephemeral): /tmp/skills-eval/  (scripts + capture_*.mjs; not committed)
Python measure: python3 measured-visual-qa/scripts/measure_visual.py …
CLI probe: node packages/cli/dist/index.js doctor  (cwd=/tmp/plain-fsqa-probe)
```

Playground demos render inside `.plain-playground iframe.sandboxed-preview-iframe` (`srcdoc` + Tailwind browser CDN). Geometry was measured **inside the iframe document**.

---

## Measurements table (CSS px, DPR=1)

### Button — default styles (desktop)

| Metric | Values | Gate | Verdict |
|---|---|---|---|
| Heights (Primary, Secondary, Outline, Destructive) | 36, 36, **38**, 36 | equal within **1** CSS px | **FAIL** outline |
| Edge gaps between buttons | 16, 16, 16 | ==16 ±1 | **PASS** |
| Owning cause | Outline uses `border` (+1 top/bottom) without matching height token | `box model mismatch` | — |

Annotated: [`artifacts/annotated/button__default-styles__desktop-1280x800__annotated.png`](artifacts/annotated/button__default-styles__desktop-1280x800__annotated.png)

### Button — sizes / loading / disabled (desktop)

| Metric | Values | Gate | Verdict |
|---|---|---|---|
| Heights | 28, 36, 48, 36 (loading), 36 (disabled) | intentional size scale | PASS (by design) |
| Disabled flags | loading `disabled=true` opacity **0.75**; disabled opacity **1** with muted colors | state present | PASS |
| Size-row centerY spread | **0.0** | ≤1 | **PASS** |
| WAAPI | 1 running `svg` spin (loading) | observed | PASS |

### Dialog

| State | display | box (w×h @ x,y) | Center Δ vs iframe | Verdict |
|---|---|---|---|---|
| closed | `none` | 0×0 | n/a | PASS |
| open | `block` | 448×343 @ (86.0, 37.5) | **0.0** | **PASS** |
| restore after close | trigger Δ x/y/w/h = **0** | — | — | **PASS** |

Annotated: [`artifacts/annotated/dialog__open__desktop-1280x800__annotated.png`](artifacts/annotated/dialog__open__desktop-1280x800__annotated.png)

### Accordion (`<details>` / `interpolate-size`)

| State | item heights | closed rhythm | Verdict |
|---|---|---|---|
| item1 open | **143.25**, 54, 54 | closed spread **0** | PASS settled |
| item2 open | 54, **143.25**, 54 | closed spread **0** | PASS settled |
| `html { interpolate-size }` | `allow-keywords` | set in iframe | present |
| Temporal forward (PNG @ ~16ms) | heights jump **89.25** in one sample | continuous height motion | **FAIL** (snap) |
| Reverse restore | open flags + heights Δ **0** vs start | ≤1 | **PASS** restore |
| WAAPI during toggle | 2× `svg` transitions, duration **200**, not height | chevron only | — |

Annotated: [`artifacts/annotated/accordion__item1-open__desktop-1280x800__annotated.png`](artifacts/annotated/accordion__item1-open__desktop-1280x800__annotated.png)

**Measurement trap:** closed `details` still report body `getBoundingClientRect().height ≈ 89.25` while the details box is 54. Skill guidance to separate trigger from expanded body is required; measuring the body alone misleads.

### Floating label input

| State | Observation | Gate | Verdict |
|---|---|---|---|
| empty | labels inside input boxes; `transform: none` | label ⊆ input | **PASS** |
| focused-filled | value set + focus captured | state change | PASS (geometry file) |

Annotated: [`artifacts/annotated/floating-label-input__empty__desktop-1280x800__annotated.png`](artifacts/annotated/floating-label-input__empty__desktop-1280x800__annotated.png)

### Dock

| Metric | Values | Gate | Verdict |
|---|---|---|---|
| Icon sizes | 44×44 ×4 | ±1 | **PASS** |
| Edge gaps | 12, 12, 29 (divider) | first two ==12 ±1 | **PASS** |
| Painted centers (measure_visual) | (217,205), (273,205), (329,205), (402,205) | y aligned | PASS |
| Center-X intervals | 56, 56, 73 | divider explains 73 | PASS (intentional) |

Annotated: [`artifacts/annotated/dock__idle__desktop-1280x800__annotated.png`](artifacts/annotated/dock__idle__desktop-1280x800__annotated.png) · measure_visual: [`artifacts/annotated/dock__idle__measure_visual.png`](artifacts/annotated/dock__idle__measure_visual.png)

### Border-beam

| Metric | Value | Verdict |
|---|---|---|
| `getAnimations()` | 1 running, duration 4000 (spin) | PASS running |
| `@property` usage in this playground HTML | **not present** (conic-gradient + `animate-[spin_…]`) | Hypothesis partially discarded for this demo |

Annotated: [`artifacts/annotated/border-beam__animating__desktop-1280x800__annotated.png`](artifacts/annotated/border-beam__animating__desktop-1280x800__annotated.png)

### Mobile 390×844 (selected)

| Component | Result |
|---|---|
| Button gaps | Edge-gap gate **FAIL** numerically (−166 / 16 / −153) because **flex-wrap** stacks buttons; classification = **responsive wrap**, not a spacing bug. Heights still 36/36/38/36. |
| Accordion / Dialog | Settled gates **PASS** (same as desktop within iframe). |

---

## Annotated screenshot references

Minimum required stills (committed):

1. `evals/artifacts/annotated/button__default-styles__desktop-1280x800__annotated.png` — outline height fail
2. `evals/artifacts/annotated/accordion__item1-open__desktop-1280x800__annotated.png` — open/closed boxes
3. `evals/artifacts/annotated/dialog__open__desktop-1280x800__annotated.png` — centered modal
4. `evals/artifacts/annotated/dock__idle__desktop-1280x800__annotated.png` — icon rhythm
5. (+ bonus) floating-label, border-beam, measure_visual accordion/dock overlays

Raw iframe counterparts: `evals/artifacts/raw-selected/`.

---

## Temporal notes (accordion expand/collapse)

**Path:** start (item0 open) → click item1 summary → settled → click item0 summary → restored.

| Evidence | Result |
|---|---|
| Playwright webm | `evals/artifacts/temporal/video/ba714cf278c7af9c80fe2752550597ca.webm` during run (~492KB) — **not committed**; see `video-path.json` |
| `extract_video_frames.py` | 106 real frames @ ~25fps / 40ms (script nests under `output/frames/`) |
| `analyze_motion.py` | Peak changed-ratio **0.68** — **unusable** on lossy webm (whole-frame compression noise). OpenCV/SSIM unavailable in env (`opencv_available: false`) |
| PNG sequence (authoritative) | Heights change only once per direction (`start→fwd-0`, `fwd-settled→rev-0`), Δh=**89.25**; no intermediate heights across 12×16ms samples |
| Restore | `passGate1px: true`, `passOpenState: true` (`restore-check.json`) |
| Deterministic seek | `document.getAnimations()` pauses 2 chevron transitions; seeking 0–200ms **does not** change details heights (already settled). **No adapter** for `interpolate-size` height/`::details-content` |

**Verdict:** Reverse motion restores start geometry (**PASS**). Claimed smooth height animation is **not observed** (**FAIL** temporal expectation vs docs copy). Chevron rotation is the only timed motion.

Dialog open/close restore also Δ0 (`temporal/png-sequence/dialog-restore.json`).

---

## Interaction QA (full-stack-interaction-qa)

Plain UI is mostly zero-runtime HTML/CSS. Applied only where interaction exists.

### Docs search (`Ctrl+K`)

| Lane | Evidence |
|---|---|
| browser | Dialog `open: true`; filter `accordion` → **1** visible item; navigation to `/docs/components/accordion` |
| frontend-state | Client-side `style.display` filter |
| http / db / traces | **Evidence gaps** recorded (no API, DB, or tracing) |
| fsqa gates | G1 PASS; **G2 FAIL** (`no machine assertion`) — expected without custom `machine-*.json` |

Pack: `evals/artifacts/fsqa/run-docs-search/` (see `report.md`, `timeline.jsonl`).

### Copy to clipboard

Clipboard preview: `npx plain-ui add button` (`matched: true`). Local-only; HTTP evidence gap noted.

### CLI (`plain doctor` / `plain add`)

```text
node packages/cli/dist/index.js doctor   # cwd=/tmp/plain-fsqa-probe
→ ERROR config/missing components.json (expected)
node packages/cli/dist/index.js add --help  # lists add options
```

No production fault injection. No backend to fault.

**Skill verdict:** Correlation pack + gap discipline is valuable; stock machines (`machine-search.json`, payment, upload) do not map cleanly to static docs/CLI. Treat G2 failure as **skill/product mismatch**, not a Plain UI product defect.

---

## Skill fitness (meta-eval)

### What measured-visual-qa caught that a casual screenshot would miss

1. **Outline button +2 CSS px height** vs siblings despite “visually fine” flex alignment.
2. **Accordion height snap** (no intermediate frames) despite marketing/`interpolate-size` setup.
3. **Closed-details body rect trap** (descendant height ≠ visible box).
4. **Restore geometry** after dialog/accordion reverse (numeric Δ0, not vibes).
5. **Webm compression** false motion — skill’s own anti-pattern guidance validated.

### Poor fit areas (zero-runtime CSS / platform features)

| Platform feature | Adapter coverage today | Observed |
|---|---|---|
| `interpolate-size` / height `auto` | **Missing** | Set on `<html>` but no height transition samples |
| `@starting-style` / discrete dialog transitions | **Missing** (`CSS.supports('selector(@starting-style)')` → false in Chromium used here) | Dialog appear/disappear without seekable timeline |
| Native `popover` top-layer | **Missing** | Open/closed measurable via `:popover-open`; no seek API |
| Houdini `@property` | **Missing** (hypothesis) | Border-beam demo uses ordinary CSS spin via WAAPI — **hypothesis discarded for this demo**; still a real gap for registry motion tokens that do use `@property` |
| Scroll-driven animations | Mentioned only as scroll sampling | Not in evaluated slice |

`references/animation-adapters.md` covers browser clock, WAAPI, GSAP, rAF, scroll, springs — **not** the Plain UI stack above.

### Script / tooling gaps

| Tool | Gap on this design system |
|---|---|
| `measure_visual.py` | Brightness≥threshold bbox favors light paint; dark zinc buttons need inverted logic or DOM-rect overlays (we added DOM annotations). Accordion `horizontal_rules` latched onto text baselines (interval_spread **89**) — thresholds brittle. |
| `analyze_motion.py` | Needs OpenCV/skimage for strong metrics; webm recordings dominate noise without PNG sequences / masks. |
| `extract_video_frames.py` | Writes to `output/frames/` (easy to double-nest if `--output` already ends in `frames`). |
| Playwright clock | Unlikely to drive compositor-only CSS / top-layer native transitions (skill already warns). |
| FSQA `gates` G2 | Requires `assert-machine` with `machine_event` payloads — docs/CLI need a bespoke machine DSL. |

---

## Recommended skill patches (do **not** apply in this run)

1. **animation-adapters.md:** add sections for `@starting-style`, `interpolate-size` + `::details-content` / `transition-behavior: allow-discrete`, CSS `@property`, and native Popover/Top Layer sampling (open/closed + computed top-layer rects; document non-seekability).
2. **measure_visual.py:** optional `mode: "dark-on-light" | "light-on-dark"`; DOM-rect import from JSON for annotation when paint thresholds fail.
3. **temporal-playbook.md:** prefer PNG rAF bursts for discrete CSS; treat webm as discovery-only when peak changed-ratio ≫ expected region.
4. **full-stack-interaction-qa:** ship `machine-docs-search.json` and `machine-cli-doctor.json` for static-site/CLI products; allow G2 skip when scenario declares `backend: none`.
5. **extract_video_frames.py:** if `--output` already named `frames`, do not nest another `frames/`.

---

## Defects found (document, not fixed)

| ID | Severity | Spec | Evidence |
|---|---|---|---|
| B1 | Medium | Equal-height button row within **1 CSS px** | Outline 38 vs 36; classification **box model mismatch** |
| A1 | Medium | Docs claim smooth accordion height via `interpolate-size` | PNG temporal: single-frame height jump; only chevron animates |

No one-liner fix applied (would need before/after under same spec; prefer documenting for this eval).

---

## Artifact index

```text
evals/skills-visual-qa-2026-08-25.md          ← this report
evals/artifacts/annotated/*.png|*.json        ← annotated stills + gate notes
evals/artifacts/geometry/*.json               ← getBoundingClientRect + computed styles
evals/artifacts/measure-reports/*.json        ← official measure_visual.py output
evals/artifacts/temporal/                     ← restore checks, timeline, selected stills
evals/artifacts/fsqa/                         ← interaction packs + CLI doctor log
evals/artifacts/raw-selected/                 ← unannotated iframe stills
evals/artifacts/EXCLUDED_LARGE_FILES.md       ← video/frames paths omitted from git
```
