import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { read, write, KEYS } from "@/lib/storage";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  decided: boolean;
};

const DEFAULT: ConsentState = { necessary: true, analytics: false, marketing: false, preferences: false, decided: false };

export function useConsent() {
  const [state, setState] = useState<ConsentState>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setState(read<ConsentState>(KEYS.consent, DEFAULT));
    setHydrated(true);
  }, []);
  const save = (next: ConsentState) => {
    write(KEYS.consent, next);
    setState(next);
  };
  return { state, save, hydrated };
}

export function CookieBanner({ onOpenPrefs, open: showBanner, onAccept, onReject }: {
  onOpenPrefs: () => void; open: boolean; onAccept: () => void; onReject: () => void;
}) {
  if (!showBanner) return null;
  return (
    <div role="region" aria-label="Cookie notice" className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-4 shadow-lg backdrop-blur sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl text-sm text-foreground">
          We use cookies to deliver, secure, and improve the TitanBuild website. You can accept all, reject non-essential, or customize your choices. See our{" "}
          <a href="/cookie-policy" className="font-medium underline">Cookie Policy</a>.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={onOpenPrefs}>Customize</Button>
          <Button variant="outline" onClick={onReject}>Reject non-essential</Button>
          <Button onClick={onAccept} className="bg-accent text-accent-foreground hover:bg-accent/90">Accept all</Button>
        </div>
      </div>
    </div>
  );
}

export function CookiePreferencesModal({
  open, onOpenChange, value, onSave,
}: {
  open: boolean; onOpenChange: (v: boolean) => void;
  value: ConsentState; onSave: (next: ConsentState) => void;
}) {
  const [draft, setDraft] = useState<ConsentState>(value);
  useEffect(() => { setDraft(value); }, [value, open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Cookie preferences</DialogTitle>
          <DialogDescription>Choose which categories of cookies TitanBuild may use.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Row title="Strictly necessary" desc="Required for security, navigation, and core site functionality." checked disabled />
          <Row title="Analytics" desc="Helps us understand site usage to improve content and performance."
            checked={draft.analytics} onChange={(v) => setDraft({ ...draft, analytics: v })} />
          <Row title="Marketing" desc="Used to measure campaign effectiveness and personalize messaging."
            checked={draft.marketing} onChange={(v) => setDraft({ ...draft, marketing: v })} />
          <Row title="Preferences" desc="Remembers your settings like region, language, or display options."
            checked={draft.preferences} onChange={(v) => setDraft({ ...draft, preferences: v })} />
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onSave({ ...DEFAULT, decided: true })}>Reject non-essential</Button>
          <Button variant="outline" onClick={() => onSave({ necessary: true, analytics: true, marketing: true, preferences: true, decided: true })}>Accept all</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => onSave({ ...draft, necessary: true, decided: true })}>Save preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Row({ title, desc, checked, onChange, disabled }: { title: string; desc: string; checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  const id = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border p-3">
      <div>
        <Label htmlFor={id} className="font-medium">{title}</Label>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} disabled={disabled} aria-label={title} />
    </div>
  );
}
