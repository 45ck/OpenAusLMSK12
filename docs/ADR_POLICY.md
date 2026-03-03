# ADR Policy and Scope

## Rule
- All engineering and execution decisions are recorded as ADRs.
- Valid non-ADR documents are limited to:
  - `OPENAUSLMSK12_MASTER_PLAN.md`
  - Research corpus:
    - `COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md`
    - `inital-research/`
- ADRs are now validated through a machine-readable registry:
  - `docs/adr/ADR_REGISTRY.json`
  - `docs/adr/ADR_CONTRADICTION_MATRIX.json`
- Every ADR should include structured front-matter metadata so it can be parsed and validated automatically.

## Enforcement
- The core ADR set remains in `adr/core` (`ADR-001` through `ADR-010`).
- `ARCHITECTURE_DECISION_LOG.md` and `TECH_STACK_DECISION.md` are legacy pointers that still participate in ADR governance and must not host standalone policy text.

## Revision Control
- Changes to policy or governance process must be logged as ADR edits in `adr/core/` or a numbered `ADR-###` document under `adr/platform` and reflected in the registry.


