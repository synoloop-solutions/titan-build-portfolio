import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { industries } from "@/data/industries";
import { img, PHOTOS } from "@/data/images";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — TitanBuild Construction" },
      { name: "description", content: "Healthcare, education, hospitality, energy, government, and technology — TitanBuild builds for the markets that matter." },
      { property: "og:title", content: "Industries We Serve" },
      { property: "og:description", content: "Six markets where TitanBuild brings deep delivery experience." },
      { property: "og:url", content: "/industries" },
      { property: "og:image", content: img(PHOTOS.building5, 1200) },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <PageHero eyebrow="Industries" title="Markets we know inside and out" description="Each industry has its own rhythm, regulations, and risks. We bring dedicated leadership to each." image={img(PHOTOS.building5, 1600)} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Card key={i.slug} className="overflow-hidden">
              <Link to="/industries/$slug" params={{ slug: i.slug }}>
                <div className="aspect-[4/3] overflow-hidden"><img src={i.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                <CardContent className="p-5">
                  <h2 className="font-display text-lg font-semibold">{i.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{i.short}</p>
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
