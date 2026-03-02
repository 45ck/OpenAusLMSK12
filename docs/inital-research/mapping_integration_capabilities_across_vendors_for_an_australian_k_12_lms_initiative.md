# Mapping Integration Capabilities Across Vendors for an Australian K‑12 LMS Initiative

## Executive summary

OpenAusLMSK12’s integration posture should be **standards-first, hub‑and‑spoke**, with a small number of mandatory interoperability standards (SSO + rostering + tool interop) and an extensible connector layer for vendor‑specific APIs and eventing. Minimising bespoke point-to-point integrations reduces lifecycle cost, improves change resilience (vendor upgrades, policy changes), and improves procurement comparability across competing products. citeturn8search3turn12search18turn11view0turn11view1turn11view2

In the Australian context, **NSIP** (Education Services Australia) positions interoperability as nationally coordinated work “based on agreed interoperability standards,” and **ST4S** is now a mainstream procurement and assurance expectation across jurisdictions and sectors. ST4S explicitly assesses (among other domains) **interoperability criteria** including data standards support (e.g., SIF‑AU, OneRoster), technical integration mechanisms (native/partner integrations, open APIs, FTP/SFTP, feeds, direct DB), and whether suppliers have undertaken assurance such as **SIF Assurance**, **OneRoster conformance**, **LTI**, and **NSIP HITS** testing. citeturn8search3turn11view0turn11view1turn11view2turn12search5

A single set of “anchor” standards should be prioritised for OpenAusLMSK12:

- **Identity**: OAuth 2.0 + OpenID Connect (OIDC) for SSO; SCIM 2.0 for provisioning into applications that support it. citeturn7search1turn7search4turn7search0  
- **Learning tool interoperability**: LTI 1.3 + LTI Advantage services (deep linking, NRPS, AGS). citeturn8search12turn3search5turn8search16  
- **Rostering**: OneRoster 1.1+ (CSV mode and REST mode), with preference for REST where the source systems support it. citeturn8search23turn4search13turn4search10turn4search33  

A pragmatic roadmap should start with **SSO + rostering foundations**, then expand to **LTI tool ecosystem**, then introduce **eventing and near real‑time sync**, and finally mature into **analytics and governance** (contract testing, conformance regimes, ST4S artefact alignment). citeturn11view0turn11view1turn7search2turn17search0turn26search3

## Integration reference architecture

### Reference architecture overview

The reference architecture below assumes OpenAusLMSK12 is a programme-level initiative and therefore separates: (1) **core platform services** (SSO, rostering, integration runtime), (2) **vendor connectors** (API/adapters), and (3) **education interoperability standards** (LTI/OneRoster). It also provides an explicit place to implement ST4S-relevant controls such as integration governance, least privilege, auditability, and data minimisation. citeturn11view1turn11view2turn8search6turn7search1turn7search4

