# VAOP Open-Source Systems-of-Record and Integration Target Study List

## Executive summary

A Vertical Autonomous Operations Provider control plane lives or dies by the quality of its systems-of-record (SoR) and integration targets: you need stable domain objects, well-defined extension points, and release velocity you can keep up with. This report provides a cross-domain, prioritised evaluation set of 20 open-source and source-available platforms that collectively cover marketing, HR/IT ops, finance/ERP, billing, CRM/sales, customer support, ITSM/asset management, analytics/BI, IAM/SSO, and workflow/orchestration. All candidates are backed by primary/official sources (project repos/docs) and include maturity signals (stars, releases, latest release date) as of February 2026. citeturn13view0turn14view0turn16view2turn17view0turn18view0turn8view0turn9view0turn12view0turn21view0turn22view1turn21view3turn21view5turn28view0turn28view3turn27view2turn28view5turn33view1turn33view3turn33view5turn33view7

Licensing is a first-order design constraint for an open-source VAOP platform: several popular platforms are not “pure” OSS in practice because (a) they ship enterprise-only code paths under separate licences (e.g., Chatwoot, authentik) or (b) they use source-available “fair-code” terms restricting commercial/hosted usage (e.g., n8n’s Sustainable Use License). citeturn30view0turn11view0turn25view0turn32view0

Finally, treat workflow engines and “automation runtimes” as high-risk components: they concentrate credentials (OAuth tokens, API keys) and execute untrusted expressions. Recent reporting on critical n8n RCE vulnerabilities (CVE-2026-25049) illustrates why your VAOP control plane must enforce strong admin boundaries, approvals, auditing, and hardened deployment for any orchestration layer. citeturn19news40turn25view0

## Evaluation rubric and notation

Priority ranking is optimised for a VAOP platform that orchestrates modular “machines” with policy/approval/audit gates and expert oversight (human-in-the-loop), where the goal is to automate non-core business functions without becoming the regulated system-of-record itself (except where appropriate).  

Relevance score (1–5) is a composite of: domain coverage, maturity (community + release cadence), extensibility (plugins/modules/APIs), and suitability as an integration anchor (stable data model + clear boundaries). Maturity signals are taken directly from the projects’ official repositories (stars, release counts, latest release date). citeturn13view0turn14view0turn16view2turn17view0turn18view0turn8view0turn9view0turn12view0turn23view1turn22view1turn23view0turn21view5turn28view0turn28view3turn27view2turn28view5turn34view0turn34view1turn34view2turn33view7

Notation (kept intentionally terse):
- MT (multi-tenancy): **native** (explicit), **tags/instances** (implied, per deployment patterns), **TBD** (not evidenced in extracted sources).
- RBAC/ACL, Audit/logging: **TBD** unless directly evidenced by the project’s own repo text in sources captured here.
- Ops complexity: **L/M/H** as a deployment heuristic from packaging/stack signals in the official repo text (e.g., “single binary” suggests lower ops). citeturn8view0turn20view3turn27view3turn17view0

## Top-20 prioritised shortlist

Maturity and stack details in the table below come from each project’s official GitHub repo pages and/or the projects’ own licence files as captured in the cited sources (February 2026 snapshot). citeturn14view0turn13view0turn16view2turn17view0turn18view0turn8view0turn9view0turn12view0turn23view1turn22view1turn23view0turn21view5turn28view0turn28view3turn27view2turn28view5turn34view0turn34view1turn34view2turn33view7turn25view0turn30view0turn11view0turn7view0turn32view0turn0search1

