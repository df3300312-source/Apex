import React from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaTrophy,
  FaGlobe,
  FaShieldAlt,
  FaBuilding,
  FaFileInvoice,
  FaMoneyBillWave,
  FaHandHoldingUsd,
} from "react-icons/fa";
import "../css/journeysummary.css";

const JourneySummary = () => {
  const stats = [
    { icon: <FaUsers />, value: "49,800", label: "Active Investors" },
    { icon: <FaCalendarAlt />, value: "2,200", label: "Days Running" },
    { icon: <FaTrophy />, value: "375", label: "Industry Awards" },
    { icon: <FaGlobe />, value: "200", label: "Global Presence" },
  ];

  return (
    <section className="journey-summary py-5">
      <div className="container py-4">
        {/* Header */}
        <div className="text-center mb-5 text-white">
          <h2 className="display-6 fw-bold">
            A Legacy of <span className="brown">Excellence</span>
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "800px" }}>
            Through years of dedication, we have built a wealth of expertise
            that has strengthened our standing in global financial markets.
          </p>
        </div>

        {/* Top Floating Stats Row */}
        <div className="row g-4 mb-5">
          {stats.map((stat, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="stat-pill-card text-center">
                <div className="pill-icon">{stat.icon}</div>
                <h3 className="pill-value text-white mb-0">{stat.value}</h3>
                <p className="pill-label text-secondary small text-uppercase mb-0">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Left Panel: The Narrative */}
          <div className="col-lg-7">
            <div className="history-narrative-card h-100 p-4 p-lg-5">
              <h4 className="text-white fw-bold mb-4">
                Harnessing Time-Tested Strategies
              </h4>
              <p className="text-white-50">
                Our journey began in 2007, just as the seeds of the
                cryptocurrency revolution were being sown. As Bitcoin emerged,
                we recognized the challenges newcomers faced. Driven by a
                passion for innovation, we built a comprehensive platform
                designed for transparency and reliable returns.
              </p>

              <div className="trust-badges-grid mt-4">
                <div className="trust-item">
                  <FaShieldAlt className="text-info" />
                  <div>
                    <span className="d-block text-white fw-bold">
                      Advanced Security
                    </span>
                    <small className="text-secondary">
                      AES-256 Encryption Protocols
                    </small>
                  </div>
                </div>
                <div className="trust-item">
                  <FaFileInvoice className="text-warning" />
                  <div>
                    <span className="d-block text-white fw-bold">
                      Insured Assets
                    </span>
                    <small className="text-secondary">
                      AIICO Insurance (American International)
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Financial Performance */}
          <div className="col-lg-5">
            <div className="financial-summary-card h-100 p-4 p-lg-5">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-end mb-2">
                  <h6 className="text-secondary text-uppercase small mb-0">
                    Total Deposits
                  </h6>
                  <FaMoneyBillWave className="text-success" />
                </div>
                <h2 className="text-white fw-bold display-6">$3.1 Million</h2>
                <div
                  className="progress mt-2"
                  style={{ height: "4px", background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

              <div className="mb-4 pt-3">
                <div className="d-flex justify-content-between align-items-end mb-2">
                  <h6 className="text-secondary text-uppercase small mb-0">
                    Withdrawals Processed
                  </h6>
                  <FaHandHoldingUsd className="text-warning" />
                </div>
                <h2 className="text-white fw-bold display-6">$1.5 Million</h2>
                <div
                  className="progress mt-2"
                  style={{ height: "4px", background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: "48%" }}
                  ></div>
                </div>
              </div>

              <div className="verification-notice mt-auto p-3 rounded-3 bg-dark-50 border border-secondary text-center">
                <small className="text-info d-flex align-items-center justify-content-center">
                  <FaBuilding className="me-2" /> Verified Corporate Member:
                  Blueback
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySummary;
