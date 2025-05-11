// src/components/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    name: "Fatima Al-Suwaidi",
    role: "Finance Director",
    text: "Sage handled our VAT inspection flawlessly. Their preparation and FTA liaison saved us from a potential penalty—and gave us true peace of mind."
  },
  {
    name: "Arjun Mehta",
    role: "Founder, Tectonic DMCC",
    text: "We moved our accounting and audit to Sage after outgrowing our freelancer. It was the best decision—professional, prompt, and tech-savvy."
  },
  {
    name: "Lina Haddad",
    role: "Managing Partner, Vida Interiors",
    text: "Their corporate services team set up our Dubai entity, opened a bank account, and secured our Golden Visa—all within weeks."
  }
];

export const Testimonials = () => (
<section id="testimonials" className="testimonials section bg-accent">
<div className="container" data-aos="fade-up">
      <h2 className="text-center mb-5">What Our Clients Say</h2>
      <div className="row justify-content-center g-4">
        {testimonials.map(({ name, role, image, text }, idx) => (
          <div key={idx} className="col-md-4">
            <div className="testimonial-item text-center bg-white text-dark rounded-4 p-4 shadow-sm h-100">
              <img src={image} alt={name} className="testimonial-img rounded-circle mb-3" width="80" />
              <h5 className="fw-bold mb-1">{name}</h5>
              <p className="text-muted small mb-2">{role}</p>
              <p className="fst-italic small">“{text}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
