import { PHOTOS, img } from "./images";

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  email: string;
  certifications: string[];
  experience: number;
};

const m = (slug: string, name: string, title: string, photoId: string, exp: number, certs: string[], bio: string): TeamMember => ({
  slug, name, title, bio, photo: img(photoId, 600, 80), email: `${slug}@titanbuild.example`, certifications: certs, experience: exp,
});

export const team: TeamMember[] = [
  m("sarah-chen", "Sarah Chen", "CEO & President", PHOTOS.team1, 28, ["PE", "LEED AP BD+C", "DBIA"], "Sarah has led TitanBuild for over a decade, scaling the firm from regional contractor to national builder."),
  m("marcus-rivera", "Marcus Rivera", "Chief Operating Officer", PHOTOS.team2, 24, ["PE", "PMP", "OSHA 30"], "Marcus oversees field operations across all regions, with a focus on safety performance and schedule certainty."),
  m("priya-shah", "Priya Shah", "VP, Healthcare", PHOTOS.team4, 22, ["LEED AP", "ASHE CHC", "PMP"], "Priya leads our healthcare practice, including five active Level-1 trauma center projects."),
  m("james-okafor", "James Okafor", "VP, Civil Infrastructure", PHOTOS.team3, 26, ["PE", "PMP", "DBIA"], "James directs our civil and heavy-infrastructure delivery across bridge, transit, and water projects."),
  m("amelia-rodriguez", "Amelia Rodriguez", "VP, Residential", PHOTOS.team5, 18, ["LEED AP", "CASp"], "Amelia partners with developers to deliver multifamily and high-rise residential at scale."),
  m("derek-thompson", "Derek Thompson", "Chief Safety Officer", PHOTOS.team6, 30, ["CSP", "OSHA 500", "STSC"], "Derek leads our safety program — TitanBuild's TRIR is 60% below industry average."),
  m("linda-park", "Linda Park", "VP, Preconstruction", PHOTOS.team7, 21, ["LEED AP", "PMP", "CCM"], "Linda's preconstruction team manages over $1.5B in active GMP estimating."),
  m("ethan-walsh", "Ethan Walsh", "Director, Sustainability", PHOTOS.team8, 14, ["LEED AP BD+C", "WELL AP"], "Ethan champions our sustainability practice, certifying over 30 LEED projects to date."),
  m("nora-bennett", "Nora Bennett", "Director, BIM & VDC", PHOTOS.team10, 12, ["AC Certified Pro"], "Nora leads our BIM and virtual-design construction group, integrating model-based delivery on every project."),
  m("alex-kim", "Alex Kim", "Director, Industrial", PHOTOS.team11, 19, ["PE", "PMP"], "Alex specializes in mission-critical and advanced-manufacturing facilities."),
  m("kara-mitchell", "Kara Mitchell", "Director, HR & Culture", PHOTOS.team9, 16, ["SHRM-SCP"], "Kara leads people operations, including workforce development and DEI."),
  m("ravi-patel", "Ravi Patel", "Director, Technology", PHOTOS.team12, 13, ["PMP", "ITIL"], "Ravi modernizes our field-tech stack to keep crews connected and informed."),
];

export const getMember = (slug: string) => team.find((t) => t.slug === slug);
