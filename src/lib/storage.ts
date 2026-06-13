// Typed LocalStorage helpers, namespaced.
const NS = "titanbuild.";

export function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(NS + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch { /* ignore */ }
}

export function remove(key: string): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(NS + key); } catch { /* ignore */ }
}

export const KEYS = {
  consent: "cookie-consent",
  compare: "compare-ids",
  quotes: "quote-requests",
  contacts: "contact-submissions",
  applications: "job-applications",
  downloads: "resource-downloads",
} as const;
