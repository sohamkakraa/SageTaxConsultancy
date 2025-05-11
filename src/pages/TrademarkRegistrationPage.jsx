// src/pages/TrademarkRegistrationPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const TrademarkRegistrationPage = () => {
  return (
    <>
      <ProductHero title="Trademark Registration" image="trademark.jpg" breadcrumb={{ label: "Corporate Services", href: "/corporate-services" }}/>

      <ProductDescription text={`Protecting your brand is essential in today’s competitive market. A registered trademark gives you exclusive legal rights to your name, logo, slogan, or symbol across the UAE and GCC region.

Sage Tax Consultancy helps startups, SMEs, and corporates register their trademarks with the UAE Ministry of Economy—ensuring your intellectual property is secured, searchable, and defensible in court.`} />

      <ProductFeatures
        items={[
          "Trademark search and conflict screening",
          "Preparation & filing with Ministry of Economy",
          "Representation during trademark publication",
          "Objection handling & legal advisory",
          "Renewal and cross-border registration support"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Trademark Search",
            description: "We conduct a clearance check to verify availability and conflicts within UAE’s registry.",
          },
          {
            title: "Application Preparation",
            description: "Draft and submit trademark application along with visual representation and details.",
          },
          {
            title: "MOE Review & Publication",
            description: "The Ministry of Economy reviews and publishes your trademark in the UAE Gazette.",
          },
          {
            title: "Opposition Period",
            description: "We monitor the 30-day window for objections and respond where needed.",
          },
          {
            title: "Certificate Issuance",
            description: "You receive a 10-year registration certificate with protection under UAE IP law.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Trademark logo/design (in high resolution)",
          "Passport/Emirates ID of applicant",
          "Trade license (if registering under a company)",
          "Power of attorney (if applicable)",
          "List of goods/services covered by the trademark"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["What can I register as a trademark?", "Names, logos, slogans, designs, product shapes, or symbols used in business."],
          ["How long does UAE trademark protection last?", "10 years from the date of filing, renewable indefinitely."],
          ["Can I register a trademark if I don’t have a UAE company?", "Yes, individuals and foreign entities can register through a UAE agent."]
        ]}
      />

      <Contact />
    </>
  );
};
