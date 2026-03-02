namespace OpenAusLMSK12.Api.Modules;

public record ModuleJourney(string Id, string Title, string Summary, IReadOnlyList<string> SampleSteps);

public record ModuleCapability(
    string Id,
    string Name,
    string Slug,
    string Description,
    string Stage,
    IReadOnlyList<string> CriticalUserPaths,
    IReadOnlyList<ModuleJourney> Journey
);

public record PlatformModuleCatalog(string Domain, IReadOnlyList<ModuleCapability> Capabilities);

public static class DomainModuleCatalog
{
    public static readonly PlatformModuleCatalog Catalog = new(
        Domain: "OpenAusLMSK12",
        Capabilities: new[]
        {
            new ModuleCapability(
                "foundation",
                "Platform Foundation",
                "foundation",
                "Identity, tenancy, security, audit trails, and cross-domain operational baselines.",
                "designed",
                new[] { "Tenant onboarding and role setup", "SSO and token lifecycle", "Audit and policy guardrails" },
                new[]
                {
                    new ModuleJourney(
                        "foundation-journey",
                        "Tenant + staff enablement",
                        "Create a tenant, define roles, enable identity providers, and assign baseline permissions.",
                        new[] { "Create tenant", "Register OIDC provider", "Assign role matrix", "Enable audit retention policy" }
                    )
                }
            ),
            new ModuleCapability(
                "people",
                "People and Household",
                "people",
                "People directory, students, carers, households, and relationships.",
                "designed",
                new[] { "Student records and profile", "Household linking", "Relationship transitions" },
                new[]
                {
                    new ModuleJourney(
                        "people-onboarding",
                        "Student household onboarding",
                        "Capture students and households with restricted access and consent-aware sharing.",
                        new[] { "Create student", "Attach household", "Define guardians", "Set visibility" }
                    )
                }
            ),
            new ModuleCapability(
                "admissions",
                "Admissions and Lifecycle",
                "admissions",
                "Enquiry through enrolment to annual rollover workflows.",
                "designed",
                new[] { "Inquiry management", "Offer and acceptance", "Year transition" },
                new[]
                {
                    new ModuleJourney(
                        "admissions-journal",
                        "Admissions-to-enrolment journey",
                        "Run enquiry → offer → acceptance → student record activation.",
                        new[] { "Log inquiry", "Process offer", "Capture acceptance", "Activate enrolment" }
                    )
                }
            ),
            new ModuleCapability(
                "timetabling",
                "Timetabling and Operations",
                "timetabling",
                "Schedule construction, swaps, room and resource coordination.",
                "designed",
                new[] { "Period scheduling", "Substitutions", "Room allocation" },
                new[]
                {
                    new ModuleJourney(
                        "timetabling-daily",
                        "Daily schedule maintenance",
                        "Create a timetable, process staff changes, and publish operational notices.",
                        new[] { "Build base roster", "Apply substitutions", "Allocate rooms", "Publish update" }
                    )
                }
            ),
            new ModuleCapability(
                "attendance",
                "Attendance and Duty of Care",
                "attendance",
                "Student/staff attendance, visitor logins, sign-ins, and roll-forward incidents.",
                "designed",
                new[] { "Kiosk sign-in", "Absence workflow", "Evacuation roster" },
                new[]
                {
                    new ModuleJourney(
                        "attendance-compliance",
                        "Roll-up, explain, and evidence",
                        "Mark attendance, request parent responses, and produce duty-of-care reports.",
                        new[] { "Open class roll", "Capture explanations", "Publish alerts", "Generate summary" }
                    )
                }
            ),
            new ModuleCapability(
                "wellbeing",
                "Wellbeing and Pastoral Care",
                "wellbeing",
                "Behaviour, care plans, sensitive records, and interventions.",
                "designed",
                new[] { "Wellbeing plan creation", "Incident logging", "Confidential sharing" },
                new[]
                {
                    new ModuleJourney(
                        "wellbeing-response",
                        "Sensitive incident to action plan",
                        "Capture an event, create a response plan, and route to guardians.",
                        new[] { "Log incident", "Set restrictions", "Create plan", "Notify guardians" }
                    )
                }
            ),
            new ModuleCapability(
                "learning",
                "Teaching and Learning",
                "learning",
                "Courses, timetabled learning, resources, and student work handling.",
                "designed",
                new[] { "Homework issue", "Class material release", "Student notices" },
                new[]
                {
                    new ModuleJourney(
                        "learning-access",
                        "Student learning home access",
                        "Publish class details, assign work, and let students upload or submit responses.",
                        new[] { "Create class item", "Attach material", "Collect submissions", "Report progress" }
                    )
                }
            ),
            new ModuleCapability(
                "assessment",
                "Assessment and Reporting",
                "assessment",
                "Assessments, moderation, outcomes mapping, and reporting lifecycle.",
                "designed",
                new[] { "Assessment publication", "Marking workflow", "Report cards" },
                new[]
                {
                    new ModuleJourney(
                        "assessment-cycle",
                        "Task to moderated markbook",
                        "Create assessment tasks, collect work, apply moderation, and publish reporting.",
                        new[] { "Set task", "Collect submissions", "Moderation pass", "Generate report" }
                    )
                }
            ),
            new ModuleCapability(
                "analytics",
                "Analytics and Dashboards",
                "analytics",
                "Cross-module dashboards, trends, triggers, and educational insights.",
                "designed",
                new[] { "Risk detection", "Attendance trend", "Longitudinal reporting" },
                new[]
                {
                    new ModuleJourney(
                        "analytics-trigger",
                        "Risk signal to intervention",
                        "Monitor attendance and wellbeing signals and route interventions to relevant teams.",
                        new[] { "Track indicators", "Evaluate thresholds", "Create tasks", "Review outcomes" }
                    )
                }
            ),
            new ModuleCapability(
                "communications",
                "Community and Messaging",
                "communications",
                "Parent, staff, and student communication with audit and visibility controls.",
                "designed",
                new[] { "News and notices", "Message dispatch", "Consent-aware routes" },
                new[]
                {
                    new ModuleJourney(
                        "communications-loop",
                        "Notice, message, and follow-up",
                        "Send notices and messages with delivery status and policy validation.",
                        new[] { "Post notice", "Deliver channel", "Capture receipts", "Escalate unresolved" }
                    )
                }
            ),
            new ModuleCapability(
                "events",
                "Events and Excursions",
                "events",
                "Excursions, field trips, attendance, consent, and event workflows.",
                "designed",
                new[] { "Consent capture", "Event roll", "Stakeholder communications" },
                new[]
                {
                    new ModuleJourney(
                        "events-flow",
                        "Excursion registration to post-event close",
                        "Capture consent and medical notes, monitor attendance, and close event records.",
                        new[] { "Create event", "Collect consents", "Track attendance", "Close and report" }
                    )
                }
            ),
            new ModuleCapability(
                "finance",
                "Finance and Billing",
                "finance",
                "Invoices, contributions, payments, and reconciliation workflows.",
                "designed",
                new[] { "Billing creation", "Payment lifecycle", "Audit trails" },
                new[]
                {
                    new ModuleJourney(
                        "finance-flow",
                        "Invoice to payment confirmation",
                        "Issue invoices, process payment attempts, and reconcile statements.",
                        new[] { "Generate invoice", "Collect payment", "Reconcile", "Store evidence" }
                    )
                }
            ),
            new ModuleCapability(
                "workforce",
                "Staff Workforce",
                "workforce",
                "Staff self-service, leave, rosters, events, and records.",
                "designed",
                new[] { "Leave request", "Roster updates", "Profile management" },
                new[]
                {
                    new ModuleJourney(
                        "workforce-cycle",
                        "Leave request to approval",
                        "Submit leave, route approvals, and update roster coverage automatically.",
                        new[] { "Submit request", "Approve workflow", "Update roster", "Notify staff" }
                    )
                }
            ),
            new ModuleCapability(
                "forms",
                "Forms and Workflows",
                "forms",
                "Dynamic form templates, approvals, escalations, and automations.",
                "designed",
                new[] { "Form submission", "Approval route", "Scheduled automation" },
                new[]
                {
                    new ModuleJourney(
                        "forms-route",
                        "Evidence form to records",
                        "Submit form, auto-route to reviewer, and materialize related records.",
                        new[] { "Build form", "Submit values", "Approve and escalate", "Attach artifacts" }
                    )
                }
            ),
            new ModuleCapability(
                "integration",
                "Integration Layer",
                "integration",
                "APIs, webhooks, adapters, and marketplace-style extension model.",
                "designed",
                new[] { "API key lifecycle", "Webhook subscriptions", "SIS connectors" },
                new[]
                {
                    new ModuleJourney(
                        "integration-path",
                        "External connector onboarding",
                        "Register connector, authorize, map schema contracts, and test event forwarding.",
                        new[] { "Create connector", "Assign permissions", "Map schema", "Enable webhook" }
                    )
                }
            ),
            new ModuleCapability(
                "ai",
                "AI Capabilities",
                "ai",
                "Tenant-aware LLM enablement, governance, moderation, and policy controls.",
                "designed",
                new[] { "Prompt policy", "AI assisted planning", "Moderation controls" },
                new[]
                {
                    new ModuleJourney(
                        "ai-governance",
                        "Controlled AI assistant use",
                        "Enable AI feature per tenant, enforce policy boundaries, and audit interactions.",
                        new[] { "Register model", "Apply policy", "Enable per-domain", "Review logs" }
                    )
                }
            ),
            new ModuleCapability(
                "compliance",
                "Compliance and Governance",
                "compliance",
                "Audit retention, legal holds, evidence packs, and control frameworks.",
                "designed",
                new[] { "Retention schedules", "Export packs", "Evidence workflows" },
                new[]
                {
                    new ModuleJourney(
                        "compliance-control",
                        "Evidence pack on demand",
                        "Build a defensible evidence bundle for audits and safety checks.",
                        new[] { "Define scope", "Freeze records", "Generate pack", "Store with hash" }
                    )
                }
            )
        }
    );

    public static IResult GetModuleBySlug(string slug)
    {
        var item = Catalog.Capabilities.FirstOrDefault(module =>
            string.Equals(module.Slug, slug, StringComparison.OrdinalIgnoreCase));

        return item is null
            ? Results.NotFound(new { message = $"Unknown module '{slug}'." })
            : Results.Ok(item);
    }
}