```mermaid
flowchart LR
  %% OpenAusLMSK12 Integration Reference Architecture (logical)

  subgraph Schools["School / Department Context (Trust Boundary A)"]
    SIS["Student Admin / SIS/n(e.g., Sentral, SIMON)"]
    TT["Timetabling/n(e.g., Edval / Timetabling Solutions)"]
    HR["Workforce / Absence/n(e.g., Aesop/Frontline)"]
    Finance["Finance/n(e.g., Xero, MYOB)"]
    IdP["Identity Provider/n(Entra ID / Okta / Ping / Keycloak)"]
  end

  subgraph Core["OpenAusLMSK12 Core Services (Trust Boundary B)"]
    APIGW["API Gateway/n(OAuth2/OIDC, mTLS where needed)"]
    Hub["Integration Hub/n(iPaaS / ESB / custom)"]
    EventBus["Event Bus/n(CloudEvents envelope)"]
    MDM["Roster & Identity Canonical Store/n(OneRoster-aligned model)"]
    Vault["Secrets & Key Management"]
    Obs["Audit / Logs / Observability"]
  end

  subgraph SaaS["External SaaS Platforms (Trust Boundary C)"]
    LMS["LMS Platforms/n(Canvas / Moodle / Schoolbox)"]
    Workspace["Productivity Suites/n(Google Workspace / Microsoft 365)"]
    Tools["3rd‑Party Learning Tools/n(LTI Tools)"]
  end

  %% Identity and access
  IdP -->|OIDC/SAML SSO| APIGW
  IdP -->|SCIM (where supported)/nelse API provisioning| Hub

  %% Rostering flows
  SIS -->|OneRoster REST/CSV/n(or SIF where mandated)| Hub
  TT -->|CSV/REST/nOneRoster subset| Hub
  Hub -->|Canonical roster| MDM
  MDM -->|OneRoster consumer or vendor API| LMS
  MDM -->|Provisioning / EDU sync| Workspace

  %% Learning tools
  LMS -->|LTI 1.3 launch/n(Deep Linking, NRPS, AGS)| Tools

  %% Finance and HR
  Finance -->|REST API / exports| Hub
  HR -->|File exports / API (where available)| Hub

  %% Eventing
  Workspace -->|Webhooks / PubSub (vendor-specific)| EventBus
  LMS -->|Webhooks/Live events (vendor-specific)| EventBus
  EventBus --> Hub

  %% Security/ops
  Vault --> APIGW
  Vault --> Hub
  APIGW --> Obs
  Hub --> Obs
  EventBus --> Obs
```

This aligns with Australian “build interoperable services” expectations by promoting standards-based interfaces and reusable APIs, consistent with the Australian Government’s API design standards and digital service guidance. citeturn8search5turn8search1turn8search32

### Trust boundaries and data flows

The following diagram highlights trust boundaries and the typical integration paths required by OpenAusLMSK12: rostering (SIS→LMS), SSO/provisioning (IdP→apps), learning tools (LMS↔tools), and operational integrations (timetable/finance/HR). ST4S explicitly includes technical integration mechanisms (open APIs, partner integrations/marketplaces, FTP/SFTP, feeds, direct DB connections) and education-specific standards (SIF‑AU, OneRoster) within its interoperability criteria, which should be used to structure procurement requirements and vendor evidence. citeturn11view0turn11view1turn11view2turn8search0turn12search5

```mermaid
flowchart TB
  %% Trust-boundary-focused view

  subgraph TB_A["Trust Boundary A: School / Department Networks"]
    A1["Authoritative Data Sources/nSIS / Timetable / HR / Finance"]
    A2["On‑prem Agents (optional)/n(for on‑prem apps, SFTP, legacy DB)"]
  end

  subgraph TB_B["Trust Boundary B: OpenAusLMSK12 Integration Runtime"]
    B1["Identity & Access/n(OIDC/SAML, MFA policies, audit)"]
    B2["Integration Orchestrations/n(transform, validate, route)"]
    B3["Canonical Data Store/n(OneRoster-aligned)"]
    B4["Event Normalisation/n(CloudEvents)"]
  end

  subgraph TB_C["Trust Boundary C: External Vendor Clouds"]
    C1["LMS Platforms"]
    C2["Google Workspace / Microsoft 365"]
    C3["3rd‑Party Learning Tools (LTI)"]
    C4["Vendor Marketplaces / App Stores"]
  end

  A1 -->|OneRoster REST/CSV/nSIF where required| B2
  A2 -->|SFTP/DB connector/nlegacy feeds| B2
  B1 -->|SSO (OIDC/SAML)| C1
  B1 -->|SSO (OIDC/SAML)| C2
  B2 -->|Provision users/classes/nSCIM or vendor APIs| C1
  B2 -->|Provision groups/classes/nvendor APIs / SDS| C2
  C1 -->|LTI 1.3 launches/nNRPS/AGS/Deep Linking| C3
  C2 -->|Webhooks / PubSub / Graph change notifications| B4
  C1 -->|Webhooks / Live events| B4
  B4 -->|normalised events| B2
  C4 -->|connector governance/nlisting & updates| B2
```

