import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — TitanBuild" },
      { name: "description", content: "Terms of Use for the TitanBuild website." },
      { property: "og:title", content: "Terms of Use" }, { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" />
      <Section>
        <div className="prose mx-auto max-w-3xl text-muted-foreground">
          <p>By accessing or using TitanBuild's website, you agree to these Terms of Use.</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Use of the site</h2>
          <p>You may use this site for lawful, personal, and informational purposes. You may not attempt to disrupt or compromise the site.</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Intellectual property</h2>
          <p>All content on this site is owned by or licensed to TitanBuild Construction Group. You may not reproduce or distribute it without written permission.</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Disclaimer</h2>
          <p>The site is provided "as is" without warranties. TitanBuild is not liable for indirect damages arising from your use of the site.</p>
        </div>
      </Section>
    </>
  ),
});
