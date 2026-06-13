import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { PageHero, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { read, write, KEYS } from "@/lib/storage";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(10).max(1500),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact TitanBuild Construction Group" },
      { name: "description", content: "Reach our offices in Chicago, Atlanta, Phoenix, and beyond. We respond to project inquiries within one business day." },
      { property: "og:title", content: "Contact TitanBuild" },
      { property: "og:description", content: "Speak to our preconstruction, operations, or careers teams." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

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
    const list = read<unknown[]>(KEYS.contacts, []);
    list.push({ ...parsed.data, submittedAt: new Date().toISOString() });
    write(KEYS.contacts, list);
    setDone(true);
    toast.success("Message sent. We'll be in touch.");
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's build something together" description="Reach out for project inquiries, careers, or media questions." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6">
            <Card><CardContent className="p-5">
              <h2 className="font-display text-lg font-semibold">Headquarters</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /> 200 W Madison St, Chicago, IL 60606</li>
                <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /> (312) 555-0148</li>
                <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" /> info@titanbuild.example</li>
              </ul>
            </CardContent></Card>
            <Card><CardContent className="p-5">
              <h3 className="font-display font-semibold">Regional offices</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                <li>Atlanta, GA</li><li>Phoenix, AZ</li><li>Boston, MA</li><li>Austin, TX</li><li>Seattle, WA</li>
              </ul>
            </CardContent></Card>
          </div>
          <div className="lg:col-span-2">
            <Card><CardContent className="p-6">
              <h2 className="font-display text-lg font-semibold">Send us a message</h2>
              {done ? (
                <div className="mt-4 rounded-md border border-accent/40 bg-accent/10 p-4 text-sm">
                  Thanks for reaching out. A member of our team will respond within one business day.
                </div>
              ) : (
                <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
                  <Field label="Full name *" name="name" error={errors.name} />
                  <Field label="Email *" name="email" type="email" error={errors.email} />
                  <Field label="Phone" name="phone" type="tel" error={errors.phone} />
                  <div className="sm:col-span-2">
                    <Label htmlFor="message">How can we help? *</Label>
                    <Textarea id="message" name="message" rows={6} required minLength={10} maxLength={1500} className="mt-1" />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>
                  <Button type="submit" className="sm:col-span-2 bg-accent text-accent-foreground hover:bg-accent/90">Send message</Button>
                </form>
              )}
            </CardContent></Card>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} className="mt-1" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