Eventing should be treated as a **separate integration plane** from batch synchronisation: adopt vendor-native mechanisms (e.g., Graph change notifications, Pub/Sub-driven change notifications) and normalise events into a shared envelope such as CloudEvents to reduce downstream coupling. citeturn7search2turn26search3turn1search6turn26search0turn26search2

## Prioritised standards and how they map to use cases

### Prioritisation principles

Standards are prioritised here based on: (a) prevalence across K‑12 platforms, (b) suitability for the programme’s required integrations (SSO, rostering, tool interoperability), (c) alignment with Australian interoperability expectations as reflected in NSIP/ST4S, and (d) testability and procurement enforceability (clear conformance requirements, certification pathways). citeturn8search3turn11view0turn8search0turn12search5

### Standards list with rationale and use-case mapping

| Priority | Standard / approach | What it enables for OpenAusLMSK12 | Why it is prioritised | Primary use cases |
|---|---|---|---|---|
| Highest | OAuth 2.0 | Delegated authorisation and service-to-service access tokens for APIs | Widely used across vendor APIs; central to modern integration security. citeturn7search1 | API auth for connectors; secure automation and least-privilege access |
| Highest | OpenID Connect (OIDC) | Modern SSO based on OAuth 2.0, delivering ID tokens/claims | Preferred SSO for modern apps; explicitly defined by the OpenID spec. citeturn7search4turn7search1 | Staff/student SSO; mobile/PWA SSO; cross-domain federation |
| Highest | SAML 2.0 (compatibility) | Federated SSO for legacy and cross-sector deployments | Many education systems still rely on SAML; Google Workspace supports SAML SSO profiles. citeturn25search2turn25search14turn25search6 | SSO to legacy LMS/tools; compatibility where OIDC is absent |
| Highest | OneRoster 1.1+ (CSV + REST) | Standardised roster exchange between SIS and consumer systems; supports both CSV and REST exchange models | Explicitly K‑12 oriented; supported by Microsoft SDS for OneRoster API ingestion; recognised in ST4S interoperability criteria. citeturn8search23turn4search13turn4search6turn11view0 | Class/course provisioning; student/staff synchronisation; grade passback where implemented |
| Highest | LTI 1.3 + LTI Advantage | Secure tool launches from LMS; deep linking; grade/assignment services; names & roles provisioning | Primary standard for tool ecosystem integration; LTI is positioned by 1EdTech as a standard to connect tools to learning environments. citeturn8search12turn3search5turn8search16 | App/tool marketplace inside LMS; grade passback; embedded content and activities |
| High | SCIM 2.0 | Standard identity provisioning lifecycle (create/update/deprovision) over HTTP | Reduces bespoke “user sync” connectors. SCIM is an IETF standard for managing identities in multi-domain scenarios. citeturn7search0 | Automated provisioning from IdP to SaaS apps; group and role provisioning (where supported) |
| High | Vendor API specifications (OpenAPI) | Contract-first integration patterns; enforceable request/response semantics | Improves testing/validation and procurement clarity; aligns with API design best practice. citeturn8search5turn8search9 | Connector development; automated regression testing; change management |
| Medium | CloudEvents (event envelope) | Normalised event metadata across heterogeneous webhook/event sources | Vendor eventing differs; CloudEvents provides a common format for event data. citeturn7search2turn7search10 | Event bus normalisation layer; auditing; decoupling downstream consumers |
| Medium | SIF‑AU (where required) | Legacy/inter-jurisdictional student data exchange model used in Australia | NSIP highlights SIF as an open standard in the school sector; ST4S includes SIF Australia as a data standards option and SIF Assurance as testing/assurance. citeturn8search0turn11view0turn12search13turn12search5 | Integration with legacy departmental systems; mandated state environments |

**Implication for procurement language:** ST4S’s interoperability criteria and assurance options provide a ready-made structure for requiring vendors to declare: supported education data standards (OneRoster/SIF), available integration mechanisms (API/FTP/marketplace), and evidence of conformance testing (LTI, OneRoster conformance, SIF assurance, NSIP HITS). citeturn11view0turn11view1turn11view2turn12search5

