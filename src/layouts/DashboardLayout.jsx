import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaHistory,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../css/dashboardLayout.css";
import Chatbot from "../components/Chatbot";

const DashboardLayout = () => {
  const { user, logout, isAdmin } = useAuth();
  // 👈 remove {children} parameter
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/deposit", name: "Deposit", icon: <FaMoneyBillWave /> },
    { path: "/withdraw", name: "Withdraw", icon: <FaHandHoldingUsd /> },
    { path: "/transactions", name: "Transactions", icon: <FaHistory /> },
    { path: "/referrals", name: "Referrals", icon: <FaUsers /> },
    { path: "/settings", name: "Settings", icon: <FaCog /> },
    isAdmin ? [{ path: "/admin", name: "Admin Panel", icon: <FaCog /> }] : [],
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-logo">
            Apex<span>Markets</span>
          </Link>
          <button className="sidebar-close-mobile" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path} // ← add this line
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
          <button onClick={logout} className="sidebar-link logout-btn">
            <span className="sidebar-icon">
              <FaSignOutAlt />
            </span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="header-right">
            <div className="user-info">
              <span className="user-name">{user?.name || "Investor"}</span>
              <span className="user-email">{user?.email || ""}</span>
            </div>
          </div>
        </div>
        <div className="dashboard-content">
          <Outlet /> {/* 👈 This is the key fix – renders the child route */}
        </div>
      </main>
      <Chatbot />
    </div>
  );
};

export default DashboardLayout;
