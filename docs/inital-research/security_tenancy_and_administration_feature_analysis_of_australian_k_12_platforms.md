# Security, tenancy and administration feature analysis of Australian K–12 platforms

## Executive summary

Across the nine platforms reviewed, the strongest publicly documented evidence of **enterprise-grade security controls** (identity integration, encryption posture, tenant separation, backups, and auditability) comes from (a) vendor security statements and manuals that are publicly accessible, and (b) state education privacy information statements that explicitly describe **Australian hosting locations** and some security controls. The most concrete configuration-level documentation in public sources was found for **Xuno** (admin UI paths for SSO enforcement and 2FA options) and **Synergetic** (detailed permission model and Community Portal configuration keys for security, SSO token behaviour, and lockout controls). citeturn15view0turn15view1turn37view1turn34view1

A common pattern across multiple vendors is that **SSO and MFA strategy is often intended to be anchored in the school/department identity provider** (e.g., Microsoft-based identity), with platforms either supporting federated login directly or being deployed in environments where departments enforce MFA. This is explicit in Victorian guidance recommending MFA for staff access to student management systems and describing enforcement via the user’s Microsoft authenticator/SMS workflow (i.e., IdP-side). citeturn9view0

On **data residency**, several vendors explicitly state or are documented by government sources as hosting in **Australian regions**: Sentral describes “Australian Azure hosting” and geo-redundancy; Daymap states it is hosted in **Microsoft Azure Australian data centres** and replicated across primary and secondary Australian Azure regions; Xuno is documented by the NT Department of Education as storing data in **Azure servers located in Sydney**; Compass is documented by NT sources as storing data in a **Melbourne data centre**. citeturn13view0turn44view0turn14search18turn9view1

Where public documentation is limited, critical areas frequently remain **unspecified**, including: per-tenant cryptographic key management (BYOK/HYOK), formal RPO/RTO targets, session/IP/device policies, SCIM provisioning details, and cross-tenant administrative constraints. This is important for procurement because these “unspecified” areas often determine whether a platform can meet national-scale operational and regulatory expectations without compensating controls. citeturn54search0turn54search1turn54search11

For a hypothetical national platform (“OpenAusLMSK12”), the recommended baseline is a **multi-tenant SaaS with strict tenant isolation**, with identity centralised through federated SSO (SAML/OIDC), MFA enforced by the IdP (with step-up policies), centrally collected audit logs, Australian-region hosting, encryption-by-default with managed keys (and a BYOK pathway for jurisdictions that require it), and a delegated administration model that is explicitly scoped (national → jurisdiction → school group → school → campus). This architecture aligns with privacy and breach-response obligations under the Australian privacy framework and is compatible with ASD guidance (ISM / Essential Eight) as a control baseline. citeturn54search0turn54search10turn54search2turn54search11

## Method and source-quality notes

The analysis prioritised:
- public vendor security pages, product manuals, and configuration guides;
- public policy documents and privacy information statements published by Australian education authorities (useful for **verified hosting location** and some control assertions);
- publicly accessible vendor-run knowledge bases and PDFs (for concrete configuration steps). citeturn9view1turn44view0turn15view0turn35view0

Some vendor help portals returned a “CSS Error” interstitial from the retrieval tool (preventing direct extraction of the underlying content). Where this occurred, the report relies on other public sources (vendor PDFs, government statements, public manuals, or publicly indexed snippets); otherwise, the relevant dimension is marked **“unspecified”**. citeturn55view0turn31view0turn31view1

All items marked **“unspecified”** mean: *not confirmed in public sources reviewed* (not “absent” as a product capability).

## Capability matrix

**Legend:**  
- **Yes** = explicitly supported/described in public sources reviewed  
- **Partial** = supported in some form, but key details (scope, enforcement, or admin controls) are not public  
- **Unspecified** = not publicly documented in sources reviewed

