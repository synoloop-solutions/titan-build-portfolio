import { PHOTOS, img } from "./images";

export type Project = {
  slug: string;
  name: string;
  client: string;
  category: string;
  industry: string; // slug
  location: string;
  completion: string; // YYYY-MM
  budget: number; // USD
  durationMonths: number;
  sizeSqFt: number;
  services: string[]; // service slugs
  hero: string;
  thumb: string;
  short: string;
  description: string;
  scope: string[];
  gallery: string[];
  progressGallery: { before: string[]; during: string[]; completed: string[] };
  team: string[]; // team slugs
};

const ids: [string, string, string][] = [
  [PHOTOS.building1, PHOTOS.building2, PHOTOS.building3],
  [PHOTOS.building4, PHOTOS.building5, PHOTOS.building6],
  [PHOTOS.building7, PHOTOS.building8, PHOTOS.building9],
  [PHOTOS.building10, PHOTOS.building11, PHOTOS.building12],
  [PHOTOS.build1, PHOTOS.build2, PHOTOS.build3],
  [PHOTOS.build4, PHOTOS.build5, PHOTOS.build6],
  [PHOTOS.build7, PHOTOS.build8, PHOTOS.build9],
];

const galleryFor = (i: number): string[] => {
  const triple = ids[i % ids.length];
  return [img(triple[0], 1600, 80), img(triple[1], 1600, 80), img(triple[2], 1600, 80), img(ids[(i + 1) % ids.length][0], 1600, 80), img(ids[(i + 2) % ids.length][1], 1600, 80)];
};

const progressFor = (i: number) => ({
  before: [img(PHOTOS.before1, 1400, 80), img(PHOTOS.build8, 1400, 80)],
  during: [img(PHOTOS.during1, 1400, 80), img(PHOTOS.during2, 1400, 80), img(PHOTOS.build4, 1400, 80)],
  completed: [img(ids[i % ids.length][0], 1400, 80), img(ids[i % ids.length][1], 1400, 80)],
});

type Seed = { name: string; client: string; category: string; industry: string; location: string; completion: string; budget: number; durationMonths: number; sizeSqFt: number; services: string[]; team: string[]; scope: string[]; description: string };

