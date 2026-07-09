import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRocket,
  FaGem,
  FaCrown,
  FaChartPie,
  FaGlobe,
  FaBriefcase,
  FaRedo,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Use shared auth state
import api from "../services/api";
import "../css/plans.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Plans = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from context
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper functions
  const getCategoryByMinAmount = (min) => {
    if (min >= 500000) return "High Net Worth";
    if (min >= 100000) return "Enterprise";
    if (min >= 50000) return "Professional";
    if (min >= 15000) return "Advanced";
    if (min >= 5000) return "Intermediate";
    return "Beginner";
  };

  const getPopularityByAmount = (min) => {
    if (min >= 500000) return 10;
    if (min >= 15000) return 60;
    if (min >= 5000) return 95; // Silver/Gold usually most popular
    return 40;
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

  // Fetch plans with the specific fix for res.data.data
  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/plans");

      // FIX: Handle both direct array and { status, data: [] } structure
      const rawPlans = res.data.data || res.data;

      if (!Array.isArray(rawPlans)) {
        throw new Error("Invalid data format received.");
      }

      const mappedPlans = rawPlans.map((plan) => ({
        id: plan.id.toString(),
        title: plan.name,
        category: getCategoryByMinAmount(plan.min_amount),
        icon: getIconForPlan(plan.name),
        min: parseFloat(plan.min_amount),
        max: plan.max_amount ? parseFloat(plan.max_amount) : null,
        roi: plan.roi_percent,
        duration: plan.duration_days,
        profit: `+${(plan.roi_percent * plan.duration_days).toFixed(0)}% total return`,
        popularity: getPopularityByAmount(plan.min_amount),
        isHot: plan.name.toLowerCase().includes("silver"),
      }));

      setPlans(mappedPlans);
    } catch (err) {
      console.error("Failed to load plans:", err);
      setError(
        "Unable to sync investment portfolios. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

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
      // If logged in, go straight to deposit
      navigate("/deposit", { state: { selectedPlan: planData } });
    } else {
      // If guest, save plan and go to login
      sessionStorage.setItem("selectedPlan", JSON.stringify(planData));
      navigate("/login");
    }
  };

  return (
    <div className="plans-page">
      <Navbar />

      <section className="plans-section py-5">
        <div className="text-center mb-5 text-white services-text animate__animated animate__fadeIn">
          <h2 className="display-6 fw-bold texts">
            Global Investment <span className="text-span">Portfolios</span>
          </h2>
          <p className="mx-auto text-white-50" style={{ maxWidth: "600px" }}>
            Securely grow your wealth with our tiered asset management
            structures.
          </p>
        </div>

        <div className="container py-5">
          {loading ? (
            /* Loading State */
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status"></div>
              <p className="text-white-50 mt-3">
                Fetching current market rates...
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="text-center py-5">
              <div className="alert alert-dark border-secondary p-5">
                <FaExclamationTriangle
                  size={40}
                  className="text-warning mb-3"
                />
                <h4 className="text-white">Connection Error</h4>
                <p className="text-white-50">{error}</p>
                <button
                  className="btn btn-outline-info mt-3"
                  onClick={fetchPlans}
                >
                  <FaRedo className="me-2" /> Retry Connection
                </button>
              </div>
            </div>
          ) : (
            /* Main Plans Grid */
            <div className="row g-4 mt-2">
              {plans.map((plan, index) => (
                <div className="col-xl-4 col-md-6" key={plan.id}>
                  <div
                    className={`plan-card h-100 ${plan.isHot ? "featured" : ""}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {plan.isHot && (
                      <div className="popular-badge">
                        <span>🔥 High Demand</span>
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div className="icon-wrapper">{plan.icon}</div>
                      <span className="badge category-badge">
                        {plan.category}
                      </span>
                    </div>

                    <h3 className="plan-title text-white mb-2">{plan.title}</h3>
                    <h2 className="roi-text mb-1">
                      {plan.roi}%{" "}
                      <small className="fs-6 text-white-50">/ Daily</small>
                    </h2>
                    <p className="text-info small mb-3">{plan.profit}</p>

                    <div className="plan-details mb-4">
                      <div className="detail-item">
                        <span>Deposit Range</span>
                        <span className="text-white">
                          ${plan.min.toLocaleString()} –{" "}
                          {plan.max
                            ? "$" + plan.max.toLocaleString()
                            : "Unlimited"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span>Contract Term</span>
                        <span className="text-white">{plan.duration} Days</span>
                      </div>
                    </div>

                    <div className="popularity-bar mb-4">
                      <div className="bar-label">
                        <small className="text-white-50">
                          Market Popularity
                        </small>
                        <small className="text-info">{plan.popularity}%</small>
                      </div>
                      <div
                        className="progress"
                        style={{
                          height: "6px",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                      >
                        <div
                          className="progress-bar bg-info"
                          style={{ width: `${plan.popularity}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      className={`btn w-100 py-3 fw-bold rounded-3 ${
                        plan.isHot ? "btn-primary" : "btn-outline-light"
                      }`}
                      onClick={() => handleGetStarted(plan)}
                    >
                      {user ? "Invest Now" : "Get Started"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Plans;
