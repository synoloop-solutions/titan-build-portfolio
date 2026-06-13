import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Breadcrumbs, PageHero, Section, SectionHeading } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getIndustry, type Industry } from "@/data/industries";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const i = getIndustry(params.slug);
    if (!i) throw notFound();
    return { industry: i };
  },
  head: ({ params, loaderData }) => {
    const i = loaderData?.industry;
    const title = i ? `${i.name} Construction — TitanBuild` : "Industry";
    const desc = i?.short ?? "Industry";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: `/industries/${params.slug}` },
        { property: "og:image", content: i?.image ?? "" },
      ],
      links: [{ rel: "canonical", href: `/industries/${params.slug}` }],
    };
  },
  component: IndustryDetail,
});

function IndustryDetail() {
  const { industry: i } = Route.useLoaderData() as { industry: Industry };
  const related = projects.filter((p) => p.industry === i.slug).slice(0, 6);
  return (
    <>
      <PageHero eyebrow="Industry" title={i.name} description={i.short} image={i.image} />
      <Section>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Industries", to: "/industries" }, { label: i.name }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-muted-foreground">{i.description}</p>
          </div>
          <Card><CardContent className="p-5">
            <h2 className="font-display text-lg font-semibold">Highlights</h2>
            <ul className="mt-3 space-y-2 text-sm">{i.highlights.map((h: string) => <li key={h} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />{h}</li>)}</ul>
            <Button asChild className="mt-5 w-full bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/quote-request">Start a project</Link></Button>
          </CardContent></Card>
        </div>

        {related.length > 0 && (
          <>
            <SectionHeading title={`${i.name} projects`} />
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Card key={p.slug}>
                  <Link to="/projects/$slug" params={{ slug: p.slug }}>
                    <div className="aspect-[4/3] overflow-hidden"><img src={p.thumb} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                    <CardContent className="p-5">
                      <h3 className="font-display font-semibold">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.location} · {p.completion}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </>
        )}
      </Section>
    </>
  );
}