## Connector roadmap

### Phased roadmap structure

The roadmap below is designed to: (1) deliver early value (SSO + basic rostering), (2) progressively reduce manual admin workload (automated sync, marketplace tools), and (3) build towards a resilient, testable integration estate suitable for multi‑vendor procurement and long-term operations. citeturn4search13turn8search12turn11view1turn26search10

#### Phase foundation

**Goal:** establish secure foundations: identity federation, canonical roster model, baseline data exchange. This aligns with ST4S emphasis on integration controls and data exchange transparency. citeturn11view1turn11view2turn12search29

- Implement OIDC/SAML SSO to LMS and core services; prioritise OIDC where supported. citeturn7search4turn25search14turn25search2  
- Establish canonical roster model aligned to OneRoster entities (orgs, users, classes, enrollments). citeturn8search23turn4search10  
- Stand up integration runtime (API gateway, secrets, audit, contract testing harness). citeturn8search5turn8search6turn7search1  

#### Phase core K‑12 interoperability

**Goal:** standardise learning ecosystem integration for rostering and tools.

- OneRoster ingestion from SIS (CSV first if REST unavailable; REST preferred where supported). citeturn4search13turn8search23  
- LTI 1.3 + Advantage enablement within LMS for tool ecosystem. citeturn8search12turn3search5turn8search16  
- Establish LTI allowlisting, key rotations, and tool onboarding workflow. citeturn8search12turn17search3  

#### Phase operational integrations

**Goal:** integrate timetable, finance, and workforce data at the minimum viable level (often a mix of standards + vendor APIs + file exchanges).

- Timetabling exports (OneRoster CSV where available; otherwise vendor REST/CSV). citeturn5search1turn5search0  
- Finance integration (Xero webhooks + REST; MYOB REST with polling where needed). citeturn6search0turn6search4turn6search1turn6search17  
- Workforce/absence integration via file exchange or partner API arrangements (Aesop/Frontline frequently appears file-driven in practice). citeturn5search16turn5search9  

#### Phase event-driven maturity and validation

**Goal:** introduce eventing, stronger testability, and conformance-led vendor onboarding.

- Vendor-native event subscriptions (Graph change notifications; Google push/notifications patterns; LMS webhooks/live events) normalised to CloudEvents into the event bus. citeturn1search6turn2search16turn7search2turn26search0turn26search2  
- Automated regression testing and contract tests for connectors; require evidence aligned to ST4S “assurance/compliance testing” options (LTI, OneRoster, SIF assurance, NSIP HITS). citeturn11view0turn12search5turn8search12turn8search23  

### Connector plan with complexity and standards

**Complexity key:** Low (mostly configuration), Medium (adapter + mapping + testing), High (multi‑system orchestration, edge cases, partial vendor support).

