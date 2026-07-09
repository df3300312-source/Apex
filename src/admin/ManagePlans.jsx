import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import AdminTable from "./AdminTable";
import {
  FaPlus,
  FaPercentage,
  FaCalendarAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import "../css/admin.css";

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    min: "",
    max: "",
    roi: "",
    duration: "",
    status: "active", // Added status management
  });

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/plans");
      setPlans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSave = async (e) => {
    e.preventDefault();

    // Improved Validation
    if (Number(form.max) > 0 && Number(form.min) >= Number(form.max)) {
      return alert("Minimum deposit cannot be higher than Maximum deposit");
    }

    const planData = {
      name: form.name,
      min_amount: Number(form.min),
      max_amount: form.max ? Number(form.max) : null,
      roi_percent: Number(form.roi),
      duration_days: Number(form.duration),
      status: form.status,
    };

    setSubmitting(true);
    try {
      if (editingPlan) {
        await api.put(`/admin/plans/${editingPlan.id}`, planData);
      } else {
        await api.post("/admin/plans", planData);
      }
      fetchPlans();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPlan(null);
    setForm({
      name: "",
      min: "",
      max: "",
      roi: "",
      duration: "",
      status: "active",
    });
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      min: plan.min_amount,
      max: plan.max_amount || "",
      roi: plan.roi_percent,
      duration: plan.duration_days,
      status: plan.status || "active",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Warning: Deleting a plan may cause issues if users are currently invested in it. Proceed?",
      )
    )
      return;
    try {
      await api.delete(`/admin/plans/${id}`);
      fetchPlans();
    } catch (err) {
      alert("Error deleting plan. Suggestion: Mark it as 'Inactive' instead.");
    }
  };

  // UI Calculation
  const totalReturn = (Number(form.roi) * Number(form.duration)).toFixed(1);

  const columns = [
    {
      label: "Plan Name",
      render: (row) => <strong className="text-black">{row.name}</strong>,
    },
    {
      label: "Limits",
      render: (row) => (
        <span className="small">
          ${row.min_amount?.toLocaleString()} -{" "}
          {row.max_amount ? `$${row.max_amount.toLocaleString()}` : "∞"}
        </span>
      ),
    },
    {
      label: "Daily ROI",
      render: (row) => (
        <span className="text-success fw-bold">{row.roi_percent}%</span>
      ),
    },
    {
      label: "Total ROI",
      render: (row) => (
        <span className="text-info">
          {(row.roi_percent * row.duration_days).toFixed(1)}%
        </span>
      ),
    },
    {
      label: "Duration",
      render: (row) => <span>{row.duration_days} Days</span>,
    },
    {
      label: "Status",
      render: (row) => (
        <span
          className={`badge ${row.status === "active" ? "bg-success-soft text-success" : "bg-secondary text-white-50"}`}
        >
          {row.status?.toUpperCase() || "ACTIVE"}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-manage-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 text-white mb-0">Investment Products</h1>
          <p className="text-white-50 small">
            Configure plans, interest rates, and durations.
          </p>
        </div>
        <button
          className="btn btn-primary px-4"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="me-2" /> Create New Plan
        </button>
      </div>

      <div className="admin-card">
        <AdminTable
          columns={columns}
          data={plans}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content admin-modal animate__animated animate__zoomIn">
            <div className="modal-header-custom">
              <h4 className="mb-0">
                {editingPlan ? "Modify Plan" : "Create New Plan"}
              </h4>
              <p className="text-white-50 small">
                Fill in the financial parameters for this plan.
              </p>
            </div>

            <form onSubmit={handleSave} className="mt-3">
              <div className="mb-3">
                <label className="form-label text-white-50 small">
                  Plan Title
                </label>
                <input
                  type="text"
                  className="form-control admin-input"
                  placeholder="e.g., Gold Monthly"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Min. Deposit ($)
                  </label>
                  <input
                    type="number"
                    className="form-control admin-input"
                    value={form.min}
                    onChange={(e) => setForm({ ...form, min: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Max. Deposit (Optional)
                  </label>
                  <input
                    type="number"
                    className="form-control admin-input"
                    placeholder="Unlimited"
                    value={form.max}
                    onChange={(e) => setForm({ ...form, max: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Daily ROI (%)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary">
                      <FaPercentage size={12} />
                    </span>
                    <input
                      type="number"
                      step="any"
                      className="form-control admin-input"
                      value={form.roi}
                      onChange={(e) =>
                        setForm({ ...form, roi: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white-50 small">
                    Duration (Days)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary">
                      <FaCalendarAlt size={12} />
                    </span>
                    <input
                      type="number"
                      className="form-control admin-input"
                      value={form.duration}
                      onChange={(e) =>
                        setForm({ ...form, duration: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4 d-flex justify-content-between align-items-center p-3 bg-dark-soft rounded">
                <div>
                  <label className="form-label d-block mb-0">
                    Plan Availability
                  </label>
                  <small className="text-white-50">
                    Show this plan to investors
                  </small>
                </div>
                <button
                  type="button"
                  className={`btn-toggle-status ${form.status === "active" ? "active" : ""}`}
                  onClick={() =>
                    setForm({
                      ...form,
                      status: form.status === "active" ? "inactive" : "active",
                    })
                  }
                >
                  {form.status === "active" ? (
                    <FaToggleOn size={24} />
                  ) : (
                    <FaToggleOff size={24} />
                  )}
                </button>
              </div>

              {form.roi && form.duration && (
                <div className="alert alert-info py-2 small">
                  <strong>Expected Outcome:</strong> Total ROI will be{" "}
                  <strong>{totalReturn}%</strong> over {form.duration} days.
                </div>
              )}

              <div className="d-flex gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitting}
                >
                  {submitting
                    ? "Processing..."
                    : editingPlan
                      ? "Update Plan"
                      : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlans;
