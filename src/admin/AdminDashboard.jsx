import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Link removed as we use navigate now
import api from "../services/api";
import {
  FaUsers,
  FaWallet,
  FaHandHoldingUsd,
  FaClock,
  FaSync,
  FaArrowRight,
  FaUserShield,
  FaChartBar,FaEnvelopeOpenText,
} from "react-icons/fa";
import "../css/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate(); // Now being used below
  const [stats, setStats] = useState({
    users: 0,
    deposits: 0,
    withdrawals: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data.stats);
      setRecent(res.data.recent || []);
      setError(null);
    } catch (err) {
      console.error("Admin Stats Fetch Error:", err);
      setError("Failed to load admin metrics. Check server connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatCurrency = (val) =>
    `$${parseFloat(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="spinner-grow text-primary" role="status"></div>
        <p className="mt-3">Loading Management Console...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0 text-white">Console Overview</h1>
          <p className="text-white-50 small">
            System-wide metrics and recent ledger activity.
          </p>
        </div>
        <button
          className={`btn btn-refresh-admin ${refreshing ? "spinning" : ""}`}
          onClick={() => fetchDashboardData(true)}
        >
          <FaSync className="me-2" />{" "}
          {refreshing ? "Syncing..." : "Refresh Data"}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger border-0 shadow-sm">{error}</div>
      )}

      {/* BIG STATS GRID */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="admin-stat-card primary">
            <div className="stat-content">
              <p>Total Registered Users</p>
              <h3>{stats.users.toLocaleString()}</h3>
            </div>
            <FaUsers className="stat-icon-bg" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat-card success">
            <div className="stat-content">
              <p>Total Volume Inbound</p>
              <h3>{formatCurrency(stats.totalDeposits)}</h3>
            </div>
            <FaWallet className="stat-icon-bg" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat-card danger">
            <div className="stat-content">
              <p>Total Volume Outbound</p>
              <h3>{formatCurrency(stats.totalWithdrawals)}</h3>
            </div>
            <FaHandHoldingUsd className="stat-icon-bg" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="admin-stat-card warning">
            <div className="stat-content">
              <p>Work Queue (Pending)</p>
              <h3>{stats.deposits} Requests</h3>
            </div>
            <FaClock className="stat-icon-bg" />
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS - Updated to use navigate */}
      <div className="row g-4 mb-4">
        <div className="col-md-12">
          <div className="quick-access-bar">
            <div
              onClick={() => navigate("/admin/deposits")}
              className="btn btn-action-card"
            >
              <div className="d-flex align-items-center">
                <div className="icon-box bg-primary">
                  <FaWallet />
                </div>
                <div className="ms-3 text-start">
                  <h6>Manage Deposits</h6>
                  <small>Review and approve payments</small>
                </div>
              </div>
              <FaArrowRight className="arrow" />
            </div>
            <div
              onClick={() => navigate("/admin/withdrawals")}
              className="btn btn-action-card"
            >
              <div className="d-flex align-items-center">
                <div className="icon-box bg-danger">
                  <FaHandHoldingUsd />
                </div>
                <div className="ms-3 text-start">
                  <h6>Process Payouts</h6>
                  <small>Review withdrawal requests</small>
                </div>
              </div>
              <FaArrowRight className="arrow" />
            </div>
            <div
              onClick={() => navigate("/admin/users")}
              className="btn btn-action-card"
            >
              <div className="d-flex align-items-center">
                <div className="icon-box bg-info">
                  <FaUserShield />
                </div>
                <div className="ms-3 text-start">
                  <h6>User Controls</h6>
                  <small>Manage accounts and roles</small>
                </div>
              </div>
              <FaArrowRight className="arrow" />
            </div>
            <div
              onClick={() => navigate("/admin/messages")}
              className="btn btn-action-card"
            >
              <div className="d-flex align-items-center">
                <div className="icon-box bg-info">
                  <FaEnvelopeOpenText/>
                </div>
                <div className="ms-3 text-start">
                  <h6>Support Inbox</h6>
                  <small>View user messages</small>
                </div>
              </div>
              <FaArrowRight className="arrow" />
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY TABLE - Added row navigation */}
      <div className="admin-card">
        <div className="card-header-admin d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <FaChartBar className="me-2 text-primary" /> Global Ledger Activity
          </h4>
          <span className="badge bg-dark">Showing last 10 entries</span>
        </div>
        <div className="table-responsive">
          <table className="table admin-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Investor</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length > 0 ? (
                recent.map((item) => (
                  <tr
                    key={`${item.type}-${item.id}`}
                    onClick={() => navigate(`/admin/${item.type}s`)}
                    style={{ cursor: "pointer" }}
                    title={`Click to manage this ${item.type}`}
                  >
                    <td className="small text-black-50">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="fw-bold">{item.userName}</td>
                    <td>
                      <span className={`type-tag ${item.type}`}>
                        {item.type.toUpperCase()}
                      </span>
                    </td>
                    <td
                      className={`fw-bold ${item.type === "deposit" ? "text-success" : "text-danger"}`}
                    >
                      {item.type === "deposit" ? "+" : "-"}
                      {formatCurrency(item.amount)}
                    </td>
                    <td>
                      <span className={`badge-admin-status ${item.status}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-white-50">
                    No recent transactions detected in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
