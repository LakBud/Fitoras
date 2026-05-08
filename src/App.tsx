import { useState } from "react";
import NavBar from "./components/common/navBar/NavBar";
import CookieConsent from "./components/common/CookieConsent";
import AppRoutes from "./routes/router";
import { useInitializeStores } from "./hooks/useInitializeStores";
import {
  useGoogleAnalytics,
  getConsentStatus,
  type ConsentStatus,
} from "./hooks/useGoogleAnalytics";

function App() {
  useInitializeStores();

  const [consent, setConsent] = useState<ConsentStatus>(getConsentStatus);

  useGoogleAnalytics(consent);

  return (
    <>
      <div>
        <NavBar />
        <AppRoutes />
      </div>

      {/* Show the banner only when the user hasn't decided yet */}
      {consent === null && <CookieConsent onConsent={setConsent} />}
    </>
  );
}

export default App;
