import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import {
  FaWallet,
  FaChartLine,
  FaHandHoldingUsd,
  FaHistory,
  FaSync,
} from "react-icons/fa";
import "../css/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    balance: 0,
    totalEarned: 0,
    activeInvestmentsCount: 0,
    pendingWithdrawals: 0,
  });
  const [activeDeposits, setActiveDeposits] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Optimized fetch using our /overview endpoint
  const fetchDashboardData = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) setRefreshing(true);
    try {
      const [overviewRes, investmentsRes, transactionsRes] = await Promise.all([
        api.get("/user/overview"),
        api.get("/user/active-investments"),
        api.get("/user/transactions?limit=5"),
      ]);

      // Set Stats from overview
      setStats({
        balance: overviewRes.data.balance || 0,
        totalEarned: overviewRes.data.totalEarned || 0,
        activeInvestmentsCount: overviewRes.data.activeInvestmentsCount || 0,
        pendingWithdrawals: overviewRes.data.pendingWithdrawals || 0,
      });

      // Set Tables
      setActiveDeposits(investmentsRes.data || []);

      // Handle nested transaction data from our paginated backend
      const txData =
        transactionsRes.data.transactions || transactionsRes.data || [];
      setRecentTransactions(txData);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatCurrency = (value) =>
    `$${parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const getStatusBadge = (status, type) => {
    if (type === "profit")
      return <span className="badge bg-success">Earned</span>;
    if (status === "completed" || status === "approved")
      return <span className="badge bg-success">Completed</span>;
    if (status === "pending")
      return <span className="badge bg-warning text-dark">Pending</span>;
    if (status === "failed" || status === "rejected")
      return <span className="badge bg-danger">Failed</span>;
    return <span className="badge bg-secondary">{status}</span>;
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case "profit":
        return "text-success";
      case "withdrawal":
        return "text-danger";
      case "deposit":
        return "text-primary";
      case "referral_commission":
        return "text-info";
      default:
        return "text-white";
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary"></div>
        <p>Syncing your portfolio...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="text-white mb-0">Dashboard</h1>
            <p className="text-white-50">Welcome back, {user?.name}!</p>
          </div>
          <button
            className={`btn btn-refresh ${refreshing ? "rotating" : ""}`}
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
          >
            <FaSync /> {refreshing ? "Syncing..." : "Refresh"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-3">
            <div className="stat-card-dash">
              <FaWallet className="stat-icon-dash text-primary" />
              <div>
                <h6>Current Balance</h6>
                <h3>{formatCurrency(stats.balance)}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card-dash">
              <FaChartLine className="stat-icon-dash text-info" />
              <div>
                <h6>Active Plans</h6>
                <h3>{stats.activeInvestmentsCount}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card-dash">
              <FaHandHoldingUsd className="stat-icon-dash text-success" />
              <div>
                <h6>Total Profits</h6>
                <h3>{formatCurrency(stats.totalEarned)}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card-dash">
              <FaHistory className="stat-icon-dash text-warning" />
              <div>
                <h6>In Payout</h6>
                <h3>{formatCurrency(stats.pendingWithdrawals)}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="d-flex gap-3 mb-5">
          <Link to="/deposit" className="btn btn-primary btn-lg">
            Make Deposit
          </Link>
          <Link to="/withdraw" className="btn btn-outline-light btn-lg">
            Withdraw
          </Link>
        </div>

        {/* Active Investments */}
        <div className="section-card mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Active Investments</h4>
            <span className="badge bg-primary">
              {activeDeposits.length} Running
            </span>
          </div>
          <div className="table-responsive">
            <table className="table dash-table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Daily ROI</th>
                  <th>Ends In</th>
                  <th>Next Payout</th>
                </tr>
              </thead>
              <tbody>
                {activeDeposits.length > 0 ? (
                  activeDeposits.map((dep) => (
                    <tr key={dep.id}>
                      <td className="fw-bold">{dep.planName}</td>
                      <td>{formatCurrency(dep.amount)}</td>
                      <td className="text-success">+{dep.daily_percent}%</td>
                      <td>{dep.daysRemaining} Days</td>
                      <td className="text-info">{dep.nextPayout}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-white-50">
                      No active investments found.{" "}
                      <Link to="/deposit">Start Investing</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="section-card">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Recent Transactions</h4>
            <Link to="/transactions" className="btn btn-sm btn-outline-primary">
              View All
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table dash-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>New Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="small">{tx.date}</td>
                      <td
                        className={`text-uppercase small fw-bold ${getTransactionColor(tx.type)}`}
                      >
                        {tx.type.replace("_", " ")}
                      </td>
                      <td className={getTransactionColor(tx.type)}>
                        {tx.type === "withdrawal" ? "-" : "+"}
                        {formatCurrency(tx.amount)}
                      </td>
                      <td className="text-white-50">
                        {formatCurrency(tx.balance_after)}
                      </td>
                      <td>{getStatusBadge(tx.status, tx.type)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-white-50">
                      No activity yet.
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

export default Dashboard;