| Connector | Phase | Estimated complexity | Required standards / interfaces | Validation approach |
|---|---|---:|---|---|
| Google Workspace (admin & identity sync) | Foundation → Core | Medium | OIDC/SAML SSO profiles; Admin SDK Directory API; optional SCIM-style provisioning depending on chosen IdP strategy | Validate SSO flows against Google SSO setup requirements; API contract tests against Admin SDK endpoints; least-privilege scopes review. citeturn25search2turn25search0turn25search8turn7search4 |
| Google change notifications (Drive/Classroom where needed) | Event maturity | Medium | Vendor push notification models (webhook callbacks / Pub/Sub delivery); normalise to CloudEvents | Integration tests using sandbox tenants; verify delivery semantics and retries; event schema validation. citeturn26search2turn26search0turn7search2turn26search4 |
| Microsoft 365 (Graph + SDS) | Foundation → Core | Medium | Microsoft Graph REST APIs; Graph change notifications; SDS OneRoster API ingestion | Use Microsoft Graph contract testing; verify change notification subscriptions; OneRoster data validation for SDS ingestion. citeturn26search6turn1search6turn4search33turn4search6 |
| LMS: Canvas | Core | Medium | LTI 1.3/LTI Advantage (tool ecosystem); OneRoster consumer/provider for rostering + grade passback; SIS CSV import fallback | Validate OneRoster 1.1 integration patterns (consumer/provider roles) and nightly sync semantics; LTI launch + AGS/NRPS test packs; CSV import dry-run in test instance. citeturn17search2turn17search3turn17search0turn2search22turn8search12 |
| LMS: Moodle | Core | Medium | LTI 1.3/LTI Advantage support; OneRoster via enrolment plugin (where adopted); Moodle web services APIs | Validate LTI tool deployments; OneRoster plugin behaviour; web services token governance; contract tests where APIs are used. citeturn3search16turn3search5turn3search2turn3search8turn8search23 |
| LMS/Portal: Schoolbox | Core | Medium | Schoolbox REST API (OpenAPI); LTI 1.3 support; SAML/SSO options | Validate API auth model (JWT/bearer); validate LTI 1.3 tool lifecycle; SSO testing and attribute mapping validation. citeturn22view0turn23search0turn24search11turn24search0 |
| Timetabling: Edval / Tes Timetable exports | Operational | Medium | OneRoster CSV export (where available) or vendor-defined flat files | Validate OneRoster ZIP integrity and schema; reconcile timetable vs class rosters; acceptance tests for term rollover. citeturn5search1turn4search10 |
| Timetabling: Timetabling Solutions REST API | Operational | Medium–High | REST API access patterns; local data mapping | API contract tests; mapping validation; performance and rate-limit tests. citeturn5search0 |
| Finance: Xero | Operational | Medium | Xero Accounting API; Xero webhooks; OAuth 2.0 | Validate OAuth flows; webhook signature/verification and replay handling; data reconciliation with finance source of truth. citeturn6search4turn6search0turn7search1 |
| Finance: MYOB | Operational | Medium | MYOB Business API (OAuth 2.0); polling-based sync where webhooks absent | Validate OAuth; implement LastModified/status-based polling as suggested by MYOB; reconciliation tests. citeturn6search17turn6search1turn6search9 |
| Workforce/Absence: Aesop/Frontline | Operational | High (uncertain) | Often file exchange (SFTP) + vendor/partner APIs where available | Confirm integration mode during procurement; implement robust file validation; end-to-end reconciliation vs HR/payroll systems. citeturn5search16turn5search9 |
| Identity providers: Entra ID / Okta / Ping / Keycloak | Foundation | Medium | OIDC/SAML for SSO; SCIM 2.0 for provisioning where supported; vendor-specific provisioning features | SCIM endpoint conformance testing; attribute mapping validation; lifecycle tests (joiner/mover/leaver); security reviews. citeturn7search4turn7search0turn16search4turn16search1turn16search6turn16search15turn16search3 |

### Testing and validation approach

A programme-scale initiative should define a **testing pyramid** that is enforceable in procurement, aligned to ST4S’s interoperability framing and the practical realities of vendor APIs. citeturn11view0turn11view1turn8search5turn26search3

- **Schema validation**: OneRoster CSV/REST payload validation against required/optional fields and known business constraints (e.g., term boundaries, enrolment status). citeturn8search23turn4search10  
- **Contract testing**: OpenAPI-based tests for REST connectors (Graph, Xero, MYOB, Schoolbox API). citeturn26search3turn6search4turn6search17turn22view0  
- **Conformance & certification evidence**: require vendors to declare and evidence education-standard support, consistent with ST4S interoperability assurance options (SIF assurance, OneRoster conformance, LTI, NSIP HITS). citeturn11view0turn12search5turn8search12turn8search23  
- **Eventing validation**: verify webhook / push delivery semantics (retries, duplicates, ordering assumptions) and normalise into CloudEvents to reduce downstream coupling. citeturn7search2turn1search6turn26search2turn6search0  
- **Security validation**: OAuth/OIDC configuration reviews, least privilege scopes, secrets management, and audit logging consistent with Australian cyber security guidance (ISM) where applicable. citeturn7search1turn7search4turn8search6turn8search18  