| Priority | Candidate | Primary domain | Licence class | Stars | Releases (latest) | Primary stack | Extensibility evidence | Relevance |
|---:|---|---|---|---:|---|---|---|---:|
| 1 | Odoo | ERP suite (broad ops) | OSS (LGPLv3) | 49k | GitHub releases: none shown | Python/JS | Modular “Apps”; repo has `addons/` | 5 |
| 2 | ERPNext | ERP/finance/procurement | OSS (GPL-3.0) | 31.7k | 1,683 (v16.5.0, 11 Feb 2026) | Python | Multi-domain scope in topics | 5 |
| 3 | Keycloak | IAM/SSO | OSS (Apache-2.0) | 32.8k | 100 (26.5.3, 10 Feb 2026) | Java | “Fine-grained authorization” | 5 |
| 4 | Temporal | Workflow durability | OSS (MIT) | 18.3k | 152 (v1.29.3, 4 Feb 2026) | Go | Durable workflow core (server) | 5 |
| 5 | Apache Airflow | Orchestration | OSS (Apache-2.0) | 44.3k | 112 (3.1.7, 4 Feb 2026) | Python | Operators/DAGs; workflows as code | 5 |
| 6 | Argo Workflows | K8s workflows | OSS (Apache-2.0) | 16.5k | 331 (v4.0.0, 4 Feb 2026) | Go/TS | K8s CRD-based ecosystem | 4 |
| 7 | n8n | iPaaS/automation | Source-available | 175k | 529 (2.7.5, 13 Feb 2026) | TypeScript | Custom nodes; licence-defined model | 5 |
| 8 | SuiteCRM | CRM/sales | OSS (AGPL-3.0) | 5.3k | 228 (7.15.0, 18 Dec 2025) | PHP | Extensions directory link | 4 |
| 9 | Chatwoot | Support omni-channel | Mostly OSS (MIT + enterprise carve-out) | 27.3k | 134 (4.10.1, 20 Jan 2026) | (Not extracted) | Explicit API docs repo; enterprise dir carve-out | 4 |
| 10 | Zammad | Helpdesk | OSS (AGPL-3.0) | 5.4k | Tags: 103 | (Not extracted) | REST API link in repo | 4 |
| 11 | GLPI | ITSM/ITAM | OSS (GPL-3.0) | 5.6k | 95 (11.0.5, 28 Jan 2026) | (Not extracted) | Plugin directory + dev docs links | 4 |
| 12 | Metabase | BI/embedded analytics | Mixed (AGPL + commercial in repo) | 45.9k | 721 (58.6, 12 Feb 2026) | Clojure/TS | Mentions “Query API” | 4 |
| 13 | Apache Superset | BI/visualisation | OSS (Apache-2.0) | 70.5k | 242 (6.0.0, 18 Dec 2025) | TS/Python | API + extensible security roles | 4 |
| 14 | Matomo | Web analytics | OSS (GPL-3.0+) | 21.3k | 758 (5.7.1, 3 Feb 2026) | PHP | `plugins/` folder | 4 |
| 15 | Mautic | Marketing automation | OSS (GPLv3+) | 9.2k | 181 (7.0.0, 20 Jan 2026) | PHP/Twig | `plugins/` folder | 4 |
| 16 | listmonk | Email/newsletters | OSS (AGPL-3.0) | 19.1k | 38 (v6.0.0, 2 Jan 2026) | Go/Vue | “Single binary”; explicit DB schema | 3 |
| 17 | Kill Bill | Billing/subscriptions | OSS (Apache-2.0) | 5.3k | 151 (0.24.16, 25 Nov 2025) | Java | Tenant module present; plugin-first framing | 4 |
| 18 | Dolibarr | ERP/CRM (lighter) | OSS (GPL-3.0) | 6.9k | 92 (22.0.4, 24 Dec 2025) | PHP | Broad SME modules in topics | 3 |
| 19 | osTicket | Ticketing | OSS (GPL-2.0) | 3.7k | 113 (1.18.3, 15 Jan 2026) | PHP | Lightweight helpdesk model | 3 |
| 20 | authentik | IAM/SSO | Mostly OSS (MIT + enterprise carve-out) | 20.1k | 322 (2025.12.4, 12 Feb 2026) | Python/TS | Explicit enterprise dir licence carve-out | 4 |

## Candidate profiles

Each profile includes the required fields; any field marked **TBD** was not evidenced in the extracted official sources captured in this run and should be confirmed directly in the project’s own docs before committing.  

