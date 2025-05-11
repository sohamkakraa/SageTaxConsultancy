// src/components/Hero.jsx
import React from "react";
import heroImage from "../assets/hero-image.jpg"; // Add your hero image here

export const Hero = () => (
  <section id="hero" className="hero section bg-default text-white py-5">
    <div className="container position-relative">
      <div className="row align-items-center">
        {/* Left Content */}
        <div className="col-lg-6" data-aos="fade-down" data-aos-delay="100">
          <h2>Tax Clarity. Business Certainty.</h2>
          <p>
            From start-ups to multinationals, we translate Federal Tax Authority rules into clear, actionable steps, optimising cash flow, reducing risk and freeing you to scale.
          </p>
          <div className="cta mt-4 d-flex flex-column flex-sm-row gap-3">
            <a className="btn btn-olive" href="#contact">Book a Free Consultation Now!</a>
            <a className="btn btn-outline-light" href="#services">Explore Our Services</a>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-lg-6 text-center" data-aos="fade-left" data-aos-delay="200">
          <img src={heroImage} alt="Sage Tax consultants greeting a Dubai client" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  </section>
);