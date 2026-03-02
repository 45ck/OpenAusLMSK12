# ADR-076: Route Structure And Component Contracts

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [route_structure_and_component_contracts.md](route_structure_and_component_contracts.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Route Structure and Component Contracts

## Purpose

Convert the master plan and user journeys into a concrete web architecture model before implementation.

## Persona-Scoped Top-Level Information Architecture

- `/{tenant}`: tenant shell and contextual navigation.
- `/{tenant}/dashboard`: persona-specific home cards and alert feed.
- `/{tenant}/people`: people, households, roles, and emergency contacts.
- `/{tenant}/enrolments`: admission lifecycle and year transitions.
- `/{tenant}/timetable`: class schedule, resources, substitutions, rooms.
- `/{tenant}/attendance`: class roll, staff roll, visitor register, incidents.
- `/{tenant}/learning`: classes, lessons, resources, assignments, uploads.
- `/{tenant}/assessment`: outcomes, markbook, reports, moderation artifacts.
- `/{tenant}/wellbeing`: wellbeing plans, health notes, behaviour, safety actions.
- `/{tenant}/events`: excursions, sports, interviews, consent, attendance.
- `/{tenant}/finance`: bills, invoices, payments, wallets/services, reconciliations.
- `/{tenant}/hr`: roster, leave, incidents, professional development.
- `/{tenant}/workflows`: form builder, approvals, SLA states.
- `/{tenant}/communications`: messaging inbox, notices, templates, audit trail.
- `/{tenant}/analytics`: teacher/leadership dashboards, exports, trends.
- `/{tenant}/compliance`: audit, retention, consent logs, legal hold status.
- `/{tenant}/settings`: tenant policies, integrations, API/webhooks, security.

## Core Shell Components

- `AppShell`
  - top navigation + context switcher + persona banner
  - global session/tenant guard
- `LeftNav` / `BottomNav` (mobile)
  - role-aware primary actions
- `DomainShell`
  - per-module layout with breadcrumbs and scoped quick actions
- `RouteGate`
  - permission + consent checks + legal hold checks before render
- `DraftPanel`
  - offline-safe draft editing, save/resume, conflict notices
- `AuditLink`
  - visible change log links for sensitive operations
- `ConsentBanner` and `ScopeChip`
  - explain redacted fields and active visibility mode

## Route-Level Contract Pattern

For each route:
- `path`, `module`, `persona`, `required_permissions`, `required_feature_flag`, `consent_scope`, `sensitive_fields`, `offline_behavior`, `audit_event`, `api_dependencies`.
- Every state-changing page must define:
  - optimistic update policy
  - idempotency strategy
  - negative-state display (`conflict`, `denied`, `expired`, `retry`)

## Recommended Routing State Machine

- `idle` -> `loading` -> `ready`
- `ready` may transition to:
  - `error` (validation, permission, network)
  - `conflict` (version mismatch, consent revoked mid-flow)
  - `locked` (record under moderation/hold)
  - `readonly` (tenant policy or audit mode)
  - back to `ready`
- `submitting` -> `submitted` -> `accepted/rejected` for command routes.

## Cross-Persona Navigation Rules

- Parent portal should never expose staff-only actions in route map.
- Student routes require `scope-limited` mode for family-linked records.
- Staff route set must not expose finance reconciliation unless permission granted.
- Admin routes require dual guard: role + explicit tenant policy state.

## API / View Binding Strategy

- Prefer query-per-view contracts for module pages.
- Long lists should be cursor paginated and filterable by tenant/year/persona scope.
- Use command routes for workflow transitions that require audit events.
- Use background polling for live status where immediate updates required (attendance batches, incident escalations).

## Accessibility and Mobile Priority

- WCAG 2.2 AA baseline.
- One primary action per screen, secondary actions hidden behind collapse patterns.
- All forms:
  - visible required indicators
  - explicit error-summary and per-field focus movement
  - no gesture-only interactions.
- Mobile:
  - tabular data as stacked cards when viewport is small
  - critical attendance/incident actions at thumb-reachable positions.

## Research Gaps to Close Before Build

- Real-world school IA benchmark from 2–3 comparable districts (navigation density and role complexity).
- Mobile field workflow benchmarks for attendance and consent review.
- Confirmation of preferred web framework constraints (SSR/CSR mix, auth patterns).







