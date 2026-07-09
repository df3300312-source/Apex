import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import AdminTable from "./AdminTable";
import {
  FaSync,
  FaCopy,
  FaCheckCircle,
  FaExclamationCircle,
  FaWallet,
} from "react-icons/fa";
import "../css/admin.css";

const ManageWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch withdrawals from backend
  const fetchWithdrawals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/withdrawals");
      // Expecting res.data to be an array of withdrawals from adminController.getAllWithdrawals
      setWithdrawals(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load withdrawal requests from the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWithdrawals();
  }, [fetchWithdrawals]);

  // 2. Approve Logic (Safety First)
  const handleApprove = async (id) => {
    const confirmed = window.confirm(
      "⚠️ HIGH RISK ACTION: Are you sure you want to APPROVE this withdrawal? \n\nEnsure you have actually sent the funds to the user's wallet address before clicking OK.",
    );

    if (!confirmed) return;

    setActionLoading(true);
    try {
      await api.put(`/admin/withdrawals/${id}/approve`);
      fetchWithdrawals();
    } catch (err) {
      alert(err.response?.data?.message || "Internal approval error.");
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Reject Logic (With Reason)
  const handleReject = async (id) => {
    const reason = window.prompt(
      "Reason for rejection (this will be shown to the user):",
    );
    if (reason === null) return; // User cancelled prompt

    setActionLoading(true);
    try {
      await api.put(`/admin/withdrawals/${id}/reject`, { reason });
      fetchWithdrawals();
    } catch (err) {
      alert(err.response?.data?.message || "Rejection failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="badge bg-success-soft text-success">
            <FaCheckCircle className="me-1" /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="badge bg-danger-soft text-danger">
            <FaExclamationCircle className="me-1" /> Rejected
          </span>
        );
      case "pending":
        return (
          <span className="badge bg-warning-soft text-warning fw-bold">
            PENDING REVIEW
          </span>
        );
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const columns = [
    {
      label: "Date",
      render: (row) => (
        <div className="small text-gray-400">
          {new Date(row.created_at).toLocaleDateString()}
          <br />
          {new Date(row.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      ),
    },
    {
      label: "Investor",
      render: (row) => (
        <div>
          <div className="fw-bold text-black">
            {row.user_name || row.userName}
          </div>
          <small className="text-muted">{row.user_email || row.email}</small>
        </div>
      ),
    },
    {
      label: "Amount",
      render: (row) => (
        <div className="text-danger fw-bold">
          -$
          {parseFloat(row.amount || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      label: "Method",
      render: (row) => (
        <span className="badge bg-dark border border-secondary">
          {row.method?.toUpperCase()}
        </span>
      ),
    },
    {
      label: "Destination Wallet",
      render: (row) => (
        <div className="d-flex align-items-center gap-2">
          <FaWallet className="text-white-50" size={12} />
          <code
            className="text-truncate text-info"
            style={{ maxWidth: "140px" }}
          >
            {row.address}
          </code>
          <button
            className="btn-icon-sm"
            onClick={() => navigator.clipboard.writeText(row.address)}
            title="Copy Wallet Address"
          >
            <FaCopy size={12} />
          </button>
        </div>
      ),
    },
    { label: "Status", render: (row) => getStatusBadge(row.status) },
  ];

  return (
    <div className="admin-manage-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 text-white mb-0">Withdrawal Management</h1>
          <p className="text-white-50 small">
            Verify and process payout requests from users.
          </p>
        </div>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={fetchWithdrawals}
          disabled={loading || actionLoading}
        >
          <FaSync className={loading ? "spinning" : ""} /> Refresh
        </button>
      </div>

      <div className="admin-card">
        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {/* Action Loading Overlay */}
        {actionLoading && (
          <div className="admin-table-overlay">
            <div className="spinner-border text-danger"></div>
            <p className="mt-2 fw-bold text-danger">
              Updating Financial Records...
            </p>
          </div>
        )}

        <AdminTable
          columns={columns}
          data={withdrawals}
          loading={loading}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      <div className="mt-4 p-3 bg-dark-soft rounded border border-warning">
        <small className="text-warning d-flex">
          <FaExclamationCircle className="me-2 mt-1" />
          Note: Approving a withdrawal here does NOT automatically send crypto.
          You must manually send the funds from your wallet to the destination
          address shown above, then click Approve to deduct the user's balance
          in the system.
        </small>
      </div>
    </div>
  );
};

export default ManageWithdrawals;