| Platform | Multi-school tenancy & isolation | Roles & permissions | SSO (SAML/OIDC) & provisioning | MFA (methods & enforcement) | Audit logs & retention | Data residency / hosting | Encryption | Backup / DR | Session controls | Admin delegation |
|---|---|---|---|---|---|---|---|---|---|---|
| SEQTA | Unspecified | Unspecified | Partial (SAML referenced; enforcement of MFA appears IdP-side) citeturn5search0 | Partial (implied IdP-side) citeturn5search0 | Unspecified | Unspecified | Unspecified | Unspecified | Unspecified | Unspecified |
| Sentral | **Yes** (publicly described enterprise multi-school use; product variants include enterprise/multi-tenant) citeturn13view0turn11view3 | **Yes** (“granular (module) level permission & access control”; Global Admin delegation for Portal Console) citeturn13view0turn11view3 | Partial (NSW DoE SSO workflow documented; Azure AD identity management referenced; SCIM unspecified) citeturn13view0turn11view1 | Partial (“MFA built in” but methods/policies unspecified in public docs reviewed) citeturn13view0 | Partial (“Audit Logs” claimed; event set/retention/export unspecified) citeturn13view0 | **Yes** (Australian Azure hosting; geo redundancy) citeturn13view0 | **Partial** (encrypted in transit & at rest claimed; key mgmt unspecified) citeturn13view0 | Partial (geo redundancy referenced; RPO/RTO unspecified) citeturn13view0 | Unspecified | Partial (Portal Console admin access can be delegated and further configured) citeturn11view3 |
| Compass | Unspecified | **Partial** (permissions manager export “by role” referenced) citeturn47search8 | Partial (SSO commonly used in departmental contexts; IdP integration details unspecified in public AU sources reviewed) citeturn9view0turn9view1 | Partial (MFA described for remote admin access in NT statement; broader MFA policy details unspecified) citeturn9view1turn9view0 | Unspecified | **Yes** (Melbourne data centre per NT statement; AU-based hosting also claimed on Compass site) citeturn9view1turn8view3 | Partial (encryption in transit referenced by NT statement; at-rest & KMS unspecified in AU sources reviewed) citeturn9view1 | Unspecified | Unspecified | Unspecified |
| Daymap | **Partial** (“cloud hosted clusters of schools” referenced) citeturn44view2 | Unspecified | Unspecified | Unspecified | Unspecified | **Yes** (Azure Australian data centres; replicated in AU primary/secondary regions) citeturn44view0 | Unspecified | Partial (replication noted; backup/RPO/RTO unspecified) citeturn44view0 | Unspecified | Unspecified |
| Schoolbox | **Yes** (hosted customers: per-customer DB, separated file storage, unique secrets; logical separation) citeturn18view2 | Partial (access & permissions described generally in brochures; fine-grain claim; admin model details largely unspecified publicly) citeturn22search8turn22search10 | Partial (SAML/SSO publicly referenced; configuration guide gated, but indexed snippets indicate admin SAML settings area) citeturn22search1turn22search3turn22search4 | Partial (Schoolbox personnel require MFA; end-user MFA enforcement details unspecified publicly) citeturn18view2 | **Yes** (“detailed audit logs” stated; retention specifics not fully public) citeturn18view2 | **Yes** (AWS; customer can choose country/zone alignment) citeturn18view2 | **Yes** (TLS 1.2+; encryption at rest in AWS) citeturn18view2 | **Yes** (daily backups, retained up to 2 years; multi-AZ availability) citeturn18view2 | Partial (SSH/IP restrictions recommended for managed access; end-user session controls unspecified) citeturn18view2 | Unspecified |
| Edumate | Unspecified | Unspecified | Partial (SSO referenced as part of “Identity Management and SSO” integration positioning; concrete protocols/provisioning unspecified publicly) citeturn52view0 | Unspecified | Partial (collection of anonymised error logs/usage stats; controlled by global setting) citeturn53view0 | **Yes** (policy states AU data centres; no copying outside AU without consent) citeturn53view0 | Partial (mentions data transfer encryption/firewalls; at-rest/KMS unspecified) citeturn53view0 | Unspecified | Unspecified | Unspecified |
| Xuno | Partial (cloud vs on-prem supported; tenancy isolation for SaaS otherwise unspecified publicly) citeturn14search10turn14search18 | Partial (user groups exist; SSO enforcement can target user groups; permission granularity beyond this is unspecified publicly) citeturn15view0turn15view3 | **Yes** (Microsoft or Google SSO; enforceable per user/group/all staff) citeturn15view0 | **Yes** (2FA via email-link or Google Authenticator; frequency setting) citeturn15view1turn15view2 | Partial (admin sees last browser login; broader audit log capability unspecified publicly) citeturn15view3 | **Yes** (NT statement: Azure servers in Sydney; vendor site: AU servers) citeturn14search18turn14search3 | Unspecified | Unspecified | Partial (2FA “authenticate once every” is a session/step-up-like control) citeturn15view1 | Partial (admin UI for account disable/reset/password/welcome email; SSO enforcement management) citeturn15view0turn15view3 |
| Synergetic | Unspecified (multi-campus product positioning exists but tenant isolation not described in sources reviewed) citeturn38view0 | **Yes** (security groups; create groups; assign permissions at module/program/tab and even field/jump level; superuser group) citeturn37view1turn37view2turn37view3 | **Yes** for Community Portal (SAML recommended; also Windows/IIS and database auth; additional “trusted vendor” SSO via web service token flow) citeturn33view0turn34view0turn33view1 | Unspecified | **Partial** (record-level audit trail described via “Maint tab”; portal has security-token logging concepts; retention/export unspecified) citeturn33view0turn36search2 | Unspecified | Partial (passwords encrypted in DB; optional URL query encryption) citeturn33view0turn34view1 | Unspecified | **Yes** (token expiry minutes; login attempt lockout; URL encryption enable flag/passphrase) citeturn34view1turn34view0 | **Yes** (admin panel access via config field or security resource; explicit security resources model) citeturn33view1turn37view1 |
| TASS | Unspecified | Unspecified | Unspecified | Unspecified | Partial (anonymised error logs/usage stats; global setting) citeturn53view0 | **Yes** (AU data centres; no copy outside AU without consent; data centres ISO27001) citeturn53view0 | Partial (mentions encryption and security measures generally; at-rest/KMS unspecified) citeturn53view0 | Unspecified | Unspecified | Unspecified |

