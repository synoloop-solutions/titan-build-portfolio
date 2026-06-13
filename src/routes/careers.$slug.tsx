import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, MapPin, DollarSign, Clock } from "lucide-react";
import { Breadcrumbs, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCareer, type Career } from "@/data/careers";
import { read, write, KEYS } from "@/lib/storage";
import { z } from "zod";
import { toast } from "sonner";

const applicationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(40),
  cover: z.string().trim().max(1500).optional().default(""),
});

export const Route = createFileRoute("/careers/$slug")({
  loader: ({ params }) => {
    const c = getCareer(params.slug);
    if (!c) throw notFound();
    return { career: c };
  },
  head: ({ params, loaderData }) => {
    const c = loaderData?.career;
    const title = c ? `${c.title} — Careers at TitanBuild` : "Career";
    return {
      meta: [
        { title }, { name: "description", content: c?.description ?? "Career role" },
        { property: "og:title", content: title }, { property: "og:description", content: c?.description ?? "" },
        { property: "og:url", content: `/careers/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/careers/${params.slug}` }],
    };
  },
  component: CareerDetail,
});

function CareerDetail() {
  const { career: c } = Route.useLoaderData() as { career: Career };
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = applicationSchema.safeParse(data);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const e2: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => { if (v && v[0]) e2[k] = v[0]; });
      setErrors(e2);
      return;
    }
    setErrors({});
    const apps = read<unknown[]>(KEYS.applications, []);
    apps.push({ ...parsed.data, role: c.slug, submittedAt: new Date().toISOString() });
    write(KEYS.applications, apps);
    setSubmitted(true);
    toast.success("Application submitted. We'll be in touch.");
  };

  return (
    <Section>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: c.title }]} />
      <div className="mt-8 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="font-display text-4xl font-bold">{c.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" aria-hidden="true" /> {c.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" /> {c.type}</span>
            <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" aria-hidden="true" /> {c.salary}</span>
          </div>
          <p className="mt-6 text-muted-foreground">{c.description}</p>

          <h2 className="mt-8 font-display text-xl font-bold">Responsibilities</h2>
          <ul className="mt-3 space-y-2 text-sm">{c.responsibilities.map((r: string) => <li key={r} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />{r}</li>)}</ul>

          <h2 className="mt-8 font-display text-xl font-bold">Requirements</h2>
          <ul className="mt-3 space-y-2 text-sm">{c.requirements.map((r: string) => <li key={r} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />{r}</li>)}</ul>
        </div>
        <aside>
          <Card><CardContent className="p-5">
            <h2 className="font-display text-lg font-semibold">Apply for this role</h2>
            {submitted ? (
              <div className="mt-4 rounded-md border border-accent/40 bg-accent/10 p-4 text-sm">
                Thanks for your application. Our recruiting team will be in touch shortly.
              </div>
            ) : (
              <form className="mt-4 space-y-3" onSubmit={onSubmit} noValidate>
                <Field label="Full name" name="name" error={errors.name} required />
                <Field label="Email" name="email" type="email" error={errors.email} required />
                <Field label="Phone" name="phone" type="tel" error={errors.phone} required />
                <div>
                  <Label htmlFor="cover">Cover note (optional)</Label>
                  <Textarea id="cover" name="cover" rows={4} maxLength={1500} className="mt-1" />
                  {errors.cover && <p className="mt-1 text-xs text-destructive">{errors.cover}</p>}
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit application</Button>
              </form>
            )}
          </CardContent></Card>
          <Button asChild variant="outline" className="mt-4 w-full"><Link to="/careers">All open roles</Link></Button>
        </aside>
      </div>
    </Section>
  );
}

function Field({ label, name, error, type = "text", required }: { label: string; name: string; error?: string; type?: string; required?: boolean }) {
  return (
    <div>
      <Label htmlFor={name}>{label}{required && " *"}</Label>
      <Input id={name} name={name} type={type} required={required} className="mt-1" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
