import { PHOTOS, img } from "./images";

export type GalleryItem = { id: string; src: string; thumb: string; category: string; alt: string };

const items: { id: string; cat: string; alt: string }[] = [
  { id: PHOTOS.building1, cat: "Commercial", alt: "Glass facade of a modern office building" },
  { id: PHOTOS.building2, cat: "Civil", alt: "Civic building exterior at dusk" },
  { id: PHOTOS.building3, cat: "Commercial", alt: "Skyscraper construction site" },
  { id: PHOTOS.building4, cat: "Hospitality", alt: "Modern hotel exterior" },
  { id: PHOTOS.building5, cat: "Healthcare", alt: "Hospital entrance" },
  { id: PHOTOS.building6, cat: "Residential", alt: "Residential apartment complex" },
  { id: PHOTOS.building7, cat: "Civil", alt: "Cable-stayed bridge spanning a bay" },
  { id: PHOTOS.building8, cat: "Commercial", alt: "City skyline with construction cranes" },
  { id: PHOTOS.building9, cat: "Commercial", alt: "Tower under construction" },
  { id: PHOTOS.building10, cat: "Education", alt: "Modern school campus" },
  { id: PHOTOS.building11, cat: "Commercial", alt: "Office interior with open ceiling" },
  { id: PHOTOS.building12, cat: "Residential", alt: "Residential interior" },
  { id: PHOTOS.build1, cat: "Site", alt: "Construction worker with hard hat" },
  { id: PHOTOS.build2, cat: "Site", alt: "Engineer reviewing plans on site" },
  { id: PHOTOS.build3, cat: "Site", alt: "Worker silhouetted against sunset" },
  { id: PHOTOS.build4, cat: "Site", alt: "Tower crane during sunset" },
  { id: PHOTOS.build5, cat: "Industrial", alt: "Structural steel beams" },
  { id: PHOTOS.build6, cat: "Site", alt: "Welder at work with sparks flying" },
  { id: PHOTOS.build7, cat: "Civil", alt: "Excavator on a job site" },
  { id: PHOTOS.build8, cat: "Site", alt: "Foundation work in progress" },
  { id: PHOTOS.build9, cat: "Site", alt: "Blueprint drawings on a desk" },
  { id: PHOTOS.build10, cat: "Industrial", alt: "Industrial pipes" },
  { id: PHOTOS.before1, cat: "Before", alt: "Empty site before construction" },
  { id: PHOTOS.during1, cat: "During", alt: "Construction in progress" },
  { id: PHOTOS.during2, cat: "During", alt: "Construction mid-build" },
  { id: PHOTOS.team1, cat: "People", alt: "Project executive portrait" },
  { id: PHOTOS.team2, cat: "People", alt: "Operations leader portrait" },
  { id: PHOTOS.team3, cat: "People", alt: "Field engineer portrait" },
  { id: PHOTOS.team4, cat: "People", alt: "Healthcare project leader" },
  { id: PHOTOS.team6, cat: "People", alt: "Safety officer portrait" },
];

export const gallery: GalleryItem[] = items.map((i, idx) => ({
  id: `g-${idx}`,
  src: img(i.id, 1600, 80),
  thumb: img(i.id, 600, 70),
  category: i.cat,
  alt: i.alt,
}));

export const galleryCategories = ["All", ...Array.from(new Set(gallery.map((g) => g.category))).sort()];
