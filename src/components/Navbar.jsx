import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Effect to add a background color when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top navbar-custom ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <span className="brand-apex">Apex</span>
          <span className="brand-markets text-warning">Markets</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/plans">
                Plans
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link
                className="btn btn-warning fw-bold px-4 rounded-pill shadow-sm login-btn"
                to="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
