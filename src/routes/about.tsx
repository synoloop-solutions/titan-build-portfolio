import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, SectionHeading } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { milestones, stats } from "@/data/stats";
import { team } from "@/data/team";
import { img, PHOTOS } from "@/data/images";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TitanBuild — Our Story, Mission, and Values" },
      { name: "description", content: "Founded in 1977, TitanBuild has grown from a regional Chicago contractor into a national builder with 4,800+ team members. Learn our mission and history." },
      { property: "og:title", content: "About TitanBuild Construction Group" },
      { property: "og:description", content: "Our story, mission, and the people behind TitanBuild." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: img(PHOTOS.building3, 1200) },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Built on integrity. Driven by precision." description="From a single Chicago office to a national builder, TitanBuild has spent nearly five decades raising the bar on safety, quality, and delivery." image={img(PHOTOS.building3, 1600)} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Our mission" title="Build things that last — for clients, communities, and crews." description="We deliver complex projects that move cities forward. We protect the people on our sites. We build environments people are proud to live, learn, heal, and work in." />
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/certifications">Our certifications</Link></Button>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img src={img(PHOTOS.build2, 1400)} alt="Engineer reviewing plans" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </div>
      </Section>

      <div className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="By the numbers" title="At a glance" />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <li key={s.label} className="rounded-lg border bg-card p-4 text-center">
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="History" title="Milestones" />
        <ol className="mt-10 space-y-6 border-l-2 border-accent/30 pl-6">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[31px] mt-1 inline-block h-4 w-4 rounded-full bg-accent" aria-hidden="true" />
              <p className="font-display text-lg font-semibold">{m.year}</p>
              <p className="text-muted-foreground">{m.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Leadership" title="Meet the team" />
          <Button asChild variant="outline"><Link to="/team">All team members</Link></Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.slice(0, 4).map((t) => (
            <Card key={t.slug}>
              <Link to="/team/$slug" params={{ slug: t.slug }}>
                <div className="aspect-square overflow-hidden">
                  <img src={t.photo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
