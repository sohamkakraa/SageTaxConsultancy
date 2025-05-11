// src/pages/BookkeepingServicesPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const BookkeepingServicesPage = () => {
  return (
    <>
      <ProductHero title="Bookkeeping Services" image="bookkeeping.jpg"  breadcrumb={{ label: "Accounting & Auditing", href: "/accounting" }}/>

      <ProductDescription text={`Clean books are the backbone of financial clarity, tax compliance, and audit readiness. Sage Tax Consultancy offers accurate and timely bookkeeping services tailored to your business needs, so you can focus on growth while we maintain your ledgers.

We handle all transaction recording, bank reconciliations, and VAT tagging using cloud-based systems that keep you connected and in control.`} />

      <ProductFeatures
        items={[
          "Daily, weekly, or monthly transaction posting",
          "Chart of accounts and ledger setup",
          "VAT-compliant invoice handling & tagging",
          "Accounts receivable & payable tracking",
          "Bank & petty cash reconciliations"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Initial Review",
            description: "We assess your business structure, volume of transactions, and bookkeeping history.",
          },
          {
            title: "System Setup",
            description: "Configure accounting software and ledgers aligned with FTA and audit standards.",
          },
          {
            title: "Data Entry",
            description: "Enter daily transactions including sales, purchases, expenses, and journal entries.",
          },
          {
            title: "Reconciliations",
            description: "Reconcile bank, cash, vendor and customer balances monthly or quarterly.",
          },
          {
            title: "Reporting & Review",
            description: "Deliver basic ledgers, trial balances, and VAT reports for your accountant or auditor.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Sales & purchase invoices",
          "Bank and credit card statements",
          "Petty cash logs (if any)",
          "Payroll records",
          "Access to your accounting software (if existing)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["How is bookkeeping different from accounting?", "Bookkeeping focuses on recording transactions; accounting interprets them for reporting and compliance."],
          ["Do you use specific software?", "Yes, we support Zoho Books, QuickBooks, Xero, and Tally ERP."],
          ["How often will you update my books?", "We offer daily, weekly, or monthly bookkeeping depending on your volume and preference."]
        ]}
      />

      <Contact />
    </>
  );
};
