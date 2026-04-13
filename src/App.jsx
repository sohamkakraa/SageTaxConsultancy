import React, { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Topbar } from "./components/Topbar";
import { Header } from "./components/Header";
import { VatPage } from './pages/VatPage';
import { CorporateTaxPage } from './pages/CorporateTaxPage';
import { ExciseTaxPage } from './pages/ExciseTaxPage';
import { AccountingServicesPage } from './pages/AccountingServicesPage';
import { BookkeepingServicesPage } from './pages/BookkeepingServicesPage';
import { InternalAuditingPage } from './pages/InternalAuditingPage';
import { ExternalAuditingPage } from './pages/ExternalAuditingPage';
import { StatutoryAuditingPage } from './pages/StatutoryAuditingPage';
import { VATAuditingPage } from './pages/VATAuditingPage';
import { CorporateTaxAuditingPage } from './pages/CorporateTaxAuditingPage';
import { ForensicAuditingPage } from './pages/ForensicAuditingPage';
import { CompanyRegistrationPage } from './pages/CompanyRegistrationPage';
import { TrademarkRegistrationPage } from './pages/TrademarkRegistrationPage';
import { BusinessBankAccountPage } from './pages/BusinessBankAccountPage';
import { PROServicesPage } from './pages/PROServicesPage';
import { GoldenVisaPage } from './pages/GoldenVisaPage';
import { CompanyReconstructionPage } from './pages/CompanyReconstructionPage';
import { TaxConsultancyPage } from './pages/TaxConsultancyPage';
import { AccountingAuditingPage } from './pages/AccountingAuditingPage';
import { CorporateServicesPage } from './pages/CorporateServicesPage';
import { Contact } from './components/Contact';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { initGA, trackPageView } from "./analytics";
import CookieConsent, { resetCookieConsentValue } from "react-cookie-consent";
import SplashScreen from "./components/SplashScreen";
//import { CookiePolicy } from './pages/CookiePolicy';

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    if (cookiesAccepted) {
      initGA();
      trackPageView(window.location.pathname);
    }
  }, [cookiesAccepted]);

  useEffect(() => {
    window.addEventListener("cookieSettings", () => {
      resetCookieConsentValue(); // Re-triggers banner
    });
  }, []);


  return (
    <>
      <SplashScreen />
      <Topbar />
      <Header />
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        enableDeclineButton
        declineButtonText="Decline"
        cookieName="sage-cookie-consent"
        style={{ background: "#384031" }}
        buttonStyle={{
          color: "#ffffff",
          background: "#BCB88A",
          borderRadius: "6px",
        }}
        declineButtonStyle={{
          background: "transparent",
          color: "#ffffff",
          border: "1px solid #ffffff",
          borderRadius: "6px",
        }}
        expires={150}
        onAccept={() => setCookiesAccepted(true)}
        onDecline={() => setCookiesAccepted(false)}
      >
        We use cookies to enhance your experience and analyze site usage.{" "}
        <a href="/privacy-policy" className="text-white text-decoration-underline">Privacy Policy</a>
      </CookieConsent>
    </>
  );
}

export default App;
