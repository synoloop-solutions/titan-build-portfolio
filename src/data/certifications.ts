export type Certification = { name: string; issuer: string; description: string; year: string };
export type Award = { name: string; issuer: string; year: string; description: string };
export type Membership = { name: string; description: string };

export const oshaPrograms = [
  { name: "OSHA Voluntary Protection Programs (VPP) Star", description: "Three active TitanBuild sites maintain OSHA VPP Star status — the highest recognition for safety performance." },
  { name: "OSHA 30-Hour Construction Training", description: "100% of TitanBuild superintendents and project managers are OSHA 30-Hour certified." },
  { name: "OSHA 10-Hour Construction Training", description: "All field staff and trade partners receive OSHA 10-Hour training as a condition of site access." },
  { name: "OSHA Partnership Program", description: "Active partnership agreement to advance industry-wide safety practices." },
];

export const isoCertifications: Certification[] = [
  { name: "ISO 9001:2015", issuer: "International Organization for Standardization", description: "Quality Management Systems across all operating regions.", year: "2018" },
  { name: "ISO 14001:2015", issuer: "International Organization for Standardization", description: "Environmental Management Systems for jobsite environmental stewardship.", year: "2019" },
  { name: "ISO 45001:2018", issuer: "International Organization for Standardization", description: "Occupational Health & Safety Management Systems certified company-wide.", year: "2020" },
  { name: "ISO 19650", issuer: "International Organization for Standardization", description: "Information management using BIM across our project portfolio.", year: "2022" },
];

export const safetyAwards: Award[] = [
  { name: "AGC National Safety Award", issuer: "Associated General Contractors of America", year: "2025", description: "Recognized for sustained excellence in safety performance and culture." },
  { name: "ABC STEP Diamond", issuer: "Associated Builders and Contractors", year: "2025", description: "Diamond level for the eighth consecutive year — top 1% of contractors nationally." },
  { name: "ENR Safety Excellence Award", issuer: "Engineering News-Record", year: "2024", description: "Featured for our integrated safety-and-quality program." },
  { name: "CURT Construction Industry Safety Excellence", issuer: "Construction Users Roundtable", year: "2024", description: "Recognized by owners for industry-leading TRIR." },
  { name: "AGC Build America Merit Award", issuer: "Associated General Contractors", year: "2023", description: "Awarded for outstanding project delivery and safety record." },
];

export const memberships: Membership[] = [
  { name: "Associated General Contractors (AGC)", description: "National and chapter-level membership across all operating regions." },
  { name: "Associated Builders and Contractors (ABC)", description: "Active in merit-shop apprenticeship and workforce development." },
  { name: "Design-Build Institute of America (DBIA)", description: "DBIA-certified leadership delivering integrated design-build projects." },
  { name: "U.S. Green Building Council (USGBC)", description: "Platinum member supporting LEED and embodied-carbon reduction." },
  { name: "Engineering News-Record (ENR) Top 100", description: "Consistently ranked among the ENR Top 100 contractors in the U.S." },
  { name: "Construction Industry Institute (CII)", description: "Research collaboration on lean and integrated project delivery." },
];

export const complianceStandards = [
  { name: "EPA Stormwater (NPDES)", description: "Full compliance with NPDES Construction General Permit on every active site." },
  { name: "Davis-Bacon Act", description: "Federal prevailing-wage compliance and certified-payroll reporting." },
  { name: "Buy America(n) Act", description: "Procurement compliance for federally funded infrastructure projects." },
  { name: "Cybersecurity Maturity Model Certification (CMMC) Level 2", description: "Required for federal-defense projects; achieved 2024." },
  { name: "FAR / DFARS Compliance", description: "Federal Acquisition Regulation and Defense FAR Supplement compliance for federal contracts." },
  { name: "EEOC / OFCCP", description: "Equal employment opportunity reporting and federal contractor compliance." },
];
