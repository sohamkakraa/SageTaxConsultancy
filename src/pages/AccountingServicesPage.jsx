// src/pages/AccountingServicesPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const AccountingServicesPage = () => {
  return (
    <>
      <ProductHero title="Accounting Services" image="accounting.jpg" breadcrumb={{ label: "Accounting & Auditing", href: "/accounting" }}/>

      <ProductDescription text={`Accurate, timely accounting is the foundation of informed decision-making and long-term growth. At Sage Tax Consultancy, we provide end-to-end bookkeeping, financial statement preparation, and reporting services to ensure your business stays compliant and audit-ready.

Our team ensures that your books reflect the true financial health of your business while aligning with UAE Corporate Tax, VAT, and IFRS standards.`} />

      <ProductFeatures
        items={[
          "IFRS-compliant financial statements",
          "Chart of accounts setup & maintenance",
          "Monthly bookkeeping & reconciliations",
          "Profit & loss, balance sheet, cash flow reports",
          "Quarterly management accounting packs"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Initial Setup",
            description: "We configure your accounting system, chart of accounts, and reporting framework.",
          },
          {
            title: "Transaction Recording",
            description: "We post sales, purchases, bank entries and journals using cloud accounting software.",
          },
          {
            title: "Reconciliations",
            description: "Monthly reconciliation of bank accounts, supplier balances and VAT ledgers.",
          },
          {
            title: "Reporting",
            description: "Deliver profit & loss, balance sheet, cash flow statements, and custom reports.",
          },
          {
            title: "Review & Advisory",
            description: "We walk you through the numbers and provide recommendations for improvement.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Company trade license",
          "Bank statements",
          "Invoices & receipts",
          "Payroll details (if any)",
          "Previous year’s financials (if applicable)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Do I need an accountant even if I’m not yet taxed?", "Yes. Good accounting is required for VAT, CT, audit readiness, and funding access."],
          ["Which accounting standards do you follow?", "We report under International Financial Reporting Standards (IFRS), as required in the UAE."],
          ["Do you use cloud accounting tools?", "Yes, we work with Zoho Books, QuickBooks, and Xero."]
        ]}
      />

      <Contact />
    </>
  );
};
