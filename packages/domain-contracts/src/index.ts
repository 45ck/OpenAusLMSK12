export type ReadinessStage = 'planned' | 'designed' | 'in_progress' | 'ready';

export interface ModuleJourney {
  id: string;
  title: string;
  summary: string;
  sampleSteps: string[];
}

export interface ModuleCapability {
  id: string;
  name: string;
  slug: string;
  description: string;
  stage: ReadinessStage;
  criticalUserPaths: string[];
  journey: ModuleJourney[];
}

export interface PlatformModuleCatalog {
  domain: string;
  capabilities: ModuleCapability[];
}

export const platformModuleCatalog: PlatformModuleCatalog = {
  domain: 'OpenAusLMSK12',
  capabilities: [
    {
      id: 'foundation',
      name: 'Platform Foundation',
      slug: 'foundation',
      description: 'Identity, tenancy, security, audit trails, and cross-domain operational baselines.',
      stage: 'designed',
      criticalUserPaths: ['Tenant onboarding and role setup', 'SSO and token lifecycle', 'Audit and policy guardrails'],
      journey: [
        {
          id: 'foundation-journey',
          title: 'Tenant + staff enablement',
          summary: 'Create a tenant, define roles, enable identity providers, and assign baseline permissions.',
          sampleSteps: [
            'Create tenant',
            'Register OIDC provider',
            'Assign role matrix',
            'Enable audit retention policy',
          ],
        },
      ],
    },
    {
      id: 'people',
      name: 'People and Household',
      slug: 'people',
      description: 'People directory, students, carers, households, and relationships.',
      stage: 'designed',
      criticalUserPaths: ['Student records and profile', 'Household linking', 'Relationship transitions'],
      journey: [
        {
          id: 'people-onboarding',
          title: 'Student household onboarding',
          summary: 'Capture students and households with restricted access and consent-aware sharing.',
          sampleSteps: ['Create student', 'Attach household', 'Define guardians', 'Set visibility'],
        },
      ],
    },
    {
      id: 'admissions',
      name: 'Admissions and Lifecycle',
      slug: 'admissions',
      description: 'Enquiry through enrolment to annual rollover workflows.',
      stage: 'designed',
      criticalUserPaths: ['Inquiry management', 'Offer and acceptance', 'Year transition'],
      journey: [
        {
          id: 'admissions-journal',
          title: 'Admissions-to-enrolment journey',
          summary: 'Run enquiry → offer → acceptance → student record activation.',
          sampleSteps: ['Log inquiry', 'Process offer', 'Capture acceptance', 'Activate enrolment'],
        },
      ],
    },
    {
      id: 'timetabling',
      name: 'Timetabling and Operations',
      slug: 'timetabling',
      description: 'Schedule construction, swaps, room and resource coordination.',
      stage: 'designed',
      criticalUserPaths: ['Period scheduling', 'Substitutions', 'Room allocation'],
      journey: [
        {
          id: 'timetabling-daily',
          title: 'Daily schedule maintenance',
          summary: 'Create a timetable, process staff changes, and publish operational notices.',
          sampleSteps: ['Build base roster', 'Apply substitutions', 'Allocate rooms', 'Publish update'],
        },
      ],
    },
    {
      id: 'attendance',
      name: 'Attendance and Duty of Care',
      slug: 'attendance',
      description: 'Student/staff attendance, visitor logins, sign-ins, and roll-forward incidents.',
      stage: 'designed',
      criticalUserPaths: ['Kiosk sign-in', 'Absence workflow', 'Evacuation roster'],
      journey: [
        {
          id: 'attendance-compliance',
          title: 'Roll-up, explain, and evidence',
          summary: 'Mark attendance, request parent responses, and produce duty-of-care reports.',
          sampleSteps: ['Open class roll', 'Capture explanations', 'Publish alerts', 'Generate summary'],
        },
      ],
    },
    {
      id: 'wellbeing',
      name: 'Wellbeing and Pastoral Care',
      slug: 'wellbeing',
      description: 'Behaviour, care plans, sensitive records, and interventions.',
      stage: 'designed',
      criticalUserPaths: ['Wellbeing plan creation', 'Incident logging', 'Confidential sharing'],
      journey: [
        {
          id: 'wellbeing-response',
          title: 'Sensitive incident to action plan',
          summary: 'Capture an event, create a response plan, and route to guardians.',
          sampleSteps: ['Log incident', 'Set restrictions', 'Create plan', 'Notify guardians'],
        },
      ],
    },
    {
      id: 'learning',
      name: 'Teaching and Learning',
      slug: 'learning',
      description: 'Courses, timetabled learning, resources, and student work handling.',
      stage: 'designed',
      criticalUserPaths: ['Homework issue', 'Class material release', 'Student notices'],
      journey: [
        {
          id: 'learning-access',
          title: 'Student learning home access',
          summary: 'Publish class details, assign work, and let students upload or submit responses.',
          sampleSteps: ['Create class item', 'Attach material', 'Collect submissions', 'Report progress'],
        },
      ],
    },
    {
      id: 'assessment',
      name: 'Assessment and Reporting',
      slug: 'assessment',
      description: 'Assessments, moderation, outcomes mapping, and reporting lifecycle.',
      stage: 'designed',
      criticalUserPaths: ['Assessment publication', 'Marking workflow', 'Report cards'],
      journey: [
        {
          id: 'assessment-cycle',
          title: 'Task to moderated markbook',
          summary: 'Create assessment tasks, collect work, apply moderation, and publish reporting.',
          sampleSteps: ['Set task', 'Collect submissions', 'Moderation pass', 'Generate report'],
        },
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics and Dashboards',
      slug: 'analytics',
      description: 'Cross-module dashboards, trends, triggers, and educational insights.',
      stage: 'designed',
      criticalUserPaths: ['Risk detection', 'Attendance trend', 'Longitudinal reporting'],
      journey: [
        {
          id: 'analytics-trigger',
          title: 'Risk signal to intervention',
          summary: 'Monitor attendance and wellbeing signals and route interventions to relevant teams.',
          sampleSteps: ['Track indicators', 'Evaluate thresholds', 'Create tasks', 'Review outcomes'],
        },
      ],
    },
    {
      id: 'communications',
      name: 'Community and Messaging',
      slug: 'communications',
      description: 'Parent, staff, and student communication with audit and visibility controls.',
      stage: 'designed',
      criticalUserPaths: ['News and notices', 'Message dispatch', 'Consent-aware routes'],
      journey: [
        {
          id: 'communications-loop',
          title: 'Notice, message, and follow-up',
          summary: 'Send notices and messages with delivery status and policy validation.',
          sampleSteps: ['Post notice', 'Deliver channel', 'Capture receipts', 'Escalate unresolved'],
        },
      ],
    },
    {
      id: 'events',
      name: 'Events and Excursions',
      slug: 'events',
      description: 'Excursions, field trips, attendance, consent, and event workflows.',
      stage: 'designed',
      criticalUserPaths: ['Consent capture', 'Event roll', 'Stakeholder communications'],
      journey: [
        {
          id: 'events-flow',
          title: 'Excursion registration to post-event close',
          summary: 'Capture consent and medical notes, monitor attendance, and close event records.',
          sampleSteps: ['Create event', 'Collect consents', 'Track attendance', 'Close and report'],
        },
      ],
    },
    {
      id: 'finance',
      name: 'Finance and Billing',
      slug: 'finance',
      description: 'Invoices, contributions, payments, and reconciliation workflows.',
      stage: 'designed',
      criticalUserPaths: ['Billing creation', 'Payment lifecycle', 'Audit trails'],
      journey: [
        {
          id: 'finance-flow',
          title: 'Invoice to payment confirmation',
          summary: 'Issue invoices, process payment attempts, and reconcile statements.',
          sampleSteps: ['Generate invoice', 'Collect payment', 'Reconcile', 'Store evidence'],
        },
      ],
    },
    {
      id: 'workforce',
      name: 'Staff Workforce',
      slug: 'workforce',
      description: 'Staff self-service, leave, rosters, events, and records.',
      stage: 'designed',
      criticalUserPaths: ['Leave request', 'Roster updates', 'Profile management'],
      journey: [
        {
          id: 'workforce-cycle',
          title: 'Leave request to approval',
          summary: 'Submit leave, route approvals, and update roster coverage automatically.',
          sampleSteps: ['Submit request', 'Approve workflow', 'Update roster', 'Notify staff'],
        },
      ],
    },
    {
      id: 'forms',
      name: 'Forms and Workflows',
      slug: 'forms',
      description: 'Dynamic form templates, approvals, escalations, and automations.',
      stage: 'designed',
      criticalUserPaths: ['Form submission', 'Approval route', 'Scheduled automation'],
      journey: [
        {
          id: 'forms-route',
          title: 'Evidence form to records',
          summary: 'Submit form, auto-route to reviewer, and materialize related records.',
          sampleSteps: ['Build form', 'Submit values', 'Approve and escalate', 'Attach artifacts'],
        },
      ],
    },
    {
      id: 'integration',
      name: 'Integration Layer',
      slug: 'integration',
      description: 'APIs, webhooks, adapters, and marketplace-style extension model.',
      stage: 'designed',
      criticalUserPaths: ['API key lifecycle', 'Webhook subscriptions', 'SIS connectors'],
      journey: [
        {
          id: 'integration-path',
          title: 'External connector onboarding',
          summary: 'Register connector, authorize, map schema contracts, and test event forwarding.',
          sampleSteps: ['Create connector', 'Assign permissions', 'Map schema', 'Enable webhook'],
        },
      ],
    },
    {
      id: 'ai',
      name: 'AI Capabilities',
      slug: 'ai',
      description: 'Tenant-aware LLM enablement, governance, moderation, and policy controls.',
      stage: 'designed',
      criticalUserPaths: ['Prompt policy', 'AI assisted planning', 'Moderation controls'],
      journey: [
        {
          id: 'ai-governance',
          title: 'Controlled AI assistant use',
          summary: 'Enable AI feature per tenant, enforce policy boundaries, and audit interactions.',
          sampleSteps: ['Register model', 'Apply policy', 'Enable per-domain', 'Review logs'],
        },
      ],
    },
    {
      id: 'compliance',
      name: 'Compliance and Governance',
      slug: 'compliance',
      description: 'Audit retention, legal holds, evidence packs, and control frameworks.',
      stage: 'designed',
      criticalUserPaths: ['Retention schedules', 'Export packs', 'Evidence workflows'],
      journey: [
        {
          id: 'compliance-control',
          title: 'Evidence pack on demand',
          summary: 'Build a defensible evidence bundle for audits and safety checks.',
          sampleSteps: ['Define scope', 'Freeze records', 'Generate pack', 'Store with hash'],
        },
      ],
    },
  ],
};
