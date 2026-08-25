# Full-Stack Interaction QA: cli-doctor

- Run: `run_89a67e416aec4cc08b9f234be3b0fd6f`
- Case: `missing-config`
- Mode: `live`
- Verdict: `FAIL`
- Events: `4`
- Graph edges: `3`

## Evidence lanes

- `browser`: 1
- `db`: 1
- `frontend-state`: 1
- `logs`: 1

## Gates

- `PASS` G1-correlation
- `FAIL` G2-machine-legal
- `PASS` G3-idempotency
- `PASS` G4-stale-response
- `PASS` G5-optimistic-hygiene
- `PASS` G6-privacy

## Proof boundary

A passing UI state is not backend proof. Use the correlated graph and authoritative durable-state lane for terminal truth.
