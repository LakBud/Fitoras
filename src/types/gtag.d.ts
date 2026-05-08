// Type declarations for Google Analytics gtag
interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}
