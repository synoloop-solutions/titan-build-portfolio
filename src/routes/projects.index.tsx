import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search, ArrowRight, GitCompare } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { projects, projectCategories } from "@/data/projects";
import { industries } from "@/data/industries";
import { img, PHOTOS } from "@/data/images";
import { read, write, KEYS } from "@/lib/storage";
import { toast } from "sonner";

const schema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "all").default("all"),
  industry: fallback(z.string(), "all").default("all"),
  sort: fallback(z.enum(["recent", "budget", "size"]), "recent").default("recent"),
  page: fallback(z.number().int().min(1), 1).default(1),
});
type SearchT = z.infer<typeof schema>;

const PAGE_SIZE = 9;

export const Route = createFileRoute("/projects/")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Projects — TitanBuild Construction Group" },
      { name: "description", content: "Browse TitanBuild's portfolio of commercial, industrial, civil, healthcare, education, and residential projects across the United States." },
      { property: "og:title", content: "TitanBuild Projects" },
      { property: "og:description", content: "Browse our portfolio of commercial, industrial, civil, and residential projects." },
      { property: "og:url", content: "/projects" },
      { property: "og:image", content: img(PHOTOS.building3, 1200) },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [compareIds, setCompareIds] = useState<string[]>([]);
  useEffect(() => { setCompareIds(read<string[]>(KEYS.compare, [])); }, []);

  const filtered = useMemo(() => {
    let list = projects.slice();
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter((p) => [p.name, p.client, p.location, p.category].some((s) => s.toLowerCase().includes(q)));
    }
    if (search.category !== "all") list = list.filter((p) => p.category === search.category);
    if (search.industry !== "all") list = list.filter((p) => p.industry === search.industry);
    if (search.sort === "recent") list.sort((a, b) => b.completion.localeCompare(a.completion));
    if (search.sort === "budget") list.sort((a, b) => b.budget - a.budget);
    if (search.sort === "size") list.sort((a, b) => b.sizeSqFt - a.sizeSqFt);
    return list;
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(search.page, totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleCompare = (slug: string) => {
    setCompareIds((prev) => {
      let next: string[];
      if (prev.includes(slug)) next = prev.filter((s) => s !== slug);
      else if (prev.length >= 4) { toast.error("You can compare up to 4 projects."); return prev; }
      else next = [...prev, slug];
      write(KEYS.compare, next);
      return next;
    });
  };

  return (
    <>
      <PageHero eyebrow="Projects" title="Our portfolio" description="Filter by market, industry, or scope. Add up to four projects to compare side-by-side." image={img(PHOTOS.building3, 1600)} />

      <Section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:flex-1">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input aria-label="Search projects" placeholder="Search projects..." className="pl-9"
                value={search.q}
                onChange={(e) => navigate({ search: (p: SearchT) => ({ ...p, q: e.target.value, page: 1 }) })} />
            </div>
            <Select value={search.category} onValueChange={(v) => navigate({ search: (p: SearchT) => ({ ...p, category: v, page: 1 }) })}>
              <SelectTrigger aria-label="Filter by category"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {projectCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={search.industry} onValueChange={(v) => navigate({ search: (p: SearchT) => ({ ...p, industry: v, page: 1 }) })}>
              <SelectTrigger aria-label="Filter by industry"><SelectValue placeholder="Industry" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All industries</SelectItem>
                {industries.map((i) => <SelectItem key={i.slug} value={i.slug}>{i.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={search.sort} onValueChange={(v) => navigate({ search: (p: SearchT) => ({ ...p, sort: v as SearchT["sort"], page: 1 }) })}>
              <SelectTrigger aria-label="Sort projects"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="budget">Largest budget</SelectItem>
                <SelectItem value="size">Largest size</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button asChild variant="outline" className="lg:ml-4">
            <Link to="/projects/compare" search={{ ids: compareIds.join(",") }}>
              <GitCompare className="mr-2 h-4 w-4" aria-hidden="true" />
              Compare ({compareIds.length})
            </Link>
          </Button>
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 rounded-lg border bg-card p-8 text-center text-muted-foreground">No projects match your filters. Try clearing them.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => {
              const inCompare = compareIds.includes(p.slug);
              return (
                <Card key={p.slug} className="flex flex-col overflow-hidden">
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="block">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={p.thumb} alt={`${p.name} — ${p.location}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                    <CardContent className="p-5">
                      <p className="text-xs uppercase tracking-wide text-accent">{p.category}</p>
                      <h2 className="mt-1 font-display text-lg font-semibold">{p.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{p.location} · {p.completion}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Badge variant="secondary">${(p.budget / 1_000_000).toFixed(0)}M</Badge>
                        {p.sizeSqFt > 0 && <Badge variant="secondary">{p.sizeSqFt.toLocaleString()} sq ft</Badge>}
                        <Badge variant="secondary">{p.durationMonths} mo</Badge>
                      </div>
                    </CardContent>
                  </Link>
                  <div className="flex items-center justify-between gap-2 border-t px-5 py-3">
                    <Button variant="ghost" size="sm" onClick={() => toggleCompare(p.slug)} aria-pressed={inCompare}>
                      <GitCompare className="mr-2 h-4 w-4" aria-hidden="true" />
                      {inCompare ? "Remove" : "Compare"}
                    </Button>
                    <Link to="/projects/$slug" params={{ slug: p.slug }} className="inline-flex items-center text-sm font-medium text-accent">
                      View <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => navigate({ search: (p: SearchT) => ({ ...p, page: page - 1 }) })}>Previous</Button>
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <Button variant="outline" disabled={page >= totalPages} onClick={() => navigate({ search: (p: SearchT) => ({ ...p, page: page + 1 }) })}>Next</Button>
          </nav>
        )}
      </Section>
    </>
  );
}
