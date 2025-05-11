// src/components/Contact.jsx
import React, { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/xwpobzra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section id="contact" className="contact section bg-accent">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-center mb-3">Contact</h2>
        <p className="text-center mb-5">Need help with tax, accounting or setup? Let’s talk.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 text-center">
          <div className="col-md-6 col-lg-3">
            <div className="info-item">
              <i className="icon bi bi-geo-alt fs-4 text-olive mb-2"></i>
              <h5 className="fw-bold">Address</h5>
              <p>Dubai, U.A.E</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="info-item">
              <i className="icon bi bi-telephone fs-4 text-olive mb-2"></i>
              <h5 className="fw-bold">Call Us</h5>
              <p><a href="tel:+971585704140" className="text-muted">+971 58 570 4140</a></p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="info-item">
              <i className="icon bi bi-envelope fs-4 text-olive mb-2"></i>
              <h5 className="fw-bold">Email Us</h5>
              <p><a href="mailto:info@sageconsultancy.ae" className="text-muted">info@sageconsultancy.ae</a></p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="info-item">
              <i className="icon bi bi-share fs-4 text-olive mb-2"></i>
              <h5 className="fw-bold">Social Profiles</h5>
              <div className="social-links d-flex justify-content-center gap-3 mt-2">
                <a href="#" className="fs-5 text-dark"><i className="bi bi-instagram"></i></a>
                <a href="#" className="fs-5 text-dark"><i className="bi bi-whatsapp"></i></a>
                <a href="#" className="fs-5 text-dark"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="row gy-4">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control bg-transparent border border-dark text-dark"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control bg-transparent border border-dark text-dark"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control bg-transparent border border-dark text-dark"
                placeholder="Subject"
                required
              />
            </div>
            <div className="col-12">
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="form-control bg-transparent border border-dark text-dark"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-olive rounded-pill px-5 py-2 mt-3" style={{border: "1px solid"}}>
                Send Message
              </button>
              {submitted && <p className="mt-3 text-success small">Your message has been sent. Thank you!</p>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
