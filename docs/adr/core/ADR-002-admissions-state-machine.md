---
adr-id: "ADR-002"
title: "Admissions State Machine"
status: "accepted"
decision-date: "2026-03-02"
scope: "platform"
source-artifact: "ADR 002 admissions state machine"
status-gate: "adr governance"
domain: "core"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-002 Admissions State Machine

## Status: Accepted
## Date: 2026-03-02

## Context
The admissions model needed terminal states and exception transitions for safety/legal workflows and rework.

## Decision
Admissions is handled by `admissions_application.state` with the following transitions:
`inquiry -> application -> offer -> acceptance -> documented -> enrolled -> active`.
From any non-terminal state transitions may go to:
`waitlist`, `declined`, `withdrawn`, `deferred`, `transfer_pending`, `transferred`, `archived`.

## Rules
- `waitlist` can transition to `offer` when capacity allows.
- `declined` and `withdrawn` are terminal unless a new cycle application is created.
- `transfer_pending` requires explicit target school/year and transfer plan; `transferred` closes the source enrolment.
- `archived` is only reachable from `transferred`, `withdrawn`, and terminal inactive states.

## Consequences
- `enrolment_state_history` captures all legal transitions and evidence IDs.
- Reopen or rollback operations are event-driven, never hard-deleted state edits.

## Action
`domain_state_machines.md` and `ERD_AND_DATA_MODEL.md` were updated to match this contract.


