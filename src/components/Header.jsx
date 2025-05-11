import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import name from "../assets/name.png";


export const Header = () => (
  <header id="header" className="header sticky-top bg-white shadow-sm">
    <div className="container d-flex align-items-center justify-content-between py-2">
      <Link to="/" className="logo d-flex align-items-center">
        <img src={logo} alt="Sage logo" height="40" className="me-2" />
        <img src={name} alt="Sage name" height="32" />
      </Link>

      <nav className="navbar navbar-expand-lg">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/tax" data-bs-toggle="dropdown">Tax Consultancy</a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/vat">Value Added Tax (VAT)</Link></li>
                <li><Link className="dropdown-item" to="/corporate-tax">Corporate Tax</Link></li>
                <li><Link className="dropdown-item" to="/excise-tax">Excise Tax</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/accounting" data-bs-toggle="dropdown">Accounting & Auditing</a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/accounting-services">Accounting Services</Link></li>
                <li><Link className="dropdown-item" to="/bookkeeping-services">Bookkeeping Services</Link></li>
                <li><Link className="dropdown-item" to="/internal-auditing">Internal Audit</Link></li>
                <li><Link className="dropdown-item" to="/external-auditing">External Audit</Link></li>
                <li><Link className="dropdown-item" to="/forensic-auditing">Forensic Audit</Link></li>
                <li><Link className="dropdown-item" to="/statutory-auditing">Statutory Audit</Link></li>
                <li><Link className="dropdown-item" to="/vat-auditing">VAT Audit</Link></li>
                <li><Link className="dropdown-item" to="/corporate-tax-auditing">Corporate Tax Audit</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/corporate-services" data-bs-toggle="dropdown">Corporate Services</a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/company-registration">Company Registration</Link></li>
                <li><Link className="dropdown-item" to="/trademark-registration">Trademark Registration</Link></li>
                <li><Link className="dropdown-item" to="/business-bank-account">Business Bank Account</Link></li>
                <li><Link className="dropdown-item" to="/pro-services">PRO Services</Link></li>
                <li><Link className="dropdown-item" to="/golden-visa">Golden Visa</Link></li>
                <li><Link className="dropdown-item" to="/company-reconstruction">Company Reconstruction</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
);
