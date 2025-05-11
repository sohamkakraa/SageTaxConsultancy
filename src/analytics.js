// src/analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-XXXXXXXXXX"); // Replace with your GA4 ID
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
