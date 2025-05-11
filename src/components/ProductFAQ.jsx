// src/components/ProductFAQ.jsx
import React from "react";

const ProductFAQ = ({ faqs }) => (
  <section className="section bg-light py-5">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">Frequently Asked Questions</h2>
      <div className="accordion" id="productFaq">
        {faqs.map(([question, answer], idx) => (
          <div className="accordion-item" key={idx}>
            <h2 className="accordion-header" id={`faqHeading${idx}`}>
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faqCollapse${idx}`}
                aria-expanded="false"
                aria-controls={`faqCollapse${idx}`}
              >
                {question}
              </button>
            </h2>
            <div
              id={`faqCollapse${idx}`}
              className="accordion-collapse collapse"
              aria-labelledby={`faqHeading${idx}`}
              data-bs-parent="#productFaq"
            >
              <div className="accordion-body small text-muted">{answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductFAQ;