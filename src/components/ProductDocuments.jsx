// src/components/ProductDocuments.jsx
import React from "react";

const ProductDocuments = ({ documents }) => (
  <section className="section bg-accent py-5">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">Documents Required</h2>
      <ul className="list-group list-group-flush mx-auto" style={{ maxWidth: "600px" }}>
        {documents.map((doc, idx) => (
          <li key={idx} className="list-group-item d-flex align-items-center">
            <i className="bi bi-file-earmark-text-fill text-olive me-3 fs-5"></i>
            <span>{doc}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ProductDocuments;
