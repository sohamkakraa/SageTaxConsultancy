// src/pages/TaxConsultancyPage.jsx
import React from "react";
import ProductHero from "../components/ProductHero";
import { Link } from "react-router-dom";

export const TaxConsultancyPage = () => {
  const services = [
    {
      title: "Value Added Tax (VAT)",
      description:
        "Registration, return filing, disclosure, and audit prep for UAE VAT compliance.",
      image: "vat.jpg",
      link: "/vat",
    },
    {
      title: "Corporate Tax",
      description:
        "9% CT filing, deduction planning, registration, and return support under UAE law.",
      image: "corporate-tax.jpg",
      link: "/corporate-tax",
    },
    {
      title: "Excise Tax",
      description:
        "FTA registration, monthly excise filings, and audit readiness for taxable goods.",
      image: "excise-tax.jpg",
      link: "/excise-tax",
    },
  ];

  return (
    <>
      <ProductHero title="Tax Consultancy" image="tax.jpg" />
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