## Vendor findings

### SEQTA

Publicly retrievable, configuration-level documentation for SEQTA was limited by help-portal access constraints in this review session. Indexed content indicates SEQTA supports multiple authentication modes concurrently and references SAML as a recommended approach, with MFA enforcement appearing to be positioned at the identity provider layer rather than within SEQTA itself (details not fully retrievable here). citeturn5search0turn55view0

**Multi-school tenancy, tenant isolation, cross-tenant admin:** Unspecified in public sources reviewed.

**Roles/permissions, delegated admin:** Unspecified in public sources reviewed.

**SSO / MFA / audit logs / encryption / backups / sessions:** Unspecified beyond the partial SAML/MFA positioning above. citeturn5search0

### Sentral

**Security and compliance claims:** Sentral publicly states ISO 27001 certification, claims “all data encrypted in transit and at rest”, indicates “MFA built in”, and references audit logs and “granular (module) level permission & access control”. It also positions its platform as Azure-based with “Australian Azure hosting with Geo Redundancy” and “Azure Active Directory for Identity Management”. citeturn13view0

**Multi-school tenancy / enterprise model:** Sentral explicitly describes an “Enterprise Schools” offering for multi-campus school groups and government departments, and the Portal Admin Guide describes product variants including a “Sentral Enterprise (MT)” option (with “MT” presented in a feature availability table). citeturn13view0turn11view3

**Concrete configuration options and steps (SSO readiness):** A public Sentral help article includes a NSW Department of Education SSO readiness checklist and gives a concrete UI path: **Sentral Cog → Manage User Accounts → DETNSW SSO Readiness Checklist**, followed by steps such as requiring existing users to update usernames and an explicit **“Enable NSW DET SSO”** action. citeturn11view1

**Concrete configuration options and steps (Portal Console admin delegation):** The Portal Admin Guide states that a **Global Admin account** can apply “Portal Console Admin permissions” to selected staff and that access levels can be configured further to control actions within the module; it also documents how to access Portal Console from the Sentral home screen and notes default access is off for parents/students unless configured. citeturn11view3

