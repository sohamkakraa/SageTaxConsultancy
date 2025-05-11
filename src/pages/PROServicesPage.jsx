// src/pages/PROServicesPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const PROServicesPage = () => {
  return (
    <>
      <ProductHero title="PRO Services" image="pro-services.jpg" breadcrumb={{ label: "Corporate Services", href: "/corporate-services" }}/>

      <ProductDescription text={`Government paperwork can be time-consuming and difficult to navigate—especially in a fast-paced business environment like the UAE. Our PRO (Public Relations Officer) services help you handle document clearing, labor approvals, visa processing, and company compliance without delays or confusion.

Sage Tax Consultancy ensures your business runs smoothly by managing all your official submissions and renewals.`} />

      <ProductFeatures
        items={[
          "Visa application & renewal (investor, employee, family)",
          "Labor card & immigration approvals",
          "Emirates ID & medical test coordination",
          "Document attestation & translation",
          "Trade license amendments & renewals"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Request & Consultation",
            description: "We assess your PRO needs—new visa, license update, document attestation, or clearance.",
          },
          {
            title: "Document Checklist",
            description: "We provide a list of required documents and formats depending on the specific request.",
          },
          {
            title: "Application Submission",
            description: "Our PROs submit documents to government portals or service centers on your behalf.",
          },
          {
            title: "Status Tracking",
            description: "We track progress, attend follow-ups, and update you in real time.",
          },
          {
            title: "Delivery or Completion",
            description: "You receive completed documents (e.g., stamped visa, attested certificate, renewed license).",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Passport copies of applicant and dependents",
          "Emirates ID and visa page (if renewing)",
          "Trade license (for corporate-related requests)",
          "Photos (white background, recent)",
          "Signed application forms (we’ll provide templates)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["What does PRO stand for?", "Public Relations Officer—it refers to licensed professionals who handle all government and visa processes."],
          ["Can you renew our trade license too?", "Yes, we manage renewals, amendments, and activity changes across UAE authorities."],
          ["Do I need to visit the authorities?", "Not usually. We handle all submissions and collections unless a biometric or medical is required."]
        ]}
      />

      <Contact />
    </>
  );
};
