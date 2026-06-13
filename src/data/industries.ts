import { PHOTOS, img } from "./images";

export type Industry = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  icon: string;
  highlights: string[];
};

export const industries: Industry[] = [
  { slug: "healthcare", name: "Healthcare", short: "Hospitals, clinics, and medical research facilities.",
    description: "Patient-focused construction for hospitals, clinics, and research labs with ICRA-compliant infection control.",
    image: img(PHOTOS.building5, 1400), icon: "Stethoscope",
    highlights: ["ICRA Class IV experience", "Occupied hospital retrofits", "OSHPD/HCAi work", "ASHE-trained crews"] },
  { slug: "education", name: "Education", short: "K-12 schools and higher-education facilities.",
    description: "Modern learning environments built around safety, sustainability, and tight summer schedules.",
    image: img(PHOTOS.building10, 1400), icon: "GraduationCap",
    highlights: ["Summer-break delivery", "LEED Schools", "STEM lab fit-outs", "DSA-approved work"] },
  { slug: "hospitality", name: "Hospitality", short: "Hotels, resorts, and entertainment venues.",
    description: "Brand-standard hotels and resorts with FF&E coordination and minimal-impact phasing.",
    image: img(PHOTOS.building4, 1400), icon: "Hotel",
    highlights: ["Marriott/Hilton standards", "FF&E coordination", "Occupied renovation", "Brand-compliant delivery"] },
  { slug: "energy", name: "Energy & Utilities", short: "Renewable and traditional energy facilities.",
    description: "Solar farms, substations, battery storage, and traditional power facilities.",
    image: img(PHOTOS.build10, 1400), icon: "Zap",
    highlights: ["Solar EPC", "Substation construction", "Battery-storage sites", "Grid-tie commissioning"] },
  { slug: "government", name: "Government & Civic", short: "Public buildings, courthouses, and civic spaces.",
    description: "Public-sector work with strict procurement, prevailing wages, and security requirements.",
    image: img(PHOTOS.building2, 1400), icon: "Landmark",
    highlights: ["GSA-cleared crews", "DBE partnerships", "Sole-source delivery", "Federal acquisition compliance"] },
  { slug: "technology", name: "Technology & Data", short: "Data centers and mission-critical facilities.",
    description: "Tier III/IV data centers, fab cleanrooms, and mission-critical infrastructure.",
    image: img(PHOTOS.building11, 1400), icon: "Cpu",
    highlights: ["Tier III/IV delivery", "Cleanroom protocols", "Redundant MEP", "24/7 commissioning"] },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
