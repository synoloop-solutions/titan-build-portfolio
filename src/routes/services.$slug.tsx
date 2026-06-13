import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Breadcrumbs, PageHero, Section, SectionHeading } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/data/services";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { service: s };
  },
  head: ({ params, loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.name} — TitanBuild Construction` : "Service";
    const desc = s?.short ?? "Construction service";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: `/services/${params.slug}` },
        { property: "og:image", content: s?.image ?? "" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: s ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Service",
          name: s.name, description: s.description,
          provider: { "@type": "Organization", name: "TitanBuild Construction Group" },
        }),
      }] : undefined,
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service: s } = Route.useLoaderData();
  const related = projects.filter((p) => p.services.includes(s.slug)).slice(0, 3);
  const other = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow="Services" title={s.name} description={s.short} image={s.image} />
      <Section>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: s.name }]} />
        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">Overview</h2>
            <p className="mt-3 text-muted-foreground">{s.description}</p>

            <h3 className="mt-10 font-display text-xl font-bold">Our process</h3>
            <ol className="mt-4 space-y-4">
              {s.process.map((p, i) => (
                <li key={p.title} className="rounded-lg border bg-card p-5">
                  <p className="font-display text-sm font-semibold uppercase tracking-wide text-accent">Step {i + 1}</p>
                  <h4 className="mt-1 font-display text-lg font-semibold">{p.title}</h4>
                  <p className="mt-1 text-muted-foreground">{p.description}</p>
                </li>
              ))}
            </ol>

            <h3 className="mt-10 font-display text-xl font-bold">Deliverables</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />{d}</li>
              ))}
            </ul>
          </div>
          <aside className="space-y-6">
            <Card><CardContent className="p-5">
              <h3 className="font-display text-lg font-semibold">Why TitanBuild</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {s.benefits.map((b) => <li key={b} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />{b}</li>)}
              </ul>
              <Button asChild className="mt-5 w-full bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/quote-request">Request a quote</Link></Button>
              <Button asChild variant="outline" className="mt-2 w-full"><Link to="/contact">Talk to us</Link></Button>
            </CardContent></Card>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <div className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Related work" title={`${s.name} projects`} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Card key={p.slug}>
                  <Link to="/projects/$slug" params={{ slug: p.slug }}>
                    <div className="aspect-[4/3] overflow-hidden"><img src={p.thumb} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                    <CardContent className="p-5">
                      <p className="text-xs uppercase tracking-wide text-accent">{p.category}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      <Section>
        <SectionHeading title="Explore other services" />
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {other.map((o) => (
            <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="group flex items-center justify-between rounded-lg border bg-card p-4 hover:bg-secondary">
              <span className="font-medium">{o.name}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
