// src/components/Footer.jsx
import React from "react";
import logo from "../assets/fullLogoLg.png";

export const Footer = () => (
  <footer id="footer" className="footer bg-default pt-5">
    <div className="container">
      <div className="row gy-4 align-items-start">
        <div className="col-lg-4 col-md-6">
          <a href="#" className="logo d-inline-flex align-items-center mb-3">
            <img src={logo} alt="Sage Logo" height="50" />
          </a>
          <p className="mb-2">Dubai, U.A.E</p>
          <p className="mb-2"><strong>Phone:</strong> <a href="tel:+971585704140">+971 58 570 4140</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@sageconsultancy.ae">info@sageconsultancy.ae</a></p>
          <div className="social-links d-flex mt-3 gap-3">
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-whatsapp"></i></a>
            <a href="#"><i className="bi bi-linkedin"></i></a>
            <button
              onClick={() => {
                const event = new Event("cookieSettings");
                window.dispatchEvent(event);
              }}
              className="btn btn-sm btn-dark rounded-pill"
            >
              Cookie Settings
            </button>
          </div>
        </div>

        <div className="col-lg-2 col-md-3">
          <h5>Useful Links</h5>
          <ul className="list-unstyled small">
            <li><a href="#">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="/terms-and-conditions">Terms of Service</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="col-lg-2 col-md-3">
          <h5><a href="">Tax Consultancy</a></h5>
          <ul className="list-unstyled small">
            <li><a href="/vat">Value Added Tax (VAT)</a></li>
            <li><a href="/corporate-tax">Corporate Tax</a></li>
            <li><a href="/excise-tax">Excise Tax</a></li>
          </ul>
        </div>

        <div className="col-lg-2 col-md-3">
          <h5><a href="/accounting">Accounting & Auditing</a></h5>
          <ul className="list-unstyled small">
            <li><a href="/accounting-services">Accounting</a></li>
            <li><a href="/bookkeeping-services">Bookkeeping</a></li>
            <li><a href="/internal-auditing">Internal Auditing</a></li>
            <li><a href="/external-auditing">External Auditing</a></li>
            <li><a href="/forensic-auditing">Forensic Auditing</a></li>
            <li><a href="/statutory-auditing">Statutory Auditing</a></li>
            <li><a href="/vat-auditing">VAT Auditing</a></li>
            <li><a href="/corporate-tax-auditing">Corporate Tax Auditing</a></li>
          </ul>
        </div>

        <div className="col-lg-2 col-md-3">
          <h5><a href="/corporate-services">Corporate Services</a></h5>
          <ul className="list-unstyled small">
            <li><a href="/company-registration">Company Registration</a></li>
            <li><a href="/trademark-registration">Trademark Registration</a></li>
            <li><a href="/business-bank-account">Business Bank Account</a></li>
            <li><a href="/pro-services">PRO Services</a></li>
            <li><a href="/golden-visa">Golden Visa</a></li>
            <li><a href="/company-reconstruction">Company Reconstruction</a></li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />
      <div className="text-white text-center small" style={{padding: "30px 0"}}>
        © {new Date().getFullYear()} <strong>Sage Tax Consultancy</strong>. All Rights Reserved.
      </div>
    </div>
  </footer>
);