---
adr-id: "ADR-013"
title: "Ai Data Classification And Retention"
status: "accepted"
decision-date: "2026-03-02"
scope: "normalized engineering decision record"
source-artifact: "[ai_data_classification_and_retention.md](ai_data_classification_and_retention.md)"
status-gate: "planning corpus + ADR governance review"
domain: "trust"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-013: Ai Data Classification And Retention

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [ai_data_classification_and_retention.md](ai_data_classification_and_retention.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Ai Data Classification And Retention

## Decision
Implement this area so that treat AI as tenant-governed optional capability with input/output policy enforcement and monitoring.

## Evidence
- [inital-research/ai_features_in_australian_k_12_learning_platforms_and_vendors.md](../../inital-research/ai_features_in_australian_k_12_learning_platforms_and_vendors.md)
- [inital-research/single_user_ai_setups_for_research_and_cli_coding_in_macquarie_university_ict.md](../../inital-research/single_user_ai_setups_for_research_and_cli_coding_in_macquarie_university_ict.md)
- [OPENAUSLMSK12_MASTER_PLAN.md](../../OPENAUSLMSK12_MASTER_PLAN.md)

## Constraints
- [AI] safety and traceability
- Australia-first privacy/compliance expectations must remain explicit and non-optional.
- No import/reconciliation path can bypass manual or automated consent checks.

## Risks
- Inconsistent historical data quality across school systems during onboarding.
- Policy drift when teams evolve schemas without updating contract artifacts.
- Blind spots in observability masking operational regressions.

## Open Questions
- What is the mandatory minimum safety envelope for first production tenant?
- Which decisions are tenant-configurable versus platform fixed?
- How are legal hold windows resolved when school-level retention differs from state requirements?

## Edge Cases (Positive)
- P1 expected path executed successfully under domain-safe state with full audit evidence.
- P2 expected path executed successfully under domain-safe state with full audit evidence.
- P3 expected path executed successfully under domain-safe state with full audit evidence.
- P4 expected path executed successfully under domain-safe state with full audit evidence.
- P5 expected path executed successfully under domain-safe state with full audit evidence.

## Edge Cases (Negative)
- N1 rejected gracefully with explicit policy reason and no data leakage.
- N2 rejected gracefully with explicit policy reason and no data leakage.
- N3 rejected gracefully with explicit policy reason and no data leakage.
- N4 rejected gracefully with explicit policy reason and no data leakage.
- N5 rejected gracefully with explicit policy reason and no data leakage.

## API Impact
- Add/update command and query endpoints for this domain with status + error contract updates.
- Add idempotency keys and request correlation IDs for all mutations.
- Publish contract version notes when payloads change.

## UI/UX Impact
- Add route-level and component-level guards keyed by domain permissions and consent.
- Show explainable denied states and action affordances.
- Ensure mobile-first flows for time-critical actions remain usable when partially offline.

## Data Model Impact
- Introduce/confirm entities, enums, and history snapshots used by this artifact.
- Add required indexes for tenant-scoped and audit-scoped queries.
- Preserve immutable provenance for sensitive mutations.

## Observability Impact
- Emit structured domain event for every transition in this artifact.
- Add latency/abort metrics and SLO labels per journey.
- Add alerting for policy violation, queue backlog, and retry exhaustion.

## Test Plan / Acceptance Criteria
- AC-1: five positive and five negative edge cases pass in automated checks.
- AC-2: at least one contract test for every touched endpoint.
- AC-3: at least one UI test for authorization denial and one for safe state recovery.
- AC-4: data migration tests for legacy to canonical state machine transitions.
- AC-5: evidence log includes reviewer, timestamps, and rationale for exception paths.

## Owners and Review Status
- Owner Team: Team D (Platform Fabric)
- Domain Reviewer: Security + Compliance + QA
- Status: Draft (ready for deep-research agent enrichment)








