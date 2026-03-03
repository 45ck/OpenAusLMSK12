---
adr-id: "ADR-037"
title: "Domain State Machines"
status: "accepted"
decision-date: "2026-03-02"
scope: "normalized engineering decision record"
source-artifact: "[domain_state_machines.md](domain_state_machines.md)"
status-gate: "planning corpus + ADR governance review"
domain: "platform"
depends-on: []
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-037: Domain State Machines

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [domain_state_machines.md](domain_state_machines.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Domain State Machines

## Purpose

Define authoritative state transitions for core workflows before development so API and UI can align.

## 1) Admission Lifecycle

`inquiry -> application -> offer -> acceptance -> documented -> enrolled -> active | deferred | withdrawn`

- `inquiry` -> `application`: required at minimum: student intent + school context.
- `application` -> `offer`: after validation + capacity/risk checks.
- `offer` -> `acceptance`: requires guardian acceptance + compliance check.
- `acceptance` -> `documented`: evidence package complete.
- `documented` -> `enrolled`: year + class + house + enrollment links created.
- Any state -> `withdrawn`: immutable audit event with source actor + reason.

## 2) Attendance Session State

`planned -> open -> marking -> closed -> reconciled`

- `planned`: schedule created
- `open`: class/period active and roll-taking begins
- `marking`: one or more write events allowed
- `closed`: status finalization and notifications generated
- `reconciled`: parent communication + exception checks complete
- Emergency override state: `suspended` (used for evacuation/incident), transitions back to `open` or `closed`.

## 3) Workflow Definition Execution

`draft -> active -> in_progress -> blocked -> approved/rejected -> archived`

- `blocked` occurs for SLA breach, missing evidence, or consent conflict.
- Re-submission path: `blocked -> in_progress` allowed after remediation.
- Long-running workflows should emit heartbeat events every `T` interval.

## 4) Event/Excursion Lifecycle

`proposed -> consent_required -> scheduled -> active -> completed -> closed | incident`

- `consent_required` may remain pending while prep tasks progress.
- If consent invalidated: transition to `blocked` (requires explicit policy exception to resume).
- `completed` can still produce `incident` if follow-up required.

## 5) Incident / Wellbeing Case

`opened -> triage -> action_plan -> monitoring -> resolved | escalated`

- `escalated` transitions to external authority workflow.
- Records remain `sealed` after closure until retention expiry or legal hold removal.

## 6) Assessment / Markbook Review

`draft -> assigned -> submitted -> marker_review -> moderated -> finalised -> published`

- `marker_review` may loop to `assigned` for rework with audit reason.
- Moderation may apply only before `finalised`.

## 7) Financial Transaction State

`created -> pending -> settled -> reconciled -> reversed`

- `settled` may require manual review for high-value adjustments.
- `reversed` retains immutable original payment record.

## State Machine Rules

- Every state transition requires:
  - actor
  - reason code
  - timestamp
  - immutable trail event id
- Disallowed cross-domain transitions must be explicit in API contract tests.
- No destructive deletion of historical records in core operational domains; use closure + archival flags.