1) entity["organization","Odoo","open-source erp suite"]  
Repo: `https://github.com/odoo/odoo`  
Licence: LGPLv3 (Community Edition), per Odoo licence file and documentation. citeturn0search1turn0search5  
Maturity: 49k stars; GitHub “Releases” not present on repo page; very high commit volume (197,905 commits). citeturn14view0turn15view0  
MT: TBD (not evidenced in extracted sources).  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: Modular “Apps”; repo contains `addons/`. citeturn13view1turn14view0  
Data model notes: Broad business suite including CRM, accounting, HR, marketing, inventory/warehouse, eCommerce as described in README. citeturn13view1  
Deployment/ops complexity: H (large Python/JS monolith; heuristic). citeturn15view0  
Primary language/stack: Python 51.0%, JavaScript 44.8% (plus SCSS/other). citeturn15view0  
Relevance score: 5/5. Priority rank: 1.  
Rationale: Maximum “non-core function coverage” in one canonical suite; best studied as a reference data model and modular ERP architecture. citeturn13view1turn14view0  

2) entity["organization","ERPNext","open-source erp"]  
Repo: `https://github.com/frappe/erpnext`  
Licence: GPL-3.0. citeturn13view0turn0search0  
Maturity: 31.7k stars; 1,683 releases; latest v16.5.0 (11 Feb 2026). citeturn13view0  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: TBD (not evidenced here).  
Data model notes: Repo topics explicitly span accounting, CRM, procurement, retail, POS, HRMS, asset management. citeturn13view0  
Deployment/ops complexity: H (ERP-class platform; heuristic). citeturn13view0  
Primary language/stack: Python (repo topics indicate Python; detailed language split not extracted). citeturn13view0  
Relevance score: 5/5. Priority rank: 2.  
Rationale: High-maturity OSS ERP spanning VAOP-relevant operational domains, strongly suitable as a “canonical SME ERP” integration reference. citeturn13view0  

3) entity["organization","Keycloak","open-source iam"]  
Repo: `https://github.com/keycloak/keycloak`  
Licence: Apache-2.0. citeturn3view1turn9view1  
Maturity: 32.8k stars; 100 releases; latest 26.5.3 (10 Feb 2026). citeturn3view1turn9view0  
MT: TBD.  
RBAC/ACL: Evidence of fine-grained authorisation in repo description. citeturn2view1  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: TBD (not evidenced here).  
Data model notes: IAM focus: user federation, strong authentication, user management, authorisation. citeturn2view1  
Deployment/ops complexity: M–H (Java server; containerised options shown). citeturn9view0  
Primary language/stack: Java (91.6%) + TypeScript (7.3%). citeturn9view0  
Relevance score: 5/5. Priority rank: 3.  
Rationale: A VAOP control plane needs robust identity boundaries; Keycloak is a mature OSS anchor for SSO and authorisation. citeturn2view1turn9view0  

4) entity["organization","Temporal","durable workflow engine"]  
Repo: `https://github.com/temporalio/temporal`  
Licence: MIT. citeturn21view0turn23view1  
Maturity: 18.3k stars; 152 releases; latest v1.29.3 (4 Feb 2026). citeturn21view1turn23view1  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD (not evidenced here).  
Plugin/extension model: N/A (workflow server core).  
Data model notes: Durable execution with “Workflows” and automatic handling of failures/retries. citeturn19search0turn23view1  
Deployment/ops complexity: M (server + clients; local dev startup documented). citeturn23view1  
Primary language/stack: Go 99.3%. citeturn23view1  
Relevance score: 5/5. Priority rank: 4.  
Rationale: Durable orchestration is foundational for policy-gated “machines” (retries, timeouts, long-running human approvals). citeturn19search0turn23view1  

5) entity["organization","Apache Airflow","workflow scheduler"]  
Repo: `https://github.com/apache/airflow`  
Licence: Apache-2.0. citeturn22view2turn19search5  
Maturity: 44.3k stars; 112 releases; latest 3.1.7 (4 Feb 2026). citeturn22view1turn22view2  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: Evidence of “workflows defined as code” and extensible orchestration model; Airflow positions tasks as ideally idempotent. citeturn20view1turn22view1  
Data model notes: DAG-based task orchestration; intended for mostly static workflows. citeturn20view1  
Deployment/ops complexity: M–H (scheduler + workers; typical). citeturn20view1  
Primary language/stack: Python (repo). citeturn20view1  
Relevance score: 5/5. Priority rank: 5.  
Rationale: A mature orchestration substrate for data-motion and scheduled operational tasks; strong ecosystem fit for analytics/backfills. citeturn20view1turn22view1  

