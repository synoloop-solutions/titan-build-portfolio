import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { careers } from "@/data/careers";
import { img, PHOTOS } from "@/data/images";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers — TitanBuild Construction Group" },
      { name: "description", content: "Build your career at TitanBuild. Open roles across project management, field operations, safety, preconstruction, BIM, and more." },
      { property: "og:title", content: "Careers at TitanBuild" },
      { property: "og:description", content: "Open roles across project management, field operations, safety, and preconstruction." },
      { property: "og:url", content: "/careers" },
      { property: "og:image", content: img(PHOTOS.team2, 1200) },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersIndex,
});

function CareersIndex() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Build something that lasts" description="Join 4,800+ team members building the most important projects in America." image={img(PHOTOS.team2, 1600)} />
      <Section>
        <div className="grid gap-4">
          {careers.map((c) => (
            <Card key={c.slug}>
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link to="/careers/$slug" params={{ slug: c.slug }} className="font-display text-lg font-semibold hover:underline">{c.title}</Link>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" aria-hidden="true" /> {c.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" /> {c.type}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" aria-hidden="true" /> {c.salary}</span>
                    <Badge variant="secondary">{c.department}</Badge>
                  </div>
                </div>
                <Button asChild><Link to="/careers/$slug" params={{ slug: c.slug }}>View role</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
