
// src/pages/CorporateTaxPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const CorporateTaxPage = () => {
  return (
    <>
      <ProductHero title="Corporate Tax" image="corporate-tax.jpg" breadcrumb={{ label: "Tax Consultancy", href: "/tax" }}/>


      <ProductDescription text={`Introduced in 2023, the UAE Corporate Tax framework applies a 9% tax on net profits exceeding AED 375,000. This marks a significant shift for businesses, requiring structured accounting, timely filings, and strategic tax planning.

At Sage Tax Consultancy, we help you interpret the law, optimise your financials, and remain compliant with Federal Tax Authority (FTA) requirements—from registration and calculation to filing and audit response.`} />

      <ProductFeatures
        items={[
          "Corporate Tax registration with FTA",
          "Profit eligibility analysis & exemption checks",
          "Quarterly advance tax planning & forecast reviews",
          "CT return preparation & e-filing",
          "Audit readiness and representation support"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "CT Eligibility Review",
            description: "Assess whether your profits exceed the AED 375,000 taxable threshold and determine group structuring options.",
          },
          {
            title: "FTA Registration",
            description: "We prepare and submit your CT registration based on your license, turnover, and legal form.",
          },
          {
            title: "Tax Computation",
            description: "We calculate net profits per UAE CT rules and identify deductible vs. non-deductible expenses.",
          },
          {
            title: "CT Return Filing",
            description: "Prepare and submit your annual corporate tax return to the FTA on time using their e-portal.",
          },
          {
            title: "Audit Preparedness",
            description: "Support during FTA reviews of your CT calculations, with documentation, reconciliation, and response letters.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Trade License & MOA",
          "Audited Financials",
          "Corporate bank statements",
          "Profit & Loss Statement",
          "Business activity disclosures"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Who must pay UAE Corporate Tax?", "All UAE entities with taxable profits over AED 375,000 unless exempted."],
          ["What is the CT rate?", "9% on taxable profits exceeding AED 375,000. First AED 375k is taxed at 0%."],
          ["When is my CT return due?", "Typically 9 months after your financial year-end. Extensions may apply."],
        ]}
      />

      <Contact />
    </>
  );
};
