import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Investment plans data (same as in InvestmentPlans component)
  const plans = [
    {
      id: "starter",
      title: "Starter",
      min: 100,
      max: 4999,
      roi: 2,
      duration: 7,
      icon: <FaRocket />,
      color: "#8a2be2",
    },
    {
      id: "silver",
      title: "Silver",
      min: 5000,
      max: 14999,
      roi: 2.5,
      duration: 14,
      icon: <FaGem />,
      color: "#c0c0c0",
    },
    {
      id: "gold",
      title: "Gold",
      min: 15000,
      max: 49999,
      roi: 3,
      duration: 30,
      icon: <FaCrown />,
      color: "#ffd700",
    },
    {
      id: "diamond",
      title: "Diamond",
      min: 50000,
      max: 99999,
      roi: 3.5,
      duration: 60,
      icon: <FaChartPie />,
      color: "#00ffff",
    },
    {
      id: "institutional",
      title: "Institutional",
      min: 100000,
      max: 499999,
      roi: 4.2,
      duration: 90,
      icon: <FaGlobe />,
      color: "#4caf50",
    },
    {
      id: "apex-vip",
      title: "Apex VIP",
      min: 500000,
      max: null,
      roi: 5,
      duration: 180,
      icon: <FaBriefcase />,
      color: "#ff007f",
    },
  ];

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

    setLoading(true);
    setMessage({ type: "", text: "" });

    // Simulate API call to create deposit
    try {
      // In real app: await api.createDeposit({ planId: selectedPlan.id, amount: amountNum })
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessage({
        type: "success",
        text: `Deposit of $${amountNum.toLocaleString()} into ${selectedPlan.title} plan initiated. Please complete payment.`,
      });
      setSelectedPlan(null);
      setAmount("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Deposit failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-page py-4">
      <div className="container">
        <h1 className="mb-2 text-white">Make a Deposit</h1>
        <p className="text-white-50 mb-4">
          Choose an investment plan and fund your account.
        </p>

        <div className="row g-4">
          {/* Plan Selection Cards */}
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

          {/* Deposit Form */}
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
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Proceed to Deposit"}
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

        {/* Payment Methods Info */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="section-card">
              <h4>Accepted Payment Methods</h4>
              <div className="payment-methods">
                <span className="payment-badge">Bitcoin (BTC)</span>
                <span className="payment-badge">Ethereum (ETH)</span>
                <span className="payment-badge">USDT (TRC20/ERC20)</span>
                <span className="payment-badge">Binance Coin (BNB)</span>
                <span className="payment-badge">Credit/Debit Card</span>
                <span className="payment-badge">Bank Transfer</span>
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
