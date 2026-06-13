import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search as SearchIcon } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { news } from "@/data/news";

const schema = z.object({ q: fallback(z.string(), "").default("") });
type SearchT = z.infer<typeof schema>;

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Search — TitanBuild Construction" },
      { name: "description", content: "Search projects, services, industries, and news across TitanBuild." },
      { property: "og:title", content: "Search TitanBuild" },
      { property: "og:url", content: "/search" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const nav = Route.useNavigate();

  const results = useMemo(() => {
    if (!q) return { projects: [], services: [], industries: [], news: [] };
    const needle = q.toLowerCase();
    return {
      projects: projects.filter((p) => [p.name, p.client, p.location, p.category].some((s) => s.toLowerCase().includes(needle))).slice(0, 6),
      services: services.filter((s) => [s.name, s.short, s.description].some((x) => x.toLowerCase().includes(needle))).slice(0, 6),
      industries: industries.filter((i) => [i.name, i.short, i.description].some((x) => x.toLowerCase().includes(needle))).slice(0, 6),
      news: news.filter((n) => [n.title, n.excerpt].some((x) => x.toLowerCase().includes(needle))).slice(0, 6),
    };
  }, [q]);

  const total = results.projects.length + results.services.length + results.industries.length + results.news.length;

  return (
    <>
      <PageHero eyebrow="Search" title="Search the site" description="Find projects, services, industries, or news." />
      <Section>
        <div className="relative max-w-2xl">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input aria-label="Search" placeholder="Search TitanBuild..." className="pl-9" value={q} onChange={(e) => nav({ search: (_: SearchT) => ({ q: e.target.value }) })} autoFocus={false} />
        </div>

        {!q && <p className="mt-12 text-muted-foreground">Start typing to search across projects, services, industries, and news.</p>}
        {q && total === 0 && <p className="mt-12 rounded-lg border bg-card p-8 text-center text-muted-foreground">No results for "{q}".</p>}

        {results.projects.length > 0 && (<>
          <h2 className="mt-12 font-display text-xl font-bold">Projects</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.projects.map((p) => (
              <Card key={p.slug}><Link to="/projects/$slug" params={{ slug: p.slug }}>
                <CardContent className="p-4"><p className="font-display font-semibold">{p.name}</p><p className="text-sm text-muted-foreground">{p.location}</p></CardContent>
              </Link></Card>
            ))}
          </div>
        </>)}

        {results.services.length > 0 && (<>
          <h2 className="mt-12 font-display text-xl font-bold">Services</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.services.map((s) => (
              <Card key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }}>
                <CardContent className="p-4"><p className="font-display font-semibold">{s.name}</p><p className="text-sm text-muted-foreground">{s.short}</p></CardContent>
              </Link></Card>
            ))}
          </div>
        </>)}

        {results.industries.length > 0 && (<>
          <h2 className="mt-12 font-display text-xl font-bold">Industries</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.industries.map((i) => (
              <Card key={i.slug}><Link to="/industries/$slug" params={{ slug: i.slug }}>
                <CardContent className="p-4"><p className="font-display font-semibold">{i.name}</p><p className="text-sm text-muted-foreground">{i.short}</p></CardContent>
              </Link></Card>
            ))}
          </div>
        </>)}

        {results.news.length > 0 && (<>
          <h2 className="mt-12 font-display text-xl font-bold">News</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.news.map((n) => (
              <Card key={n.slug}><Link to="/news/$slug" params={{ slug: n.slug }}>
                <CardContent className="p-4"><p className="font-display font-semibold">{n.title}</p><p className="text-sm text-muted-foreground">{n.date}</p></CardContent>
              </Link></Card>
            ))}
          </div>
        </>)}
      </Section>
    </>
  );
}
