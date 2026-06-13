import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getNews, news, type NewsPost } from "@/data/news";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const n = getNews(params.slug);
    if (!n) throw notFound();
    return { post: n };
  },
  head: ({ params, loaderData }) => {
    const n = loaderData?.post;
    const title = n ? `${n.title} — TitanBuild News` : "News article";
    const desc = n?.excerpt ?? "News article";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: `/news/${params.slug}` },
        { property: "og:type", content: "article" },
        { property: "og:image", content: n?.image ?? "" },
      ],
      links: [{ rel: "canonical", href: `/news/${params.slug}` }],
      scripts: n ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Article",
          headline: n.title, description: n.excerpt, image: n.image,
          datePublished: n.date, author: { "@type": "Person", name: n.author },
          publisher: { "@type": "Organization", name: "TitanBuild Construction Group" },
        }),
      }] : undefined,
    };
  },
  component: NewsDetail,
});

function NewsDetail() {
  const { post: n } = Route.useLoaderData() as { post: NewsPost };
  const related = news.filter((x) => x.slug !== n.slug && x.category === n.category).slice(0, 3);
  return (
    <>
      <article>
        <div className="border-b bg-secondary/40">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "News", to: "/news" }, { label: n.title }]} />
            <Badge variant="secondary" className="mt-6">{n.category}</Badge>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{n.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">{n.date} · {n.author} · {n.readMinutes} min read</p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <img src={n.image} alt={n.title} className="aspect-[16/9] w-full rounded-lg object-cover" />
          <div className="prose prose-neutral mt-8 max-w-none text-base leading-relaxed text-foreground">
            {n.content.split("\n\n").map((p, i) => <p key={i} className="mb-4 text-muted-foreground">{p}</p>)}
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold">More in {n.category}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Card key={r.slug}>
                <Link to="/news/$slug" params={{ slug: r.slug }}>
                  <div className="aspect-[16/10] overflow-hidden"><img src={r.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" /></div>
                  <CardContent className="p-5">
                    <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