**SSO protocols and provisioning:** The public sources reviewed describe NSW DoE SSO and Azure identity management positioning, but do not publicly confirm SAML vs OIDC per customer, nor SCIM provisioning. Marked unspecified. citeturn13view0turn11view1

**MFA specifics:** Sentral claims built-in MFA but does not publicly enumerate factor methods, enforcement scope (staff vs parents/students), or conditional policies in the sources reviewed. Marked unspecified beyond the “built in” claim. citeturn13view0

**Audit log specifics:** Sentral claims “Audit Logs”, but the public sources reviewed do not enumerate event types, retention, or export APIs. Marked unspecified beyond existence. citeturn13view0

**Screenshot references (public URLs) from the SSO readiness guide article:**  
```text
https://sentral.uservoice.com/assets/233231886/103.jpg
https://sentral.uservoice.com/assets/233232411/104.jpg
https://sentral.uservoice.com/assets/233270112/110.jpg
```
citeturn11view1

### Compass

**Australian hosting evidence:** A Northern Territory Department of Education privacy information statement for Compass states data is stored in a Melbourne-based data centre and that data is encrypted in transit; it also describes remote access by school administrators being protected by multiple factors. citeturn9view1  
Compass’ own public regional marketing also claims Australian-hosted data (high-level, without detailed technical parameters in the sources reviewed). citeturn8view3

**MFA posture (practical guidance):** Victorian guidance recommends activating MFA for staff access to student management systems including Compass and describes MFA as a daily access-code requirement delivered via Microsoft Authenticator app or SMS, indicating MFA can be enforced through the organisation’s Microsoft identity environment (IdP-side). citeturn9view0

**Roles/permissions and auditing:** Compass product update notes describe a Permissions Manager enhancement that allows administrators to export “Permissions Export (by role)”, enabling auditing of permissions and tracking changes more effectively (supporting practical access review processes). citeturn47search8

**SSO protocols, SCIM provisioning, audit logs, session controls, encryption-at-rest:** Unspecified in Australian public sources reviewed. (Compass maintains detailed security pages in some regions; however, those pages may describe non-AU hosting and were not treated here as authoritative for Australian data-residency specifics.) citeturn8view0turn9view1

### Daymap

**Hosting and Australian replication:** Daymap’s privacy policy states that, for hosted services, Daymap is hosted in **Microsoft Azure Australian data centres** and that it is “stored and replicated in primary and secondary Azure regions in Australia”. It also distinguishes “hosted” vs “non-hosted” environments and indicates that in non-hosted environments the data may be hosted by a third party. citeturn44view0

**Multi-school tenancy positioning:** Daymap states it is used in contexts “from cloud hosted clusters of schools” to other settings, which suggests multi-school deployment patterns exist, but does not specify tenant isolation mechanisms or cross-tenant administration models in public sources reviewed. citeturn44view2

**Identity (SSO/MFA), audit logs, RBAC granularity, encryption specifics, backup RPO/RTO, session restrictions:** Unspecified in public sources reviewed (beyond the replication statement). citeturn44view0

### Schoolbox

**Tenant separation and data isolation (hosted customers):** A Schoolbox “Security Measures” PDF states that personal data from one customer is logically separated from other customers, including each customer having **their own database**, logically separated file storage, and unique secrets/credentials per customer, with additional separation between staging and production. citeturn18view2

**Data residency options and cloud provider:** The same document states Schoolbox uses AWS data centres, that customers may choose which country data resides in from existing availability zones, and that Schoolbox will make best efforts to host in zones representing the customer’s legal jurisdiction (or allow the customer to choose). citeturn18view2  
(While Schoolbox is an Australian vendor, this is not equivalent to a guarantee of Australian-only residency in all cases; it is explicitly presented as a selectable hosting geography model.) citeturn18view2

**Encryption and transport security:** The document states encryption at rest within AWS, and that data transfer uses **HTTPS TLS 1.2+** for web traffic and SSHv2 for other traffic. citeturn18view2

**Backups and availability:** The document states hosted customers receive daily backups to another location, retained at reducing frequency up to **2 years**, and that data is stored in fault-tolerant systems with at least **two availability zones** with failover availability. citeturn18view2

