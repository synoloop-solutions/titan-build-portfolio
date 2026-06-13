import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Building2, HardHat, Award, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/site/section";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { stats } from "@/data/stats";
import { heroImg, img, PHOTOS } from "@/data/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TitanBuild Construction Group — National General Contractor" },
      { name: "description", content: "TitanBuild Construction Group delivers commercial, industrial, civil, and residential projects across the United States. ENR Top 100. ISO-certified. Safety-first." },
      { property: "og:title", content: "TitanBuild Construction Group" },
      { property: "og:description", content: "National general contractor since 1977. Commercial, industrial, civil, and residential construction." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg(1200) },
    ],
    links: [{ rel: "canonical", href: "/" }, { rel: "preload", as: "image", href: heroImg(1600) }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = projects.slice(0, 6);
  const topServices = services.slice(0, 6);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img src={heroImg(1800)} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-primary/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Since 1977 · ENR Top 100</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Building tomorrow's infrastructure with safety and precision.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85 sm:text-xl">
            From skyscrapers to civil infrastructure, TitanBuild Construction Group delivers complex projects across the United States — on time, on budget, and ahead of safety expectations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/quote-request">Request a quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/projects">View projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="!py-12">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <li key={s.label} className="rounded-lg border bg-card p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Services */}
      <Section>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="What we do" title="Integrated construction services" description="Self-perform expertise plus integrated trades — delivering predictable outcomes on the most complex projects." />
          <Button asChild variant="outline"><Link to="/services">All services <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topServices.map((s) => (
            <Card key={s.slug} className="overflow-hidden transition hover:shadow-md">
              <Link to="/services/$slug" params={{ slug: s.slug }} className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-accent">Learn more <ArrowRight className="ml-1 h-4 w-4" /></span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Featured projects */}
      <div className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Featured work" title="Recently delivered" description="A snapshot of recent TitanBuild projects across markets and geographies." />
            <Button asChild variant="outline"><Link to="/projects">View all projects <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Card key={p.slug} className="overflow-hidden">
                <Link to="/projects/$slug" params={{ slug: p.slug }}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.thumb} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <p className="text-xs uppercase tracking-wide text-accent">{p.category}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.location} · {p.completion}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <Section>
        <SectionHeading eyebrow="What sets us apart" title="Discipline behind every build" align="center" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Safety leadership", d: "TRIR 60% below industry average. OSHA VPP Star sites across the country." },
            { icon: Award, t: "Quality certified", d: "ISO 9001, 14001, and 45001 certified across all operations." },
            { icon: Building2, t: "Integrated delivery", d: "Self-perform concrete, steel, and earthwork backed by a vetted trade network." },
            { icon: Users, t: "Deep expertise", d: "4,800+ team members across commercial, industrial, civil, and residential markets." },
            { icon: HardHat, t: "Workforce development", d: "240 apprentices graduated in 2025 from our skilled-trades program." },
            { icon: Leaf, t: "Sustainability", d: "180+ LEED-certified projects, including our flagship mass-timber academic hall." },
          ].map(({ icon: Icon, t, d }) => (
            <Card key={t}><CardContent className="p-6">
              <Icon className="h-7 w-7 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </CardContent></Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <div className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Client voices" title="Trusted by leading owners" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.name} className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-6">
                <blockquote className="text-base">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-sm text-primary-foreground/70">
                  <span className="font-semibold text-primary-foreground">{t.name}</span> · {t.title}, {t.company}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <Section>
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-10 sm:p-12">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Have a project in mind?</h2>
              <p className="mt-3 text-muted-foreground">Tell us about your timeline, budget, and goals. Our preconstruction team responds within one business day.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/quote-request">Request a quote</Link></Button>
                <Button asChild variant="outline"><Link to="/contact">Contact us</Link></Button>
              </div>
            </div>
            <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
              <img src={img(PHOTOS.build4, 1200)} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
