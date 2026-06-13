import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Mail, Award } from "lucide-react";
import { Breadcrumbs, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMember, team, type TeamMember } from "@/data/team";

export const Route = createFileRoute("/team/$slug")({
  loader: ({ params }) => {
    const m = getMember(params.slug);
    if (!m) throw notFound();
    return { member: m };
  },
  head: ({ params, loaderData }) => {
    const m = loaderData?.member;
    const title = m ? `${m.name}, ${m.title} — TitanBuild` : "Team member";
    return {
      meta: [
        { title }, { name: "description", content: m?.bio ?? "Team member" },
        { property: "og:title", content: title }, { property: "og:description", content: m?.bio ?? "" },
        { property: "og:url", content: `/team/${params.slug}` },
        { property: "og:image", content: m?.photo ?? "" },
      ],
      links: [{ rel: "canonical", href: `/team/${params.slug}` }],
    };
  },
  component: TeamDetail,
});

function TeamDetail() {
  const { member: m } = Route.useLoaderData() as { member: TeamMember };
  const others = team.filter((t) => t.slug !== m.slug).slice(0, 4);
  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Team", to: "/team" }, { label: m.name }]} />
      <div className="mt-8 grid gap-12 lg:grid-cols-3">
        <div>
          <img src={m.photo} alt={m.name} className="w-full rounded-lg object-cover" />
        </div>
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl font-bold">{m.name}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{m.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{m.experience} years of experience</p>
          <p className="mt-6 text-base text-foreground">{m.bio}</p>

          <h2 className="mt-8 font-display text-xl font-bold">Certifications</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {m.certifications.map((c: string) => <Badge key={c} variant="secondary"><Award className="mr-1 h-3 w-3" aria-hidden="true" />{c}</Badge>)}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><a href={`mailto:${m.email}`}><Mail className="mr-2 h-4 w-4" aria-hidden="true" />Email {m.name.split(" ")[0]}</a></Button>
            <Button asChild variant="outline"><Link to="/contact">General contact</Link></Button>
          </div>
        </div>
      </div>

      <h2 className="mt-16 font-display text-2xl font-bold">More leaders</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((t) => (
          <Card key={t.slug}>
            <Link to="/team/$slug" params={{ slug: t.slug }}>
              <div className="aspect-square overflow-hidden"><img src={t.photo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
              <CardContent className="p-4">
                <h3 className="font-display font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.title}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
