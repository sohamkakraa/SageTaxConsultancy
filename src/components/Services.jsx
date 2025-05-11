// src/components/Services.jsx
import React from "react";
import { Link } from "react-router-dom";
import taxImg from "../assets/tax-consult.png";
import accountingImg from "../assets/services-2.jpg";
import corporateImg from "../assets/services-3.jpg";

export const Services = () => (
  <section id="services" className="services section">
    <div className="container section-title" data-aos="fade-up">
      <h2 style={{ color: "var(--heading-color)" }}>Our Services</h2>
    </div>

    <div className="container" data-aos="fade-up" data-aos-delay="100">
      <div className="row g-4">
        {[ 
          {
            title: "Tax Consultancy",
            description: `We provide end-to-end guidance across VAT and Corporate Tax in the UAE, helping you register, file and stay compliant with the Federal Tax Authority’s latest rules. Whether you’re preparing for your first filing or seeking audit representation, our expert advisors simplify regulation, optimise liabilities and protect your business from penalties.`,
            link: "/tax",
            image: taxImg,
          },
          {
            title: "Accounting & Auditing",
            description: `Our accounting professionals deliver timely, IFRS-compliant financial statements, management reports and clean books—giving you the clarity to make smart decisions. Our auditors go beyond ticking boxes, offering risk-based internal audits, statutory audits for licensing, and deep forensic reviews when transparency matters most.`,
            link: "/accounting",
            image: accountingImg,
          },
          {
            title: "Corporate Services",
            description: `We streamline company setup and growth in the UAE—handling trade name approvals, licensing, PRO tasks, bank account openings, and trademark registrations. Whether you're launching a startup or restructuring an enterprise, our team ensures smooth execution and regulatory alignment every step of the way.`,
            link: "/corporate-services",
            image: corporateImg,
          }
        ].map(({ title, description, link, image }, idx) => (
          <div key={idx} className="col-lg-4 d-flex align-items-stretch">
            <div className="card shadow-sm rounded-4 overflow-hidden w-100">
              <div className="position-relative">
                <img src={image} alt={title} className="img-fluid w-100" style={{ height: "250px", objectFit: "cover" }} />
              </div>
              <div className="p-4 d-flex flex-column justify-content-between h-100">
                <div>
                  <h3 className="fw-bold text-dark">{title}</h3>
                  <p className="text-dark small">{description}</p>
                </div>
                <div className="mt-3">
                  <Link to={link} className="btn btn-outline-dark rounded-pill small px-3 py-2">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
