import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { team } from "@/data/team";
import { img, PHOTOS } from "@/data/images";

export const Route = createFileRoute("/team/")({
  head: () => ({
    meta: [
      { title: "Leadership Team — TitanBuild Construction" },
      { name: "description", content: "Meet TitanBuild's leadership: executives across operations, safety, preconstruction, sustainability, and more." },
      { property: "og:title", content: "TitanBuild Leadership" },
      { property: "og:description", content: "Meet the leaders driving our delivery, safety, and innovation." },
      { property: "og:url", content: "/team" },
      { property: "og:image", content: img(PHOTOS.team1, 1200) },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamIndex,
});

function TeamIndex() {
  return (
    <>
      <PageHero eyebrow="People" title="Meet our leadership" description="A national team of builders, engineers, and operators dedicated to delivering with discipline." />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <Card key={t.slug}>
              <Link to="/team/$slug" params={{ slug: t.slug }}>
                <div className="aspect-square overflow-hidden">
                  <img src={t.photo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <h2 className="font-display text-base font-semibold">{t.name}</h2>
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
