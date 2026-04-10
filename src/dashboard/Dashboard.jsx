import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaWallet,
  FaChartLine,
  FaHandHoldingUsd,
  FaHistory,
} from "react-icons/fa";
import "../css/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [activeDeposits, setActiveDeposits] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data – replace with real API calls
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBalance(1250.75);
      setActiveDeposits([
        {
          id: 1,
          plan: "Silver",
          amount: 500,
          dailyReturn: 2.5,
          nextProfit: "2026-04-12",
        },
        {
          id: 2,
          plan: "Gold",
          amount: 1500,
          dailyReturn: 3,
          nextProfit: "2026-04-15",
        },
      ]);
      setRecentTransactions([
        {
          id: 1,
          date: "2026-04-09",
          type: "deposit",
          amount: 500,
          status: "completed",
        },
        {
          id: 2,
          date: "2026-04-08",
          type: "profit",
          amount: 12.5,
          status: "completed",
        },
        {
          id: 3,
          date: "2026-04-07",
          type: "withdrawal",
          amount: 200,
          status: "pending",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const formatCurrency = (value) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (loading) {
    return (
      <div className="dashboard-page py-5">
        <div className="container text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white-50 mt-3">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page py-4">
      <div className="container">
        <h1 className="mb-2 text-white">Dashboard</h1>
        <p className="text-white-50 mb-4">
          Welcome back, {user?.name || "Investor"}!
        </p>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-3">
            <div className="stat-card-dash">
              <FaWallet className="stat-icon-dash" />
              <div>
                <h6>Total Balance</h6>
                <h3>{formatCurrency(balance)}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card-dash">
              <FaChartLine className="stat-icon-dash" />
              <div>
                <h6>Active Investments</h6>
                <h3>{activeDeposits.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card-dash">
              <FaHandHoldingUsd className="stat-icon-dash" />
              <div>
                <h6>Total Earned</h6>
                <h3>$342.50</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="stat-card-dash">
              <FaHistory className="stat-icon-dash" />
              <div>
                <h6>Pending Withdrawals</h6>
                <h3>$200.00</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row g-4 mb-5">
          <div className="col-12">
            <div className="quick-actions">
              <Link to="/deposit" className="btn btn-primary btn-lg px-4">
                Make Deposit
              </Link>
              <Link
                to="/withdraw"
                className="btn btn-outline-warning btn-lg px-4"
              >
                Withdraw Funds
              </Link>
            </div>
          </div>
        </div>

        {/* Active Investments Table */}
        <div className="section-card mb-5">
          <h4>Active Investments</h4>
          <div className="table-responsive">
            <table className="table dash-table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Daily Return</th>
                  <th>Next Profit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeDeposits.length > 0 ? (
                  activeDeposits.map((dep) => (
                    <tr key={dep.id}>
                      <td>{dep.plan}</td>
                      <td>{formatCurrency(dep.amount)}</td>
                      <td>{dep.dailyReturn}%</td>
                      <td>{dep.nextProfit}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-info">
                          Reinvest
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No active investments.{" "}
                      <Link to="/deposit" className="text-info">
                        Make a deposit now
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="section-card">
          <h4>Recent Transactions</h4>
          <div className="table-responsive">
            <table className="table dash-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td className="capitalize">{tx.type}</td>
                    <td>{formatCurrency(tx.amount)}</td>
                    <td>
                      <span
                        className={`badge ${
                          tx.status === "completed"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-end mt-3">
            <Link to="/transactions" className="btn btn-sm btn-outline-info">
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
