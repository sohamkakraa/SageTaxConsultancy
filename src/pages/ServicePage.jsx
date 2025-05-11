import React from "react";
import { useParams } from "react-router-dom";
import services from "../data/services";

export const ServicePage = () => {
  const { slug } = useParams();
  const service = Object.values(services).flat().find((s) => s.slug === slug);
  if (!service) return <p className="container pt-5">Service not found.</p>;
  return (
    <main className="section-padding">
      <div className="container">
        <h1 className="fw-bold mb-4">{service.name}</h1>
        <img src={service.image} className="w-100 rounded mb-4" alt={service.name} />
        <p className="lead">{service.longDescription}</p>
      </div>
    </main>
  );
};