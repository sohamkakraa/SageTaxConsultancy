// src/components/SplashScreen.jsx
import React, { useEffect, useState } from "react";
import logo from "../assets/fullLogo.png";

const SplashScreen = () => {
  const [hide, setHide] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => setFadeOut(true), 2000); // Start fade
    const timeout2 = setTimeout(() => setHide(true), 2500); // Remove completely
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return hide ? null : (
    <div
      className={`splash-screen d-flex flex-column justify-content-center align-items-center bg-white ${
        fadeOut ? "fade-out" : ""
      }`}
    >
      <img
        src={logo}
        alt="Sage Tax Consultancy Logo"
        className="animate-logo mb-3"
        style={{ width: "120px" }}
      />
      <div className="loading-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default SplashScreen;
