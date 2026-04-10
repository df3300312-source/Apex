import React from "react";
import { useNavigate } from "react-router-dom"; // <-- added
import {
  FaRocket,
  FaGem,
  FaCrown,
  FaChartPie,
  FaGlobe,
  FaBriefcase,
} from "react-icons/fa";
import "../css/plans.css";

const InvestmentPlans = () => {
  const navigate = useNavigate(); // <-- hook

  const plans = [
    {
      id: "starter",
      title: "Starter",
      category: "Beginner",
      icon: <FaRocket />,
      min: 100,
      max: 4999,
      roi: 2,
      duration: 7,
      profit: "+14% total",
      popularity: 40,
      isHot: false,
    },
    {
      id: "silver",
      title: "Silver",
      category: "Intermediate",
      icon: <FaGem />,
      min: 5000,
      max: 14999,
      roi: 2.5,
      duration: 14,
      profit: "+35% total",
      popularity: 80,
      isHot: true,
    },
    {
      id: "gold",
      title: "Gold",
      category: "Advanced",
      icon: <FaCrown />,
      min: 15000,
      max: 49999,
      roi: 3,
      duration: 30,
      profit: "+90% total",
      popularity: 60,
      isHot: false,
    },
    {
      id: "diamond",
      title: "Diamond",
      category: "Professional",
      icon: <FaChartPie />,
      min: 50000,
      max: 99999,
      roi: 3.5,
      duration: 60,
      profit: "+210% total",
      popularity: 30,
      isHot: false,
    },
    {
      id: "institutional",
      title: "Institutional",
      category: "Enterprise",
      icon: <FaGlobe />,
      min: 100000,
      max: 499999,
      roi: 4.2,
      duration: 90,
      profit: "+378% total",
      popularity: 20,
      isHot: false,
    },
    {
      id: "apex-vip",
      title: "Apex VIP",
      category: "High Net Worth",
      icon: <FaBriefcase />,
      min: 500000,
      max: null, // Unlimited
      roi: 5,
      duration: 180,
      profit: "+900% total",
      popularity: 10,
      isHot: false,
    },
  ];

  const handleGetStarted = (plan) => {
    // Navigate to deposit page, passing the plan object as state
    navigate("/deposit", { state: { selectedPlan: plan } });
  };

  return (
    <section className="plans-section py-5">
      <div className="container py-5">
        <div className="text-center mb-5 text-white">
          <h2 className="display-6 fw-bold">
            Global Investment <span className="title-span">Portfolios</span>
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            Diversify your wealth with our tiered investment structures designed
            for consistent growth and capital protection.
          </p>
        </div>

        <div className="row g-4 mt-2">
          {plans.map((plan, index) => (
            <div className="col-xl-4 col-md-6" key={plan.id}>
              <div
                className={`plan-card h-100 ${plan.isHot ? "featured" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.isHot && (
                  <div className="popular-badge">
                    <span>🔥 Most Popular</span>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div className="icon-wrapper">{plan.icon}</div>
                  <span className="badge category-badge">{plan.category}</span>
                </div>

                <h3 className="plan-title text-white mb-2">{plan.title}</h3>
                <h2 className="roi-text mb-1">
                  {plan.roi}%{" "}
                  <small className="fs-6 text-white-50">Daily</small>
                </h2>
                <p className="text-info small mb-3">{plan.profit}</p>

                <div className="plan-details mb-4">
                  <div className="detail-item">
                    <span>Investment Range</span>
                    <span className="text-white">
                      ${plan.min.toLocaleString()} –{" "}
                      {plan.max ? "$" + plan.max.toLocaleString() : "Unlimited"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span>Contract Duration</span>
                    <span className="text-white">{plan.duration} Days</span>
                  </div>
                  <div className="detail-item">
                    <span>Compounding</span>
                    <span className="text-info">Available</span>
                  </div>
                </div>

                {/* Popularity bar */}
                <div className="popularity-bar mb-4">
                  <div className="bar-label">
                    <small>Popularity</small>
                    <small>{plan.popularity}%</small>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-gradient"
                      style={{ width: `${plan.popularity}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  className={`btn w-100 py-3 fw-bold rounded-3 ${
                    plan.isHot ? "btn-gradient" : "btn-outline-gradient"
                  }`}
                  onClick={() => handleGetStarted(plan)} // <-- click handler
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
