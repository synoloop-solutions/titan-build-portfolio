export type Career = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  description: string;
  responsibilities: string[];
  requirements: string[];
  salary: string;
  posted: string;
};

const c = (slug: string, title: string, dept: string, loc: string, salary: string, posted: string, desc: string, resp: string[], req: string[]): Career => ({
  slug, title, department: dept, location: loc, type: "Full-time", description: desc, responsibilities: resp, requirements: req, salary, posted,
});

export const careers: Career[] = [
  c("senior-project-manager", "Senior Project Manager", "Operations", "Chicago, IL", "$140K–$180K", "2026-05-15",
    "Lead $50M+ commercial projects from preconstruction through close-out.",
    ["Own project P&L", "Manage subcontractors and self-perform crews", "Lead owner-architect-contractor meetings", "Drive safety, quality, and schedule"],
    ["10+ years GC experience", "B.S. Construction Management or Engineering", "PMP preferred", "OSHA 30"]),
  c("superintendent", "General Superintendent", "Field Operations", "Phoenix, AZ", "$130K–$170K", "2026-05-10",
    "Run day-to-day field operations on industrial sites up to 1.5M sq ft.",
    ["Daily field coordination", "Subcontractor management", "QA/QC inspections", "Toolbox talks and safety leadership"],
    ["12+ years field experience", "OSHA 30", "First aid / CPR"]),
  c("safety-manager", "Site Safety Manager", "EHS", "Atlanta, GA", "$95K–$125K", "2026-04-30",
    "Lead site-level safety programs across active healthcare projects.",
    ["Daily site inspections", "Incident investigation", "Crew safety training", "Owner safety reporting"],
    ["CSP or CHST", "5+ years construction safety", "OSHA 500 trainer credential"]),
  c("preconstruction-estimator", "Senior Estimator", "Preconstruction", "Remote (US)", "$110K–$145K", "2026-04-25",
    "Build estimates from conceptual through GMP across commercial and healthcare projects.",
    ["Quantity takeoffs", "Subcontractor bid solicitation", "Value engineering analysis", "GMP package preparation"],
    ["7+ years estimating", "WinEst or Sage Estimating", "Healthcare or commercial focus"]),
  c("bim-coordinator", "BIM / VDC Coordinator", "Technology", "Boston, MA", "$85K–$115K", "2026-04-12",
    "Drive model-based coordination across MEP, structural, and architectural disciplines.",
    ["Clash detection", "Federated model management", "Trade-partner BIM coordination", "Owner BIM-deliverables compliance"],
    ["Revit, Navisworks, BIM 360", "3+ years construction BIM", "Autodesk certifications a plus"]),
  c("project-engineer", "Project Engineer", "Operations", "Austin, TX", "$75K–$95K", "2026-04-01",
    "Support PMs on submittals, RFIs, and field coordination.",
    ["RFI/submittal log management", "Daily reports", "Subcontractor coordination", "Cost-event tracking"],
    ["B.S. Construction Management or Engineering", "1–3 years experience", "Procore proficiency"]),
  c("self-perform-foreman", "Self-Perform Concrete Foreman", "Self-Perform", "Memphis, TN", "$85K–$115K", "2026-03-22",
    "Lead self-perform concrete crews on industrial and infrastructure sites.",
    ["Daily crew leadership", "Schedule pour sequencing", "Quality and safety on the deck", "Tool and equipment management"],
    ["10+ years concrete experience", "Bilingual EN/ES preferred", "First aid / CPR"]),
  c("sustainability-lead", "Sustainability Lead", "Design Services", "Remote (US)", "$110K–$140K", "2026-03-10",
    "Champion LEED, WELL, and embodied-carbon strategy on flagship projects.",
    ["LEED documentation", "Carbon-accounting reporting", "Owner sustainability workshops", "Subcontractor sustainability training"],
    ["LEED AP BD+C", "WELL AP preferred", "5+ years sustainability practice"]),
];

export const getCareer = (slug: string) => careers.find((c) => c.slug === slug);
