// src/components/ProductFeatures.jsx
import React from "react";

const ProductFeatures = ({ items }) => (
  <section className="section bg-accent py-5">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">Key Features & Benefits</h2>
      <div className="row g-4">
        {items.map((feature, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">
            <div className="p-4 h-100 rounded-4 shadow-sm bg-white border-start border-4 border-olive">
              <i className="bi bi-check-circle-fill text-olive me-2"></i>
              <span className="fw-semibold text-dark">{feature}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductFeatures;