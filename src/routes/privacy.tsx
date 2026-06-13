import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TitanBuild" },
      { name: "description", content: "How TitanBuild collects, uses, and protects your information." },
      { property: "og:title", content: "Privacy Policy" }, { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <Section>
        <div className="prose mx-auto max-w-3xl text-muted-foreground">
          <p>This Privacy Policy explains how TitanBuild Construction Group ("TitanBuild," "we," or "us") collects, uses, and shares information about you.</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Information we collect</h2>
          <p>We collect information you provide directly (such as contact forms and quote requests), information collected automatically (such as device and usage data), and information from third parties (such as service providers).</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">How we use information</h2>
          <p>We use information to respond to inquiries, deliver our services, improve our website, and comply with legal obligations.</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Your choices</h2>
          <p>You can manage cookie preferences in our footer at any time, and you can contact us to request access, correction, or deletion of your personal information.</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Contact</h2>
          <p>Questions? Email privacy@titanbuild.example.</p>
        </div>
      </Section>
    </>
  ),
});
