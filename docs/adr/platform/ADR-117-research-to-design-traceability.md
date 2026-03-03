# ADR-117: Research-to-Design Traceability

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-03
- **scope**: research consolidation and design decision lineage
- **source-artifact**: [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md), [OPENAUSLMSK12_MASTER_PLAN.md](../../OPENAUSLMSK12_MASTER_PLAN.md), [QUALITY_AND_TEST_STRATEGY_MATRIX.md](QUALITY_AND_TEST_STRATEGY_MATRIX.md)
- **status-gate**: governance review + ADR completeness check

## Context
Research findings are currently split across multiple documents and implementation domains. Decision lineage is clear in intent but not always directly traceable from ticket to research basis.

## Decision
All future ADR updates and new ADRs in implementation domains must include the following traceability metadata:

- **research input**: at least one source in `inital-research/` or another plan-level discovery artifact.
- **design decision**: explicit transformation from research finding to constraint.
- **evidence claim**: what test, contract, or policy now proves the decision.

Implementation rule:
- For any ADR touching a domain package, add a `Research Link` line.
- For any new ticket, include `Supporting ADR` and `Research Link` references.

Quality rule:
- If a decision cannot be traced to a research or proven operational source, it is deferred to a follow-up ADR before implementation.

## Consequences
- Reduces silent re-design and duplicated analysis effort.
- Keeps historical reasoning available for future contributors and external review.
- Makes planning audits easier under open-source scrutiny and compliance review.

## Acceptance Criteria
- New or updated ADRs include at least one research provenance bullet.
- Ticket templates and release packets require research link fields.
- No critical domain ticket is approved without at least one supported research/design lineage entry.
