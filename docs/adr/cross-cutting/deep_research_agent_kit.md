# ADR-035: Deep Research Agent Kit

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: normalized engineering decision record
- **source-artifact**: [deep_research_agent_kit.md](deep_research_agent_kit.md)
- **status-gate**: planning corpus + ADR governance review

## Context
This file is normalized into ADR format to keep the documentation set clean and indexable under the ADR-first workflow.
# Deep Research Agent Kit

## Purpose

This kit gives the deep-research agent a strict operating model to produce implementation-ready outputs for every planning domain.

Use this as the execution brief before starting any research cycle.

## 1) Core Instructions

- Start from the source-of-truth docs:
  - [OPENAUSLMSK12_MASTER_PLAN.md](../../OPENAUSLMSK12_MASTER_PLAN.md)
  - [COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md](../../COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md)
- Do not invent behavior when evidence is missing.
- Every uncertain decision must be tagged with:
  - source gap
  - risk impact
  - validation plan
- Provide at least three independent evidence points for every non-trivial design recommendation.
- Distinguish legal/compliance constraints from product preferences.
- Default to least-privilege and auditability for safety-sensitive domains.

## 2) Output Contract (Mandatory for every artifact)

Each research artifact must include all sections:

- Decision
- Evidence
- Constraints
- Risks
- Open Questions
- Edge Cases (min 5 positive, min 5 negative)
- API Impact
- UI/UX Impact
- Data Model Impact
- Observability Impact
- Test Plan / Acceptance Criteria
- Owners and Review Status

## 3) Quality Rubric

- **A**: all sections present, evidence traceable, acceptance testable, no unresolved contradictions.
- **B**: complete with minor assumptions documented.
- **C**: section gaps or unsupported assumptions.
- **D**: partial work; not ready for build.

An artifact is **Build-Ready** only at A quality.

## 4) Research Domains and Artifact Checklist

| Domain | Mandatory Artifact | Quality Gate |
| --- | --- | --- |
| Tenant & Identity | `tenant_isolation_proof.md` | A |
| Household Access | `household_access_model.md` | A |
| Admissions | `admissions_lifecycle_erd.md` | A |
| Timetabling | `constraint_resolution_policy.md` | A |
| Attendance | `attendance_exception_catalogue.md` | A |
| Learning | `learning_domain_content_contracts.md` | A |
| Assessment | `assessment_schema_and_provenance.md` | A |
| Wellbeing | `wellbeing_privacy_and_redaction_model.md` | A |
| Communications | `communication_privacy_routing.md` | A |
| Events | `event_risk_and_consent_model.md` | A |
| Finance | `finance_billing_state_machine.md` | A |
| HR | `workforce_lifecycle_spec.md` | A |
| Workflow Engine | `workflow_escalation_formalization.md` | A |
| API/Integrations | `api_versioning_and_backward_compatibility.md` | A |
| AI Governance | `ai_policy_and_tenancy_model.md` | A |
| Observability | `sre_error_budget_and_alerts.md` | A |
| Compliance/Procurement | `compliance_control_registry.md` | A |
| Frontend & Accessibility | `personas_and_route_matrix.md` | A |
| Security Failure Modes | `security_failure_state_matrix.md` | A |

## 5) Research Session Workflow

1. Assign one domain per agent (or pair) and lock dependencies.
2. For each domain:
   - extract existing evidence from source docs and local references
   - identify missing evidence and flag explicit fetch tasks
   - draft decisions + alternatives
   - define API/UI/data/ops impacts
   - produce acceptance tests
3. Reconcile conflicts across domains (for example, route visibility vs consent scope).
4. Produce contradiction log with owners and resolution date.
5. Deliver Build-Ready artifacts only.

## 6) Cross-Domain Contradiction Rules

- If two domains conflict (for example, security vs UX), prioritize safety/legal compliance.
- If two domains diverge on data semantics, author a shared glossary and mapping table.
- If a domain has legal implications, route decision to Compliance/Privacy owner before final acceptance.

## 7) Suggested Agent Teams

- **Domain Team A (Trust & Compliance)**: Tenant, permissions, security, compliance.
- **Domain Team B (Core School Operations)**: Enrolment, attendance, wellbeing, events.
- **Domain Team C (Learning & Assessment)**: Learning, assessment, reporting.
- **Domain Team D (Platform Fabric)**: API, integrations, state, web structure, observability.
- **Domain Team E (Admin/Finance/HR)**: Finance, HR, communications, workflow forms.

Each artifact must carry the responsible team and review owner.

## 8) Escalation Policy

- Blocked research with unresolved legal/compliance uncertainty: escalate to legal/compliance owner before coding.
- Conflicting vendor claims: escalate to architecture owner and include evidence reconciliation.
- Any domain with no source basis: escalate and mark artifact as "not ready".

## 9) Starter Research Command Pack (Copy/Paste)

For each domain, run:

- "Summarise current evidence coverage."
- "Identify five unsupported assumptions."
- "Identify five edge cases (positive/negative)."
- "Define impact on: API, DB schema, RBAC, audit logs, UI."
- "Propose decisions and explicit fallback/rejection criteria."









