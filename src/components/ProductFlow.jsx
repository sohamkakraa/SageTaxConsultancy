// src/components/ProductFlow.jsx
import React from "react";

const ProductFlow = ({ steps }) => (
  <section className="section ">
    <div className="container">
      <h2 className="text-center fw-bold mb-5">Process Flow</h2>
      <div className="d-flex flex-wrap justify-content-center align-items-stretch gap-4">
        {steps.map(({ title, description }, index) => (
          <React.Fragment key={index}>
            <div className="col-md flex-grow-1" style={{ maxWidth: "240px" }}>
              <div
                className="bg-default text-light text-center p-4 rounded-4 h-100 d-flex flex-column justify-content-between"
                style={{ minHeight: "260px" }}
              >
                <div>
                  <div className="fs-4 fw-bold mb-2">{index + 1}</div>
                  <h5 className="fw-semibold">{title}</h5>
                </div>
                <p className="small mt-3">{description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="d-flex align-items-center">
                <div className="fs-4 text-olive">&#8594;</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default ProductFlow;
