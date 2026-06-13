import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Activity, Users, Award, ClipboardList, Heart } from "lucide-react";
import { PageHero, Section, SectionHeading } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { img, PHOTOS } from "@/data/images";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety — TitanBuild Construction Group" },
      { name: "description", content: "TitanBuild's safety program: TRIR 60% below industry average, OSHA VPP Star sites, and an ISO 45001-certified management system." },
      { property: "og:title", content: "Safety at TitanBuild" },
      { property: "og:description", content: "Industry-leading safety program and OSHA VPP recognition." },
      { property: "og:url", content: "/safety" },
      { property: "og:image", content: img(PHOTOS.build1, 1200) },
    ],
    links: [{ rel: "canonical", href: "/safety" }],
  }),
  component: SafetyPage,
});

function SafetyPage() {
  const pillars = [
    { icon: ShieldCheck, t: "Zero-incident mindset", d: "Every project starts and ends with the goal: every worker home safe, every day." },
    { icon: ClipboardList, t: "Pre-task planning", d: "Crews complete a Job Hazard Analysis before every shift, signed by every worker." },
    { icon: Activity, t: "Active monitoring", d: "Wearable-device pilots and daily safety walks identify hazards before they become incidents." },
    { icon: Users, t: "Trade-partner alignment", d: "All subcontractors complete TitanBuild Safety Orientation before site access." },
    { icon: Award, t: "OSHA VPP Star", d: "Three active sites currently maintain VPP Star status — the highest recognition in U.S. construction safety." },
    { icon: Heart, t: "Mental health & wellbeing", d: "Free EAP services, suicide-prevention training, and on-site peer-support networks." },
  ];
  return (
    <>
      <PageHero eyebrow="Safety" title="Safety is the foundation of every project." description="A TRIR 60% below industry average. ISO 45001-certified. OSHA VPP Star sites across the country." image={img(PHOTOS.build1, 1600)} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, t, d }) => (
            <Card key={t}><CardContent className="p-6">
              <Icon className="h-8 w-8 text-accent" aria-hidden="true" />
              <h2 className="mt-4 font-display text-lg font-semibold">{t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </CardContent></Card>
          ))}
        </div>
      </Section>

      <div className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Recognition" title="Award-winning safety performance" description="Recognized year after year by industry organizations and our clients." />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><Link to="/certifications">View certifications & awards</Link></Button>
            <Button variant="outline" asChild><Link to="/contact">Talk to our safety team</Link></Button>
          </div>
        </div>
      </div>
    </>
  );
}
