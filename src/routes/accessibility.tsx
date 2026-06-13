import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/section";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — TitanBuild" },
      { name: "description", content: "TitanBuild's commitment to digital accessibility and WCAG 2.1 AA compliance." },
      { property: "og:title", content: "Accessibility" }, { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Accessibility statement" />
      <Section>
        <div className="prose mx-auto max-w-3xl text-muted-foreground">
          <p>TitanBuild is committed to ensuring our website is accessible to people with disabilities. We aim to conform to WCAG 2.1 Level AA.</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Features</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Semantic HTML landmarks and skip-to-content links.</li>
            <li>Keyboard-accessible navigation and interactive components.</li>
            <li>Sufficient color contrast and focus indicators.</li>
            <li>Reduced-motion support honoring user preferences.</li>
          </ul>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Feedback</h2>
          <p>If you experience an accessibility barrier on our site, please email accessibility@titanbuild.example.</p>
        </div>
      </Section>
    </>
  ),
});
