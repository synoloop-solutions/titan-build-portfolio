import { PHOTOS, img } from "./images";

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readMinutes: number;
};

const posts: { title: string; excerpt: string; date: string; author: string; category: string; img: string }[] = [
  { title: "TitanBuild Tops Out 48-Story Meridian Tower in Chicago", excerpt: "The signature West Loop tower reached its 48th floor today, three months ahead of schedule.", date: "2026-05-12", author: "TitanBuild Newsroom", category: "Projects", img: PHOTOS.building3 },
  { title: "Industry-Leading TRIR: How We Cut Recordable Incidents 60%", excerpt: "A behind-the-scenes look at the safety program that drives our industry-leading TRIR.", date: "2026-04-28", author: "Derek Thompson", category: "Safety", img: PHOTOS.build1 },
  { title: "ENR Names TitanBuild Top 100 Contractor for the Fifth Year", excerpt: "Engineering News-Record recognizes TitanBuild among the nation's top general contractors.", date: "2026-04-04", author: "TitanBuild Newsroom", category: "Awards", img: PHOTOS.building2 },
  { title: "Modular Construction Pilot Cuts Multifamily Schedule by 22%", excerpt: "Our Riverside Residences pilot demonstrates real productivity gains from off-site modular construction.", date: "2026-03-19", author: "Amelia Rodriguez", category: "Innovation", img: PHOTOS.building6 },
  { title: "TitanBuild Joins UN Global Compact for Sustainable Construction", excerpt: "Formalizing our commitment to low-carbon construction across every project.", date: "2026-03-02", author: "Ethan Walsh", category: "Sustainability", img: PHOTOS.build7 },
  { title: "Workforce Development: 240 Apprentices Graduate in 2025", excerpt: "Our skilled-trades apprenticeship hits a milestone for the fifth consecutive year.", date: "2026-02-18", author: "Kara Mitchell", category: "People", img: PHOTOS.team2 },
  { title: "Aurora Data Center Commissioning Complete", excerpt: "A 60 MW Tier IV facility goes live for CloudSpan Networks.", date: "2026-02-04", author: "Alex Kim", category: "Projects", img: PHOTOS.building11 },
  { title: "Three TitanBuild Sites Earn OSHA VPP Star Status", excerpt: "Voluntary Protection Program recognition for our healthcare, energy, and industrial sites.", date: "2026-01-22", author: "Derek Thompson", category: "Safety", img: PHOTOS.build3 },
  { title: "BIM 2.0: Our Field-First VDC Workflow", excerpt: "How we are pushing BIM coordination out of the trailer and onto the iron.", date: "2026-01-10", author: "Nora Bennett", category: "Innovation", img: PHOTOS.build9 },
  { title: "Halcyon Biosciences Breaks Ground on BSL-3 Research Lab", excerpt: "A 220,000 sq ft Cambridge lab marks our 14th life-sciences project.", date: "2025-12-15", author: "Priya Shah", category: "Projects", img: PHOTOS.building5 },
  { title: "TitanBuild Launches Diversity Subcontractor Program", excerpt: "A new initiative dedicates $200M annually to DBE and MBE trade partners.", date: "2025-12-01", author: "Kara Mitchell", category: "People", img: PHOTOS.team6 },
  { title: "Lessons From 14-Month Logistics Hub Delivery", excerpt: "Phoenix's Westpoint Hub is a case study in modular schedule compression.", date: "2025-11-12", author: "Marcus Rivera", category: "Projects", img: PHOTOS.building1 },
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const news: NewsPost[] = posts.map((p) => ({
  slug: slugify(p.title),
  title: p.title,
  excerpt: p.excerpt,
  content: `${p.excerpt}\n\nTitanBuild Construction Group continues to push the industry forward through disciplined execution, integrated delivery, and a relentless focus on safety. Every milestone we share is the work of thousands of skilled tradespeople, engineers, and managers committed to building things that last.\n\nThis story will be updated as the project progresses. For media inquiries, please reach out to our newsroom team via the contact page.`,
  date: p.date,
  author: p.author,
  category: p.category,
  image: img(p.img, 1400, 80),
  readMinutes: 4,
}));

export const newsCategories = Array.from(new Set(news.map((n) => n.category))).sort();
export const getNews = (slug: string) => news.find((n) => n.slug === slug);
