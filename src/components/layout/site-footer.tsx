import { Link } from "@tanstack/react-router";
import { HardHat, MapPin, Phone, Mail } from "lucide-react";

export function SiteFooter({ onCookiePrefs }: { onCookiePrefs?: () => void }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
              <HardHat className="h-5 w-5" aria-hidden="true" />
            </span>
            TitanBuild Construction Group
          </Link>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Building tomorrow's infrastructure with safety, precision, and integrity since 1977.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" /> 200 W Madison St, Chicago, IL 60606</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden="true" /> (312) 555-0148</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden="true" /> info@titanbuild.example</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Company</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
            <li><Link to="/team" className="text-muted-foreground hover:text-foreground">Leadership</Link></li>
            <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
            <li><Link to="/news" className="text-muted-foreground hover:text-foreground">Newsroom</Link></li>
            <li><Link to="/certifications" className="text-muted-foreground hover:text-foreground">Certifications</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Services</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/services" className="text-muted-foreground hover:text-foreground">All services</Link></li>
            <li><Link to="/projects" className="text-muted-foreground hover:text-foreground">Projects</Link></li>
            <li><Link to="/projects/compare" className="text-muted-foreground hover:text-foreground">Compare projects</Link></li>
            <li><Link to="/industries" className="text-muted-foreground hover:text-foreground">Industries</Link></li>
            <li><Link to="/safety" className="text-muted-foreground hover:text-foreground">Safety</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Resources</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link></li>
            <li><Link to="/gallery" className="text-muted-foreground hover:text-foreground">Gallery</Link></li>
            <li><Link to="/search" className="text-muted-foreground hover:text-foreground">Search</Link></li>
            <li><Link to="/quote-request" className="text-muted-foreground hover:text-foreground">Request a quote</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>© {year} TitanBuild Construction Group. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-foreground">Cookie Policy</Link>
            <Link to="/accessibility" className="hover:text-foreground">Accessibility</Link>
            <button type="button" onClick={onCookiePrefs} className="hover:text-foreground">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
