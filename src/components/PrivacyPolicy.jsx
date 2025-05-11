// src/pages/PrivacyPolicy.jsx
import React from "react";
import ProductHero from "../components/ProductHero";

export const PrivacyPolicy = () => {
  return (
    <>
      <ProductHero title="Privacy Policy" image="privacy.jpg" />
      <div className="container py-5">
        <h5>Last updated: [Insert Date]</h5>
        <p>
          Sage Tax Consultancy ("we", "us", "our") values your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website: <strong>https://www.sageconsultancy.ae</strong>.
        </p>

        <h5>1. Information We Collect</h5>
        <ul>
          <li><strong>Personal Data:</strong> Name, email, phone, company, etc.</li>
          <li><strong>Usage Data:</strong> IP, browser, pages visited, etc.</li>
          <li><strong>Cookies & Tracking:</strong> Google Analytics and performance tools.</li>
        </ul>

        <h5>2. How We Use Your Information</h5>
        <ul>
          <li>To respond to inquiries and provide services</li>
          <li>To improve user experience and analytics</li>
          <li>To fulfill legal or regulatory obligations</li>
        </ul>

        <h5>3. Data Sharing</h5>
        <p>
          We don’t sell your data. Limited sharing may occur with service providers or regulators as required by law.
        </p>

        <h5>4. Data Retention</h5>
        <p>
          We retain data only as long as necessary or legally required (e.g., 5 years for financial/tax records).
        </p>

        <h5>5. Your Rights</h5>
        <p>
          You may request access, correction, or deletion of your data by emailing <strong>info@sageconsultancy.ae</strong>.
        </p>

        <h5>6. Security</h5>
        <p>
          We use appropriate safeguards to protect your personal information.
        </p>

        <h5>7. Changes to This Policy</h5>
        <p>
          We may update this notice at any time. Please check back periodically.
        </p>
      </div>
    </>
  );
};
