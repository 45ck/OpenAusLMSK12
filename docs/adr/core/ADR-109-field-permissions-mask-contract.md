# ADR-109: Field Permissions Mask Contract

## Metadata
- **status**: accepted
- **decision-date**: 2026-03-02
- **scope**: canonical authorization contract for field-level disclosure and redaction
- **source-artifact**: [ADR-006 Field-Level Permissions](ADR-006-field-level-permissions.md), [domain_permissions_matrix.md](../cross-cutting/domain_permissions_matrix.md)
- **status-gate**: implementation approval + API/schema contract review

## Context
`domain_permissions_matrix.md` captures role and domain permissions, but does not define how sensitive fields are redacted consistently across API and UI surfaces.

## Decision
- Define every sensitive column through a four-level `sensitivity_class`:
  - `public`
  - `internal`
  - `restricted`
  - `critical`
- Bind each sensitive field to:
  - `required_consents` (if any)
  - `allowed_disclosure_roles`
  - `requires_guardian_validation` (boolean)
  - `audit_visibility` (`full`, `masked`, `denied`)
- Runtime must apply a single function for all read paths:
  - evaluate route policy from `ADR-007` + field policy from this ADR
  - return field if allowed
  - return `field_redacted` reason metadata if not allowed
  - never return raw values for disallowed `critical` fields
- Add policy cache invalidation for role/consent changes so masking refreshes within 60 seconds.
- All outbound messages, forms, and documents inherit parent field policy context for attached payloads.

## Data and API Contract Impact
- Add field policy table in canonical model:
  - `field_policy(entity_type, field_name, sensitivity_class, requires_guardian_validation, requires_consents, disclosure_roles_json, masked_fallback_json)`
- Add admin route to preview field policy impact for a simulated actor:
  - `POST /api/v1/admin/field-policy/simulate`
- Add required API metadata for all list/read responses:
  - `meta.redactions[]` with field path and reason code.

## Test and Audit Requirements
- Field policy tests must include:
  - one positive and one negative case for each sensitivity class
  - one test for consent-conflict denial with explicit reason
  - one test for emergency override policy path where allowed by documented escalation.
- All denied field accesses must emit immutable audit events with:
  - actor, field, policy version, decision reason.

## Consequences
- No separate UI masking layer is allowed; UI receives policy decisions from API response metadata.
- Any new sensitive field requires explicit policy registration before module rollout.

