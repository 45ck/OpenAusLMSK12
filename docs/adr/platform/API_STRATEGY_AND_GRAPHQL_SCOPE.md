# ADR-108: API Strategy and GraphQL Scope

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: external and internal API contract model
- **source-artifact**: [TECH_STACK_DECISION](TECH_STACK_DECISION.md)
- **status-gate**: ADR review + API contract registry

## Context
Feature breadth is high and field-level consent controls are strict. A stable interface model is required before implementation begins.

## Decision
Phase 1 uses **REST-first, contract-first APIs** for all write and read flows.

- Public/internal canonical contract: `/api/v1/...` and `OpenAPI` as source of truth.
- No GraphQL implementation in phase 1.
- GraphQL is explicitly disallowed for regulated write flows and consent-sensitive mutations.
- GraphQL remains an optional phase-2 read-accelerator if all criteria are met:
  - at least two independent consumer groups prove sustained over-fetch pain,
  - field-level masking and audit trails can be enforced at resolver layer with equivalent guarantees,
  - security and compatibility review signs off.

## Consequences
- All journey and integration tooling binds to REST contracts first; this reduces ambiguity for field authorization and audit logging.
- GraphQL can only be introduced behind an ADR and a contract migration checklist.

## Governance
- The integration contract register and webhook contract register must keep REST contract change history with compatibility notes.
- Breaking changes require dual-version support and migration guidance before deprecation.

