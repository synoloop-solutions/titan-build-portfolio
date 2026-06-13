import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";
import { img, PHOTOS } from "@/data/images";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Construction Services — TitanBuild Construction Group" },
      { name: "description", content: "Commercial, industrial, civil, residential, design-build, CM, renovation, and preconstruction services from a national general contractor." },
      { property: "og:title", content: "Construction Services" },
      { property: "og:description", content: "Eight integrated service lines from TitanBuild Construction Group." },
      { property: "og:url", content: "/services" },
      { property: "og:image", content: img(PHOTOS.build2, 1200) },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero eyebrow="Services" title="Integrated construction expertise" description="Eight service lines, one accountable team. Whether you need a single trade or a full design-build delivery, TitanBuild has the depth to deliver." image={img(PHOTOS.build2, 1600)} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.slug} className="overflow-hidden">
              <Link to="/services/$slug" params={{ slug: s.slug }}>
                <div className="aspect-[4/3] overflow-hidden"><img src={s.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                <CardContent className="p-5">
                  <h2 className="font-display text-lg font-semibold">{s.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-accent">Learn more <ArrowRight className="ml-1 h-4 w-4" /></span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
