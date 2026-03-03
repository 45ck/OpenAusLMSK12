# ADR-112: Research and Implementation Readiness Gate

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: planning, gating, and evidence policy
- **source-artifact**: [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md), [OPENAUSLMSK12_MASTER_PLAN.md](../../OPENAUSLMSK12_MASTER_PLAN.md)
- **status-gate**: ADR governance + implementation planning approval

## Context
The project has broad domain planning coverage, but execution quality depends on a single lock before any non-document tasks begin. Current artifacts are modular and mostly complete, but they are spread across domains and formats.

## Decision
Before any feature implementation begins, the project must satisfy one explicit readiness gate:

- **Readiness Gate (RG-0)** is PASS when all mandatory planning inputs are committed and cross-linked:
  - Canonical permissions model is stable (`domain_permissions_matrix.md`).
  - Core consent model is stable (`consent_and_household_access_matrix.md`, `wellbeing_privacy_and_redaction_model.md`).
  - Canonical schema and migrations are stable (`ERD_AND_DATA_MODEL.md`, `DB_IMPLEMENTATION_CHECKLIST.md`).
  - API surface baseline is stable (`api_contract_registry.md`, `api_and_webhook_contract_register.md`, `api_versioning...`, `ADR-108`).
  - Journey/route contracts are stable (`USER_JOURNEY_EXECUTION_GOVERNANCE.md`, `route_structure_and_component_contracts.md`, `route contracts` per workstream).
  - Quality gate plan is stable (`QUALITY_AND_TEST_STRATEGY_MATRIX.md`, `journey_test_matrix.md`, `evidence_matrix_and_gate_checklist.md`).
  - Operations readiness is stable (`observability_and_release_readiness_runbook.md`, `rollback_and_disaster_playbooks.md`, `DEPLOYMENT_TOPOLOGY_AND_DECOMPOSITION.md`).
  - Compliance controls are stable (`evidence_matrix_and_gate_checklist.md`, `retention_and_legal_holds_matrix.md`, `tenant_isolation_proof.md`).

- RG-0 is implemented as a manual checklist document tracked in PRs and release notes.
- Any story touching production data, auth, or audit flow is blocked until RG-0 is PASS.

## Consequences
- Planning artifacts become executable dependencies, not optional context.
- Domain leads must map each ticket to an ADR and an accepted artifact.
- Cross-domain inconsistency is reduced: no ticket can begin if its mandatory upstream contract or journey reference is missing.
- Future architectural changes must update RG-0 references as part of the same PR.

## Acceptance Criteria
- `docs/ADR_INDEX.md` includes every mandatory planning input above.
- The master execution branch contains at least one commit that points to RG-0 completion status.
- At least one negative journey scenario is documented and tested for every domain before coding in that domain.

