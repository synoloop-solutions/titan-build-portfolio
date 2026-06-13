import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/section";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — TitanBuild" },
      { name: "description", content: "How TitanBuild uses cookies and how you can control them." },
      { property: "og:title", content: "Cookie Policy" }, { property: "og:url", content: "/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Cookie policy" />
      <Section>
        <div className="prose mx-auto max-w-3xl text-muted-foreground">
          <p>We use cookies to deliver, secure, and improve the TitanBuild website. You can change your preferences at any time using the "Cookie Settings" link in our footer.</p>
          <h2 className="mt-8 font-display text-xl font-bold text-foreground">Cookie categories</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong className="text-foreground">Strictly necessary</strong> — required for site security and core functionality.</li>
            <li><strong className="text-foreground">Analytics</strong> — usage measurement to improve the site.</li>
            <li><strong className="text-foreground">Marketing</strong> — measuring campaign effectiveness.</li>
            <li><strong className="text-foreground">Preferences</strong> — remembering settings such as region or language.</li>
          </ul>
        </div>
      </Section>
    </>
  ),
});
