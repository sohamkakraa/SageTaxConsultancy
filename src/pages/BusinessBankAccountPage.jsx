// src/pages/BusinessBankAccountPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import ProductFlow from "../components/ProductFlow";
import ProductDocuments from "../components/ProductDocuments";
import ProductFAQ from "../components/ProductFAQ";
import { Contact } from "../components/Contact";

export const BusinessBankAccountPage = () => {
  return (
    <>
      <ProductHero title="Business Bank Account" image="bank-account.jpg" breadcrumb={{ label: "Corporate Services", href: "/corporate-services" }}/>

      <ProductDescription text={`Opening a business bank account in the UAE can be a complex process due to strict compliance requirements. At Sage Tax Consultancy, we simplify it—connecting you with the right bank, assisting with documentation, and ensuring your business setup meets KYC and compliance expectations.

We work with leading local and international banks to help mainland, free zone, and offshore companies get operational quickly.`} />

      <ProductFeatures
        items={[
          "Bank selection based on your activity & nationality",
          "Complete documentation assistance",
          "Liaison with relationship managers & compliance officers",
          "Assistance with online banking & cheque book setup",
          "Support for low-risk & high-risk activity types"
        ]}
      />

      <ProductFlow
        steps={[
          {
            title: "Eligibility Review",
            description: "We assess your company structure, trade license, and shareholders for compliance fit.",
          },
          {
            title: "Bank Shortlisting",
            description: "Recommend banks that match your activity, nationality, and required features.",
          },
          {
            title: "Document Preparation",
            description: "Assist in compiling and formatting all documents to meet due diligence standards.",
          },
          {
            title: "Application & Appointment",
            description: "Schedule your bank meeting or remote onboarding session and submit paperwork.",
          },
          {
            title: "Account Activation",
            description: "Your account is opened with online access, cheque book (if applicable), and SWIFT setup.",
          },
        ]}
      />

      <ProductDocuments
        documents={[
          "Trade license & MOA",
          "Passport & Emirates ID of all shareholders",
          "Proof of address (e.g. utility bill or lease)",
          "Company stamp (for some banks)",
          "Business plan or invoices (for activity verification)"
        ]}
      />

      <ProductFAQ
        faqs={[
          ["Which UAE banks do you work with?", "We work with Emirates NBD, Mashreq, ADCB, RAKBank, FAB, and selected international banks."],
          ["Can I open an account remotely?", "Some banks offer remote onboarding—subject to business activity and nationality."],
          ["How long does it take?", "Most accounts open within 5–10 working days, subject to compliance review."]
        ]}
      />

      <Contact />
    </>
  );
};
