import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { z } from "zod";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { read, write, KEYS } from "@/lib/storage";
import { toast } from "sonner";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — TitanBuild Construction Group" },
      { name: "description", content: "Download case studies, capability statements, safety manuals, and sustainability reports from TitanBuild." },
      { property: "og:title", content: "TitanBuild Resources" },
      { property: "og:description", content: "Case studies, capability statements, and safety documentation." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const resources = [
  { slug: "capability-statement", title: "TitanBuild Capability Statement (PDF)", desc: "Overview of services, markets, and key projects.", size: "2.4 MB" },
  { slug: "safety-manual", title: "Safety Program Manual (PDF)", desc: "Our ISO 45001 safety management system at a glance.", size: "5.1 MB" },
  { slug: "sustainability-report", title: "2025 Sustainability Report (PDF)", desc: "Embodied-carbon performance and net-zero roadmap.", size: "8.7 MB" },
  { slug: "preconstruction-checklist", title: "Preconstruction Checklist (PDF)", desc: "What to prepare before your kickoff meeting.", size: "0.6 MB" },
  { slug: "case-study-tower", title: "Case Study: Meridian Financial Tower (PDF)", desc: "How we delivered 48 stories three months early.", size: "3.2 MB" },
  { slug: "case-study-hospital", title: "Case Study: St. Augustine Medical Center (PDF)", desc: "Occupied hospital construction lessons.", size: "3.6 MB" },
];

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional().default(""),
});

function ResourcesPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const e2: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => { if (v && v[0]) e2[k] = v[0]; });
      setErrors(e2);
      return;
    }
    setErrors({});
    const list = read<unknown[]>(KEYS.downloads, []);
    list.push({ ...parsed.data, resource: open, requestedAt: new Date().toISOString() });
    write(KEYS.downloads, list);
    toast.success("Download link sent to your email.");
    setOpen(null);
  };

  return (
    <>
      <PageHero eyebrow="Resources" title="Documents & downloads" description="Briefs, case studies, and manuals for owners, designers, and trade partners." />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Card key={r.slug}><CardContent className="p-5">
              <FileText className="h-7 w-7 text-accent" aria-hidden="true" />
              <h2 className="mt-3 font-display text-base font-semibold">{r.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              <p className="mt-2 text-xs text-muted-foreground">{r.size}</p>
              <Button onClick={() => setOpen(r.slug)} className="mt-4 w-full">
                <Download className="mr-2 h-4 w-4" aria-hidden="true" /> Request download
              </Button>
            </CardContent></Card>
          ))}
        </div>

        <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Request download</DialogTitle></DialogHeader>
            <form onSubmit={onSubmit} className="space-y-3" noValidate>
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required className="mt-1" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required className="mt-1" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Send me the link</Button>
            </form>
          </DialogContent>
        </Dialog>
      </Section>
    </>
  );
}
