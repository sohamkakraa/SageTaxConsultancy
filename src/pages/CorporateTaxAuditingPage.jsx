// src/pages/CorporateTaxAuditingPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const CorporateTaxAuditingPage = () => {
  return (
    <>
      <ProductHero title="Corporate Tax Auditing" image="corporate-tax-audit.jpg"  breadcrumb={{ label: "Accounting & Auditing", href: "/accounting" }}/>

      <ProductDescription text={`As Corporate Tax takes effect in the UAE, businesses must ensure that their financials, tax calculations, and return filings are accurate and compliant. A corporate tax audit validates whether the 9% tax has been correctly assessed and reported.

Sage Tax Consultancy performs independent corporate tax audits to identify discrepancies, strengthen your compliance posture, and prepare for FTA scrutiny.`} />

      <ProductFeatures
        items={[
          "Independent review of CT computations & returns",
          "Verification of deductible vs. non-deductible expenses",
          "Tax liability reconciliation with financial statements",
          "FTA representation and audit response preparation",
          "Corrective advisory on structuring and disclosures"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "CT Ledger Review",
            description: "Analyze your tax-adjusted P&L and general ledger against CT return data.",
          },
          {
            title: "Return Reconciliation",
            description: "Match return entries with supporting trial balances, adjustments, and disclosures.",
          },
          {
            title: "Risk Identification",
            description: "Highlight underreported income, disallowed expenses, or timing mismatches.",
          },
          {
            title: "CT Audit Report",
            description: "Summarize findings, exposures, and recommendations for voluntary corrections if needed.",
          },
          {
            title: "FTA Liaison",
            description: "Support during FTA audits with clarifications, reconciliations, and follow-up submissions.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Corporate Tax return & FTA login access",
          "Audited or management financial statements",
          "Chart of accounts & general ledger",
          "Depreciation schedules & tax adjustments",
          "Board resolutions or tax grouping elections (if applicable)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["What triggers a corporate tax audit?", "Discrepancies in returns, missed deadlines, or risk-based flags from FTA can lead to audits."],
          ["Can Sage represent me during an audit?", "Yes. We assist with all communication, reconciliations, and technical clarifications."],
          ["Do you offer preventive CT audits?", "Yes. We recommend performing one annually before filing to avoid FTA challenges."]
        ]}
      />

      <Contact />
    </>
  );
};
