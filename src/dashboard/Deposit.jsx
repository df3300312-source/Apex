import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import {
  FaRocket,
  FaGem,
  FaCrown,
  FaChartPie,
  FaGlobe,
  FaBriefcase,
} from "react-icons/fa";
import "../css/deposit.css";

const Deposit = () => {
  const location = useLocation();
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Helper: assign icon based on plan name
  const getIconForPlan = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("starter")) return <FaRocket />;
    if (lower.includes("silver")) return <FaGem />;
    if (lower.includes("gold")) return <FaCrown />;
    if (lower.includes("diamond")) return <FaChartPie />;
    if (lower.includes("institutional")) return <FaGlobe />;
    if (lower.includes("vip")) return <FaBriefcase />;
    return <FaRocket />;
  };

  // Helper: choose color based on plan name
  const getColorForPlan = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("starter")) return "#8a2be2";
    if (lower.includes("silver")) return "#c0c0c0";
    if (lower.includes("gold")) return "#ffd700";
    if (lower.includes("diamond")) return "#00ffff";
    if (lower.includes("institutional")) return "#4caf50";
    if (lower.includes("vip")) return "#ff007f";
    return "#8a2be2";
  };

  // Fetch plans from backend with the implemented fix
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/plans");

        // FIX IMPLEMENTED: Check if the array is in res.data.data or res.data
        const rawPlans = Array.isArray(res.data) ? res.data : res.data.data;

        if (!rawPlans || !Array.isArray(rawPlans)) {
          throw new Error("Invalid data format received from server");
        }

        // Transform backend fields to frontend structure
        const formattedPlans = rawPlans.map((plan) => ({
          id: String(plan.id),
          title: plan.name,
          min: plan.min_amount,
          max: plan.max_amount || null,
          roi: plan.roi_percent,
          duration: plan.duration_days,
          icon: getIconForPlan(plan.name),
          color: getColorForPlan(plan.name),
          category: "",
          profit: "",
          popularity: 0,
          isHot: false,
        }));
        setPlans(formattedPlans);
      } catch (err) {
        console.error("Failed to load plans", err);
        setMessage({
          type: "error",
          text: "Could not load investment plans. Please refresh.",
        });
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  // Load pre‑selected plan from navigation state or sessionStorage
  useEffect(() => {
    const fromState = location.state?.selectedPlan;
    const fromSession = sessionStorage.getItem("selectedPlan");
    let loadedPlanData = null;
    if (fromState) loadedPlanData = fromState;
    else if (fromSession) {
      loadedPlanData = JSON.parse(fromSession);
      sessionStorage.removeItem("selectedPlan");
    }

    if (loadedPlanData && plans.length > 0) {
      // Compare as strings to be safe
      const matchedPlan = plans.find(
        (p) => String(p.id) === String(loadedPlanData.id),
      );
      if (matchedPlan) {
        setSelectedPlan(matchedPlan);
        setMessage({
          type: "success",
          text: `Plan "${matchedPlan.title}" selected. Enter amount to continue.`,
        });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    }
  }, [location.state, plans]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setAmount("");
    setMessage({ type: "", text: "" });
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(e.target.value);
    if (selectedPlan && !isNaN(value)) {
      if (selectedPlan.max && value > selectedPlan.max) {
        setMessage({
          type: "error",
          text: `Amount exceeds maximum of $${selectedPlan.max.toLocaleString()}`,
        });
      } else if (value < selectedPlan.min) {
        setMessage({
          type: "error",
          text: `Minimum deposit for ${selectedPlan.title} is $${selectedPlan.min.toLocaleString()}`,
        });
      } else {
        setMessage({ type: "", text: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      setMessage({ type: "error", text: "Please select an investment plan" });
      return;
    }
    const amountNum = parseFloat(amount);
    if (
      isNaN(amountNum) ||
      amountNum < selectedPlan.min ||
      (selectedPlan.max && amountNum > selectedPlan.max)
    ) {
      setMessage({
        type: "error",
        text: `Please enter a valid amount between $${selectedPlan.min.toLocaleString()} and ${selectedPlan.max ? "$" + selectedPlan.max.toLocaleString() : "unlimited"}`,
      });
      return;
    }

    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Real API call to create deposit
      const res = await api.post("/deposits", {
        planId: selectedPlan.id,
        amount: amountNum,
      });

      setMessage({
        type: "success",
        text:
          res.data.message ||
          `Deposit request created. Please complete the payment.`,
      });

      // If using NowPayments/Gateway, you would redirect here:
      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      }

      setSelectedPlan(null);
      setAmount("");
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text:
          err.response?.data?.message || "Deposit failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPlans) {
    return (
      <div className="deposit-page py-4">
        <div className="container text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading plans...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="deposit-page py-4">
      <div className="container">
        <h1 className="mb-2 text-white">Make a Deposit</h1>
        <p className="text-white-50 mb-4">
          Choose an investment plan and fund your account.
        </p>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="section-card">
              <h4>Select Investment Plan</h4>
              <div className="row g-3 mt-2">
                {plans.map((plan) => (
                  <div className="col-md-6" key={plan.id}>
                    <div
                      className={`plan-card-deposit ${selectedPlan?.id === plan.id ? "selected" : ""}`}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      <div className="plan-icon" style={{ color: plan.color }}>
                        {plan.icon}
                      </div>
                      <h5>{plan.title}</h5>
                      <div className="plan-details-deposit">
                        <span>Min: ${plan.min.toLocaleString()}</span>
                        <span>
                          Max:{" "}
                          {plan.max
                            ? "$" + plan.max.toLocaleString()
                            : "Unlimited"}
                        </span>
                        <span>ROI: {plan.roi}% daily</span>
                        <span>Duration: {plan.duration} days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="section-card">
              <h4>Deposit Details</h4>
              {selectedPlan ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Selected Plan
                    </label>
                    <input
                      type="text"
                      className="form-control deposit-input"
                      value={selectedPlan.title}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      className="form-control deposit-input"
                      placeholder={`Min $${selectedPlan.min.toLocaleString()}`}
                      value={amount}
                      onChange={handleAmountChange}
                      step="any"
                      required
                    />
                    <small className="text-white-50">
                      Min: ${selectedPlan.min.toLocaleString()}{" "}
                      {selectedPlan.max &&
                        `| Max: $${selectedPlan.max.toLocaleString()}`}
                    </small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Expected Daily Return
                    </label>
                    <input
                      type="text"
                      className="form-control deposit-input"
                      value={`${selectedPlan.roi}%`}
                      disabled
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-deposit w-100"
                    disabled={submitting}
                  >
                    {submitting ? "Processing..." : "Proceed to Deposit"}
                  </button>
                  {message.text && (
                    <div
                      className={`alert mt-3 ${message.type === "success" ? "alert-success" : "alert-danger"}`}
                    >
                      {message.text}
                    </div>
                  )}
                </form>
              ) : (
                <div className="text-center text-white-50 py-4">
                  <p>Select a plan to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="section-card">
              <h4>Accepted Payment Methods</h4>
              <div className="payment-methods">
                <span className="payment-badge">Bitcoin (BTC)</span>
                <span className="payment-badge">Ethereum (ETH)</span>
                <span className="payment-badge">USDT (TRC20/ERC20)</span>
                <span className="payment-badge">Binance Coin (BNB)</span>
              </div>
              <p className="text-white-50 small mt-3">
                After clicking "Proceed to Deposit", you will receive payment
                instructions for your selected method.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