## Vendor capability comparison matrix

### Definitions used in the table

- **API**: vendor publishes documented public REST/Graph APIs.  
- **Webhooks/eventing**: vendor supports push events (webhooks, change notifications, or Pub/Sub-driven push).  
- **Export/import**: vendor supports structured bulk exchange (CSV/JSON/XML), including OneRoster CSV where relevant.  
- **Marketplace/connectors**: vendor offers an app marketplace or formalised connector ecosystem.  
- **SCIM**: vendor supports SCIM as either a target (SCIM server) or as a provisioning capability in the identity layer.  
- **LTI**: support for LTI 1.3/LTI Advantage as a platform.  
- **OneRoster**: support as consumer/provider, including CSV and/or REST.  
- **ST4S**: whether ST4S is an expected procurement input; specific product assessment status should be verified in the ST4S catalogue/register. citeturn13search1turn14view0turn11view0  

### Capability table

| Vendor | Public REST/Graph APIs | Webhooks / eventing | CSV/JSON/XML import/export tools | Marketplace / connectors | SCIM provisioning | LTI 1.3 / Advantage | OneRoster 1.1+ | ST4S interoperability expectation |
|---|---|---|---|---|---|---|---|---|
| Google Workspace | Yes (Admin SDK Directory API; Admin SDK is RESTful) citeturn25search0turn25search8 | Yes (Drive push notifications; Classroom push delivered via Pub/Sub) citeturn26search2turn26search0 | Yes (via APIs; admin operations via APIs; bulk patterns depend on function) citeturn25search8 | Yes (Workspace Marketplace) citeturn25search1 | Mixed: supports automated provisioning to 3rd‑party apps (SCIM‑like provisioning depends on app/IdP approach) citeturn25search3turn7search0 | N/A (suite not an LMS platform) | N/A | ST4S applies to edtech products; Workspace typically treated as foundational platform; require ST4S-aligned controls for integrations. citeturn11view1turn13search2 |
| Microsoft 365 | Yes (Microsoft Graph REST API) citeturn26search6turn26search10 | Yes (Graph change notifications) citeturn1search6 | Yes (bulk operations depend on workload; SDS supports OneRoster ingestion via API) citeturn4search33turn4search6 | Yes (Graph/MS ecosystem; app ecosystems vary by product) citeturn26search13 | Yes (Entra provisioning uses SCIM 2.0 to apps with SCIM endpoints) citeturn16search4turn7search0 | N/A (suite not an LMS platform) | Via SDS ingestion from OneRoster provider systems citeturn4search33turn4search6 | ST4S applies to products/services integrated into schools; for M365-connected apps require ST4S-aligned integration governance. citeturn11view2turn13search1 |
| Canvas | Yes (REST API; SIS imports and formats documented) citeturn17search0turn17search9 | Yes (Canvas Data Services “Live Events”/webhook-like streams) citeturn2search16 | Yes (SIS CSV import) citeturn17search0turn17search4 | Yes (Canvas App Center/Edu App Center for LTI apps) citeturn17search3turn17search19 | Not primary (Canvas is typically SCIM target only if vendor implements; not asserted here) | Yes (LTI platform; app ecosystem based on LTI) citeturn17search3turn8search12 | Yes (OneRoster integrations: SIS as provider; Canvas as consumer; grade passback patterns described) citeturn17search2turn17search6turn2search22 | ST4S includes interoperability criteria referencing OneRoster/LTI and assurance options; verify specific Canvas-related assessments via ST4S catalogue where applicable. citeturn11view0turn13search1 |
| Moodle | Yes (Moodle web services APIs) citeturn3search8turn3search4 | Partial (events exist; webhook patterns depend on plugins/architecture; not treated as primary integration plane here) citeturn3search15 | Yes (various import/export; OneRoster plugin supports REST standard) citeturn3search2turn8search23 | Yes (plugin ecosystem) citeturn3search2 | Typically via external IdP tooling; SCIM depends on deployment (not asserted as core Moodle feature) citeturn7search0 | Yes (LTI Advantage tool deployment and publish-as-tool support) citeturn3search16turn3search5 | Yes via OneRoster enrolment plugin (REST 1.1) citeturn3search2turn3search10 | ST4S interoperability criteria apply; request evidence of OneRoster/LTI support and testing. citeturn11view0turn13search1 |
| Schoolbox | Yes (published OpenAPI; bearer/JWT auth) citeturn22view0 | Not evident as general webhook platform in accessible docs; has push notification endpoints for mobile contexts (API tag indicates “Push Notification”) citeturn22view0 | Yes (example: assessment CSV export referenced in Schoolbox Help index snippet) citeturn24search22 | Yes (partner/integration ecosystem; connected tools) citeturn23search0turn24search9 | Not evidenced as SCIM target in accessible sources; typically IdP-driven provisioning patterns | Yes (explicit LTI 1.3 support stated) citeturn23search0 | Not evidenced in accessible sources | ST4S is widely adopted across sectors; verify Schoolbox assessment status via ST4S catalogue/register where applicable. citeturn13search1turn13search2turn11view0 |
| Sentral | Partial: public snippet indicates REST API at `/restapi/` path (full docs may be gated) citeturn4search2 | Not evidenced in accessible sources | Yes (historically supports exports/imports; evidence here limited) | Not evidenced in accessible sources | Not evidenced | Not applicable (not primarily an LMS platform) | Not evidenced | ST4S expectation applies to products used in schools; require ST4S-aligned evidence for interoperability mechanisms and data standards. citeturn11view1turn13search1 |
| SIMON | Not evidenced publicly (marketing indicates integrations but not API specs) citeturn4search3 | Not evidenced | Not evidenced | Indicates ecosystem integrations (tools listed) citeturn4search3 | Not evidenced | Not evidenced | Not evidenced | ST4S expectation applies; require declared mechanisms (API/FTP/marketplace) consistent with ST4S interoperability criteria. citeturn11view1turn11view2turn13search1 |
| Edval / Tes Timetable | Not evidenced as public API; integration claims exist; OneRoster CSV export documented | Not evidenced | Yes (OneRoster CSV export described) citeturn5search1 | Yes (integration catalogue claims) citeturn5search5 | Not applicable | Not applicable | Yes (OneRoster CSV mode) citeturn5search1turn4search10 | ST4S interoperability criteria explicitly include OneRoster and SIF options; require evidence in procurement. citeturn11view0turn13search1 |
| Aesop / Frontline (absence) | Unclear for Absence Management specifically via public sources; API availability may be partner/contract dependent | Not evidenced | Yes (file-based integration patterns referenced with SFTP import) citeturn5search16turn5search9 | Not evidenced | Not evidenced | Not applicable | Not applicable | ST4S expectation applies to integrated products; require declared technical integration method (API vs SFTP) per ST4S criteria. citeturn11view1turn11view2turn13search1 |
| Xero | Yes (Accounting API) citeturn6search4 | Yes (webhooks) citeturn6search0 | Yes (API responses default XML; JSON supported; bulk depends on design) citeturn6search12turn6search16 | Yes (Xero App Store / partner programme) citeturn6search10turn6search14 | Not central (Xero typically not SCIM target) | Not applicable | Not applicable | ST4S pertains to education software; Xero is a finance platform—treat as operational integration with ST4S-aligned data governance and access controls. citeturn11view1turn8search6 |
| MYOB | Yes (MYOB Business API; OAuth 2.0) citeturn6search15turn6search17 | No (MYOB states it doesn’t currently support webhooks) citeturn6search1 | Yes (JSON payload examples; operationally polling for deltas) citeturn6search13turn6search1 | Yes (MYOB App Marketplace) citeturn6search3 | Not central | Not applicable | Not applicable | As above: operational integration; apply ST4S-aligned governance controls on integration. citeturn11view1turn8search6 |
| Entra ID (IDP) | Yes (Graph; provisioning service) citeturn26search10turn16search4 | Yes (Graph + provisioning events depending on implementation) citeturn1search6turn16search4 | N/A | App gallery/ecosystem exists (not detailed here) | Yes (SCIM 2.0 client for provisioning to SCIM endpoints) citeturn16search4turn7search0 | Not applicable | Not applicable | ST4S includes interoperability domain; identity controls are foundational to meeting those expectations. citeturn11view1turn13search2 |
| Okta / Ping / Keycloak (IDP options) | Yes (varies by product; SCIM docs available for Okta/Ping; Keycloak has extensions) citeturn16search1turn16search6turn16search15 | Not primary focus | N/A | Marketplace/extension ecosystems vary | Yes (Okta/Ping are SCIM clients; Keycloak SCIM via extensions/plugins; demand acknowledged) citeturn16search9turn16search6turn16search3turn16search15 | Not applicable | Not applicable | Treat as core security foundation; enforce ST4S-aligned access control, lifecycle management, and auditability. citeturn11view1turn8search6turn7search0 |

