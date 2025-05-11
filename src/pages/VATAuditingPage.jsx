// src/pages/VATAuditingPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const VATAuditingPage = () => {
  return (
    <>
      <ProductHero title="VAT Auditing" image="vat-audit.jpg" breadcrumb={{ label: "Accounting & Auditing", href: "/accounting" }}/>

      <ProductDescription text={`A VAT audit ensures your business complies with UAE tax regulations by evaluating how VAT is calculated, recorded, and reported. The Federal Tax Authority (FTA) may audit your business at any time, and preparation is critical to avoid penalties or reputational risk.

Sage Tax Consultancy performs proactive VAT audits to identify gaps, ensure your ledgers align with VAT returns, and help you respond confidently to any FTA inspection.`} />

      <ProductFeatures
        items={[
          "Independent VAT health check & audit reports",
          "Cross-verification of ledgers with VAT returns",
          "Review of input/output VAT classification",
          "FTA audit response documentation & liaison",
          "Advisory on voluntary disclosures"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "VAT Ledger Review",
            description: "We audit your VAT input/output ledgers against invoices and your accounting software.",
          },
          {
            title: "Return Verification",
            description: "Compare VAT filings with actual books, invoices, and VAT payment proofs.",
          },
          {
            title: "Risk Assessment",
            description: "Highlight misclassifications, missed input claims, or exposure to penalties.",
          },
          {
            title: "Audit Report",
            description: "Deliver an internal audit report with findings and recommendations.",
          },
          {
            title: "FTA Representation",
            description: "If needed, we liaise with the FTA and assist with audit queries and responses.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "VAT return filings (last 4–8 quarters)",
          "Sales & purchase invoices",
          "Trial balance & VAT ledger exports",
          "FTA TRN Certificate",
          "Audit trail or accounting software access"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Is a VAT audit mandatory?", "Not always, but FTA can initiate one anytime. A voluntary audit helps avoid unexpected penalties."],
          ["Can Sage represent us during an FTA VAT audit?", "Yes. We offer full representation and technical support."],
          ["What’s the benefit of a voluntary VAT audit?", "It identifies compliance risks, missed refunds, and documentation gaps before the FTA does."]
        ]}
      />

      <Contact />
    </>
  );
};
