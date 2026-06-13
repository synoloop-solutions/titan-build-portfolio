import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHero, Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { gallery, galleryCategories } from "@/data/gallery";
import { Lightbox, useLightbox } from "@/components/site/lightbox";
import { img, PHOTOS } from "@/data/images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery — TitanBuild Construction" },
      { name: "description", content: "Explore TitanBuild's project gallery: commercial, civil, healthcare, education, residential, and people behind the work." },
      { property: "og:title", content: "TitanBuild Gallery" },
      { property: "og:description", content: "Photography from our most recent projects." },
      { property: "og:url", content: "/gallery" },
      { property: "og:image", content: img(PHOTOS.building1, 1200) },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(() => cat === "All" ? gallery : gallery.filter((g) => g.category === cat), [cat]);
  const lb = useLightbox();
  const images = filtered.map((f) => f.src);
  return (
    <>
      <PageHero eyebrow="Gallery" title="Project photography" description="Browse our recent work — from groundbreaking to ribbon-cutting." />
      <Section>
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((c) => (
            <Button key={c} variant={cat === c ? "default" : "outline"} size="sm" onClick={() => setCat(c)}>{c}</Button>
          ))}
        </div>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((g, i) => (
            <button key={g.id} type="button" onClick={() => lb.open(i)} className="mb-4 block w-full overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <img src={g.thumb} alt={g.alt} loading="lazy" decoding="async" className="h-auto w-full break-inside-avoid object-cover transition hover:opacity-90" />
            </button>
          ))}
        </div>
        <Lightbox images={images} alt="Project photo" index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
      </Section>
    </>
  );
}
