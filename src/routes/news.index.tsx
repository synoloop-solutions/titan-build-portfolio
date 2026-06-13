import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { news, newsCategories } from "@/data/news";
import { img, PHOTOS } from "@/data/images";

const schema = z.object({
  q: fallback(z.string(), "").default(""),
  cat: fallback(z.string(), "all").default("all"),
  page: fallback(z.number().int().min(1), 1).default(1),
});
type SearchT = z.infer<typeof schema>;

const PAGE_SIZE = 6;

export const Route = createFileRoute("/news/")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Newsroom — TitanBuild Construction Group" },
      { name: "description", content: "TitanBuild news, project announcements, safety updates, and industry insights." },
      { property: "og:title", content: "TitanBuild Newsroom" },
      { property: "og:description", content: "News, project announcements, and insights from TitanBuild." },
      { property: "og:url", content: "/news" },
      { property: "og:image", content: img(PHOTOS.news1, 1200) },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsIndex,
});

function NewsIndex() {
  const s = Route.useSearch();
  const nav = Route.useNavigate();
  const filtered = useMemo(() => {
    let list = news.slice().sort((a, b) => b.date.localeCompare(a.date));
    if (s.q) {
      const q = s.q.toLowerCase();
      list = list.filter((n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q));
    }
    if (s.cat !== "all") list = list.filter((n) => n.category === s.cat);
    return list;
  }, [s]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(s.page, totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHero eyebrow="Newsroom" title="News & insights" description="Project milestones, safety stories, and industry perspectives from across TitanBuild." />
      <Section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input aria-label="Search news" placeholder="Search news..." className="pl-9" value={s.q} onChange={(e) => nav({ search: (p: SearchT) => ({ ...p, q: e.target.value, page: 1 }) })} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={s.cat === "all" ? "default" : "outline"} onClick={() => nav({ search: (p: SearchT) => ({ ...p, cat: "all", page: 1 }) })}>All</Button>
            {newsCategories.map((c) => (
              <Button key={c} size="sm" variant={s.cat === c ? "default" : "outline"} onClick={() => nav({ search: (p: SearchT) => ({ ...p, cat: c, page: 1 }) })}>{c}</Button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 rounded-lg border bg-card p-8 text-center text-muted-foreground">No articles match your filters.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((n) => (
              <Card key={n.slug} className="overflow-hidden">
                <Link to="/news/$slug" params={{ slug: n.slug }}>
                  <div className="aspect-[16/10] overflow-hidden"><img src={n.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-2">{n.category}</Badge>
                    <h2 className="font-display text-lg font-semibold">{n.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{n.date} · {n.readMinutes} min read</p>
                    <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => nav({ search: (p: SearchT) => ({ ...p, page: page - 1 }) })}>Previous</Button>
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <Button variant="outline" disabled={page >= totalPages} onClick={() => nav({ search: (p: SearchT) => ({ ...p, page: page + 1 }) })}>Next</Button>
          </nav>
        )}
      </Section>
    </>
  );
}
