// src/pages/CompanyRegistrationPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const CompanyRegistrationPage = () => {
  return (
    <>
      <ProductHero title="Company Registration" image="company-registration.jpg" breadcrumb={{ label: "Corporate Services", href: "/corporate-services" }}/>

      <ProductDescription text={`Setting up a business in the UAE is straightforward—if done right. Whether you’re a first-time founder or expanding internationally, Sage Tax Consultancy guides you through every step of the company registration process, including trade licensing, local sponsor arrangements, and regulatory approvals.

We help you choose the right jurisdiction (mainland, free zone, or offshore) based on your industry, location, and ownership needs.`} />

      <ProductFeatures
        items={[
          "Mainland, Free Zone & Offshore company setup",
          "Trade name reservation and license issuance",
          "Local sponsor & UAE national partnerships (if required)",
          "Bank account opening & tax registration",
          "Visa processing for investors and employees"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Jurisdiction Consultation",
            description: "We help you decide between mainland, free zone, or offshore based on your goals.",
          },
          {
            title: "Name & Activity Approval",
            description: "Reserve your company name and register business activities with relevant authority.",
          },
          {
            title: "Document Drafting & Submission",
            description: "Prepare and submit incorporation documents, MOA, and ID proofs.",
          },
          {
            title: "Trade License Issuance",
            description: "Receive your official license to operate in the UAE.",
          },
          {
            title: "Bank & Visa Setup",
            description: "We help open a corporate bank account and begin visa processing if required.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Shareholder passports",
          "Visa and Emirates ID copies (if resident)",
          "Business activity plan",
          "Office lease agreement (Ejari for mainland)",
          "No Objection Certificate (if employed in UAE)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["How long does company registration take?", "Free zone setups take 3–5 days; mainland can take 5–10 days depending on documentation."],
          ["Do I need a UAE national partner?", "Only for certain mainland activities. We provide corporate nominee solutions if needed."],
          ["Can I open a company as a non-resident?", "Yes. We assist with remote setup, licensing, and bank account facilitation."]
        ]}
      />

      <Contact />
    </>
  );
};
