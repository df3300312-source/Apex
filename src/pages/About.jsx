import React from "react";
import { Link } from "react-router-dom";
import {
  FaFlag,
  FaEye,
  FaShieldAlt,
  FaHandshake,
  FaGlobeAmericas,
  FaUsers,
  FaAward,
  FaChartLine,
  FaLock,
  FaRocket,
  FaChevronRight,
} from "react-icons/fa";
import "../css/about.css";
import Navbar from "../components/Navbar";
// 1. Import your image here (Adjust the path to match your folder)
import heroBg from "../assets/image/Crypto.jpg";
import Footer from "../components/Footer";

const About = () => {
  const milestones = [
    {
      year: "2007",
      title: "Inception",
      desc: "Started as a private trading group in London.",
    },
    {
      year: "2015",
      title: "Mining Shift",
      desc: "Launched our first proprietary Bitcoin mining facility.",
    },
    {
      year: "2020",
      title: "Going Global",
      desc: "Reached 50,000 active investors worldwide.",
    },
    {
      year: "2026",
      title: "AI Era",
      desc: "Integrated neural-network market prediction tools.",
    },
  ];

  return (
    <main className="about-page-wrapper bg-dark text-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <header
        className="about-hero py-5"
        style={{
          // 2. Added image background with an overlay to keep text readable
          backgroundImage: `linear-gradient(180deg, rgba(2, 6, 23, 0.9) 0%, rgba(10, 25, 47, 0.8) 100%), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* 3. Added relative position and z-index to make all links clickable */}
        <div
          className="container py-5 mt-4"
          style={{ position: "relative", zIndex: "2" }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8 text-center text-lg-start">
              <nav className="breadcrumb-nav mb-3">
                <Link
                  to="/"
                  className="text-secondary text-decoration-none small"
                >
                  Home
                </Link>
                <FaChevronRight
                  className="mx-2 small text-secondary"
                  style={{ fontSize: "0.7rem" }}
                />
                <span className="text-info fw-bold small">About Us</span>
              </nav>
              <h1 className="display-3 fw-bold mb-4">
                Our Legacy, Your{" "}
                <span className="text-warning">Prosperity</span>
              </h1>
              <p className="lead text-white-50 mb-4 pe-lg-5">
                Building the bridge between institutional financial strategies
                and individual growth since 2007. We combine human expertise
                with cutting-edge technology to secure your future.
              </p>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
                <Link to="/register" className="btn btn-info px-4 py-2 fw-bold">
                  Get Started Now
                </Link>
                <div className="trust-pill d-flex align-items-center gap-2 bg-secondary bg-opacity-10 px-3 py-2 rounded-pill border border-info border-opacity-25">
                  <FaShieldAlt className="text-info" />
                  <span className="small">SEC Regulated</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block">
              <div className="hero-stat-box p-4 rounded-4 border border-secondary border-opacity-25 bg-dark shadow-lg">
                <div className="badge bg-warning text-dark mb-2 px-3">
                  EST. 2007
                </div>
                <h4 className="fw-bold">19+ Years</h4>
                <p className="text-secondary small mb-0">
                  Of market leadership and digital asset innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="about-section py-5" id="about">
        <div className="container">
          {/* Row 1: Story & Stats */}
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h6 className="text-info fw-bold text-uppercase tracking-wider">
                Our Story
              </h6>
              <h2 className="display-6 fw-bold mb-4">
                Pioneering the Future of{" "}
                <span className="brand-text">Wealth</span>
              </h2>
              <p className="lead text-white-50 mb-4">
                ApexMarkets is an automatic online investment platform
                established by a team of professional traders focusing mainly on
                cryptocurrency trading and high-efficiency Bitcoin mining.
              </p>
              <p className="text-secondary">
                Recently, our company made a successful entry into the
                international technology market. Our main aim is to provide safe
                and secured returns where investors need little or no experience
                to thrive.
              </p>

              <div className="row g-3 mt-4">
                <div className="col-6 col-md-4">
                  <div className="mini-stat-card p-3 border border-secondary rounded text-center transition-hover">
                    <FaGlobeAmericas className="text-warning mb-2 fs-3" />
                    <h4 className="mb-0">Global</h4>
                    <small className="text-secondary">Reach</small>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="mini-stat-card p-3 border border-secondary rounded text-center transition-hover">
                    <FaUsers className="text-warning mb-2 fs-3" />
                    <h4 className="mb-0">90K+</h4>
                    <small className="text-secondary">Investors</small>
                  </div>
                </div>
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
                      <h6 className="mb-0 fw-bold">Executive Board</h6>
                      <small className="text-info">ApexMarkets Global</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Global Timeline */}
          <div className="timeline-section py-5 my-5">
            <div className="text-center mb-5">
              <h3 className="fw-bold text-uppercase tracking-wide">
                Our <span className="text-info">Journey</span>
              </h3>
            </div>
            <div className="row g-4 justify-content-center">
              {milestones.map((item, index) => (
                <div className="col-md-3" key={index}>
                  <div className="timeline-card text-center p-4 rounded-4 border border-secondary border-opacity-25 h-100">
                    <div className="timeline-year text-info fw-bold mb-2 fs-4">
                      {item.year}
                    </div>
                    <h6 className="fw-bold mb-2">{item.title}</h6>
                    <p className="text-secondary x-small mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Mission & Vision */}
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="mission-vision-card p-4 rounded-4 bg-dark border border-secondary h-100">
                <div className="card-icon-circle mb-3 fs-2 text-info">
                  <FaFlag />
                </div>
                <h3 className="h4 fw-bold">Our Mission</h3>
                <p className="text-secondary">
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
                <h3 className="h4 fw-bold">Our Vision</h3>
                <p className="text-secondary">
                  To become a global leader in crypto investment solutions,
                  empowering individuals to achieve financial independence
                  through transparency and innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Row 4: Core Values */}
          <div className="row g-4 mb-5 py-4 text-center">
            <div className="col-md-4">
              <div className="value-item">
                <FaLock className="text-warning fs-1 mb-3" />
                <h5 className="fw-bold">Security First</h5>
                <p className="text-secondary small">
                  Your assets are protected by cold storage and multi-sig
                  protocols.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-item">
                <FaChartLine className="text-warning fs-1 mb-3" />
                <h5 className="fw-bold">Data Driven</h5>
                <p className="text-secondary small">
                  We leverage real-time analytics to ensure consistent market
                  yields.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-item">
                <FaRocket className="text-warning fs-1 mb-3" />
                <h5 className="fw-bold">Innovation</h5>
                <p className="text-secondary small">
                  Continuously upgrading our mining tech for maximum efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Row 5: Regulation Stripe */}
          <div className="regulation-stripe p-4 p-lg-5 rounded-4 border border-info border-opacity-10 bg-black bg-opacity-25 shadow-sm">
            <div className="row align-items-center">
              <div className="col-lg-3 text-center text-lg-start mb-4 mb-lg-0">
                <FaAward className="display-4 text-warning mb-2" />
                <h4 className="h5 fw-bold">Certified & Regulated</h4>
              </div>
              <div className="col-lg-9">
                <div className="row g-4">
                  <div className="col-md-6 text-start">
                    <div className="reg-item">
                      <FaHandshake className="text-info fs-3 mb-2" />
                      <h6 className="fw-bold">The Financial Commission</h6>
                      <p className="small text-secondary mb-0">
                        Member of the international organization for dispute
                        resolution and integrity.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 text-start">
                    <div className="reg-item">
                      <FaShieldAlt className="text-info fs-3 mb-2" />
                      <h6 className="fw-bold">SEC Regulatory Oversight</h6>
                      <p className="small text-secondary mb-0">
                        Adhering to strict US Securities and Exchange Commission
                        standards for investor protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 6: Final CTA */}
          <div
            className="cta-box p-5 rounded-5 text-center mt-5 shadow-lg border border-info border-opacity-25"
            style={{
              background: "linear-gradient(135deg, #0a192f 0%, #020617 100%)",
            }}
          >
            <FaRocket className="text-warning display-4 mb-4" />
            <h2 className="fw-bold mb-3">
              Ready to Build Your Digital Legacy?
            </h2>
            <p
              className="text-white-50 mb-4 mx-auto"
              style={{ maxWidth: "600px" }}
            >
              Join over 90,000 global investors today and start earning
              consistent returns backed by institutional-grade security.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/register" className="btn btn-info px-4 py-2 fw-bold">
                Get Started Now
              </Link>
              <Link to="/plans" className="btn btn-outline-light px-4 py-2">
                View Investment Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
};

export default About;
