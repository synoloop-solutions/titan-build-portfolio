import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, ShieldCheck, BookOpen, Users } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { oshaPrograms, isoCertifications, safetyAwards, memberships, complianceStandards } from "@/data/certifications";
import { img, PHOTOS } from "@/data/images";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Awards & Certifications — TitanBuild Construction" },
      { name: "description", content: "OSHA VPP Star, ISO 9001/14001/45001, AGC and ABC awards, and our memberships and compliance standards." },
      { property: "og:title", content: "Awards & Certifications" },
      { property: "og:description", content: "OSHA, ISO certifications, safety awards, memberships, and compliance standards." },
      { property: "og:url", content: "/certifications" },
      { property: "og:image", content: img(PHOTOS.build1, 1200) },
    ],
    links: [{ rel: "canonical", href: "/certifications" }],
  }),
  component: CertsPage,
});

function CertsPage() {
  return (
    <>
      <PageHero eyebrow="Credentials" title="Awards & certifications" description="Independent recognition of our quality, safety, and environmental management systems." image={img(PHOTOS.build1, 1600)} />

      <Section>
        <SectionHeading eyebrow="OSHA" title="OSHA programs & training" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {oshaPrograms.map((p) => (
            <Card key={p.name}><CardContent className="p-6">
              <ShieldCheck className="h-7 w-7 text-accent" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </CardContent></Card>
          ))}
        </div>
      </Section>

      <div className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="ISO" title="ISO certifications" description="TitanBuild operations are certified to internationally recognized management standards." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {isoCertifications.map((c) => (
              <Card key={c.name}><CardContent className="p-5">
                <BookOpen className="h-6 w-6 text-accent" aria-hidden="true" />
                <p className="mt-3 font-display text-base font-semibold">{c.name}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">Since {c.year}</p>
                <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="Safety awards" title="Recent recognition" />
        <ol className="mt-8 space-y-4 border-l-2 border-accent/40 pl-6">
          {safetyAwards.map((a) => (
            <li key={a.name}>
              <p className="font-display text-sm font-semibold uppercase tracking-wide text-accent">{a.year}</p>
              <h3 className="font-display text-lg font-semibold">{a.name}</h3>
              <p className="text-sm text-muted-foreground">{a.issuer} — {a.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <div className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Industry" title="Memberships" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {memberships.map((m) => (
              <Card key={m.name}><CardContent className="p-5">
                <Users className="h-6 w-6 text-accent" aria-hidden="true" />
                <p className="mt-3 font-display font-semibold">{m.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="Compliance" title="Standards we operate under" />
        <div className="mt-6 overflow-x-auto rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Standard</TableHead><TableHead>Description</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {complianceStandards.map((c) => (
                <TableRow key={c.name}><TableCell className="font-medium">{c.name}</TableCell><TableCell className="text-muted-foreground">{c.description}</TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link to="/safety">Our safety program</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Request documentation</Link></Button>
        </div>
      </Section>
      {/* Suppress unused-icon warnings */}
      <Award className="hidden" aria-hidden="true" />
    </>
  );
}
