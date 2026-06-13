import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { CookieBanner, CookiePreferencesModal, useConsent } from "./cookies";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell() {
  const { state, save, hydrated } = useConsent();
  const [prefsOpen, setPrefsOpen] = useState(false);

  const showBanner = hydrated && !state.decided && !prefsOpen;

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter onCookiePrefs={() => setPrefsOpen(true)} />
      <CookieBanner
        open={showBanner}
        onOpenPrefs={() => setPrefsOpen(true)}
        onAccept={() => save({ necessary: true, analytics: true, marketing: true, preferences: true, decided: true })}
        onReject={() => save({ necessary: true, analytics: false, marketing: false, preferences: false, decided: true })}
      />
      <CookiePreferencesModal
        open={prefsOpen}
        onOpenChange={setPrefsOpen}
        value={state}
        onSave={(next) => { save(next); setPrefsOpen(false); }}
      />
      <Toaster richColors closeButton />
    </>
  );
}
