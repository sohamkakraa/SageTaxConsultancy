// src/pages/GoldenVisaPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const GoldenVisaPage = () => {
  return (
    <>
      <ProductHero title="UAE Golden Visa" image="golden-visa.jpg" breadcrumb={{ label: "Corporate Services", href: "/corporate-services" }}/>

      <ProductDescription text={`The UAE Golden Visa offers long-term residency (5–10 years) to investors, entrepreneurs, exceptional talents, scientists, and outstanding students. It provides security, flexibility, and independence to live, work, and sponsor family members in the UAE without needing a local employer or sponsor.

Sage Tax Consultancy helps you assess eligibility, prepare documentation, and submit your Golden Visa application with complete end-to-end support.`} />

      <ProductFeatures
        items={[
          "Eligibility assessment for all Golden Visa categories",
          "Investor, entrepreneur, and specialist applications",
          "Document collection & formatting",
          "Online submission through ICP or GDRFA portals",
          "Family sponsorship and status change services"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Eligibility Review",
            description: "We assess if you qualify under any Golden Visa category (investment, employment, academic, etc.).",
          },
          {
            title: "Document Collection",
            description: "We gather Emirates ID, visa, salary, degrees, certificates, and any specialized awards.",
          },
          {
            title: "Application Submission",
            description: "Submit the visa request through official ICP or GDRFA channels with complete documentation.",
          },
          {
            title: "Approval & Biometrics",
            description: "Coordinate medical testing, Emirates ID, and biometric appointments as required.",
          },
          {
            title: "Visa Issuance",
            description: "Golden Visa is issued with long-term residency (5–10 years) and sponsor-free status.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Valid passport and existing visa",
          "Emirates ID (if applicable)",
          "Salary certificate or investment proof",
          "Academic degrees (attested)",
          "Medical fitness and insurance (upon approval)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["What is the duration of a UAE Golden Visa?", "Either 5 or 10 years depending on category (e.g. investor vs. talent)."],
          ["Can I sponsor my family?", "Yes, Golden Visa holders can sponsor spouse, children, and domestic workers."],
          ["Do I need a company to apply?", "No. The Golden Visa grants independent residency without needing a local sponsor or employer."]
        ]}
      />

      <Contact />
    </>
  );
};
