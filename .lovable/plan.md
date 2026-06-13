
# TitanBuild Construction Group — Build Plan (v2)

A premium, agency-quality construction company website on TanStack Start + Tailwind v4 + shadcn/ui + Framer Motion. Mock data + LocalStorage. Real Unsplash/Pexels photography.

## 1. Design System

Update `src/styles.css` for an industrial construction aesthetic:
- Deep Navy `--primary`, Construction Orange `--accent`, Steel Gray `--muted`, Charcoal `--foreground`, White `--background`
- Dark mode variants
- Headings: Space Grotesk; Body: Inter — loaded via `<link>` in `__root.tsx`, registered in `@theme`
- Motion utilities respecting `prefers-reduced-motion`

## 2. Routes (file-based under `src/routes/`)

```
__root.tsx                      header / footer / cookie banner / skip-link / single <main>
index.tsx                       /
about.tsx                       /about
services.index.tsx              /services
services.$slug.tsx              /services/:slug
projects.index.tsx              /projects
projects.compare.tsx            /projects/compare        ← NEW
projects.$slug.tsx              /projects/:slug
industries.index.tsx            /industries
industries.$slug.tsx            /industries/:slug
safety.tsx                      /safety
certifications.tsx              /certifications          ← NEW
team.index.tsx                  /team
team.$slug.tsx                  /team/:slug
gallery.tsx                     /gallery
careers.index.tsx               /careers
careers.$slug.tsx               /careers/:slug
news.index.tsx                  /news
news.$slug.tsx                  /news/:slug
contact.tsx                     /contact
quote-request.tsx               /quote-request           ← NEW
resources.tsx                   /resources
search.tsx                      /search
privacy.tsx terms.tsx cookie-policy.tsx accessibility.tsx
sitemap[.]xml.ts                /sitemap.xml
```

Plus `public/robots.txt`. Order matters: `projects.compare.tsx` must be defined as a literal path so it isn't captured by `projects.$slug`.

## 3. Mock Data (`src/data/`)

- `projects.ts` — 20 projects with full schema **plus `sizeSqFt`, `durationMonths`, `industry`** to power the compare table, and a `progressGallery: { before, during, completed }` array for each project
- `services.ts` — 8 services with overview/benefits/process/deliverables
- `industries.ts` — 6 industries
- `team.ts` — 12 members
- `testimonials.ts` — 12 entries
- `news.ts` — 12 articles
- `careers.ts` — 8 roles
- `gallery.ts` — 30+ photos with categories
- `certifications.ts` — OSHA, ISO 9001 / 14001 / 45001, safety awards, industry memberships (AGC, ABC, ENR), compliance standards
- `stats.ts`, `images.ts` (central Unsplash URL constants)

## 4. New Feature Pages

### `/projects/compare`
- Picker (max 4) — autocomplete + checkbox list, persisted in URL search params (`?ids=a,b,c`) via `validateSearch` + Zod
- Comparison table (rows: Budget, Duration, Industry, Services Used, Size (sq ft), Location, Category, Client, Completion) with sticky first column on mobile (horizontal scroll allowed inside a card, not page-level)
- "Add to compare" button on every project card writes to LocalStorage + updates URL
- Empty state and "remove" controls per column

### `/quote-request`
- Multi-step form (3 steps) with Zod + react-hook-form: Name, Company, Email, Phone, Project Type, Budget Range, Timeline, Location, Project Description
- LocalStorage persistence (`titanbuild.quote-requests[]`) + success screen
- Linked from hero, header CTA, contact page, footer

### `/certifications`
- Hero, OSHA section, ISO certifications grid, Safety Awards timeline, Industry Memberships logos, Compliance Standards table
- Cross-linked from `/safety`

## 5. Gallery Enhancements

- `/gallery`: category filters + responsive masonry + accessible lightbox (focus trap, ESC, arrow keys)
- **Project progress galleries** on `/projects/:slug`: tabbed view "Before / During Construction / Completed" backed by `progressGallery`, with lightbox

## 6. Cookie Management

LocalStorage-backed banner + modal with Necessary / Analytics / Marketing / Preferences toggles. Banner cannot dismiss without explicit choice. Footer "Cookie Settings" reopens the modal. Customize Preferences always opens the modal.

## 7. SEO (Target: 100)

- Per-route `head()` with title/description/og/twitter
- Canonicals on leaves only (relative paths)
- Structured data: Organization (root), Service (services/:slug), Article (news/:slug), BreadcrumbList (deep routes)
- `sitemap.xml` server route enumerating all static + dynamic slugs
- `public/robots.txt`

## 8. Accessibility (Target: 95+)

Single `<main>`, skip link, semantic landmarks, single H1 per page, `aria-label` on all icon-only buttons, visible focus rings, keyboard support for nav/sheet/lightbox/carousel/compare picker, ≥44px tap targets, semantic-token-only colors, `prefers-reduced-motion` disables Framer transitions.

## 9. Performance (Target: 90+)

- Unsplash URLs sized via `w=` + `q=`; explicit width/height on all images; `loading="lazy"` + `decoding="async"` except hero
- LCP hero preloaded via `head().links`
- Route-level code splitting (default)
- Font preconnect + `display=swap`
- Framer only for scroll reveals; CSS for hovers

## 10. Best Practices (Target: 95+)

- No console errors/warnings
- No mixed content; all external assets HTTPS
- `rel="noopener noreferrer"` on every external `target="_blank"` link
- Properly typed forms, no `any`

## 11. Error & Empty States

`notFoundComponent` + `errorComponent` on every dynamic route; loading skeletons on filter/search; friendly empty results.

## 12. Dynamic Route Verification (programmatic)

A script `scripts/verify-routes.ts` (run during QA) generates URLs from every record in `projects`, `services`, `industries`, `team`, `careers`, `news` and asserts:
1. URL generated from slug
2. Route resolves (no 404)
3. Detail page renders distinct content (h1 matches record name)
4. Direct URL access works (SSR)
5. Refresh works
6. Back button returns to listing without losing state

Run manually via browser tools during final QA. Detail pages must NOT redirect to listing.

## 13. Final Completion Audit (checklist before delivery)

- [ ] No placeholder sections / empty pages / dead links
- [ ] No overlapping elements; no hidden content; no horizontal scroll at 320/375/768/1024/1440
- [ ] No console or runtime errors
- [ ] Cookie banner: accept / reject / customize / footer-reopen all work
- [ ] Every nav item + CTA wired
- [ ] Every dynamic slug resolves to a unique detail page
- [ ] `/projects/compare`, `/quote-request`, `/certifications` fully functional
- [ ] Progress galleries (Before/During/Completed) render for each project
- [ ] Sitemap includes every dynamic slug; robots.txt present
- [ ] Lighthouse pass on Home, Projects listing, Project detail, Services detail, News detail, Contact

## Technical Notes

- Stack: React 19, TanStack Start, Tailwind v4 (CSS-first `@theme`), shadcn/ui, Framer Motion, Zod, react-hook-form
- LocalStorage keys namespaced under `titanbuild.*`; typed helpers in `src/lib/storage.ts`
- Search params validated with `zodValidator` + `fallback`
- Compare state synced to both URL and LocalStorage; URL wins on hydration
- Quote-request submissions appended to `titanbuild.quote-requests[]`
- Static literal route `projects.compare.tsx` ordered before `projects.$slug.tsx` (TanStack handles automatically via specificity)
- No backend, no Lovable Cloud