6) entity["organization","Argo Workflows","kubernetes workflow engine"]  
Repo: `https://github.com/argoproj/argo-workflows`  
Licence: Apache-2.0. citeturn21view2turn19search10  
Maturity: 16.5k stars; 331 releases; latest v4.0.0 (4 Feb 2026). citeturn21view3turn23view0  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: Ecosystem framed around clients/SDKs and K8s-native workflow composition. citeturn20view2turn23view0  
Data model notes: Implemented as a Kubernetes CRD; container-step workflows and DAGs. citeturn20view2turn23view0  
Deployment/ops complexity: M–H (Kubernetes-native). citeturn20view2turn23view0  
Primary language/stack: Go 84.7%, TypeScript 11.6%. citeturn23view0  
Relevance score: 4/5. Priority rank: 6.  
Rationale: Best fit when your VAOP control plane standardises on Kubernetes-native execution for “machines” and connectors. citeturn20view2turn23view0  

7) entity["organization","n8n","workflow automation platform"]  
Repo: `https://github.com/n8n-io/n8n`  
Licence: Source-available “fair-code”: Sustainable Use License, with enterprise-only code paths and commercial limitations. citeturn25view0turn20view3  
Maturity: 175k stars; 529 releases; latest 2.7.5 (13 Feb 2026). citeturn21view5turn23view2  
MT: TBD.  
RBAC/ACL: Repo text claims “advanced permissions” in enterprise positioning (confirm scope). citeturn20view3  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: Extensible via custom nodes (implied by “add your own nodes and functionality” framing). citeturn20view3turn25view0  
Data model notes: Workflow automation + templates (900+ templates claimed) with heavy integration surface area. citeturn20view3turn21view4  
Deployment/ops complexity: M (self-host via Docker; quick start via `npx`). citeturn20view3  
Primary language/stack: TypeScript 91.4%, Vue 7.2%. citeturn23view2  
Relevance score: 5/5. Priority rank: 7.  
Rationale: High-leverage integration substrate, but licence constraints and security posture demand careful isolation and governance. citeturn25view0turn19news40turn21view4  

8) entity["organization","SuiteCRM","open-source crm"]  
Repo: `https://github.com/SuiteCRM/SuiteCRM`  
Licence: AGPL-3.0. citeturn17view0turn0search11  
Maturity: 5.3k stars; 228 releases; latest 7.15.0 (18 Dec 2025). citeturn17view0  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: Explicit “Extensions Directory” link in repo README navigation. citeturn17view0  
Data model notes: CRM core for leads/opportunities/accounts; repo positions SuiteCRM 7 as mature/stable. citeturn17view0  
Deployment/ops complexity: M (LAMP stack recommended in repo text). citeturn17view0  
Primary language/stack: PHP 71.7% + JS 15.4%. citeturn17view0  
Relevance score: 4/5. Priority rank: 8.  
Rationale: Valuable CRM reference model and integration anchor for sales ops when you need an OSS SoR baseline. citeturn17view0turn0search11  

9) entity["organization","Chatwoot","open-source support platform"]  
Repo: `https://github.com/chatwoot/chatwoot`  
Licence: MIT for non-enterprise content; enterprise directory (if present) under separate licence. citeturn30view0  
Maturity: 27.3k stars; 134 releases; latest 4.10.1 (20 Jan 2026). citeturn28view3turn28view2  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: Developer docs repo explicitly covers “Chatwoot APIs” and custom flows. citeturn26search9turn27view1  
Plugin/extension model: TBD.  
Data model notes: Omnichannel support desk with “AI agent for support” positioning (“Captain” feature mentioned). citeturn27view1  
Deployment/ops complexity: TBD (not extracted).  
Primary language/stack: TBD (not extracted).  
Relevance score: 4/5. Priority rank: 9.  
Rationale: Strong candidate support SoR with API-first extension potential; licence carve-outs need review for an OSS VAOP distribution. citeturn30view0turn28view2turn26search9  