const seeds: Seed[] = [
  { name: "Meridian Financial Tower", client: "Meridian Capital", category: "Commercial", industry: "technology", location: "Chicago, IL", completion: "2025-03", budget: 248_000_000, durationMonths: 34, sizeSqFt: 712_000, services: ["commercial-construction","design-build"], team: ["sarah-chen","marcus-rivera"], scope: ["48-story Class A office tower", "LEED Platinum core & shell", "Trading-floor fit-outs"], description: "A 48-story Class A office tower anchoring Chicago's West Loop, delivered three months ahead of schedule." },
  { name: "St. Augustine Medical Center", client: "St. Augustine Health", category: "Healthcare", industry: "healthcare", location: "Atlanta, GA", completion: "2024-11", budget: 412_000_000, durationMonths: 42, sizeSqFt: 540_000, services: ["commercial-construction","construction-management"], team: ["priya-shah","james-okafor"], scope: ["Level-1 trauma center", "ORs and ICU floors", "Helipad and central plant"], description: "A 540,000 sq ft replacement hospital with a Level-1 trauma center and rooftop helipad." },
  { name: "Westpoint Logistics Hub", client: "Westpoint Industries", category: "Industrial", industry: "energy", location: "Phoenix, AZ", completion: "2024-08", budget: 89_000_000, durationMonths: 14, sizeSqFt: 1_250_000, services: ["industrial-construction","design-build"], team: ["marcus-rivera","derek-thompson"], scope: ["1.25M sq ft distribution center", "Automated MHE integration", "12 MW solar canopy"], description: "A 1.25-million-square-foot automated distribution hub completed in 14 months." },
  { name: "Harbor Bridge Replacement", client: "State DOT", category: "Civil", industry: "government", location: "Tampa, FL", completion: "2025-05", budget: 624_000_000, durationMonths: 48, sizeSqFt: 0, services: ["civil-infrastructure"], team: ["james-okafor","linda-park"], scope: ["3.2 mi cable-stayed bridge", "Marine pile foundations", "Lane-shift MOT"], description: "A 3.2-mile cable-stayed bridge replacing aging infrastructure across Tampa Bay." },
  { name: "Riverside Residences", client: "Urban Living Partners", category: "Residential", industry: "hospitality", location: "Austin, TX", completion: "2024-06", budget: 156_000_000, durationMonths: 28, sizeSqFt: 480_000, services: ["residential-development","design-build"], team: ["sarah-chen","amelia-rodriguez"], scope: ["384 luxury units", "Rooftop amenity deck", "Below-grade parking"], description: "A 32-story luxury residential tower along Austin's waterfront with 384 units." },
  { name: "Aurora Data Center", client: "CloudSpan Networks", category: "Industrial", industry: "technology", location: "Reno, NV", completion: "2025-01", budget: 312_000_000, durationMonths: 22, sizeSqFt: 320_000, services: ["industrial-construction","design-build","construction-management"], team: ["marcus-rivera","priya-shah"], scope: ["Tier IV data center", "60 MW redundant power", "Liquid-cooled white space"], description: "A 60 MW Tier IV data center built to mission-critical standards with full redundancy." },
  { name: "Lakeside K-12 Campus", client: "Lakeside Unified", category: "Education", industry: "education", location: "Minneapolis, MN", completion: "2024-08", budget: 78_000_000, durationMonths: 20, sizeSqFt: 215_000, services: ["commercial-construction","design-build"], team: ["amelia-rodriguez","derek-thompson"], scope: ["K-12 campus", "STEM labs", "Athletic complex"], description: "A 215,000 sq ft K-12 campus delivered around a tight summer-break schedule." },
  { name: "Pinnacle Resort & Spa", client: "Pinnacle Hospitality", category: "Hospitality", industry: "hospitality", location: "Park City, UT", completion: "2024-12", budget: 198_000_000, durationMonths: 26, sizeSqFt: 360_000, services: ["commercial-construction","renovation-restoration"], team: ["linda-park","sarah-chen"], scope: ["220-key luxury resort", "Spa and conference center", "Ski-in/ski-out lift terminal"], description: "A 220-key luxury mountain resort with full spa, conference, and ski-lift amenities." },
  { name: "Sunfield Solar Array", client: "SunField Energy", category: "Energy", industry: "energy", location: "Bakersfield, CA", completion: "2024-09", budget: 142_000_000, durationMonths: 12, sizeSqFt: 0, services: ["civil-infrastructure","industrial-construction"], team: ["james-okafor","derek-thompson"], scope: ["180 MW solar farm", "Substation interconnect", "Battery storage 80 MWh"], description: "A 180 MW utility-scale solar farm with 80 MWh of battery storage." },
  { name: "Federal Courthouse Renovation", client: "GSA", category: "Government", industry: "government", location: "Denver, CO", completion: "2024-04", budget: 64_000_000, durationMonths: 18, sizeSqFt: 180_000, services: ["renovation-restoration","construction-management"], team: ["priya-shah","linda-park"], scope: ["Historic restoration", "Seismic upgrade", "Security upgrades"], description: "A historic federal courthouse fully restored with seismic and security upgrades." },
  { name: "Crestline Manufacturing Plant", client: "Crestline Aerospace", category: "Industrial", industry: "technology", location: "Wichita, KS", completion: "2025-02", budget: 174_000_000, durationMonths: 24, sizeSqFt: 620_000, services: ["industrial-construction","design-build"], team: ["marcus-rivera","amelia-rodriguez"], scope: ["Aerospace assembly plant", "Cleanrooms ISO 7", "Overhead cranes"], description: "A 620,000 sq ft aerospace assembly plant with ISO 7 cleanroom integration." },
  { name: "Greenline Transit Center", client: "Metro Transit", category: "Civil", industry: "government", location: "Seattle, WA", completion: "2024-10", budget: 95_000_000, durationMonths: 22, sizeSqFt: 145_000, services: ["civil-infrastructure","commercial-construction"], team: ["james-okafor","sarah-chen"], scope: ["Multimodal transit hub", "Park-and-ride structure", "Light-rail platform"], description: "A multimodal transit center connecting bus, light rail, and park-and-ride." },
  { name: "Northshore Memory Care", client: "Northshore Senior Living", category: "Healthcare", industry: "healthcare", location: "Boston, MA", completion: "2024-07", budget: 52_000_000, durationMonths: 16, sizeSqFt: 92_000, services: ["commercial-construction"], team: ["priya-shah","amelia-rodriguez"], scope: ["96-unit memory-care facility", "Secure outdoor gardens", "Therapy spaces"], description: "A 96-unit specialized memory-care facility with secure therapy gardens." },
  { name: "Iron Hills Steel Mill Upgrade", client: "Iron Hills Steel", category: "Industrial", industry: "energy", location: "Pittsburgh, PA", completion: "2025-04", budget: 218_000_000, durationMonths: 30, sizeSqFt: 410_000, services: ["industrial-construction","renovation-restoration"], team: ["marcus-rivera","derek-thompson"], scope: ["Furnace modernization", "Emissions controls", "Rail spur extension"], description: "A 30-month modernization of an active steel mill, executed without halting production." },
  { name: "Bayview Mixed-Use", client: "Bayview Development", category: "Commercial", industry: "hospitality", location: "San Diego, CA", completion: "2024-09", budget: 286_000_000, durationMonths: 32, sizeSqFt: 540_000, services: ["commercial-construction","residential-development","design-build"], team: ["sarah-chen","linda-park"], scope: ["Mixed-use tower", "Ground-floor retail", "280 condos above"], description: "A waterfront mixed-use tower combining retail, office, and 280 luxury condos." },
  { name: "Willow Creek Community", client: "Willow Creek Homes", category: "Residential", industry: "hospitality", location: "Raleigh, NC", completion: "2024-05", budget: 112_000_000, durationMonths: 24, sizeSqFt: 380_000, services: ["residential-development"], team: ["amelia-rodriguez","james-okafor"], scope: ["240 townhomes", "Community center", "Trail network"], description: "A master-planned community of 240 townhomes with extensive amenities." },
  { name: "Halcyon Research Labs", client: "Halcyon Biosciences", category: "Healthcare", industry: "healthcare", location: "Cambridge, MA", completion: "2025-06", budget: 168_000_000, durationMonths: 26, sizeSqFt: 220_000, services: ["commercial-construction","design-build"], team: ["priya-shah","marcus-rivera"], scope: ["BSL-3 research labs", "Vivarium", "Office and collaboration"], description: "A 220,000 sq ft biosciences lab with BSL-3 containment and vivarium." },
  { name: "Cedar Park University Hall", client: "Cedar Park University", category: "Education", industry: "education", location: "Portland, OR", completion: "2024-08", budget: 88_000_000, durationMonths: 22, sizeSqFt: 195_000, services: ["commercial-construction","renovation-restoration"], team: ["linda-park","amelia-rodriguez"], scope: ["Academic building", "Lecture halls", "Mass-timber structure"], description: "A mass-timber academic hall pursuing LEED Platinum and WELL certification." },
  { name: "Continental Distribution Center", client: "Continental Foods", category: "Industrial", industry: "energy", location: "Memphis, TN", completion: "2024-03", budget: 67_000_000, durationMonths: 11, sizeSqFt: 880_000, services: ["industrial-construction"], team: ["marcus-rivera","james-okafor"], scope: ["Cold-storage facility", "Cross-dock", "Rail siding"], description: "An 880,000 sq ft refrigerated distribution center built in 11 months." },
  { name: "Vista Heights Apartments", client: "Vista Heights LLC", category: "Residential", industry: "hospitality", location: "Nashville, TN", completion: "2024-11", budget: 94_000_000, durationMonths: 22, sizeSqFt: 290_000, services: ["residential-development","design-build"], team: ["sarah-chen","amelia-rodriguez"], scope: ["280-unit Type V wrap", "Structured parking", "Pool deck"], description: "A 280-unit Type V wrap-style apartment community in East Nashville." },
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const projects: Project[] = seeds.map((s, i) => {
  const slug = slugify(s.name);
  const triple = ids[i % ids.length];
  return {
    slug,
    name: s.name,
    client: s.client,
    category: s.category,
    industry: s.industry,
    location: s.location,
    completion: s.completion,
    budget: s.budget,
    durationMonths: s.durationMonths,
    sizeSqFt: s.sizeSqFt,
    services: s.services,
    hero: img(triple[0], 1800, 80),
    thumb: img(triple[0], 800, 75),
    short: s.description,
    description: s.description,
    scope: s.scope,
    gallery: galleryFor(i),
    progressGallery: progressFor(i),
    team: s.team,
  };
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectCategories = Array.from(new Set(projects.map((p) => p.category))).sort();