**Audit logs and incident response posture:** The document states Schoolbox maintains detailed audit logs and synchronises time across systems for forensic examination, and describes breach notification practices and third-party penetration testing. citeturn18view2turn18view3

**SSO configuration (publicly indexed but not directly retrievable as full page content here):** Publicly indexed Schoolbox help snippets indicate SAML settings exist under an administration path (e.g., “Administration > System Settings > SAML”) and refer to configurable SAML entity ID. Because the underlying help pages were not directly retrievable in-session, the exact fields (ACS URL, certificate upload, IdP metadata, attribute mapping) are treated as **unspecified** in this report. citeturn22search1turn22search4turn29view0

**Published security certifications:** Schoolbox publicly states it is on a journey toward frameworks including ST4S and ISO 27001 and describes independent penetration testing and CVE publication, but does not publicly claim ISO/SOC certification completion in the sources reviewed. citeturn18view3turn18view2

### Edumate

**Corporate security and privacy policy coverage:** A publicly available “Data Protection and Privacy Policy” published under the Edumate information domain is issued by entity["company","The Alpha School System Pty Ltd","k-12 software vendor au"] and explicitly lists Edumate websites and support portals among the covered properties. The policy states that where the company provides cloud hosting, data is stored in **data centres within Australia**, those data centres comply with ISO 27001, and data is not copied outside Australia without prior written consent. It also states the organisation maintains an ISMS certified against ISO 27001. citeturn53view0

**Logging/telemetry control:** The same policy states anonymised data such as product usage statistics and error logs are collected for licensing/support purposes and that collection is controlled by system administrators through a **global setting** (not per-user). citeturn53view0

**Product SSO positioning:** Edumate’s integrations page states that “User identity and Single Sign-On (SSO)” are supported as part of integration positioning, but does not specify protocols (SAML/OIDC), IdP support, metadata handling, or SCIM provisioning in public sources reviewed. citeturn52view0turn53view0

**RBAC granularity, MFA, audit log capabilities/retention, session restrictions, backup/DR:** Unspecified in public sources reviewed. citeturn52view0

### Xuno

**SSO enforcement configuration (concrete admin UI path):** Xuno’s public documentation states schools can enforce Microsoft or Google SSO for staff users and that enforcement can be applied per individual user, all staff, or selected staff user groups. Enforcement is performed from **Options → Software Settings → User Accounts** on the user accounts page. citeturn15view0turn16view0

**2FA methods and frequency controls (concrete user UI path):** Xuno documentation states staff can enable 2FA using either (a) an email authentication link or (b) Google Authenticator, and that users can set an “Authenticate once every” frequency. The documented path is **Options → My Preferences → Security**, with explicit toggles such as “Enable Email 2FA”. citeturn15view1turn16view1

**Admin visibility and account actions:** Xuno’s user-account management documentation describes account disablement, last browser login visibility, password reset actions, welcome email workflows, and a 2FA-enabled indicator with flags distinguishing email vs authenticator. citeturn15view3

**Australian hosting evidence:** A Northern Territory Department of Education privacy information statement for Xuno states data is stored via Microsoft Azure servers located in Sydney, Australia. Xuno also publicly claims it is hosted on Australian servers. citeturn14search18turn14search3

**Audit logs, encryption-at-rest, backups/RPO/RTO, session/IP/device restrictions, cross-tenant admin:** Unspecified in public sources reviewed (beyond “last login” visibility and 2FA frequency options). citeturn15view3turn15view1

**Screenshot references (public URLs) from Xuno docs:**  
```text
https://docs.xuno.com.au/hubfs/image-png-Jun-30-2023-12-12-18-1290-AM.png
https://docs.xuno.com.au/hubfs/Knowledge%20Base%20Import/d33v4339jhl8k0.cloudfront.netdocsassets54ae0964e4b04c67ce0d7a2eimages6334e81f9f7c1931ee004915file-Rofq9WHjFR.png
```
citeturn16view0turn16view1

### Synergetic

**RBAC model and permission granularity (highly concrete):** Synergetic documentation describes a security model built around **security groups**, where users may belong to multiple groups and receive the superset of permissions. Documentation states administrators can create new security groups and configure access for modules, programs, tabs, and—when applicable—even specific fields or “jumps”. It also documents a special “SynSuperUser” group with unrestricted access. citeturn37view1turn37view2turn37view3

