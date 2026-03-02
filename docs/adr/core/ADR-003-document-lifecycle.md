# ADR-003 Document Lifecycle and Attachment Governance

## Status: Accepted
## Date: 2026-03-02

## Context
Research and platform requirements include medical, wellbeing, compliance, and evidence artifacts that require deterministic lifecycle handling.

## Decision
Introduce a first-class document vault with four linked entities:
- `document`
- `document_version`
- `document_scan`
- `document_retention_state`

## Rules
- Every sensitive attachment uses immutable `document_version` entries.
- Every version must complete scan decision before entering active use in regulated workflows.
- Deletion is represented as lifecycle state (`quarantined`, `hold`, `retained`, `erase_scheduled`, `erased`) and never by physical erase alone.
- Document lineage is tied to audit records through `resource_type/resource_id` and `document_id`.

## Consequences
- APIs can now enforce anti-malware policy + retention policy before any regulated use.
- Legal-hold and court/incident preservation can be implemented without mutating historical records.

## Action
`ERD_AND_DATA_MODEL.md` and `DB_IMPLEMENTATION_CHECKLIST.md` now include document artifacts.