10) entity["organization","Zammad","open-source helpdesk"]  
Repo: `https://github.com/zammad/zammad`  
Licence: AGPL-3.0; repo states it “will stay open source”. citeturn27view0turn28view0  
Maturity: 5.4k stars; releases not shown in captured snippet (tag-based; 103 tags). citeturn28view1turn28view0  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: Explicit REST API link in repo navigation. citeturn27view0  
Plugin/extension model: TBD.  
Data model notes: Helpdesk/support focus across channels (email/chat/telephone/social). citeturn27view0turn28view0  
Deployment/ops complexity: TBD.  
Primary language/stack: TBD.  
Relevance score: 4/5. Priority rank: 10.  
Rationale: Mature OSS helpdesk baseline; good for studying ticket/workflow semantics and API integration patterns. citeturn27view0turn28view0  

11) entity["organization","GLPI","itsm and itam platform"]  
Repo: `https://github.com/glpi-project/glpi`  
Licence: GPL-3.0. citeturn27view2  
Maturity: 5.6k stars; 95 releases; latest 11.0.5 (28 Jan 2026). citeturn27view2  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: Explicit plugin directory + plugin dev docs links in repo. citeturn27view2turn26search22  
Data model notes: ITIL service desk + asset/configuration management; licence tracking/software auditing in repo description. citeturn27view2  
Deployment/ops complexity: M (ITSM platform; heuristic). citeturn27view2  
Primary language/stack: TBD (not extracted).  
Relevance score: 4/5. Priority rank: 11.  
Rationale: Strong ITSM/ITAM reference SoR for VAOP “ops/IT” automations (tickets, assets, CMDB-like objects). citeturn27view2  

12) entity["organization","Metabase","open-source bi tool"]  
Repo: `https://github.com/metabase/metabase`  
Licence: Repo includes both AGPL OSS edition and commercial editions under a commercial licence (mixed-licence repo). citeturn32view0turn33view0turn31search16  
Maturity: 45.9k stars; 721 releases; latest 58.6 (12 Feb 2026). citeturn33view1turn34view0  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: Explicit “Query API” mentioned for integrating analytics. citeturn34view0  
Plugin/extension model: TBD.  
Data model notes: Strong “embedded analytics” orientation (explicit in repo positioning). citeturn33view0turn34view0  
Deployment/ops complexity: M.  
Primary language/stack: Clojure 50.8%, TypeScript 38.5%. citeturn34view0  
Relevance score: 4/5. Priority rank: 12.  
Rationale: Ideal for VAOP reporting/observability surfaces; licence boundaries matter if you plan to redistribute/host embedded BI. citeturn32view0turn34view0  

13) entity["organization","Apache Superset","open-source bi platform"]  
Repo: `https://github.com/apache/superset`  
Licence: Apache-2.0. citeturn33view2turn31search13  
Maturity: 70.5k stars; 242 releases; latest 6.0.0 (18 Dec 2025). citeturn33view3turn34view1  
MT: TBD.  
RBAC/ACL: Repo explicitly mentions “highly extensible security roles and authentication options”. citeturn32view1  
Audit/logging: TBD.  
API/webhooks/events: Repo explicitly mentions “an API for programmatic customization”. citeturn32view1  
Plugin/extension model: TBD.  
Data model notes: SQL-first BI; integrates with many SQL data sources via DB-API/SQLAlchemy dialects. citeturn32view1turn31search9  
Deployment/ops complexity: M–H (BI platform).  
Primary language/stack: TypeScript 50.8%, Python 37.7%. citeturn34view1  
Relevance score: 4/5. Priority rank: 13.  
Rationale: Strong OSS BI for serving “operator dashboards” and customer-facing reporting; explicit role model and API hooks are VAOP-aligned. citeturn32view1turn34view1  

