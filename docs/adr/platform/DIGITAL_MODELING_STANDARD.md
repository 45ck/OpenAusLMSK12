# ADR-093: UML and Behavioral Modeling Standard

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: software engineering design and documentation
- **source-artifact**: [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md), [ERD_AND_DATA_MODEL.md](ERD_AND_DATA_MODEL.md)
- **status-gate**: planning corpus + ADR governance review

## Context
Given the system breadth, textual specs alone are insufficient for cross-domain reasoning. Diagrams are needed to validate timing, ownership, and error propagation across trust, workflow, and consent boundaries.

## Decision
Use a standardized modeling set for all high-risk journeys, and require diagram artifacts in ADR context before implementation of those flows.

## Required Diagram Set
- **Sequence diagrams** for cross-service interactions in:
  - consent revocation propagation
  - incident creation and escalation
  - payment reconciliation lifecycle
  - class substitution handover
- **State machine diagrams** for:
  - enrolment transitions
  - workflow approvals
  - attendance lifecycle
  - finance invoice/payment states
- **ERD and relationship diagrams** for:
  - household/custody extensions
  - API client and secret lifecycle
  - document vault and retention lifecycle
- **Activity/flow diagrams** for:
  - emergency attendance and evacuation call flow
  - visitor onboarding and access expiry
  - report publish and redaction handling

## Diagram Requirements
- Diagrams are authored in Markdown with Mermaid-compatible syntax.
- Every diagram must include:
  - start and end conditions
  - actor or service ownership for each transition
  - failure branch coverage
  - audit/event side effects
  - security/privacy boundary annotations where sensitive state crosses boundary

## Storage Standard
- Keep diagram definitions inline in the owning ADR where practical.
- If an ADR exceeds readability limits, add one supplemental Mermaid block in that same ADR.
- Never create standalone diagram docs outside ADRs; all design modeling stays within ADR corpus.

## Approval Rule
- A high-risk flow cannot move to implementation until all required diagrams for that flow are complete and reviewed by architecture + trust + QA owners.

## Consequences
- Increases planning precision and reviewability before coding.
- Makes failure behavior explicit before release readiness checks.
- Provides consistent basis for migration, observability, and runbook design.
