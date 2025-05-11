// src/pages/TermsAndConditions.jsx
import React from "react";
import ProductHero from "../components/ProductHero";

export const TermsAndConditions = () => {
  return (
    <>
      <ProductHero title="Terms & Conditions" image="terms.jpg" />
      <div className="container py-5">
        <h5>Last updated: [Insert Date]</h5>

        <h5>1. Use of Site</h5>
        <p>
          This site is for informational purposes only. Do not use it for unlawful or unauthorized activities.
        </p>

        <h5>2. Intellectual Property</h5>
        <p>
          All content on this site is owned by Sage Tax Consultancy. Unauthorized use is prohibited.
        </p>

        <h5>3. No Legal Advice</h5>
        <p>
          Nothing on this site should be interpreted as legal or tax advice.
        </p>

        <h5>4. Client Relationships</h5>
        <p>
          A formal client relationship begins only upon signing a written agreement.
        </p>

        <h5>5. Limitation of Liability</h5>
        <p>
          We are not responsible for losses arising from use of this site or its content.
        </p>

        <h5>6. External Links</h5>
        <p>
          We may link to external sites but do not control their content or privacy practices.
        </p>

        <h5>7. Modifications</h5>
        <p>
          We reserve the right to update or modify the site and terms at any time.
        </p>

        <h5>8. Governing Law</h5>
        <p>
          These terms are governed by the laws of the United Arab Emirates. Disputes will be handled by Dubai Courts.
        </p>
      </div>
    </>
  );
};
