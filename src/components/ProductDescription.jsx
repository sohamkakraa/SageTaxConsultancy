// src/components/ProductDescription.jsx
import React from "react";

const ProductDescription = ({ text }) => (
  <section className="section py-5">
    <div className="container">
      <h2 className="text-center fw-bold mb-4">Overview</h2>
      <p className="lead" style={{ maxWidth: "900px", margin: "0 auto", lineHeight: "1.8" }}>
        {text.split('\n').map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  </section>
);

export default ProductDescription;