**SSO and authentication methods for Community Portal:** Community Portal documentation states three authentication methods: database authentication (default), **SAML authentication (recommended)**, and Windows/Trusted IIS authentication. It also describes database authentication as storing the username/password in the Synergetic database with encryption. citeturn33view0

**Session/security controls (concrete configuration keys):** Community Portal “Security settings” documentation enumerates configuration settings including:
- which tabs can be accessed (“CheckPageEnabledFlag”),
- whether URLs are encrypted and the associated passphrase (“EncryptURLQueryString:EnabledFlag” and “…PassPhrase”),
- lockout behaviour via login-attempt limits (“MaxRecentLogins”),
and additional “single sign on authentication settings” including the ability to set token expiry minutes (“TokenExpiryMinutes”) and other SSO-related keys. citeturn34view1turn34view0

**Admin delegation for portal admin panel:** Community Portal documentation describes enabling admin-panel access either by adding an ID to a configuration field or by applying SELECT permission to a specific security resource (SYS|CommunityPortalMaint). citeturn33view1turn37view1

**Audit trails:** Public Synergetic PDF/manual materials describe audit trails for record updates (e.g., “Maint tab shows an audit trail of the users who have made changes”). citeturn36search2turn33view0

**Security certifications and hosting:** Product-specific hosted SaaS security certifications, cloud provider, and data residency guarantees were **not** found in publicly retrievable Synergetic product sources reviewed. However, Synergetic is part of entity["company","ReadyTech","asx listed software vendor"]; ReadyTech publicly describes an ISO 27001 certified ISMS and provides ISO 27001 certification certificates with scope describing “design, development and hosting” of enterprise applications including education sector solutions. This supports a group-level assurance signal but is not a product-specific hosting statement for Synergetic. citeturn40view0turn41view0

### TASS

**ISO 27001 and Australian data residency:** A TASS data protection and privacy policy states that for cloud-hosted services data is stored in ISO 27001-compliant data centres within Australia, is stored/processed within Australia, and is not copied outside Australia without prior written consent. It also states the organisation maintains an ISMS certified against ISO 27001. citeturn53view0

**Information security policy statement:** A publicly accessible information security policy statement references maintaining third-party ISO/IEC 27001 certification and conducting regular penetration testing, auditing, and vulnerability management. citeturn48view1

**Product-level configuration (RBAC, SSO, MFA, logs, session controls, backup/DR):** Unspecified in public sources reviewed (beyond the policy-level statements and anonymised telemetry controls). citeturn53view0turn48view1

## Baseline security architecture for OpenAusLMSK12

### Architectural goals and assumptions

A national platform should be designed so that:
- each school (or school group) is an explicit tenant boundary (privacy and operational segregation);
- staff access is federated via jurisdiction identity (or delegated IdPs) and protected by MFA;
- audit trails are centrally collectible and retained sufficiently for investigations and regulatory response;
- data residency is enforceable to Australian regions and auditable; and
- breach preparation/response obligations and privacy principles can be operationalised (data minimisation, access control, logging, incident response and notification). citeturn54search0turn54search10turn54search7

The privacy baseline should align to the Australian privacy framework (APPs under the Privacy Act) and the breach response obligations under the NDB scheme for regulated entities, while security uplift should track ASD guidance such as the ISM and Essential Eight maturity planning. citeturn54search0turn54search3turn54search1turn54search2turn54search11

### Identity and data-flow diagram

