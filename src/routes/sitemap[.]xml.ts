import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { team } from "@/data/team";
import { careers } from "@/data/careers";
import { news } from "@/data/news";

const BASE_URL = "";

const staticPaths = [
  "/", "/about", "/services", "/projects", "/projects/compare", "/industries",
  "/safety", "/certifications", "/team", "/gallery", "/careers", "/news",
  "/contact", "/quote-request", "/resources", "/search",
  "/privacy", "/terms", "/cookie-policy", "/accessibility",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          ...staticPaths,
          ...services.map((s) => `/services/${s.slug}`),
          ...projects.map((p) => `/projects/${p.slug}`),
          ...industries.map((i) => `/industries/${i.slug}`),
          ...team.map((t) => `/team/${t.slug}`),
          ...careers.map((c) => `/careers/${c.slug}`),
          ...news.map((n) => `/news/${n.slug}`),
        ];
        const urls = paths.map((p) => `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