14) entity["organization","Matomo","open-source web analytics"]  
Repo: `https://github.com/matomo-org/matomo`  
Licence: GPL-3.0 (or later), per repo. citeturn32view2turn33view4  
Maturity: 21.3k stars; 758 releases; latest 5.7.1 (3 Feb 2026). citeturn33view5turn33view4  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: `plugins/` folder present. citeturn33view4  
Data model notes: Web analytics platform positioned as OSS alternative to Google Analytics; privacy emphasis in repo narrative. citeturn32view2  
Deployment/ops complexity: M (PHP + MySQL/MariaDB requirements specified). citeturn32view2turn31search6  
Primary language/stack: PHP 79.3% + JS/Vue/Twig. citeturn34view2  
Relevance score: 4/5. Priority rank: 14.  
Rationale: High-leverage for VAOP marketing analytics and growth ops baselines without proprietary analytics lock-in. citeturn32view2turn34view2  

15) entity["organization","Mautic","open-source marketing automation"]  
Repo: `https://github.com/mautic/mautic`  
Licence: GPLv3 (or later), explicitly stated in licence file. citeturn7view0  
Maturity: 9.2k stars; 181 releases; latest 7.0.0 (20 Jan 2026). citeturn18view0turn3view0  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD (developer docs exist but not extracted).  
Plugin/extension model: `plugins/` folder present (explicit in repo tree). citeturn4view0turn3view0  
Data model notes: Marketing automation campaigns; repo stresses multi-channel marketing and extensibility. citeturn2view0turn18view2  
Deployment/ops complexity: M (PHP; composer-based install paths described). citeturn18view2  
Primary language/stack: PHP 78.8% + Twig/CSS/JS. citeturn18view0  
Relevance score: 4/5. Priority rank: 15.  
Rationale: Primary OSS benchmark for marketing automation workflows and plugin-driven integration patterns. citeturn2view0turn18view0  

16) entity["organization","listmonk","newsletter manager"]  
Repo: `https://github.com/knadh/listmonk`  
Licence: AGPL-3.0. citeturn8view0  
Maturity: 19.1k stars; 38 releases; latest v6.0.0 (2 Jan 2026). citeturn8view0  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: TBD.  
Data model notes: Explicitly “single binary” and uses PostgreSQL as its data store; repo includes `schema.sql`. citeturn8view0  
Deployment/ops complexity: L (single binary + Postgres). citeturn8view0  
Primary language/stack: Go 40.4%; Vue 25.2%; JS/TS. citeturn8view0  
Relevance score: 3/5. Priority rank: 16.  
Rationale: Lightweight email/newsletter SoR for VAOP marketing comms where full marketing automation is overkill. citeturn8view0  

17) entity["organization","Kill Bill","subscription billing platform"]  
Repo: `https://github.com/killbill/killbill`  
Licence: Apache-2.0 (explicitly stated). citeturn33view6turn32view3  
Maturity: 5.3k stars; 151 releases; latest 0.24.16 (25 Nov 2025). citeturn33view7turn33view6  
MT: Evidence of tenant-oriented architecture via `tenant/` module in repo tree. citeturn32view3  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: Repo framing emphasises extensibility and modularisation (“framework for extensibility”; not an all-in-one). citeturn32view3  
Data model notes: Subscription billing and payments; modules like account/subscription/usage visible in repo structure. citeturn32view3  
Deployment/ops complexity: M–H (Java service; billing-critical). citeturn34view3turn33view6  
Primary language/stack: Java 97.9%. citeturn34view3  
Relevance score: 4/5. Priority rank: 17.  
Rationale: Useful reference for billing domain modelling, tenant isolation, and plugin-first billing architecture. citeturn32view3turn33view6  

18) entity["organization","Dolibarr","sme erp crm"]  
Repo: `https://github.com/Dolibarr/dolibarr`  
Licence: GPL-3.0. citeturn16view0turn13view2  
Maturity: 6.9k stars; 92 releases; latest 22.0.4 (24 Dec 2025). citeturn16view1turn16view0  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: TBD.  
Data model notes: ERP/CRM breadth across contacts/suppliers/invoices/orders/stocks; explicitly described in repo page. citeturn16view0turn13view2  
Deployment/ops complexity: M (PHP app; packaging options listed). citeturn13view2turn16view1  
Primary language/stack: PHP 92.3% + JS. citeturn16view1  
Relevance score: 3/5. Priority rank: 18.  
Rationale: Smaller ERP/CRM baseline than Odoo/ERPNext; good reference for lean SME workflows and module scoping. citeturn16view0turn16view1  

