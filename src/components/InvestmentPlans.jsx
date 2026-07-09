import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRocket,
  FaGem,
  FaCrown,
  FaChartPie,
  FaGlobe,
  FaBriefcase,
  FaExclamationTriangle,
  FaRedo,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Integrated Auth
import api from "../services/api";
import "../css/plans.css";

const InvestmentPlans = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access global auth state
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track network errors

  const getCategoryByAmount = (min) => {
    if (min >= 500000) return "High Net Worth";
    if (min >= 100000) return "Enterprise";
    if (min >= 50000) return "Professional";
    if (min >= 15000) return "Advanced";
    if (min >= 5000) return "Intermediate";
    return "Beginner";
  };

  const getIconForPlan = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("starter")) return <FaRocket />;
    if (lower.includes("silver")) return <FaGem />;
    if (lower.includes("gold")) return <FaCrown />;
    if (lower.includes("diamond")) return <FaChartPie />;
    if (lower.includes("institutional")) return <FaGlobe />;
    return <FaBriefcase />;
  };

  // 1. Optimized Data Fetching with error handling
  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/plans");

      // Handle both direct array and { data: [] } structure
      const rawData = res.data.data || res.data;

      if (!Array.isArray(rawData)) throw new Error("Invalid format");

      const mappedPlans = rawData.map((plan) => ({
        id: String(plan.id),
        title: plan.name,
        category: getCategoryByAmount(plan.min_amount),
        icon: getIconForPlan(plan.name),
        min: parseFloat(plan.min_amount),
        max: plan.max_amount ? parseFloat(plan.max_amount) : null,
        roi: plan.roi_percent,
        duration: plan.duration_days,
        profit: `+${(parseFloat(plan.roi_percent) * plan.duration_days).toFixed(0)}% total`,
        popularity:
          plan.min_amount >= 5000 && plan.min_amount < 15000 ? 95 : 60, // Silver logic
        isHot: plan.name.toLowerCase().includes("silver"),
      }));

      setPlans(mappedPlans);
    } catch (err) {
      console.error("Failed to load plans", err);
      setError(
        "Unable to connect to the investment server. Please check your internet.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // 2. Navigation logic using Auth State
  const handleGetStarted = (plan) => {
    const planData = {
      id: plan.id,
      title: plan.title,
      min: plan.min,
      max: plan.max,
      roi: plan.roi,
      duration: plan.duration,
      profit: plan.profit,
      isHot: plan.isHot,
      category: plan.category,
    };

    if (user) {
      // User is already logged in
      navigate("/deposit", { state: { selectedPlan: planData } });
    } else {
      // Guest: save plan and go to login
      sessionStorage.setItem("selectedPlan", JSON.stringify(planData));
      navigate("/login");
    }
  };

  // 3. Loading UI
  if (loading) {
    return (
      <div className="plans-loading-container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-white-50 mt-3">
          Syncing current market portfolios...
        </p>
      </div>
    );
  }

  // 4. Error UI (Solves the "Axios Error" blank screen issue)
  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-dark border-secondary p-5">
          <FaExclamationTriangle size={40} className="text-warning mb-3" />
          <h4 className="text-white">Connection Error</h4>
          <p className="text-white-50">{error}</p>
          <button className="btn btn-outline-primary mt-3" onClick={fetchPlans}>
            <FaRedo className="me-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="plans-section py-5">
      <div className="container py-5">
        <div className="text-center mb-5 text-white animate__animated animate__fadeIn">
          <h2 className="display-6 fw-bold">
            Investment <span className="text-primary">Portfolios</span>
          </h2>
          <p className="text-white-50 mx-auto" style={{ maxWidth: "600px" }}>
            High-yield tiered structures designed for capital growth.
          </p>
        </div>

        <div className="row g-4 mt-2">
          {plans.map((plan, index) => (
            <div className="col-xl-4 col-md-6" key={plan.id}>
              <div
                className={`plan-card h-100 ${plan.isHot ? "featured" : ""}`}
              >
                {plan.isHot && (
                  <div className="popular-badge">
                    <span>🔥 Top Choice</span>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div className="icon-wrapper">{plan.icon}</div>
                  <span className="badge category-badge">{plan.category}</span>
                </div>

                <h3 className="plan-title text-white mb-2">{plan.title}</h3>
                <h2 className="roi-text mb-1">
                  {plan.roi}%{" "}
                  <small className="fs-6 text-white-50">/ Day</small>
                </h2>
                <p className="text-info small mb-3">{plan.profit} Net Profit</p>

                <div className="plan-details mb-4">
                  <div className="detail-item">
                    <span>Deposit Range</span>
                    <span className="text-white fw-bold">
                      ${plan.min.toLocaleString()} –{" "}
                      {plan.max ? "$" + plan.max.toLocaleString() : "∞"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span>Duration</span>
                    <span className="text-white">{plan.duration} Days</span>
                  </div>
                </div>

                <button
                  className={`btn w-100 py-3 fw-bold rounded-3 ${
                    plan.isHot ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => handleGetStarted(plan)}
                >
                  Invest Now
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
