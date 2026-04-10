import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
import {
  FaBitcoin,
  FaEthereum,
  FaPaypal,
  FaUniversity,
  FaWallet,
} from "react-icons/fa";
import "../css/withdraw.css";

const Withdraw = () => {
  // Removed unused 'user' variable
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Mock balance – replace with API call
  useEffect(() => {
    // Simulate fetching balance
    setTimeout(() => {
      setBalance(1250.75);
    }, 500);
  }, []);

  const withdrawalMethods = [
    {
      id: "btc",
      name: "Bitcoin (BTC)",
      icon: <FaBitcoin />,
      min: 50,
      max: 10000,
      fee: 0.0005,
    },
    {
      id: "eth",
      name: "Ethereum (ETH)",
      icon: <FaEthereum />,
      min: 50,
      max: 10000,
      fee: 0.005,
    },
    {
      id: "usdt",
      name: "USDT (TRC20/ERC20)",
      icon: <FaWallet />,
      min: 50,
      max: 10000,
      fee: 1,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <FaPaypal />,
      min: 50,
      max: 5000,
      fee: 2.5,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <FaUniversity />,
      min: 100,
      max: 50000,
      fee: 5,
    },
  ];

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    setAddress("");
    setMessage({ type: "", text: "" });
  };

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(e.target.value);
    if (!isNaN(val)) {
      if (val > balance) {
        setMessage({
          type: "error",
          text: `Amount exceeds your available balance of $${balance.toFixed(2)}`,
        });
      } else if (val < 50) {
        setMessage({ type: "error", text: "Minimum withdrawal amount is $50" });
      } else {
        setMessage({ type: "", text: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 50) {
      setMessage({
        type: "error",
        text: "Please enter a valid amount (minimum $50)",
      });
      return;
    }
    if (amountNum > balance) {
      setMessage({ type: "error", text: "Insufficient balance" });
      return;
    }
    if (!method) {
      setMessage({ type: "error", text: "Please select a withdrawal method" });
      return;
    }
    const selectedMethod = withdrawalMethods.find((m) => m.id === method);
    if (selectedMethod.id !== "bank" && !address) {
      setMessage({ type: "error", text: "Please provide your wallet address" });
      return;
    }
    if (selectedMethod.id === "bank" && !address) {
      setMessage({
        type: "error",
        text: "Please provide bank account details",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessage({
        type: "success",
        text: `Withdrawal request of $${amountNum.toFixed(2)} submitted successfully. Processing time: 24-48 hours.`,
      });
      setAmount("");
      setMethod("");
      setAddress("");
      // Optionally update balance (mock)
      setBalance((prev) => prev - amountNum);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Withdrawal failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page py-4">
      <div className="container">
        <h1 className="mb-2 text-white">Withdraw Funds</h1>
        <p className="text-white-50 mb-4">
          Request a withdrawal to your preferred payment method.
        </p>

        <div className="row g-4">
          {/* Balance Card */}
          <div className="col-lg-5">
            <div className="section-card balance-card">
              <h4>Available Balance</h4>
              <div className="balance-amount">${balance.toFixed(2)}</div>
              <p className="text-white-50 small mt-2">
                Minimum withdrawal: $50
              </p>
              <hr className="bg-secondary" />
              <div className="info-text">
                <small>
                  Withdrawals are processed within 24-48 hours after approval.
                </small>
              </div>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="col-lg-7">
            <div className="section-card">
              <h4>Withdrawal Request</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-white">Amount (USD)</label>
                  <input
                    type="number"
                    className="form-control withdraw-input"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                    step="any"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-white">
                    Withdrawal Method
                  </label>
                  <select
                    className="form-select withdraw-input"
                    value={method}
                    onChange={handleMethodChange}
                    required
                  >
                    <option value="">Select a method</option>
                    {withdrawalMethods.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} (Min: ${m.min} | Fee: {m.fee}{" "}
                        {m.id === "btc"
                          ? "BTC"
                          : m.id === "eth"
                            ? "ETH"
                            : "$" + m.fee}
                        )
                      </option>
                    ))}
                  </select>
                </div>

                {(method === "btc" ||
                  method === "eth" ||
                  method === "usdt") && (
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      className="form-control withdraw-input"
                      placeholder="Enter your wallet address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                )}

                {method === "paypal" && (
                  <div className="mb-3">
                    <label className="form-label text-white">
                      PayPal Email
                    </label>
                    <input
                      type="email"
                      className="form-control withdraw-input"
                      placeholder="your@email.com"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                )}

                {method === "bank" && (
                  <div className="mb-3">
                    <label className="form-label text-white">
                      Bank Account Details
                    </label>
                    <textarea
                      className="form-control withdraw-input"
                      rows="3"
                      placeholder="Account holder name, bank name, account number, routing number, etc."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></textarea>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-withdraw w-100"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Request Withdrawal"}
                </button>

                {message.text && (
                  <div
                    className={`alert mt-3 ${message.type === "success" ? "alert-success" : "alert-danger"}`}
                  >
                    {message.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="section-card">
              <h5>Withdrawal Information</h5>
              <ul className="info-list">
                <li>Processing time: 24-48 business hours</li>
                <li>Minimum withdrawal: $50</li>
                <li>Fees vary by method (shown above)</li>
                <li>
                  You may be required to complete KYC before first withdrawal
                </li>
                <li>Withdrawals are sent after security review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
