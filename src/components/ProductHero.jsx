import React from "react";
import { Link } from "react-router-dom";

const ProductHero = ({ title, image, breadcrumb }) => (
  <section
    className="hero section d-flex align-items-center justify-content-center"
    style={{
      backgroundImage: `url(/assets/${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
    }}
  >
    <div className="container py-4 px-5 bg-hero-default bg-opacity-50 rounded-4 w-100">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h1 className="title fw-bold fs-1">{title}</h1>
        <nav className="breadcrumbs text-end">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">Home</Link>
            </li>
            {breadcrumb && (
              <li className="breadcrumb-item">
                <Link to={breadcrumb.href} className="text-white-50 text-decoration-none">
                  {breadcrumb.label}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active text-white" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </section>
);

export default ProductHero;
