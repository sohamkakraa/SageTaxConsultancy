// src/pages/CompanyReconstructionPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const CompanyReconstructionPage = () => {
  return (
    <>
      <ProductHero title="Company Reconstruction" image="company-reconstruction.jpg" breadcrumb={{ label: "Corporate Services", href: "/corporate-services" }}/>

      <ProductDescription text={`Business needs evolve—and sometimes, that means reorganizing your corporate structure. Whether you’re merging entities, spinning off divisions, changing ownership, or restructuring finances, Sage Tax Consultancy provides expert support to legally and efficiently reconstruct your UAE company.

We ensure compliance with all local regulations while protecting your assets, tax positions, and operational continuity.`} />

      <ProductFeatures
        items={[
          "Business mergers, demergers & restructures",
          "Partner/ownership changes with legal amendments",
          "Capital restructuring and share reallocation",
          "Trade license reconfiguration & activity updates",
          "Cross-license migrations (free zone ↔ mainland)"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Needs Assessment",
            description: "Understand your business goal—merger, spin-off, equity change, etc.",
          },
          {
            title: "Structural Design",
            description: "Draft the optimal legal and operational structure post-reconstruction.",
          },
          {
            title: "Document Amendment",
            description: "Update MOA, share registers, and licensing documents.",
          },
          {
            title: "Authority Approvals",
            description: "Coordinate with DED, free zones, or courts for approvals and notary requirements.",
          },
          {
            title: "Implementation & Handover",
            description: "Execute restructuring with minimal disruption and deliver updated licenses and registrations.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Existing trade license and MOA",
          "Ownership/shareholding agreements",
          "Board/shareholder resolutions",
          "New structure plan (chart/description)",
          "Audited financials (for valuation, if needed)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["What is company reconstruction?", "It refers to legally restructuring a company’s ownership, structure, or assets while maintaining continuity."],
          ["Is DED approval required for restructuring?", "Yes. All mainland reconstructions need DED and notary approvals. Free zones have their own processes."],
          ["Can I migrate from free zone to mainland?", "Yes—with a proper plan and support, we can help you shift and maintain continuity."]
        ]}
      />

      <Contact />
    </>
  );
};
