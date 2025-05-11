// src/components/Topbar.jsx
import React from "react";

export const Topbar = () => (
  <div className="topbar d-flex align-items-center bg-dark text-light py-2 small">
    <div className="container d-flex justify-content-center justify-content-md-between">
      <div className="contact-info d-flex align-items-center gap-4">
        <i className="bi bi-envelope">
          <a href="mailto:info@sageconsultancy.ae" className="text-white text-decoration-none ms-2">
            info@sageconsultancy.ae
          </a>
        </i>
        <i className="bi bi-phone">
          <a href="tel:00971585704140" className="text-white text-decoration-none ms-2">
            +971 58 570 4140
          </a>
        </i>
      </div>
      <div className="social-links d-none d-md-flex align-items-center gap-3">
        <a href="#" className="text-white"><i className="bi bi-whatsapp"></i></a>
        <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
        <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
      </div>
    </div>
  </div>
);