import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import AdminTable from "./AdminTable";
import { FaSync, FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import "../css/admin.css";

const ManageDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch deposits from MySQL
  const fetchDeposits = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/deposits");
      // res.data is expected to be an array of deposits from our backend JOIN
      setDeposits(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Unable to sync deposits from server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeposits();
  }, [fetchDeposits]);

  // 2. Approve Logic with UX feedback
  const handleApprove = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to approve this deposit? This will increase the user's balance and start their investment.",
      )
    )
      return;

    setActionLoading(true);
    try {
      await api.put(`/admin/deposits/${id}/approve`);
      fetchDeposits(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Reject Logic
  const handleReject = async (id) => {
    const reason = window.prompt("Enter reason for rejection (optional):");
    if (reason === null) return; // User cancelled prompt

    setActionLoading(true);
    try {
      await api.put(`/admin/deposits/${id}/reject`, { reason });
      fetchDeposits();
    } catch (err) {
      alert(err.response?.data?.message || "Rejection failed");
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Helper for status styling
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "badge bg-success-soft text-success";
      case "pending":
        return "badge bg-warning-soft text-warning";
      case "rejected":
        return "badge bg-danger-soft text-danger";
      default:
        return "badge bg-secondary";
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
          <div className="fw-bold text-black">{row.userName}</div>
          <small className="text-muted">{row.userEmail || row.email}</small>
        </div>
      ),
    },
    {
      label: "Amount",
      render: (row) => (
        <div className="fw-bold text-info">
          $
          {parseFloat(row.amount || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </div>
      ),
    },
    {
      label: "Plan",
      render: (row) => (
        <span className="badge bg-dark border border-secondary">
          {row.plan || "Starter"}
        </span>
      ),
    },
    {
      label: "Proof (TXID)",
      render: (row) => (
        <div className="d-flex align-items-center gap-2">
          <code className="text-truncate" style={{ maxWidth: "100px" }}>
            {row.transaction_hash || row.txid || "No Hash"}
          </code>
          {(row.transaction_hash || row.txid) && (
            <button
              className="btn-icon-sm"
              onClick={() =>
                navigator.clipboard.writeText(row.transaction_hash || row.txid)
              }
              title="Copy Hash"
            >
              <FaCopy size={12} />
            </button>
          )}
        </div>
      ),
    },
    {
      label: "Status",
      render: (row) => (
        <span className={getStatusClass(row.status)}>
          {row.status.toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-manage-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 text-white mb-0">Deposit Management</h1>
          <p className="text-white-50 small">
            Review and approve inbound investment funds.
          </p>
        </div>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={fetchDeposits}
          disabled={loading || actionLoading}
        >
          <FaSync className={loading ? "spinning" : ""} /> Refresh
        </button>
      </div>

      <div className="admin-card">
        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {/* The Action Loading Overlay */}
        {actionLoading && (
          <div className="admin-table-overlay">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2">Processing Transaction...</p>
          </div>
        )}

        <AdminTable
          columns={columns}
          data={deposits}
          loading={loading}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default ManageDeposits;
