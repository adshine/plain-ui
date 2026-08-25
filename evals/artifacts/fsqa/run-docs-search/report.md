# Full-Stack Interaction QA: docs-search

- Run: `run_96d0de0d400740a2a4e1c5e31c656a1e`
- Case: `happy-filter`
- Mode: `live`
- Verdict: `FAIL`
- Events: `11`
- Graph edges: `9`

## Evidence lanes

- `browser`: 6
- `db`: 1
- `frontend-state`: 1
- `http`: 2
- `traces`: 1

## Gates

- `PASS` G1-correlation
- `FAIL` G2-machine-legal
- `PASS` G3-idempotency
- `PASS` G4-stale-response
- `PASS` G5-optimistic-hygiene
- `PASS` G6-privacy

## Proof boundary

A passing UI state is not backend proof. Use the correlated graph and authoritative durable-state lane for terminal truth.
