import React from "react";
import CountUp from "react-countup";

export const Counters = () => (
  <section className="section text-center bg-accent">
    <div className="container">
      <h2 className="section-title mb-5 fw-bold">Our Impact in Numbers</h2>
      <div className="row g-4 justify-content-center">
        {[
          ["Clients Served", 950],
          ["Millions in Tax Saved (AED)", 120],
          ["Industries Covered", 35],
          ["Years of Expertise", 12],
        ].map(([label, end], i) => (
          <div key={i} className="col-6 col-md-3">
            <h3 className="display-6 fw-bold">
              <CountUp end={end} duration={3} separator="," />+
            </h3>
            <p className="small text-muted mt-2">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
