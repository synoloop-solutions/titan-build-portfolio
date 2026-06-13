import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { read, write, KEYS } from "@/lib/storage";
import { toast } from "sonner";
import { services } from "@/data/services";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  projectType: z.string().min(1, "Required"),
  budget: z.string().min(1, "Required"),
  timeline: z.string().min(1, "Required"),
  location: z.string().trim().min(2).max(120),
  description: z.string().trim().min(20).max(2000),
});
type FormT = z.infer<typeof schema>;

const BUDGETS = ["Under $1M", "$1M – $5M", "$5M – $25M", "$25M – $100M", "$100M+"];
const TIMELINES = ["Less than 6 months", "6–12 months", "12–24 months", "24+ months", "Not yet determined"];

export const Route = createFileRoute("/quote-request")({
  head: () => ({
    meta: [
      { title: "Request a Quote — TitanBuild Construction" },
      { name: "description", content: "Tell us about your project — TitanBuild's preconstruction team will respond within one business day with budget and schedule guidance." },
      { property: "og:title", content: "Request a Quote" },
      { property: "og:description", content: "Start your project with TitanBuild's preconstruction team." },
      { property: "og:url", content: "/quote-request" },
    ],
    links: [{ rel: "canonical", href: "/quote-request" }],
  }),
  component: QuoteRequest,
});

function QuoteRequest() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Partial<FormT>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const update = (patch: Partial<FormT>) => setForm((f) => ({ ...f, ...patch }));

  const stepFields: (keyof FormT)[][] = [
    ["name", "company", "email", "phone"],
    ["projectType", "budget", "timeline", "location"],
    ["description"],
  ];

  const validateStep = () => {
    const sub = schema.pick(Object.fromEntries(stepFields[step].map((k) => [k, true])) as never);
    const r = sub.safeParse(form);
    if (!r.success) {
      const flat = r.error.flatten().fieldErrors;
      const e: Record<string, string> = {};
      Object.entries(flat).forEach(([k, v]) => { if (v && v[0]) e[k] = v[0]; });
      setErrors(e); return false;
    }
    setErrors({}); return true;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(2, s + 1)); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    const r = schema.safeParse(form);
    if (!r.success) { toast.error("Please review the form."); return; }
    const list = read<unknown[]>(KEYS.quotes, []);
    list.push({ ...r.data, submittedAt: new Date().toISOString() });
    write(KEYS.quotes, list);
    setDone(true);
    toast.success("Quote request submitted.");
  };

  return (
    <>
      <PageHero eyebrow="Quote request" title="Tell us about your project" description="We respond within one business day with preconstruction guidance and next steps." />
      <Section>
        <Card className="mx-auto max-w-3xl">
          <CardContent className="p-6 sm:p-8">
            {done ? (
              <div className="text-center">
                <Check className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
                <h2 className="mt-4 font-display text-2xl font-bold">Thanks — we received your request.</h2>
                <p className="mt-2 text-muted-foreground">A preconstruction lead will reach out within one business day to discuss your project.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button asChild><Link to="/projects">Browse projects</Link></Button>
                  <Button asChild variant="outline"><Link to="/">Back home</Link></Button>
                </div>
              </div>
            ) : (
              <>
                <ol className="mb-8 flex items-center justify-between text-xs font-semibold uppercase tracking-wide" aria-label="Progress">
                  {["About you", "Project", "Details"].map((label, i) => (
                    <li key={label} className={`flex items-center gap-2 ${i === step ? "text-accent" : i < step ? "text-foreground" : "text-muted-foreground"}`}>
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${i <= step ? "border-accent bg-accent text-accent-foreground" : "border-muted-foreground"}`}>{i + 1}</span>
                      {label}
                    </li>
                  ))}
                </ol>

                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  {step === 0 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldText label="Name *" id="name" value={form.name ?? ""} onChange={(v) => update({ name: v })} err={errors.name} />
                      <FieldText label="Company *" id="company" value={form.company ?? ""} onChange={(v) => update({ company: v })} err={errors.company} />
                      <FieldText label="Email *" id="email" type="email" value={form.email ?? ""} onChange={(v) => update({ email: v })} err={errors.email} />
                      <FieldText label="Phone" id="phone" type="tel" value={form.phone ?? ""} onChange={(v) => update({ phone: v })} err={errors.phone} />
                    </div>
                  )}
                  {step === 1 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldSelect label="Project type *" id="projectType" value={form.projectType ?? ""} onChange={(v) => update({ projectType: v })} err={errors.projectType}
                        options={services.map((s) => ({ value: s.slug, label: s.name }))} />
                      <FieldSelect label="Budget *" id="budget" value={form.budget ?? ""} onChange={(v) => update({ budget: v })} err={errors.budget}
                        options={BUDGETS.map((b) => ({ value: b, label: b }))} />
                      <FieldSelect label="Timeline *" id="timeline" value={form.timeline ?? ""} onChange={(v) => update({ timeline: v })} err={errors.timeline}
                        options={TIMELINES.map((b) => ({ value: b, label: b }))} />
                      <FieldText label="Location *" id="location" value={form.location ?? ""} onChange={(v) => update({ location: v })} err={errors.location} placeholder="City, State" />
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <Label htmlFor="description">Project description *</Label>
                      <Textarea id="description" rows={8} maxLength={2000} className="mt-1"
                        value={form.description ?? ""} onChange={(e) => update({ description: e.target.value })} />
                      {errors.description && <p className="mt-1 text-xs text-destructive">{errors.description}</p>}
                      <p className="mt-2 text-xs text-muted-foreground">{(form.description ?? "").length}/2000 characters</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <Button type="button" variant="outline" onClick={back} disabled={step === 0}>Back</Button>
                    {step < 2 ? (
                      <Button type="button" onClick={next} className="bg-accent text-accent-foreground hover:bg-accent/90">Continue</Button>
                    ) : (
                      <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Submit request</Button>
                    )}
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </Section>
    </>
  );
}

function FieldText({ label, id, value, onChange, err, type = "text", placeholder }: { label: string; id: string; value: string; onChange: (v: string) => void; err?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1" />
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}

function FieldSelect({ label, id, value, onChange, err, options }: { label: string; id: string; value: string; onChange: (v: string) => void; err?: string; options: { value: string; label: string }[] }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="mt-1"><SelectValue placeholder="Select..." /></SelectTrigger>
        <SelectContent>{options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
      </Select>
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}
