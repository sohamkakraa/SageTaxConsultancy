// src/pages/AccountingAuditingPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import { Link } from "react-router-dom";

export const AccountingAuditingPage = () => {
  const services = [
    {
      title: "Accounting Services",
      description:
        "IFRS-compliant financial reporting, management accounts, and monthly closings.",
      image: "accounting.jpg",
      link: "/accounting-services",
    },
    {
      title: "Bookkeeping Services",
      description:
        "Daily, weekly, or monthly transaction posting, VAT tagging, and ledger maintenance.",
      image: "bookkeeping.jpg",
      link: "/bookkeeping-services",
    },
    {
      title: "Internal Auditing",
      description:
        "Process audits, risk assessments, and control reviews to improve operational integrity.",
      image: "internal-audit.jpg",
      link: "/internal-auditing",
    },
    {
      title: "External Auditing",
      description:
        "Independent audits for compliance, bank submissions, and license renewals.",
      image: "external-audit.jpg",
      link: "/external-auditing",
    },
    {
      title: "Statutory Auditing",
      description:
        "Legal audits recognized by DED and free zones, required for trade license renewals.",
      image: "statutory-audit.jpg",
      link: "/statutory-auditing",
    },
    {
      title: "VAT Auditing",
      description:
        "Review of VAT records and returns to detect compliance gaps and prepare for FTA reviews.",
      image: "vat-audit.jpg",
      link: "/vat-auditing",
    },
    {
      title: "Corporate Tax Auditing",
      description:
        "Verification of CT returns, deductions, and profit calculations to ensure compliance.",
      image: "corporate-tax-audit.jpg",
      link: "/corporate-tax-auditing",
    },
    {
      title: "Forensic Auditing",
      description:
        "Investigative audits to detect fraud, asset misuse, and financial misconduct.",
      image: "forensic-audit.jpg",
      link: "/forensic-auditing",
    },
  ];

  return (
    <>
      <ProductHero title="Accounting & Auditing" image="accounting-auditing.jpg" />
      <div className="container py-5">
        <div className="row g-4">
          {services.map(({ title, description, image, link }, i) => (
            <div key={i} className="col-md-4">
              <div className="card shadow-sm h-100 border-0 rounded-4">
                <img
                  src={`/assets/${image}`}
                  className="card-img-top rounded-top-4"
                  alt={title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{title}</h5>
                  <p className="card-text">{description}</p>
                  <Link to={link} className="btn btn-outline-dark mt-auto rounded-pill">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
