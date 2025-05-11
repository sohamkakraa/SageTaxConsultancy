// src/components/About.jsx
import React from "react";
import aboutImage from "../assets/about.png";

export const About = () => (
  <section id="about" className="about section py-5">
    <div className="container">
      <div className="row gy-4">
        {/* Left Image */}
        <div className="col-lg-5" data-aos="fade-up" data-aos-delay="200">
          <img src={aboutImage} className="img-fluid rounded-4" alt="About Sage Tax Consultancy" />
        </div>

        {/* Right Content */}
        <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
          <h3>About Us</h3>
          <p>
            <strong>Sage Tax Consultancy</strong> is an independent firm of chartered tax advisors, auditors and corporate-service specialists.
          </p>
          <ul className="list-unstyled">
            <li className="mb-3">
              <i className="bi bi-diagram-3 me-2"></i>
              <strong>Our Mission:</strong> Turn complex regulation into strategic advantage—so UAE businesses can grow with confidence.
            </li>
            <li className="mb-3">
              <i className="bi bi-fullscreen-exit me-2"></i>
              <strong>Our Vision:</strong> To be the most trusted name in Gulf tax advisory, recognised for clarity of thought, relentless client focus and measurable impact.
            </li>
          </ul>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="row gy-4 mt-5" data-aos="fade-up" data-aos-delay="300">
        <div className="col-12">
          <h5><i className="bi bi-broadcast me-2"></i>Why Choose Us?</h5>
          <div className="row gy-3 mt-3">
            {[
              ["FTA-Approved Experts", "Listed with the UAE Federal Tax Authority for tax-agent and audit services."],
              ["Sector-Specialised Teams", "Dedicated desks for e-commerce, real estate, hospitality, energy and professional services."],
              ["Technology-Driven", "Cloud bookkeeping, automated VAT workflows and live reporting dashboards keep you informed 24/7."],
              ["Transparent Fees", "Fixed-price engagements and upfront scopes—no surprise invoices."],
              ["Boutique Agility", "Direct partner access, rapid response times and solutions tailored to your business DNA."]
            ].map(([title, text], idx) => (
              <div className="col-lg-4" key={idx}>
                <p><strong>{title}:</strong> {text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
