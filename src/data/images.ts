// Unsplash image helper. Pass an ID, get a sized URL.
export const img = (id: string, w = 1200, q = 75) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

// Curated construction-themed photo IDs (Unsplash).
export const PHOTOS = {
  hero1: "1503387762-592deb58ef4e",        // construction site cranes
  hero2: "1541888946425-d81bb19240f5",     // modern building facade
  hero3: "1486325212027-8081e485255e",     // skyscraper construction
  building1: "1487958449943-2429e8be8625", // glass facade
  building2: "1493809842364-78817add7ffb", // modern arch
  building3: "1577415124269-fc1140a69e91", // commercial
  building4: "1502005229762-cf1b2da7c5d6", // office building
  building5: "1503951914875-452162b0f3f1", // hospital
  building6: "1448630360428-65456885c650", // residential
  building7: "1545324418-cc1a3fa10c00",    // bridge
  building8: "1473163928189-364b2c4e1135", // skyline
  building9: "1486406146926-c627a92ad1ab", // tower
  building10: "1554435493-93422e8d1a41",   // school
  building11: "1497366216548-37526070297c", // interior office
  building12: "1429497419816-9ca5cfb4571a", // residential interior
  build1: "1504307651254-35680f356dfd",   // worker hardhat
  build2: "1581094288338-2314dddb7ece",   // engineer plans
  build3: "1581094794329-c8112a89af12",   // worker silhouette
  build4: "1590725140246-20acdee442be",   // crane sunset
  build5: "1565008447742-97f6f38c985c",   // beams
  build6: "1591955506264-3f5a6834570a",   // welder
  build7: "1531834685032-c34bf0d84c77",   // excavator
  build8: "1567521464027-f127ff144326",   // foundation
  build9: "1521791136064-7986c2920216",   // plans/blueprint
  build10: "1582407947304-fd86f028f716",  // pipes
  team1: "1507003211169-0a1dd7228f2d",
  team2: "1573497019940-1c28c88b4f3e",
  team3: "1560250097-0b93528c311a",
  team4: "1494790108377-be9c29b29330",
  team5: "1519085360753-af0119f7cbe7",
  team6: "1500648767791-00dcc994a43e",
  team7: "1580489944761-15a19d654956",
  team8: "1472099645785-5658abf4ff4e",
  team9: "1438761681033-6461ffad8d80",
  team10: "1463453091185-61582044d556",
  team11: "1492562080023-ab3db95bfbce",
  team12: "1544005313-94ddf0286df2",
  news1: "1504307651254-35680f356dfd",
  news2: "1581094794329-c8112a89af12",
  news3: "1590725140246-20acdee442be",
  news4: "1581094288338-2314dddb7ece",
  before1: "1517999144091-3d9dca6d1e43",
  during1: "1565008447742-97f6f38c985c",
  during2: "1590725175754-d39e9d3a7d10",
} as const;

export const heroImg = (size = 1600) => img(PHOTOS.hero1, size, 80);
