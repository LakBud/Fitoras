import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-MH8B06QZVT";
const GA_CONSENT_KEY = "ga_consent";

export type ConsentStatus = "accepted" | "declined" | null;

export function getConsentStatus(): ConsentStatus {
  const stored = localStorage.getItem(GA_CONSENT_KEY);
  if (stored === "accepted" || stored === "declined") return stored;
  return null;
}

export function setConsentStatus(status: "accepted" | "declined"): void {
  localStorage.setItem(GA_CONSENT_KEY, status);
}

function loadGAScript(): void {
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  };
}

function removeGAScript(): void {
  const script = document.getElementById("ga-script");
  if (script) script.remove();

  // Clear GA cookies
  document.cookie = `_ga=; Max-Age=0; path=/; domain=${window.location.hostname}`;
  document.cookie = `_ga_${GA_MEASUREMENT_ID.replace("G-", "")}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
}

export function useGoogleAnalytics(consent: ConsentStatus): void {
  useEffect(() => {
    if (consent === "accepted") {
      loadGAScript();
    } else if (consent === "declined") {
      removeGAScript();
    }
  }, [consent]);
}
