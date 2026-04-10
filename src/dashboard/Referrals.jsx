import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaCopy,
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import "../css/referrals.css";

const Referrals = () => {
  const { user } = useAuth();
  const [referralLink, setReferralLink] = useState("");
  const [stats, setStats] = useState({
    totalReferrals: 0,
    totalCommission: 0,
    pendingCommission: 0,
    paidCommission: 0,
  });
  const [referredUsers, setReferredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mock data – replace with API calls
  useEffect(() => {
    // Simulate fetching referral data
    setTimeout(() => {
      setReferralLink(
        `${window.location.origin}/register?ref=${user?.id || "demo123"}`,
      );
      setStats({
        totalReferrals: 12,
        totalCommission: 345.75,
        pendingCommission: 89.5,
        paidCommission: 256.25,
      });
      setReferredUsers([
        {
          id: 1,
          name: "John Smith",
          email: "john***@example.com",
          date: "2026-03-15",
          amount: 500,
          commission: 10,
          status: "active",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah***@example.com",
          date: "2026-03-18",
          amount: 1500,
          commission: 30,
          status: "active",
        },
        {
          id: 3,
          name: "Michael Chen",
          email: "michael***@example.com",
          date: "2026-03-22",
          amount: 250,
          commission: 5,
          status: "pending",
        },
        {
          id: 4,
          name: "Emily Rodriguez",
          email: "emily***@example.com",
          date: "2026-03-25",
          amount: 5000,
          commission: 100,
          status: "active",
        },
        {
          id: 5,
          name: "David Okafor",
          email: "david***@example.com",
          date: "2026-03-28",
          amount: 1000,
          commission: 20,
          status: "active",
        },
        {
          id: 6,
          name: "Linda Martinez",
          email: "linda***@example.com",
          date: "2026-04-01",
          amount: 300,
          commission: 6,
          status: "pending",
        },
      ]);
      setLoading(false);
    }, 800);
  }, [user]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatCurrency = (value) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (loading) {
    return (
      <div className="referrals-page py-5">
        <div className="container text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white-50 mt-3">Loading referral data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="referrals-page py-4">
      <div className="container">
        <h1 className="mb-2 text-white">Referral Program</h1>
        <p className="text-white-50 mb-4">
          Invite friends and earn 2% commission on every deposit they make.
        </p>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="stat-card-ref">
              <FaUsers className="stat-icon-ref" />
              <div>
                <h6>Total Referrals</h6>
                <h3>{stats.totalReferrals}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card-ref">
              <FaMoneyBillWave className="stat-icon-ref" />
              <div>
                <h6>Total Commission</h6>
                <h3>{formatCurrency(stats.totalCommission)}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card-ref">
              <FaClock className="stat-icon-ref" />
              <div>
                <h6>Pending</h6>
                <h3>{formatCurrency(stats.pendingCommission)}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card-ref">
              <FaCheckCircle className="stat-icon-ref" />
              <div>
                <h6>Paid</h6>
                <h3>{formatCurrency(stats.paidCommission)}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link Card */}
        <div className="section-card mb-5">
          <h4>Your Referral Link</h4>
          <div className="referral-link-wrapper">
            <input
              type="text"
              className="referral-link-input"
              value={referralLink}
              readOnly
            />
            <button className="btn btn-copy" onClick={handleCopyLink}>
              {copied ? <FaCheckCircle /> : <FaCopy />}
              {copied ? " Copied!" : " Copy"}
            </button>
          </div>
          <p className="text-white-50 small mt-3">
            Share this link with friends. When they sign up and make a deposit,
            you earn 2% commission instantly!
          </p>
        </div>

        {/* Referred Users Table */}
        <div className="section-card">
          <h4>Referred Users</h4>
          <div className="table-responsive">
            <table className="referrals-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Date Joined</th>
                  <th>Deposit</th>
                  <th>Commission</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {referredUsers.length > 0 ? (
                  referredUsers.map((ref) => (
                    <tr key={ref.id}>
                      <td>{ref.name}</td>
                      <td>{ref.email}</td>
                      <td>{ref.date}</td>
                      <td>{formatCurrency(ref.amount)}</td>
                      <td className="text-success">
                        {formatCurrency(ref.commission)}
                      </td>
                      <td>
                        <span
                          className={`status-badge ${ref.status === "active" ? "completed" : "pending"}`}
                        >
                          {ref.status === "active" ? "Earned" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      No referrals yet. Share your link to start earning!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="section-card">
              <h5>How It Works</h5>
              <ul className="info-list">
                <li>
                  Share your unique referral link with friends, family, or
                  social media.
                </li>
                <li>
                  When they register using your link and make a deposit, you
                  earn 2% commission.
                </li>
                <li>
                  Commissions are credited instantly to your account balance.
                </li>
                <li>No limit on how many people you can refer!</li>
                <li>Track all your referrals and earnings in real-time.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
