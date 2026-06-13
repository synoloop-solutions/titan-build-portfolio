import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow, title, description, image, children,
}: {
  eyebrow?: string; title: string; description?: string; image?: string; children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-primary text-primary-foreground">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-30" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        </div>
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {eyebrow && <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">{description}</p>}
        {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${className}`}>{children}</section>;
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  const a = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${a}`}>
      {eyebrow && <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  );
}

export type Crumb = { label: string; to?: string };
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="hover:text-foreground">{c.label}</Link>
            ) : (
              <span className="text-foreground">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
