# Large artifacts kept out of git

These were generated during the eval but excluded from the commit due to size:

- `_raw_full_excluded/` — full raw screenshot set (~2.9MB)
- `_temporal_frames_excluded/` / `_temporal_extracted_excluded/` — 106 extracted PNG frames from Playwright webm
- `_temporal_video_excluded/ba714cf278c7af9c80fe2752550597ca.webm` (~492KB) — local path during run: `evals/artifacts/temporal/video/`
- `_temporal_motion_excluded/` — analyze_motion output (high false-positive ratio from webm compression)

Commands to regenerate are in `evals/skills-visual-qa-2026-08-25.md`.