```mermaid
flowchart LR
  %% Actors
  Staff[Staff] --> IdP
  Students[Students] --> IdP
  Parents[Parents/Carers] --> ExtIdP

  %% Identity providers
  IdP[Jurisdiction IdP/nSAML 2.0 / OIDC/nMFA + Conditional Access] --> SSO[SSO Gateway / Federation Broker]
  ExtIdP[External IdP/n(Parent portal identity)/nOIDC/SAML] --> SSO

  %% Provisioning
  SIS[Authoritative SIS/SMS/n(enrolments, roles)] --> Prov[Provisioning Service/nSCIM + bulk sync]
  Prov --> Directory[Platform Directory/nTenant-scoped identities]

  %% Core platform
  SSO --> App[OpenAusLMSK12 Core Apps/nWeb + Mobile APIs]
  Directory --> App

  %% Authorisation
  App --> AuthZ[AuthZ Engine/nRBAC + Attribute Policies/n(tenant, campus, cohort)]
  AuthZ --> Data[Data Plane/nTenant DB + Object Storage]

  %% Security services
  App --> Audit[Audit Log Service/nImmutable event stream]
  Audit --> SIEM[Central SIEM/SOC/nAlerting + investigations]
  App --> KMS[KMS/HSM/nEnvelope encryption/nRotation + BYOK option]
  KMS --> Data

  %% Backups/DR
  Data --> Backup[Backups/nDaily + point-in-time]
  Backup --> DR[DR Region (AU)/nTested recovery]
```

### Recommended design choices

**Tenancy model**
- Default to **multi-tenant SaaS** with *hard tenant isolation*:
  - separate tenant database/schema per school group (preferred: separate DB per tenant for high sensitivity),
  - per-tenant object-storage prefixes/buckets,
  - per-tenant encryption context and key hierarchy.  
This mirrors the strongest publicly documented K–12 vendor isolation pattern observed (e.g., Schoolbox describing per-customer database separation and unique secrets). citeturn18view2

**Identity and access**
- Support both **SAML 2.0** and **OIDC** (jurisdictions vary).
- Make the IdP the system of record for MFA enforcement for staff (conditional access; step-up for “high-risk” actions). This aligns with real-world deployment guidance in Victorian education MFA rollout patterns and avoids uneven MFA UX across vendors. citeturn9view0
- Provision users and role attributes from an authoritative SIS/SMS feed; where SCIM is not viable, provide secure bulk provisioning APIs and scheduled reconciliation.

**Authorisation model**
- Combine:
  - RBAC (roles: teacher, homeroom, principal, school admin, finance, wellbeing)
  - ABAC-style constraints (tenant, campus, year level, class enrolment, duty/role assignment), to prevent cross-campus leakage and to allow restricted staff roles (e.g., “boarders only” analogues).  
Synergetic’s publicly documented “security group superset” approach demonstrates how fine-grained school operational roles often become in practice, and why custom roles are essential. citeturn37view1turn37view3

**Logging and monitoring**
- Implement an **immutable audit event stream**:
  - identity events: login, MFA status, SSO assertions accepted/denied,
  - admin actions: role changes, permission grants, data exports, integration key changes,
  - sensitive data events: access to health/wellbeing records, contact detail changes, report generation,
  - data-plane events: bulk exports, API token use, failed authorisation.  
Public sources show vendors explicitly value audit logs for forensic capability (e.g., Schoolbox “detailed audit logs”; Sentral “Audit Logs”). citeturn18view2turn13view0

**Encryption and key management**
- Require TLS 1.2+ for all external traffic (as seen in Schoolbox’s publicly stated transport stance). citeturn18view2
- Encrypt data at rest by default and implement envelope encryption with a dedicated KMS/HSM. Offer **BYOK** where jurisdictions require key custody separation (not widely documented in the reviewed vendor set; treat as a national uplift).

**Backup and DR**
- Establish explicit national targets (example baseline):
  - RPO ≤ 24 hours for core SIS/LMS data,
  - RTO ≤ 24 hours for tenant restore, ≤ 4 hours for platform-wide authentication outage (via federated failover).  
Schoolbox’s published daily backup and multi-AZ posture provides a baseline expectation for hosted education SaaS. citeturn18view2
- Perform restore testing and DR exercises. (Vendor RPO/RTO are often not public; national architecture must make these contractual and testable.)

**Delegated administration**
- Implement multi-layer admin scopes:
  - National operators (platform engineering; no student data by default, break-glass only),
  - Jurisdiction admin (policy templates, integration configuration),
  - School group admin (multi-campus governance),
  - School admin (day-to-day),
  - Delegated sub-admins (e.g., attendance officer, wellbeing coordinator, finance officer) with explicit scope and auditability.  
This reflects the kind of fine-grained delegated admin found in Synergetic’s security resources model and Sentral module-level permission emphasis. citeturn37view1turn13view0turn11view3

