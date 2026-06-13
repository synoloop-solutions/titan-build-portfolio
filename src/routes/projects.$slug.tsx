import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, DollarSign, Ruler, Clock, Briefcase, ArrowRight } from "lucide-react";
import { Breadcrumbs, PageHero, Section, SectionHeading } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProject, projects, type Project } from "@/data/projects";
import { getService } from "@/data/services";
import { getMember } from "@/data/team";
import { getIndustry } from "@/data/industries";
import { Lightbox, useLightbox } from "@/components/site/lightbox";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return { project: p };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — TitanBuild Project` : "Project";
    const desc = p?.short ?? "Project detail";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: `/projects/${params.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p?.hero ?? "" },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  component: ProjectDetail,
});

const fmtMoney = (n: number) => `$${(n / 1_000_000).toFixed(n < 10_000_000 ? 1 : 0)}M`;

function ProjectDetail() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const industry = getIndustry(p.industry);
  const related = projects.filter((x) => x.slug !== p.slug && (x.industry === p.industry || x.category === p.category)).slice(0, 3);

  const lb = useLightbox();
  const [tab, setTab] = useState<keyof Project["progressGallery"]>("completed");
  const progressImgs = p.progressGallery[tab];

  return (
    <>
      <PageHero eyebrow={p.category} title={p.name} description={p.short} image={p.hero} />
      <Section>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Projects", to: "/projects" }, { label: p.name }]} />

        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">Overview</h2>
            <p className="mt-3 text-muted-foreground">{p.description}</p>

            <h3 className="mt-8 font-display text-xl font-bold">Scope of work</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">{p.scope.map((s) => <li key={s}>{s}</li>)}</ul>

            <h3 className="mt-10 font-display text-xl font-bold">Progress gallery</h3>
            <Tabs value={tab} onValueChange={(v) => setTab(v as keyof Project["progressGallery"])} className="mt-4">
              <TabsList>
                <TabsTrigger value="before">Before</TabsTrigger>
                <TabsTrigger value="during">During construction</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              {(["before","during","completed"] as const).map((k) => (
                <TabsContent key={k} value={k} className="mt-4">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {p.progressGallery[k].map((src, i) => (
                      <button key={src + i} type="button" onClick={() => lb.open(i)} className="group overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <img src={src} alt={`${p.name} ${k} ${i+1}`} loading="lazy" decoding="async" className="aspect-[4/3] h-full w-full object-cover transition group-hover:scale-105" />
                      </button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <Lightbox images={progressImgs} alt={`${p.name} ${tab}`} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />

            <h3 className="mt-10 font-display text-xl font-bold">Full gallery</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {p.gallery.map((src, i) => (
                <img key={src + i} src={src} alt={`${p.name} ${i+1}`} loading="lazy" decoding="async" className="aspect-[4/3] h-full w-full rounded-md object-cover" />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Card><CardContent className="p-5">
              <h3 className="font-display text-lg font-semibold">Project details</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <Row icon={Briefcase} label="Client" value={p.client} />
                <Row icon={MapPin} label="Location" value={p.location} />
                <Row icon={Calendar} label="Completion" value={p.completion} />
                <Row icon={DollarSign} label="Budget" value={fmtMoney(p.budget)} />
                <Row icon={Clock} label="Duration" value={`${p.durationMonths} months`} />
                {p.sizeSqFt > 0 && <Row icon={Ruler} label="Size" value={`${p.sizeSqFt.toLocaleString()} sq ft`} />}
                {industry && <Row icon={Briefcase} label="Industry" value={industry.name} />}
              </dl>
            </CardContent></Card>

            <Card><CardContent className="p-5">
              <h3 className="font-display text-lg font-semibold">Services delivered</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {p.services.map((slug) => {
                  const sv = getService(slug);
                  if (!sv) return null;
                  return <li key={slug}><Link to="/services/$slug" params={{ slug }} className="text-accent hover:underline">{sv.name}</Link></li>;
                })}
              </ul>
            </CardContent></Card>

            {p.team.length > 0 && (
              <Card><CardContent className="p-5">
                <h3 className="font-display text-lg font-semibold">Project team</h3>
                <ul className="mt-3 space-y-3">
                  {p.team.map((slug) => {
                    const m = getMember(slug);
                    if (!m) return null;
                    return (
                      <li key={slug} className="flex items-center gap-3">
                        <img src={m.photo} alt="" aria-hidden="true" className="h-10 w-10 rounded-full object-cover" />
                        <div className="text-sm">
                          <Link to="/team/$slug" params={{ slug }} className="font-medium hover:underline">{m.name}</Link>
                          <p className="text-muted-foreground">{m.title}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent></Card>
            )}

            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/quote-request">Start your project</Link></Button>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <div className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Related" title="More projects you might like" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Card key={r.slug}>
                  <Link to="/projects/$slug" params={{ slug: r.slug }}>
                    <div className="aspect-[4/3] overflow-hidden"><img src={r.thumb} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                    <CardContent className="p-5">
                      <p className="text-xs uppercase tracking-wide text-accent">{r.category}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold">{r.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{r.location}</p>
                      <span className="mt-2 inline-flex items-center text-sm text-accent">View <ArrowRight className="ml-1 h-4 w-4" /></span>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      <div className="flex-1">
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}
