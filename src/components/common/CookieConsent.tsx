import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { type ConsentStatus, setConsentStatus } from "@/hooks/useGoogleAnalytics";

interface CookieConsentProps {
  onConsent: (status: "accepted" | "declined") => void;
}

const CookieConsent = ({ onConsent }: CookieConsentProps) => {
  const [visible, setVisible] = useState(true);

  const handleAccept = () => {
    setConsentStatus("accepted");
    setVisible(false);
    onConsent("accepted");
  };

  const handleDecline = () => {
    setConsentStatus("declined");
    setVisible(false);
    onConsent("declined");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="relative bg-white border border-rose-100 rounded-2xl shadow-xl px-5 py-4 flex flex-col gap-3">
            {/* Dismiss button */}
            <button
              onClick={handleDecline}
              aria-label="Decline and close cookie banner"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 pr-6">
              <Cookie size={20} className="text-rose-500 shrink-0" aria-hidden="true" />
              <p className="text-sm font-semibold text-gray-800">We use cookies</p>
            </div>

            {/* Body */}
            <p className="text-xs text-gray-500 leading-relaxed">
              We use Google Analytics to understand how visitors interact with Fitoras. No personal data
              is sold or shared. You can accept or decline analytics cookies at any time.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={handleDecline}
                className="text-xs px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="text-xs px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition-colors font-medium"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export type { ConsentStatus };
export default CookieConsent;
