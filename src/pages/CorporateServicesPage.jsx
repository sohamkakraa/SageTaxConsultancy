// src/pages/CorporateServicesPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import { Link } from "react-router-dom";

export const CorporateServicesPage = () => {
  const services = [
    {
      title: "Company Registration",
      description:
        "Mainland, free zone, and offshore company setup with full licensing and approvals.",
      image: "company-registration.jpg",
      link: "/company-registration",
    },
    {
      title: "Trademark Registration",
      description:
        "Protect your brand with UAE Ministry of Economy filings and renewal services.",
      image: "trademark.jpg",
      link: "/trademark-registration",
    },
    {
      title: "Business Bank Account",
      description:
        "Open UAE corporate accounts with major banks—full KYC & compliance support.",
      image: "bank-account.jpg",
      link: "/business-bank-account",
    },
    {
      title: "PRO Services",
      description:
        "Visa, license, labor card, attestation, and government clearance services for businesses.",
      image: "pro-services.jpg",
      link: "/pro-services",
    },
    {
      title: "Golden Visa",
      description:
        "Long-term UAE residency for investors, professionals, and high-potential individuals.",
      image: "golden-visa.jpg",
      link: "/golden-visa",
    },
    {
      title: "Company Reconstruction",
      description:
        "Mergers, demergers, capital changes, and ownership restructuring support.",
      image: "company-reconstruction.jpg",
      link: "/company-reconstruction",
    },
  ];

  return (
    <>
      <ProductHero title="Corporate Services" image="corporate-services.jpg" />
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
