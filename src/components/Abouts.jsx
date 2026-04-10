import React from "react";
import { Link } from "react-router-dom"; // Added Link import
import {
  FaFlag,
  FaEye,
  FaShieldAlt,
  FaHandshake,
  FaGlobeAmericas,
  FaUsers,
  FaAward,
  FaArrowRight, // Added for the button icon
} from "react-icons/fa";
import "../css/abouts.css";

const Abouts = () => {
  return (
    <section className="about-section py-5" id="about">
      <div className="container py-5">
        {/* Row 1: Split Description & Image/Stats */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h6 className="text-info fw-bold text-uppercase tracking-wider">
              Our Story
            </h6>
            <h2 className="display-6 fw-bold text-white mb-4">
              Pioneering the Future of{" "}
              <span className="brand-text">Wealth</span>
            </h2>
            <p className="lead text-white-50 mb-4">
              ApexMarkets is an automatic online investment platform established
              by a team of professional traders focusing mainly on
              cryptocurrency trading and high-efficiency Bitcoin mining.
            </p>
            <p className="text-secondary">
              Recently, our company made a successful entry into the
              international technology market. Our main aim is to provide safe
              and secured returns where investors need little or no experience
              to thrive.
            </p>

            {/* Professional Link to About Page */}
            <div className="mt-4 mb-5">
              <Link
                to="/about"
                className="btn btn-outline-info px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                style={{ transition: "0.3s", borderRadius: "8px" }}
              >
                Read More About Us{" "}
                <FaArrowRight style={{ fontSize: "0.8rem" }} />
              </Link>
            </div>
          </div>

          <div className="col-lg-6 ps-lg-5">
            <div className="about-feature-box">
              <div className="glass-card p-4 rounded-4 shadow-lg border border-light border-opacity-10">
                <p className="text-white-50 fst-italic">
                  "ApexMarkets is helping to educate, provide service for,
                  secure, protect and ultimately profit from this emerging
                  industry."
                </p>
                <div className="d-flex align-items-center mt-3">
                  <div
                    className="avatar-blob me-3 bg-info rounded-circle"
                    style={{ width: "45px", height: "45px" }}
                  ></div>
                  <div>
                    <h6 className="text-white mb-0 fw-bold">Executive Board</h6>
                    <small className="text-info">ApexMarkets Global</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Mission & Vision */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="mission-vision-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <div className="card-icon-circle mb-3 fs-2 text-info">
                <FaFlag />
              </div>
              <h3 className="text-white h4">Our Mission</h3>
              <p className="text-secondary small">
                To provide users a unique, safe and secured platform using
                cutting‑edge infrastructure intended to make things convenient
                and provide steady daily profits.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mission-vision-card p-4 rounded-4 bg-dark border border-secondary h-100">
              <div className="card-icon-circle mb-3 fs-2 text-info">
                <FaEye />
              </div>
              <h3 className="text-white h4">Our Vision</h3>
              <p className="text-secondary small">
                To become a global leader in crypto investment solutions,
                empowering individuals to achieve financial independence through
                transparency and innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Abouts;