19) entity["organization","osTicket","open-source ticketing system"]  
Repo: `https://github.com/osTicket/osTicket`  
Licence: GPL-2.0. citeturn28view4turn27view3  
Maturity: 3.7k stars; 113 releases; latest 1.18.3 (15 Jan 2026). citeturn28view5turn28view4  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: TBD.  
Data model notes: Ticket-centric support model; repo describes multi-user web interface, email/web intake. citeturn27view3turn28view4  
Deployment/ops complexity: L–M (classic PHP + MySQL + web server requirements listed). citeturn27view3  
Primary language/stack: PHP (implied by requirements; exact split not extracted). citeturn27view3  
Relevance score: 3/5. Priority rank: 19.  
Rationale: Simple ticketing SoR for support ops; useful as minimal baseline when omnichannel suites are unnecessary. citeturn27view3turn28view5  

20) entity["organization","authentik","open-source idp"]  
Repo: `https://github.com/goauthentik/authentik`  
Licence: MIT for most content, with explicit carve-outs: website content under CC BY-SA 4.0 and `authentik/enterprise/` under a separate enterprise licence. citeturn11view0turn12view0  
Maturity: 20.1k stars; 322 releases; latest 2025.12.4 (12 Feb 2026). citeturn12view0turn3view2  
MT: TBD.  
RBAC/ACL: TBD.  
Audit/logging: TBD.  
API/webhooks/events: TBD.  
Plugin/extension model: TBD.  
Data model notes: IdP supporting SAML, OAuth2/OIDC, LDAP, RADIUS as stated. citeturn2view2turn12view0  
Deployment/ops complexity: M (official Docker Compose + Kubernetes Helm chart install paths). citeturn2view2turn12view0  
Primary language/stack: Python 51.3% + TypeScript 32.1%. citeturn12view0  
Relevance score: 4/5. Priority rank: 20.  
Rationale: Strong alternative IAM anchor; licence carve-outs must be understood if you plan to embed redistributable “VAOP bundles”. citeturn11view0turn12view0  

## Reference integration model for a VAOP control plane

The diagram below shows how these platforms map to a VAOP domain decomposition (SoR targets on the right, policy-gated automation in the centre). “Machines” are not shown as agents; they are auditable orchestration units that call APIs and wait for approval when required.

```mermaid
flowchart LR
  subgraph ControlPlane[VAOP Control Plane]
    Policy[Policy / approvals/n(e.g. gates)]
    Orchestrator[Durable workflows/n(Temporal/Airflow/Argo)]
    Integration[Integration runtime/n(n8n-style nodes)]
    Audit[Immutable audit log/n+ traces]
  end

  subgraph SoR[Systems of Record / Anchors]
    ERP[ERP / ops suite/n(Odoo, ERPNext, Dolibarr)]
    CRM[CRM/n(SuiteCRM)]
    Support[Support desk/n(Chatwoot, Zammad, osTicket)]
    ITSM[ITSM/ITAM/n(GLPI)]
    IAM[IAM/SSO/n(Keycloak, authentik)]
    BI[BI / reporting/n(Superset, Metabase)]
    Mkt[Mkt automation/n(Mautic, listmonk)]
    Analytics[Web analytics/n(Matomo)]
    Billing[Billing/n(Kill Bill)]
  end

  Policy --> Orchestrator --> Integration --> SoR
  SoR --> Audit
  Policy --> Audit
  Orchestrator --> Audit
```

Two practical implications follow directly from the sources in this report:
- You will need a first-class licence policy in the control plane: n8n’s Sustainable Use License imposes explicit limitations on commercial usage and distribution, and several repos include enterprise-only code paths under separate licences (n8n, Chatwoot, authentik, Metabase). citeturn25view0turn30view0turn11view0turn32view0  
- You must harden orchestration runtimes: recent reporting on critical n8n RCE vulnerabilities highlights why workflow/edit permissions, isolation, and patch velocity are non-negotiable. citeturn19news40turn21view5


