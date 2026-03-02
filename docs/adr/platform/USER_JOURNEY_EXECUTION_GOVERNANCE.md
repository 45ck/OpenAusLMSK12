# ADR-091: User Journey Execution Governance

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: engineering planning
- **source-artifact**: [FULL_SOFTWARE_ENGINEERING_PLAN.md](FULL_SOFTWARE_ENGINEERING_PLAN.md), [web_journey_map_and_navigation_matrix.md](../communications/web_journey_map_and_navigation_matrix.md)
- **status-gate**: pre-implementation planning

## Context
The feature set is enterprise-scale and safety-sensitive. Starting implementation from feature tickets without approved journeys increases the risk of consent, audit, and workflow defects that are difficult to unwind.

## Decision
Adopt **journey-first execution** as a mandatory planning gate:

- All execution work is scoped by the following persona families: `student`, `parent_carer`, `teacher`, `admin`, `principal`, `support_staff`, `finance_staff`, and `workforce_staff`.
- Each development stream must define at least one complete journey before coding any UI/API changes in that stream.
- Journeys are evidence-bearing artifacts with explicit states, side effects, and exceptions.

## Persona-Route Priority (Initial Set)
- `student`: dashboard → class access → attendance snapshot → assignment submit → wellbeing self-check.
- `parent_carer`: invite/link → attendance and incident visibility → consent review → payment visibility.
- `teacher`: roster → assignment publish → attendance marking → moderation/follow-up.
- `admin`: provisioning → enrolment transitions → schedule/resource changes → compliance snapshot.
- `principal`: institution KPI review → risk escalation → intervention assignment → governance export.
- `finance_staff`: invoice creation → reconciliation → payment exceptions → ledger audit.
- `workforce_staff`: leave/roster change → staffing conflict resolution → incident handoff.

## Acceptance Rules for a Journey
- A journey is blocked from implementation until it has:
  - A route-level contract (module route(s), permission scope, consent scope).
  - A state model (`idle`, `working`, `error`, `conflict`, `readonly`, `completed`).
  - Required backend events and audit entries.
  - At least five negative cases and three positive cases.
  - Accessibility fallback for constrained contexts (low bandwidth, interrupted sessions).
- Journey acceptance requires:
  - 100% of required permission checks specified.
  - 100% of required observability signals defined (trace id, actor id, tenant id).
  - No unresolved open questions.

## Delivery Coupling
- Journeys are grouped into release cohorts aligned to existing module dependencies:
  1) Trust + people + enrolment
  2) Attendance + timetable + communications
  3) Learning + assessment
  4) Wellbeing + events + compliance
  5) Finance + workforce + advanced analytics
- No cohort starts until prior cohort journeys are accepted.

## Consequences
- Reduces speculative development.
- Makes cross-team sequencing explicit before implementation.
- Prevents later correction cost on consent/permission edge cases.

## Required Links
- Journey planning now executes through:
  - [ADR-085 Web Journey Map And Navigation Matrix](../communications/web_journey_map_and_navigation_matrix.md)
  - [ADR-055 Journey Test Matrix](../reliability/journey_test_matrix.md)
  - [ADR-076 Route Structure And Component Contracts](route_structure_and_component_contracts.md)
