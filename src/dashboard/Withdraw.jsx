import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import {
  FaBitcoin,
  FaEthereum,
  FaWallet,
  FaHistory,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import "../css/withdraw.css";

const Withdraw = () => {
  const { user, refreshUser } = useAuth(); // Using refreshUser to update global balance
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [withdrawals, setWithdrawals] = useState([]);

  const withdrawalMethods = [
    { id: "BTC", name: "Bitcoin", icon: <FaBitcoin />, min: 50, fee: 0.0002 },
    { id: "ETH", name: "Ethereum", icon: <FaEthereum />, min: 50, fee: 0.005 },
    { id: "USDT", name: "USDT (TRC20)", icon: <FaWallet />, min: 50, fee: 1.0 },
    {
      id: "BNB",
      name: "Binance Coin",
      icon: <SiBinance />,
      min: 50,
      fee: 0.01,
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const [balRes, withRes] = await Promise.all([
        api.get("/user/balance"),
        api.get("/withdrawals"),
      ]);
      setBalance(parseFloat(balRes.data.balance || 0));
      // Map based on our backend controller response structure
      setWithdrawals(withRes.data.withdrawals || withRes.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate what the user actually gets
  const selectedMethodObj = withdrawalMethods.find((m) => m.id === method);
  const fee = selectedMethodObj ? selectedMethodObj.fee : 0;
  const netAmount =
    amount > fee ? (parseFloat(amount) - fee).toFixed(2) : "0.00";

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    if (parseFloat(val) > balance) {
      setMessage({ type: "error", text: "Amount exceeds available balance" });
    } else {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!method || !amount || !address) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await api.post("/withdrawals", {
        amount: parseFloat(amount),
        method,
        address,
      });

      setMessage({
        type: "success",
        text: "Withdrawal request submitted! It will be reviewed by admin.",
      });
      setAmount("");
      setMethod("");
      setAddress("");

      // Refresh data to show the new pending request and new balance
      await fetchData();
      if (refreshUser) refreshUser();
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message || "Request failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) =>
    `$${parseFloat(val).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  return (
    <div className="withdraw-page py-4">
      <div className="container">
        <h1 className="text-white mb-1">Withdraw Funds</h1>
        <p className="text-white-50 mb-4">
          Transfer your earnings to your external wallet.
        </p>

        <div className="row g-4">
          {/* LEFT: Balance & Preview */}
          <div className="col-lg-5">
            <div className="section-card balance-info-card">
              <div className="d-flex align-items-center mb-3">
                <div className="balance-icon-bg">
                  <FaWallet />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 text-white-50">Available to Withdraw</h6>
                  <h2 className="mb-0 text-white">{formatCurrency(balance)}</h2>
                </div>
              </div>

              {amount > 0 && method && (
                <div className="withdrawal-preview animate__animated animate__fadeIn">
                  <div className="preview-row">
                    <span>Request Amount:</span>
                    <span>{formatCurrency(amount)}</span>
                  </div>
                  <div className="preview-row">
                    <span>Network Fee:</span>
                    <span className="text-warning">
                      -
                      {method === "BTC" || method === "ETH"
                        ? `${fee} ${method}`
                        : `$${fee}`}
                    </span>
                  </div>
                  <hr />
                  <div className="preview-row total">
                    <span>Estimated Payout:</span>
                    <span className="text-success">
                      {formatCurrency(netAmount)}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 bg-dark-soft rounded">
                <small className="text-white-50 d-flex">
                  <FaInfoCircle className="me-2 mt-1" />
                  Processing usually takes 24 hours. Ensure your wallet address
                  is correct; once sent, crypto transactions cannot be reversed.
                </small>
              </div>
            </div>
          </div>

          {/* RIGHT: Request Form */}
          <div className="col-lg-7">
            <div className="section-card">
              <h4 className="mb-4">Request Payout</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white-50">
                      Amount (USD)
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-white">
                        $
                      </span>
                      <input
                        type="number"
                        className="form-control withdraw-input"
                        placeholder="0.00"
                        value={amount}
                        onChange={handleAmountChange}
                        min="50"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white-50">
                      Payout Asset
                    </label>
                    <select
                      className="form-select withdraw-input"
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      required
                    >
                      <option value="">Choose Method</option>
                      {withdrawalMethods.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label text-white-50">
                    Destination Wallet Address
                  </label>
                  <input
                    type="text"
                    className="form-control withdraw-input"
                    placeholder="Enter your long wallet address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-withdraw w-100 py-3"
                  disabled={loading || !amount || parseFloat(amount) > balance}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Confirm Withdrawal"
                  )}
                </button>

                {message.text && (
                  <div
                    className={`alert mt-3 alert-${message.type === "success" ? "success" : "danger"}`}
                  >
                    {message.type === "success" && (
                      <FaCheckCircle className="me-2" />
                    )}
                    {message.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* HISTORY TABLE */}
        <div className="section-card mt-5">
          <div className="d-flex align-items-center mb-4">
            <FaHistory className="me-2 text-primary" />
            <h4 className="mb-0">Recent Payouts</h4>
          </div>
          <div className="table-responsive">
            <table className="table withdrawals-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.length > 0 ? (
                  withdrawals.map((w) => (
                    <tr key={w.id}>
                      <td className="text-white-50">
                        {new Date(w.created_at).toLocaleDateString()}
                      </td>
                      <td className="fw-bold">{w.method}</td>
                      <td>{formatCurrency(w.amount)}</td>
                      <td>
                        <span className={`badge-status ${w.status}`}>
                          {w.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-white-50">
                      No withdrawal history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
