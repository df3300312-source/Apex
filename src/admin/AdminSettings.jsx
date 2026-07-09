import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import {
  FaSave,
  FaUndo,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import "../css/admin.css";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "ApexMarkets",
    siteLogo: "/logo.png",
    contactEmail: "support@apexmarkets.com",
    contactPhone: "+1 (888) 123-4567",
    minDeposit: 100,
    minWithdraw: 50,
    referralCommission: 2,
    currency: "USD",
    withdrawFee: 0,
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: false,
    kycRequired: false,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 1. Fetch settings from MySQL Backend
  const fetchSettings = useCallback(async () => {
    try {
      setFetching(true);
      const res = await api.get("/admin/settings");

      // If backend returns data, merge it with defaults to avoid blank fields
      if (res.data && Object.keys(res.data).length > 0) {
        setSettings((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error("Settings Load Error:", err);
      setMessage({
        type: "danger",
        text: "Database connection failed. Using local defaults.",
      });
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue =
      type === "checkbox"
        ? checked
        : type === "number"
          ? parseFloat(value)
          : value;

    setSettings((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
    if (message.text) setMessage({ type: "", text: "" }); // Clear alerts on change
  };

  // 2. Optimized Save (Updates multiple rows in DB)
  const handleSave = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (settings.referralCommission < 0 || settings.minDeposit < 1) {
      return setMessage({
        type: "danger",
        text: "Please enter valid positive numbers for financial limits.",
      });
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Sends the entire object to the backend loop
      await api.put("/admin/settings", settings);

      setMessage({
        type: "success",
        text: "Configuration updated successfully!",
      });
      // Refresh to ensure we see what is actually in the DB
      fetchSettings();
    } catch (err) {
      console.error("Save Error:", err);
      setMessage({
        type: "danger",
        text: "Failed to update server configuration.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 5000);
    }
  };

  // 3. Secure Reset
  const handleReset = async () => {
    const confirm = window.confirm(
      "Are you sure? This will revert all site limits, fees, and contact info to original defaults.",
    );

    if (!confirm) return;

    const defaultSettings = {
      siteName: "ApexMarkets",
      siteLogo: "/logo.png",
      contactEmail: "support@apexmarkets.com",
      contactPhone: "+1 (888) 123-4567",
      minDeposit: 100,
      minWithdraw: 50,
      referralCommission: 2,
      currency: "USD",
      withdrawFee: 0,
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: false,
      kycRequired: false,
    };

    try {
      setLoading(true);
      // We use the standard PUT route to push the defaults back to the DB
      await api.put("/admin/settings", defaultSettings);
      setSettings(defaultSettings);
      setMessage({
        type: "success",
        text: "Settings restored to system defaults.",
      });
    } catch (err) {
      setMessage({ type: "danger", text: "Reset failed on server." });
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="text-white-50 mt-2">Loading system configuration...</p>
      </div>
    );

  return (
    <div className="admin-settings-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-white mb-0">Platform Settings</h1>
        {settings.maintenanceMode && (
          <span className="badge bg-warning text-dark">
            <FaExclamationTriangle className="me-1" /> MAINTENANCE MODE ACTIVE
          </span>
        )}
      </div>

      <div className="admin-card">
        {message.text && (
          <div
            className={`alert alert-${message.type} animate__animated animate__fadeIn`}
          >
            {message.type === "success" ? (
              <FaCheckCircle className="me-2" />
            ) : (
              <FaExclamationTriangle className="me-2" />
            )}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="row g-4">
            {/* General Settings */}
            <div className="col-md-6">
              <div className="settings-group-box">
                <h5 className="section-title">General Configuration</h5>
                <div className="mb-3">
                  <label className="form-label">Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    className="form-control admin-input"
                    value={settings.siteName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Support Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    className="form-control admin-input"
                    value={settings.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Currency Code</label>
                  <select
                    name="currency"
                    className="form-select admin-input"
                    value={settings.currency}
                    onChange={handleChange}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BTC">BTC (₿)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Limits */}
            <div className="col-md-6">
              <div className="settings-group-box">
                <h5 className="section-title">Financial & Commission</h5>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Min. Deposit</label>
                    <input
                      type="number"
                      name="minDeposit"
                      className="form-control admin-input"
                      value={settings.minDeposit}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Min. Withdraw</label>
                    <input
                      type="number"
                      name="minWithdraw"
                      className="form-control admin-input"
                      value={settings.minWithdraw}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Referral Bonus (%)</label>
                  <div className="input-group">
                    <input
                      type="number"
                      name="referralCommission"
                      className="form-control admin-input"
                      value={settings.referralCommission}
                      onChange={handleChange}
                      step="0.1"
                    />
                    <span className="input-group-text bg-dark border-secondary text-white-50">
                      %
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Global Withdrawal Fee</label>
                  <input
                    type="number"
                    name="withdrawFee"
                    className="form-control admin-input"
                    value={settings.withdrawFee}
                    onChange={handleChange}
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="col-12">
              <div className="settings-group-box bg-dark-soft">
                <h5 className="section-title">System Status & Security</h5>
                <div className="row g-3">
                  <div className="col-md-3">
                    <div className="form-check form-switch custom-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="maintenanceMode"
                        id="mnt"
                        checked={settings.maintenanceMode}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label text-white"
                        htmlFor="mnt"
                      >
                        Maintenance Mode
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check form-switch custom-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="registrationEnabled"
                        id="reg"
                        checked={settings.registrationEnabled}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label text-white"
                        htmlFor="reg"
                      >
                        Open Registration
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check form-switch custom-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="kycRequired"
                        id="kyc"
                        checked={settings.kycRequired}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label text-white"
                        htmlFor="kyc"
                      >
                        Require KYC
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 d-flex gap-3">
            <button
              type="submit"
              className="btn btn-save px-5"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : (
                <FaSave className="me-2" />
              )}
              Apply All Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleReset}
              disabled={loading}
            >
              <FaUndo className="me-2" /> Reset Defaults
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
