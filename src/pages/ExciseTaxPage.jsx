// src/pages/ExciseTaxPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const ExciseTaxPage = () => {
  return (
    <>
      <ProductHero title="Excise Tax" image="excise-tax.jpg" breadcrumb={{ label: "Tax Consultancy", href: "/tax" }}/>

      <ProductDescription text={`Excise Tax in the UAE is a consumption-based tax levied on specific goods that are deemed harmful to human health or the environment—such as tobacco, soft drinks, and energy drinks. The goal is to reduce consumption and generate public revenue.

At Sage Tax Consultancy, we help manufacturers, importers, stockpilers and warehouse keepers comply with excise tax registration, filing and record-keeping obligations, while reducing risk of penalties.`} />

      <ProductFeatures
        items={[
          "Excise Tax registration & TRN issuance",
          "Product classification & taxability analysis",
          "Monthly excise return filing",
          "Stockpiler & warehouse keeper support",
          "FTA audit representation"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Product Classification",
            description: "We review your products and determine excise applicability (tobacco, soft drinks, vapes, etc.).",
          },
          {
            title: "FTA Registration",
            description: "We register your business, products, and warehouses with the FTA Excise Tax system.",
          },
          {
            title: "Excise Return Filing",
            description: "Monthly returns based on import/production volumes and applicable tax rates.",
          },
          {
            title: "Record Keeping",
            description: "Support for maintaining proper invoice records, stock logs and audit trail (5+ years).",
          },
          {
            title: "Audit Defense",
            description: "Representation during FTA reviews, re-assessments or disputes related to excise declarations.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Trade License",
          "Product specification sheets",
          "Import/export records",
          "Warehouse details (if applicable)",
          "Stock inventory documentation"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Who needs to register for Excise Tax?", "Producers, importers, stockpilers, and warehouse keepers of taxable goods (e.g., tobacco, sugary drinks, e-cigarettes)."],
          ["How much is Excise Tax?", "50% on sugary/energy drinks, 100% on tobacco and e-cigarettes."],
          ["How often do I file?", "Monthly via the FTA’s e-Services portal."]
        ]}
      />

      <Contact />
    </>
  );
};