**Important note on ST4S status in procurement:** ST4S provides a catalogue (restricted portal) of assessment reports and also maintains a public badge register; however, the badge register is not a complete list of all assessed products. Procurement should therefore require vendors to provide either (a) evidence of ST4S assessment outcome, or (b) a plan/timeline to achieve assessment, consistent with jurisdictional requirements. citeturn13search1turn14view0turn12search29turn13search5

## Key primary references

The following are the primary/official sources used to ground this report. (Direct URLs are provided in code form to satisfy link requirements.)

```text
Australian interoperability & guidance
- https://www.nsip.edu.au/  (NSIP overview)
- https://www.nsip.edu.au/interoperability-in-education/  (SIF in education context)
- https://st4s.edu.au/  (ST4S programme)
- https://st4s.edu.au/st4s-catalogue/  (ST4S catalogue overview)
- https://st4s.edu.au/verify-a-badge/  (public badge register – incomplete list)
- https://api.gov.au/  (Australian Government API Design Standards context)
- https://www.digital.gov.au/policy/digital-experience/digital-service-standard  (Digital Service Standard)
- https://www.cyber.gov.au/business-government/asds-cyber-security-frameworks/ism  (ASD ISM)

Education interoperability specs
- https://www.1edtech.org/standards/oneroster  (OneRoster overview)
- https://www.imsglobal.org/oneroster-11-introduction  (OneRoster 1.1 intro)
- https://www.1edtech.org/standards/lti  (LTI overview)

Major vendor technical docs
- https://developers.google.com/workspace/admin/directory/reference/rest  (Google Admin SDK Directory API)
- https://support.google.com/a/answer/12032922  (Google Workspace SSO profiles)
- https://developers.google.com/workspace/marketplace  (Google Workspace Marketplace)
- https://learn.microsoft.com/en-us/graph/overview  (Microsoft Graph overview)
- https://learn.microsoft.com/en-us/graph/api/overview?view=graph-rest-1.0  (Graph REST API reference)
- https://learn.microsoft.com/en-us/graph/api/resources/webhooks?view=graph-rest-1.0  (Graph change notifications)
- https://learn.microsoft.com/en-us/schooldatasync/oneroster-provider-overview  (SDS OneRoster provider overview)
- https://developerdocs.instructure.com/services/canvas/sis/file.sis_csv  (Canvas SIS CSV import format)
- https://developerdocs.instructure.com/services/canvas/data-services/live-events/overview/file.data_service_setup  (Canvas live events)
- https://developer.xero.com/documentation/api/accounting/overview  (Xero Accounting API)
- https://developer.xero.com/documentation/guides/webhooks/overview/  (Xero Webhooks)
- https://apisupport.myob.com/hc/en-us/articles/6258012443791-Does-MYOB-support-webhooks  (MYOB webhook position)
- https://developer.myob.com/api/myob-business-api/api-overview/authentication/  (MYOB OAuth2)
```




