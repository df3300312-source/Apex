import React from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaUsers, FaHeadset } from "react-icons/fa";
import "../css/hero.css";
import heroImage from "../assets/image/hero.jpg";

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center">
      {/* The Full-Side Image Background */}
      <div
        className="hero-image-overlay"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center min-vh-100">
          {/* Left Content - Takes up half the screen */}
          <div className="col-lg-6 text-white py-5">
            <h1 className="display-5 fw-bold mb-3 main-title">
              The Future of Investing <br />
              Starts With <span className="brand-text">ApexMarkets</span>
            </h1>
            <p className="lead text-white-60 mb-4 description-text">
              Access powerful investment opportunities across cryptocurrency,
              forex, commodities, and global markets.
            </p>
            <div className="d-flex flex-wrap gap-3 mb-5">
              <Link
                to="/register"
                className="btn btn-warning btn-lg px-5 fw-bold shadow-sm"
              >
                Start Investing
              </Link>
              <Link to="/about" className="btn btn-outline-light btn-lg px-4">
                Learn More
              </Link>
            </div>
            {/* Stats Row */}
            <div className="row g-4 stats-container">
              <div className="col-auto me-md-4 d-flex align-items-center gap-2">
                <FaChartLine className="text-info fs-4" />
                <div>
                  <h4 className="fw-bold mb-0">150M+</h4>
                  <small className="text-secondary">Total Investments</small>
                </div>
              </div>
              <div className="col-auto me-md-4 d-flex align-items-center gap-2">
                <FaUsers className="text-info fs-4" />
                <div>
                  <h4 className="fw-bold mb-0">90K+</h4>
                  <small className="text-secondary">Active Investors</small>
                </div>
              </div>
              <div className="col-auto d-flex align-items-center gap-2">
                <FaHeadset className="text-info fs-4" />
                <div>
                  <h4 className="fw-bold mb-0">24/7</h4>
                  <small className="text-secondary">Customer Support</small>
                </div>
              </div>
            </div>
          </div>

          {/* Empty col-lg-6 on right to preserve the grid space for the text */}
          <div className="col-lg-6"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
