import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { X, Plus } from "lucide-react";
import { Breadcrumbs, PageHero, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projects, getProject } from "@/data/projects";
import { getService } from "@/data/services";
import { getIndustry } from "@/data/industries";
import { write, KEYS } from "@/lib/storage";

const schema = z.object({
  ids: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/projects/compare")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Compare Projects — TitanBuild" },
      { name: "description", content: "Compare up to four TitanBuild projects side-by-side by budget, duration, industry, services, size, and location." },
      { property: "og:title", content: "Compare TitanBuild Projects" },
      { property: "og:description", content: "Compare projects by budget, duration, industry, services, size, and location." },
      { property: "og:url", content: "/projects/compare" },
    ],
    links: [{ rel: "canonical", href: "/projects/compare" }],
  }),
  component: CompareProjects,
});

function CompareProjects() {
  const { ids } = Route.useSearch();
  const navigate = Route.useNavigate();
  const slugs = ids.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4);
  const selected = slugs.map(getProject).filter(Boolean) as ReturnType<typeof getProject>[] as NonNullable<ReturnType<typeof getProject>>[];

  useEffect(() => {
    write(KEYS.compare, slugs);
  }, [ids]);

  const [pickerOpen, setPickerOpen] = useState(false);
  const available = projects.filter((p) => !slugs.includes(p.slug));

  const setSlugs = (next: string[]) => {
    navigate({ search: { ids: next.slice(0, 4).join(",") } });
  };
  const add = (slug: string) => setSlugs([...slugs, slug]);
  const remove = (slug: string) => setSlugs(slugs.filter((s) => s !== slug));

  const fmt = (n: number) => `$${(n / 1_000_000).toFixed(1)}M`;

  return (
    <>
      <PageHero eyebrow="Compare" title="Compare projects" description="Pick up to four projects to compare side-by-side." />
      <Section>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Projects", to: "/projects" }, { label: "Compare" }]} />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground">{selected.length} of 4 selected</p>
          {selected.length < 4 && (
            <Select onValueChange={(v) => { add(v); setPickerOpen(false); }} open={pickerOpen} onOpenChange={setPickerOpen}>
              <SelectTrigger className="w-[280px]" aria-label="Add a project to compare">
                <SelectValue placeholder="Add a project..." />
              </SelectTrigger>
              <SelectContent>
                {available.map((p) => <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          {selected.length > 0 && (
            <Button variant="ghost" onClick={() => setSlugs([])}>Clear all</Button>
          )}
        </div>

        {selected.length === 0 ? (
          <div className="mt-12 rounded-lg border bg-card p-10 text-center">
            <Plus className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-semibold">No projects selected</h2>
            <p className="mt-2 text-sm text-muted-foreground">Choose projects to compare using the dropdown above, or browse the portfolio.</p>
            <Button asChild className="mt-4"><Link to="/projects">Browse projects</Link></Button>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-lg border bg-card">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 bg-card p-4 text-left font-medium text-muted-foreground">Attribute</th>
                  {selected.map((p) => (
                    <th key={p.slug} scope="col" className="min-w-[220px] border-l p-4 align-top text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to="/projects/$slug" params={{ slug: p.slug }} className="font-display text-base font-semibold hover:underline">{p.name}</Link>
                          <p className="text-xs text-muted-foreground">{p.client}</p>
                        </div>
                        <Button variant="ghost" size="icon" aria-label={`Remove ${p.name}`} onClick={() => remove(p.slug)}>
                          <X className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                      <img src={p.thumb} alt="" aria-hidden="true" loading="lazy" className="mt-3 aspect-[4/3] w-full rounded-md object-cover" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Budget", get: (p: typeof selected[number]) => fmt(p.budget) },
                  { label: "Duration", get: (p: typeof selected[number]) => `${p.durationMonths} months` },
                  { label: "Industry", get: (p: typeof selected[number]) => getIndustry(p.industry)?.name ?? "—" },
                  { label: "Services used", get: (p: typeof selected[number]) => p.services.map((s) => getService(s)?.name ?? s).join(", ") },
                  { label: "Size", get: (p: typeof selected[number]) => p.sizeSqFt > 0 ? `${p.sizeSqFt.toLocaleString()} sq ft` : "—" },
                  { label: "Location", get: (p: typeof selected[number]) => p.location },
                  { label: "Category", get: (p: typeof selected[number]) => p.category },
                  { label: "Completion", get: (p: typeof selected[number]) => p.completion },
                ].map((row) => (
                  <tr key={row.label} className="border-t">
                    <th scope="row" className="sticky left-0 z-10 bg-card p-4 text-left font-medium text-muted-foreground">{row.label}</th>
                    {selected.map((p) => (
                      <td key={p.slug} className="border-l p-4 align-top">{row.get(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </>
  );
}
