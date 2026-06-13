import { PHOTOS, img } from "./images";

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  icon: string; // lucide name
  benefits: string[];
  process: { title: string; description: string }[];
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "commercial-construction",
    name: "Commercial Construction",
    short: "Office towers, retail, and mixed-use developments delivered on time.",
    description: "Full-service commercial construction for office, retail, hospitality, and mixed-use developments. From ground-up builds to interior fit-outs, our integrated teams manage every stage.",
    image: img(PHOTOS.building3, 1400),
    icon: "Building2",
    benefits: ["LEED-certified delivery", "Self-perform concrete & steel", "BIM-led coordination", "On-time delivery guarantee"],
    process: [
      { title: "Pre-construction", description: "Feasibility, budgeting, value engineering, and permitting." },
      { title: "Design coordination", description: "BIM-based clash detection across architectural, MEP, and structural." },
      { title: "Construction", description: "Self-perform trades plus vetted subcontractors with daily QA/QC." },
      { title: "Close-out", description: "Commissioning, warranty turnover, and 12-month service follow-up." },
    ],
    deliverables: ["Permitted construction documents", "Monthly owner reporting", "As-built drawings", "Warranty documentation"],
  },
  {
    slug: "industrial-construction",
    name: "Industrial Construction",
    short: "Heavy industrial, manufacturing, and process facilities.",
    description: "Manufacturing plants, distribution centers, and process facilities built for uptime. Our industrial team self-performs concrete, steel, and equipment installation.",
    image: img(PHOTOS.build5, 1400),
    icon: "Factory",
    benefits: ["24/7 phased construction", "Process integration", "OSHA VPP Star sites", "Lean delivery"],
    process: [
      { title: "Site selection", description: "Logistics, utilities, and zoning analysis." },
      { title: "Design-build", description: "Single-source accountability from concept to handover." },
      { title: "Equipment install", description: "Coordination with OEMs and process engineers." },
      { title: "Commissioning", description: "Full FAT/SAT and operator training." },
    ],
    deliverables: ["Process flow validation", "Equipment maintenance manuals", "Operator training", "Spare-parts inventory"],
  },
  {
    slug: "civil-infrastructure",
    name: "Civil & Infrastructure",
    short: "Roads, bridges, utilities, and heavy civil works.",
    description: "Public infrastructure delivered to DOT and municipal standards. We self-perform earthworks, paving, concrete structures, and underground utilities.",
    image: img(PHOTOS.building7, 1400),
    icon: "TrafficCone",
    benefits: ["DBE/MBE partnerships", "Public-sector experience", "Self-perform earthworks", "MOT-certified crews"],
    process: [
      { title: "Surveying", description: "Topographic and utility surveys." },
      { title: "Earthworks", description: "Mass grading, excavation, and stabilization." },
      { title: "Structures", description: "Bridges, retaining walls, and culverts." },
      { title: "Restoration", description: "Site restoration and as-built deliverables." },
    ],
    deliverables: ["DOT-compliant documentation", "Traffic-control plans", "Erosion-control reports", "As-built surveys"],
  },
  {
    slug: "residential-development",
    name: "Residential Development",
    short: "Multifamily, high-rise, and master-planned communities.",
    description: "From mid-rise multifamily to luxury high-rise, we partner with developers to deliver homes the market wants.",
    image: img(PHOTOS.building6, 1400),
    icon: "Home",
    benefits: ["Type I-V construction", "Modular options", "Amenity-rich design", "On-budget delivery"],
    process: [
      { title: "Market analysis", description: "Unit mix and amenity programming." },
      { title: "Entitlements", description: "Zoning, density, and approvals." },
      { title: "Vertical build", description: "Phased delivery for early lease-up." },
      { title: "Turnover", description: "Punch-list, warranty, and HOA hand-over." },
    ],
    deliverables: ["Unit-by-unit punch lists", "Warranty book", "Operations manuals", "Final lien releases"],
  },
  {
    slug: "design-build",
    name: "Design-Build",
    short: "Single-source delivery from concept through close-out.",
    description: "Integrated design-build teams compress schedules and align cost certainty from day one.",
    image: img(PHOTOS.build9, 1400),
    icon: "PencilRuler",
    benefits: ["Single contract", "Faster delivery", "Cost certainty", "Reduced change orders"],
    process: [
      { title: "Programming", description: "Goals, budget, and schedule alignment." },
      { title: "Schematic design", description: "Owner-approved concept and GMP." },
      { title: "Build-out", description: "Construction overlapping with detail design." },
      { title: "Hand-over", description: "Commissioned, warranted facility." },
    ],
    deliverables: ["GMP contract", "Owner programming report", "Design progress sets", "Project close-out binder"],
  },
  {
    slug: "construction-management",
    name: "Construction Management",
    short: "Owner-side CM, agency CM, and CM-at-Risk delivery.",
    description: "Independent oversight or at-risk delivery — we represent your interests and protect your investment.",
    image: img(PHOTOS.build2, 1400),
    icon: "ClipboardCheck",
    benefits: ["Independent owner advocacy", "Cost transparency", "Schedule control", "Risk management"],
    process: [
      { title: "Planning", description: "Project charter and risk register." },
      { title: "Procurement", description: "Bid packaging and trade selection." },
      { title: "Oversight", description: "Daily field reports and cost tracking." },
      { title: "Close-out", description: "Commissioning, warranty, and lessons learned." },
    ],
    deliverables: ["Monthly cost report", "Schedule updates", "Risk register", "Owner project manual"],
  },
  {
    slug: "renovation-restoration",
    name: "Renovation & Restoration",
    short: "Historic restoration and adaptive reuse expertise.",
    description: "Sensitive renovation of historic and existing assets, including occupied retrofits and adaptive reuse.",
    image: img(PHOTOS.building11, 1400),
    icon: "Hammer",
    benefits: ["SHPO-approved work", "Occupied retrofits", "LEED-EB delivery", "Specialty trades in-house"],
    process: [
      { title: "Existing-conditions survey", description: "3D scanning and assessment." },
      { title: "Design", description: "Restoration vs. replacement decisions." },
      { title: "Construction", description: "Phased, occupied-space coordination." },
      { title: "Documentation", description: "Historic record drawings and photo archive." },
    ],
    deliverables: ["Conditions assessment", "Restoration specification", "Photo archive", "Maintenance plan"],
  },
  {
    slug: "preconstruction-services",
    name: "Preconstruction Services",
    short: "Estimating, scheduling, and constructability reviews.",
    description: "Early engagement that drives budget accuracy and schedule certainty before breaking ground.",
    image: img(PHOTOS.build8, 1400),
    icon: "Calculator",
    benefits: ["Conceptual estimating", "VE analysis", "BIM coordination", "Risk identification"],
    process: [
      { title: "Concept estimating", description: "Order-of-magnitude budgets at programming." },
      { title: "VE workshops", description: "Cost-saving alternatives without scope loss." },
      { title: "Constructability", description: "Means-and-methods review of each set." },
      { title: "GMP development", description: "Bid-leveling and final guaranteed pricing." },
    ],
    deliverables: ["Estimate at each design phase", "VE log", "Risk register", "GMP proposal"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
