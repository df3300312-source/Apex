import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEnvelopeOpenText,
  FaCommentDots,
} from "react-icons/fa";
import "../css/adminLayout.css";
// Ensure this path matches your folder structure exactly
import { initAdminData } from "../services/adminService";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize admin data when layout mounts
  useEffect(() => {
    // This call is now safe because we exported it in adminService.js
    initAdminData();
  }, []);

  const navItems = [
    { path: "/admin", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin/users", name: "Manage Users", icon: <FaUsers /> },
    {
      path: "/admin/deposits",
      name: "Manage Deposits",
      icon: <FaMoneyBillWave />,
    },
    {
      path: "/admin/withdrawals",
      name: "Manage Withdrawals",
      icon: <FaHandHoldingUsd />,
    },
    {
      path: "/admin/messages",
      name: "Support Inbox",
      icon: <FaEnvelopeOpenText />,
    },
    {
      path: "/admin/chats",
      name: "Manage Chats",
      icon: <FaCommentDots />,
    },
    { path: "/admin/plans", name: "Manage Plans", icon: <FaChartLine /> },
    { path: "/admin/settings", name: "Settings", icon: <FaCog /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="admin-layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-logo">
            Apex<span>Admin</span>
          </Link>
          <button className="sidebar-close-mobile" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
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

      <main className="admin-main">
        <div className="admin-header">
          <button className="mobile-menu-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="header-right">
            <div className="user-info">
              <span className="user-name">{user?.name || "Administrator"}</span>
              <span className="user-email">
                {user?.email || "admin@apexmarkets.com"}
              </span>
            </div>
          </div>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
