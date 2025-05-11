// src/pages/InternalAuditingPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const InternalAuditingPage = () => {
  return (
    <>
      <ProductHero title="Internal Auditing" image="internal-audit.jpg" breadcrumb={{ label: "Accounting & Auditing", href: "/accounting" }}/>

      <ProductDescription text={`Internal audits are essential for identifying risks, improving controls, and ensuring governance across your organization. At Sage Tax Consultancy, our internal audit services are tailored to your business goals—whether you're preparing for external audits, enhancing operational efficiency, or strengthening compliance.

We assess financial controls, processes, and reporting accuracy to uncover inefficiencies and vulnerabilities before they become costly problems.`} />

      <ProductFeatures
        items={[
          "Custom internal audit plans based on your industry & risk profile",
          "Review of financial processes, controls, and documentation",
          "Assessment of policy adherence and governance gaps",
          "Actionable reports with recommendations",
          "Follow-up audits to ensure closure of findings"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Audit Planning",
            description: "We identify objectives, departments, and key risk areas for the internal audit scope.",
          },
          {
            title: "Fieldwork & Review",
            description: "We perform walkthroughs, examine controls, test samples, and review policies.",
          },
          {
            title: "Findings Documentation",
            description: "Prepare a detailed report highlighting risks, inefficiencies, and control gaps.",
          },
          {
            title: "Recommendation Delivery",
            description: "Share prioritized corrective actions with management and timelines for resolution.",
          },
          {
            title: "Follow-up Audit",
            description: "Verify implementation and effectiveness of changes made after the initial audit.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Organizational chart & internal policies",
          "Financial statements & ledgers",
          "Previous audit reports (if any)",
          "Access to key personnel during fieldwork",
          "Risk registers (if maintained)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Why do I need an internal audit if I already do statutory audits?", "Internal audits help improve operations, uncover risks, and enhance internal controls—statutory audits only ensure compliance."],
          ["How often should we conduct internal audits?", "Ideally quarterly or semi-annually depending on risk exposure, growth, and regulatory environment."],
          ["Will it disrupt daily operations?", "No. Our team works discreetly with your staff and schedules around peak times to avoid disruptions."]
        ]}
      />

      <Contact />
    </>
  );
};
