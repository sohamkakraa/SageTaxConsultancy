import React from "react";

export const FAQs = () => (
  <section className="section">
    <div className="container">
      <h2 className="section-title text-center mb-5 fw-bold">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {[
          ["Do I have to register for VAT?", "Businesses crossing AED 375k in taxable supplies must register."],
          ["When does corporate tax start?", "Financial years beginning on or after 1 June 2023 are in scope."],
          ["Can I reclaim input tax on entertainment?", "Only in limited circumstances—speak to our advisors for clarity."],
        ].map(([q, a], i) => (
          <div key={i} className="accordion-item border-0 mb-3">
            <h2 className="accordion-header" id={`heading${i}`}>
              <button
                className="accordion-button collapsed bg-transparent"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${i}`}
              >
                {q}
              </button>
            </h2>
            <div id={`collapse${i}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body small">{a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);