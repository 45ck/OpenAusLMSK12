---
adr-id: "ADR-009"
title: "Architecture Governance Baseline"
status: "accepted"
decision-date: "2026-03-02"
scope: "platform"
source-artifact: "ADR 009 architecture governance baseline"
status-gate: "adr governance"
domain: "core"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-009 Architecture Governance Baseline

## Status: Accepted
## Date: 2026-03-02

## Context
The planning corpus had multiple overlapping architectural documents (`ARCHITECTURE_DECISION_LOG.md`, `FULL_SOFTWARE_ENGINEERING_PLAN.md`, `OPENAUSLMSK12_SYSTEM_BLUEPRINT.md`) with repeated high-impact decisions that needed one authoritative source.

## Decision
For phase 1, adopt a single modular monolith architecture with strict internal module boundaries and the following mandatory controls:

- Modular monolith deployment with in-process module calls and explicit transaction/event boundaries.
- Versioned API-first contract discipline (`/api/v1/*`) with compatibility checks in CI.
- Event-driven side effects through outbox/inbox, explicit retry windows, and delivery ownership.
- Immutable audit semantics for sensitive writes and security-relevant actions.
- Consent-aware enforcement at both API and UI projection layers.
- No feature scope deferral for core platform domains; all domains enter planning from day 0 with gating by dependency and risk.
- AI and sensitive operations remain optional/policy-gated until governance controls are fully in place.
- Sensitivity classes drive masking, retention, and access rules for every regulated workflow.
- Domain implementation starts only after required contracts and gates are closed.

## Consequences
- Contradictory ad-hoc architecture choices are blocked by ADR requirement.
- Review cadence and scaffold sequencing are contract-first and evidence-first.
- Service extraction decisions are delayed until evidence shows measurable, bounded benefit.

## Action
- `ARCHITECTURE_DECISION_LOG.md` is now canonicalized as an ADR index and should no longer host normative decisions.
- New decisions should be evaluated against this ADR before implementation.



