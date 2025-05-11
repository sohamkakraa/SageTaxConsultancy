// src/pages/StatutoryAuditingPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const StatutoryAuditingPage = () => {
  return (
    <>
      <ProductHero title="Statutory Auditing" image="statutory-audit.jpg" breadcrumb={{ label: "Accounting & Auditing", href: "/accounting" }}/>

      <ProductDescription text={`Statutory audits are mandated by law to ensure that a company’s financial records are accurate, transparent, and in full compliance with UAE regulations. Whether you're renewing a trade license or preparing for regulatory review, a statutory audit from an FTA-approved partner is a critical legal requirement.

Sage Tax Consultancy works with licensed audit firms to deliver compliant statutory audits—on time and without disrupting your operations.`} />

      <ProductFeatures
        items={[
          "Legally recognized audit reports for mainland & free zone entities",
          "Audit planning, fieldwork, and report delivery",
          "Full financial review and control testing",
          "Coordination with licensed auditors",
          "Compliance with UAE Commercial Companies Law & VAT obligations"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Audit Requirement Analysis",
            description: "We verify if your business type, jurisdiction, or turnover triggers audit obligations.",
          },
          {
            title: "Engagement with Licensed Auditor",
            description: "We connect you with a qualified statutory auditor and align on scope and timeline.",
          },
          {
            title: "Pre-Audit Review",
            description: "We perform a gap analysis of your books, VAT records, and financial statements.",
          },
          {
            title: "Field Audit",
            description: "Auditors review financials, ledgers, invoices, and regulatory filings.",
          },
          {
            title: "Statutory Report Issuance",
            description: "Audited financial report issued and submitted for license renewal or authority filing.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Trade License & MOA",
          "Previous year’s financial statements",
          "Trial balance & general ledger",
          "Bank, sales & purchase records",
          "Tax registration (VAT/CT) and filings"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Who needs a statutory audit in the UAE?", "Mainland and most free zone companies must submit audited financials annually."],
          ["Is Sage an audit firm?", "We partner with licensed audit firms and handle all communication, prep, and logistics on your behalf."],
          ["Will this audit be accepted for license renewal?", "Yes. Our audit partners are recognized across all major free zones and mainland DED offices."]
        ]}
      />

      <Contact />
    </>
  );
};