## Mandatory controls checklist for Australian schools

The checklist below combines:
- privacy governance expectations under the Australian Privacy Principles and Privacy Act framework, citeturn54search0turn54search3
- breach preparedness and notification obligations under the NDB scheme (for regulated entities), citeturn54search1turn54search10
- ASD security frameworks used broadly as best-practice baselines (ISM and Essential Eight maturity planning). citeturn54search2turn54search11turn54search15

| Control area | Mandatory control | Practical configuration items (platform + IdP) | Evidence / audit artefacts |
|---|---|---|---|
| Privacy governance | Maintain an up-to-date privacy policy and APP-aligned handling practices (collection, use, disclosure, access/correction) | Map data types per platform (student records, health, comms, payments) to APP obligations; ensure “need-to-know” access by role; publish school privacy notices per system | Published privacy policy; data register; role-to-data access matrix citeturn54search0turn54search6turn54search3 |
| Breach readiness | Data breach preparation and response plan; NDB assessment workflow (for regulated entities) | Define severity thresholds; maintain contact tree; ensure vendor breach-notification SLAs; run tabletop exercises | Incident response plan; exercise reports; data breach workflow documentation citeturn54search7turn54search1turn54search10 |
| Identity | Federated SSO for staff (reduce passwords in SaaS) | Enforce SSO for staff wherever supported (e.g., Xuno SSO enforcement); disable local passwords where feasible | IdP app inventory; platform auth settings screenshots; list of apps enforcing SSO citeturn15view0turn9view0 |
| MFA | MFA for staff access to admin and sensitive systems | Enforce MFA in IdP conditional access; require step-up MFA for exports, finance, wellbeing; align with education department guidance patterns | Conditional access policies; MFA registration compliance reports citeturn9view0turn54search2 |
| Access control | Least privilege via RBAC + scoped delegation | Avoid “superuser everywhere”; implement delegated admin roles; quarterly access reviews; use platform exports where available (e.g., Compass role-permission export) | Access review logs; permission export snapshots; approvals citeturn47search8turn37view1turn37view3 |
| Account lifecycle | Strong joiner/mover/leaver process | Automate provisioning from authoritative sources; disable leavers quickly; review shared accounts; remove stale parent access | Offboarding records; disabled-account reports; reconciliation logs citeturn15view3turn54search2 |
| Logging | Enable and retain audit logs for admin and sensitive actions | Turn on platform audit logs where available; centralise to SIEM; ensure time sync; monitor for anomalous exports | Central log retention policy; SIEM dashboards; audit log extracts citeturn18view2turn13view0turn54search2 |
| Data residency | Ensure hosting regions meet jurisdiction requirements | Confirm vendor region in contract; prefer explicit AU-region statements; validate sub-processors | Contract schedules; vendor statements; DPIA/PIA results citeturn44view0turn14search18turn13view0turn53view0 |
| Encryption | Encrypt in transit; require strong TLS | Verify platform enforces HTTPS/TLS; avoid weak legacy endpoints; restrict admin remote access | Technical assurance statement; network testing results citeturn18view2turn9view1 |
| Backups & recovery | Tested backups and restore procedures | Require vendor backup frequency and retention in writing; test restore at least annually; define RPO/RTO | Backup policy; restore test evidence; DR exercise report citeturn18view2turn54search2 |
| Endpoint + patching | Align with Essential Eight uplift plan | Patch OS/apps; restrict admin privileges; implement application control/macro controls where relevant | Essential Eight maturity plan; patch compliance reports citeturn54search11turn54search15 |
| Supplier assurance | Contractual security requirements and right-to-audit | Require certification evidence where claimed (ISO 27001); define breach notification timelines; ensure subcontractor transparency | Supplier security schedules; certificates; SOC/pen-test summaries if available citeturn13view0turn53view0turn40view1turn41view0 |

**Interpretation note:** the Privacy Act coverage depends on organisational status and turnover thresholds; however, APP-aligned controls and breach readiness are widely treated as baseline duty-of-care for education organisations handling sensitive student data, even where strict legal applicability varies. citeturn54search3turn54search0turn54search7


