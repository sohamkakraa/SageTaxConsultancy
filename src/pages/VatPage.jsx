// src/pages/VatPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const VatPage = () => {
  return (
    <>
      <ProductHero title="Value Added Tax (VAT)" image="vat.jpg" breadcrumb={{ label: "Tax Consultancy", href: "/tax" }}/>

      <ProductDescription text={`The UAE’s Value Added Tax regime requires all eligible businesses to register, file returns, and maintain transparent records in compliance with Federal Tax Authority (FTA) regulations. Whether you're crossing the AED 375,000 threshold or seeking voluntary registration, Sage Tax Consultancy ensures that your VAT obligations are handled professionally and proactively.

      Our tax agents assist with everything from registration and return filing to voluntary disclosure and audit preparation—so you stay penalty-free and audit-ready.`} />

      <ProductFeatures
        items={[
          "FTA-Approved Experts for VAT registration & filing",
          "Eligibility check & TRN registration",
          "Quarterly VAT return filing & submission",
          "Voluntary Disclosure support",
          "FTA audit preparation & representation"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Eligibility Assessment",
            description: "Check if your revenue meets mandatory (AED 375,000) or voluntary (AED 187,500) thresholds.",
          },
          {
            title: "TRN Registration",
            description: "We complete and submit your VAT application with accurate supporting documents.",
          },
          {
            title: "VAT Return Filing",
            description: "Quarterly returns filed accurately on time using FTA’s e-Services Portal.",
          },
          {
            title: "Record Keeping",
            description: "Advisory on compliant invoice formats, archiving, and transaction logs (5-year retention).",
          },
          {
            title: "VAT Audit Assistance",
            description: "On-site or remote support for FTA audits and inspection queries.",
          },
        ]}
      />


      <ProductDocuments
        documents={[
          "Valid Trade License",
          "Passport & Emirates ID",
          "Company bank IBAN",
          "Turnover proof (invoices/reports)",
          "Memorandum of Association"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Do I need to register for VAT?", "Yes, if annual taxable supplies exceed AED 375,000. Voluntary registration is available above AED 187,500."],
          ["How often do I file VAT returns?", "Quarterly, unless FTA assigns monthly."],
          ["Can I recover input VAT?", "Yes, on most business expenses excluding entertainment & personal items."]
        ]}
      />

      <Contact />
    </>
  );
};