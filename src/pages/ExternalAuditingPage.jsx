// src/pages/ExternalAuditingPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const ExternalAuditingPage = () => {
  return (
    <>
      <ProductHero title="External Auditing" image="external-audit.jpg" breadcrumb={{ label: "Accounting & Auditing", href: "/accounting" }}/>

      <ProductDescription text={`An external audit provides independent assurance that your financial statements are true, fair, and in compliance with UAE laws. Sage Tax Consultancy partners with approved audit firms to deliver licensed, legally recognized audit reports required for mainland license renewals, bank loans, and shareholder assurance.

We work closely with your team to ensure a smooth and transparent audit process—reducing errors and enhancing stakeholder confidence.`} />

      <ProductFeatures
        items={[
          "FTA-compliant audited financial statements",
          "Audit reports accepted by UAE free zones & banks",
          "Coordination with licensed audit partners",
          "Risk-based audit approach with minimal disruption",
          "Support for audit readiness and data gathering"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Pre-Audit Review",
            description: "We check your books, VAT filings, and supporting records to identify gaps before the official audit.",
          },
          {
            title: "Engagement & Planning",
            description: "An audit plan is defined with scope, timelines, and required documentation.",
          },
          {
            title: "Field Audit",
            description: "External auditors examine financials, supporting documents, and system logs.",
          },
          {
            title: "Report Preparation",
            description: "Audit report issued with qualified/unqualified opinion and supporting notes.",
          },
          {
            title: "Submission & Advisory",
            description: "Help submitting audit to regulators or authorities and interpreting findings.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Trade License & MOA",
          "Trial balance and general ledger",
          "Bank statements & vouchers",
          "Sales & purchase invoices",
          "Inventory, payroll, and expense records"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Is an external audit mandatory?", "Yes, for most UAE mainland and free zone companies. It’s required for license renewal, tax audits, and banking relationships."],
          ["Who conducts the external audit?", "We coordinate with our approved network of licensed auditors, while handling all prep and logistics."],
          ["Can you help fix my books before audit?", "Yes. We offer pre-audit cleanup and review services to ensure a smooth audit process."]
        ]}
      />

      <Contact />
    </>
  );
};
