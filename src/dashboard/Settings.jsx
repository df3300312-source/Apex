import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaBell,
  FaGlobe,
  FaMobileAlt,
} from "react-icons/fa";
import "../css/settings.css";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile form state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    timezone: "UTC-5",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailDeposit: true,
    emailWithdrawal: true,
    emailProfit: true,
    emailSecurity: true,
    pushDeposit: false,
    pushWithdrawal: false,
  });

  // Load user data (mock)
  useEffect(() => {
    // Simulate fetching user settings
    setTimeout(() => {
      setProfile({
        name: user?.name || "John Doe",
        email: user?.email || "john@example.com",
        phone: "+1 (555) 123-4567",
        country: "United States",
        timezone: "America/New_York",
      });
    }, 500);
  }, [user]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to update profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Current password is incorrect.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (e) => {
    e.preventDefault();
    if (!twoFactorCode || twoFactorCode.length !== 6) {
      setMessage({ type: "error", text: "Please enter a valid 6-digit code." });
      return;
    }
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTwoFactorEnabled(true);
      setMessage({ type: "success", text: "2FA enabled successfully!" });
      setTwoFactorCode("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Invalid verification code.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTwoFactorEnabled(false);
      setMessage({ type: "success", text: "2FA disabled." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to disable 2FA.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMessage({ type: "success", text: "Notification preferences saved!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to save preferences.",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => {
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="settings-page py-4">
      <div className="container">
        <h1 className="mb-4 text-white">Account Settings</h1>

        {message.text && (
          <div className={`alert alert-${message.type} mb-4`} role="alert">
            {message.text}
            <button
              type="button"
              className="btn-close float-end"
              onClick={clearMessage}
            ></button>
          </div>
        )}

        <div className="row g-4">
          {/* Sidebar Tabs */}
          <div className="col-md-3">
            <div className="settings-sidebar">
              <button
                className={`sidebar-tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <FaUser /> Profile
              </button>
              <button
                className={`sidebar-tab ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <FaLock /> Security
              </button>
              <button
                className={`sidebar-tab ${activeTab === "2fa" ? "active" : ""}`}
                onClick={() => setActiveTab("2fa")}
              >
                <FaShieldAlt /> Two-Factor Auth
              </button>
              <button
                className={`sidebar-tab ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <FaBell /> Notifications
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-md-9">
            <div className="settings-content">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="settings-card">
                  <h3>Profile Information</h3>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control settings-input"
                          value={profile.name}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control settings-input"
                          value={profile.email}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control settings-input"
                          value={profile.phone}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Country</label>
                        <select
                          name="country"
                          className="form-select settings-input"
                          value={profile.country}
                          onChange={handleProfileChange}
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Nigeria</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-save"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Security / Change Password Tab */}
              {activeTab === "security" && (
                <div className="settings-card">
                  <h3>Change Password</h3>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        className="form-control settings-input"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-control settings-input"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <small className="text-white-50">
                        Minimum 6 characters
                      </small>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control settings-input"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-save"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>
              )}

              {/* Two-Factor Auth Tab */}
              {activeTab === "2fa" && (
                <div className="settings-card">
                  <h3>Two-Factor Authentication</h3>
                  {!twoFactorEnabled ? (
                    <>
                      <p className="text-white-50">
                        Enhance your account security by enabling 2FA. Use an
                        authenticator app like Google Authenticator or Authy.
                      </p>
                      <div className="qr-placeholder">
                        <div className="mock-qr">
                          [QR Code would appear here]
                        </div>
                        <p className="small text-white-50">
                          Secret Key: <code>ABCD EFGH IJKL MNOP</code>
                        </p>
                      </div>
                      <form onSubmit={handleTwoFactorSubmit}>
                        <div className="mb-3">
                          <label className="form-label">
                            Verification Code
                          </label>
                          <input
                            type="text"
                            className="form-control settings-input"
                            placeholder="6-digit code"
                            value={twoFactorCode}
                            onChange={(e) => setTwoFactorCode(e.target.value)}
                            maxLength="6"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-save"
                          disabled={loading}
                        >
                          {loading ? "Verifying..." : "Enable 2FA"}
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="alert alert-success mb-3">
                        ✅ 2FA is currently ENABLED
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={handleDisable2FA}
                        disabled={loading}
                      >
                        {loading ? "Disabling..." : "Disable 2FA"}
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="settings-card">
                  <h3>Notification Preferences</h3>
                  <form onSubmit={handleNotificationSubmit}>
                    <div className="mb-4">
                      <h5>Email Notifications</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="emailDeposit"
                          checked={notifications.emailDeposit}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label text-white">
                          Deposit confirmation
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="emailWithdrawal"
                          checked={notifications.emailWithdrawal}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label text-white">
                          Withdrawal updates
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="emailProfit"
                          checked={notifications.emailProfit}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label text-white">
                          Daily profit credits
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="emailSecurity"
                          checked={notifications.emailSecurity}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label text-white">
                          Security alerts
                        </label>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h5>Push Notifications</h5>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="pushDeposit"
                          checked={notifications.pushDeposit}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label text-white">
                          Deposit confirmations
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="pushWithdrawal"
                          checked={notifications.pushWithdrawal}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label text-white">
                          Withdrawal updates
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-save"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Preferences"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
