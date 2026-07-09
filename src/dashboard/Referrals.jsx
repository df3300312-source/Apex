import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import {
  FaCopy,
  FaUsers,
  FaMoneyBillWave,
  FaGift,
  FaCheckCircle,
  FaLink,
} from "react-icons/fa";
import "../css/referrals.css";

const Referrals = () => {
  const { user } = useAuth();
  const [referralData, setReferralData] = useState({
    link: "",
    code: "",
    referredUsers: [],
    totalCommission: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // --- Updated useEffect in Referrals.jsx ---
  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const res = await api.get("/user/referrals");

        // We look at res.data because Axios wraps the backend JSON in a .data object
        const data = res.data;

        setReferralData({
          link: data.referralLink || "",
          code: data.referralCode || "N/A",
          // This is where the fix happens: ensuring we map the right array
          referredUsers: data.referredUsers || [],
          totalCommission: data.totalCommission || 0,
        });

        setError(null);
      } catch (err) {
        console.error("Failed to load referral data", err);
        setError("Could not load referral data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchReferralData();
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralData.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num)
      ? "$0.00"
      : `$${num.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <div className="referrals-loading text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="text-white-50 mt-3">Loading your referral network...</p>
      </div>
    );
  }

  return (
    <div className="referrals-page py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="text-white mb-1">Referral Program</h1>
            <p className="text-white-50">
              Grow the ApexMarkets community and earn rewards.
            </p>
          </div>
          <div className="referral-badge">
            <FaGift className="me-2" /> 10% Commission
          </div>
        </div>

        {/* Stats Summary */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="stat-card-ref">
              <FaUsers className="stat-icon-ref text-primary" />
              <div>
                <h6>Total Referrals</h6>
                <h3>{referralData.referredUsers.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card-ref">
              <FaMoneyBillWave className="stat-icon-ref text-success" />
              <div>
                <h6>Earned Commissions</h6>
                <h3>{formatCurrency(referralData.totalCommission)}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card-ref">
              <FaLink className="stat-icon-ref text-info" />
              <div>
                <h6>Referral Code</h6>
                <h3>{referralData.code}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="section-card mb-5">
          <h4 className="mb-3">Your Unique Referral Link</h4>
          <div className="referral-link-container">
            <div className="referral-input-group">
              <input
                type="text"
                className="form-control referral-input"
                value={referralData.link}
                readOnly
              />
              <button
                className={`btn btn-copy-ref ${copied ? "active" : ""}`}
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <FaCheckCircle /> Copied
                  </>
                ) : (
                  <>
                    <FaCopy /> Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center text-white-50 small">
            <FaCheckCircle className="text-success me-2" />
            <span>
              Copy this link and share it with your friends to earn 10% on their
              first deposit.
            </span>
          </div>
        </div>

        {/* Referred Users Table */}
        <div className="section-card">
          <h4 className="mb-4">My Referrals</h4>
          <div className="table-responsive">
            <table className="table referrals-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {referralData.referredUsers.length > 0 ? (
                  referralData.referredUsers.map((ref, index) => (
                    <tr key={index}>
                      <td className="fw-bold">{ref.name}</td>
                      <td className="text-white-50">{ref.email}</td>
                      <td>{ref.joinDate}</td>
                      <td>
                        <span className="badge bg-success-soft">
                          Registered
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-white-50">
                      No referrals found. Start inviting friends to see them
                      here!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="info-step">
              <div className="step-number">1</div>
              <h5>Share Link</h5>
              <p>
                Send your referral link to your friends or post it on social
                media.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-step">
              <div className="step-number">2</div>
              <h5>They Register</h5>
              <p>
                Your friends sign up and create their secure investment account.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-step">
              <div className="step-number">3</div>
              <h5>You Earn</h5>
              <p>
                Receive an instant 10% commission when they make their first
                deposit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
