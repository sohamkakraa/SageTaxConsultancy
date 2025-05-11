// src/pages/ForensicAuditingPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const ForensicAuditingPage = () => {
  return (
    <>
      <ProductHero title="Forensic Auditing" image="forensic-audit.jpg" breadcrumb={{ label: "Accounting & Auditing", href: "/accounting" }}/>

      <ProductDescription text={`Forensic audits are conducted when fraud, misconduct, or financial irregularities are suspected. They go beyond standard audits to uncover hidden transactions, asset misuse, or data manipulation.

At Sage Tax Consultancy, we conduct discreet, evidence-driven forensic audits for companies, law firms, and government entities—helping you investigate, quantify loss, and pursue legal remedies if needed.`} />

      <ProductFeatures
        items={[
          "Fraud detection and prevention audits",
          "Tracing of unauthorized or suspicious transactions",
          "Data analysis and digital forensic review",
          "Evidence collection for court or internal action",
          "Confidential and independent investigation process"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Objective Scoping",
            description: "Define the nature of suspected fraud or irregularity and target scope of audit.",
          },
          {
            title: "Data Gathering",
            description: "Collect access logs, emails, ledgers, contracts, and supporting documents.",
          },
          {
            title: "Investigation",
            description: "Apply forensic techniques to trace anomalies, test internal controls, and isolate culprits.",
          },
          {
            title: "Findings & Documentation",
            description: "Present a defensible report with timelines, involved parties, financial impact, and evidence.",
          },
          {
            title: "Remediation Support",
            description: "Help restructure controls, recover assets, or prepare for legal escalation if needed.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Financial records (invoices, ledgers, bank statements)",
          "User access logs & digital trails",
          "Internal policies & control manuals",
          "Email and communication records (if authorized)",
          "Incident reports or whistleblower statements"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["When do I need a forensic audit?", "If you suspect fraud, embezzlement, bribery, or data manipulation—especially during partner disputes or exits."],
          ["Is the forensic report legally usable?", "Yes. We structure it with documented evidence that can be used in court or arbitration."],
          ["Will my staff know a forensic audit is underway?", "We tailor the approach—covert or announced—based on your instructions."]
        ]}
      />

      <Contact />
    </>
  );
};
