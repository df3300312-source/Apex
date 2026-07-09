import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import AdminTable from "./AdminTable";
import {
  FaUserPlus,
  FaFileExport,
  FaSearch,
  FaUserShield,
  FaUserTag,
  FaWallet,
} from "react-icons/fa";
import Papa from "papaparse";
import "../css/admin.css";

const ManageUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Line 12: Now definitely used
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
    balance: 0,
    status: "active",
  });
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, admins: 0, active: 0 });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(
    async (page = pagination.page, searchTerm = search) => {
      setLoading(true);
      try {
        const res = await api.get(
          `/admin/users?page=${page}&limit=10&search=${searchTerm}`,
        );

        let usersArray = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        let totalCount = res.data.total || usersArray.length;
        let pages = res.data.totalPages || Math.ceil(totalCount / 10);

        setUsers(usersArray);
        setPagination({ page, totalPages: pages, total: totalCount });

        setStats({
          total: totalCount,
          admins: usersArray.filter((u) => u.role === "admin").length,
          active: usersArray.filter((u) => u.status === "active").length,
        });

        setError(null); // Clear errors on success
      } catch (err) {
        console.error(err);
        setError("Failed to sync with the user database. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, search],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingUser) {
        await api.put(`/admin/users/${editingUser.id}`, {
          name: form.name,
          email: form.email,
          role: form.role,
          balance: parseFloat(form.balance),
          status: form.status,
        });
      } else {
        await api.post("/admin/users", form);
      }
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      balance: user.balance || 0,
      status: user.status || "active",
      password: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent delete? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(
      users.map((u) => ({
        ID: u.id,
        Name: u.name,
        Email: u.email,
        Role: u.role,
        Balance: u.balance,
        Status: u.status,
      })),
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Users_Export.csv`;
    link.click();
  };

  const columns = [
    {
      label: "User",
      render: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-avatar-sm me-2">{row.name.charAt(0)}</div>
          <div>
            <div className="fw-bold text-black">{row.name}</div>
            <small className="text-white-50">{row.email}</small>
          </div>
        </div>
      ),
    },
    {
      label: "Referrer", // 👈 NEW COLUMN
      render: (row) =>
        row.referrerName ? (
          <div className="referrer-info">
            <span className="badge bg-primary-soft text-primary small">
              Invited by {row.referrerName}
            </span>
            <br />
            <small className="text-muted" style={{ fontSize: "10px" }}>
              {row.referrerEmail}
            </small>
          </div>
        ) : (
          <span className="text-muted small">Organic (Direct)</span>
        ),
    },
    {
      label: "Role",
      render: (row) => (
        <span
          className={`badge ${row.role === "admin" ? "bg-info" : "bg-secondary"}`}
        >
          {row.role.toUpperCase()}
        </span>
      ),
    },
    {
      label: "Balance",
      render: (row) => (
        <div className="text-success fw-bold">
          ${parseFloat(row.balance || 0).toFixed(2)}
        </div>
      ),
    },
    {
      label: "Status",
      render: (row) => (
        <span
          className={`badge-status ${row.status === "active" ? "active" : "blocked"}`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-manage-page">
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="mini-stat-card">
            <h6>Total Users</h6>
            <h3>{stats.total}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mini-stat-card">
            <h6>Admins</h6>
            <h3>{stats.admins}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mini-stat-card">
            <h6>Active Accounts</h6>
            <h3>{stats.active}</h3>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h3 text-white mb-0">User Management</h1>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={exportToCSV}
          >
            <FaFileExport /> Export
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
            }}
          >
            <FaUserPlus /> New User
          </button>
        </div>
      </div>

      <div className="search-bar-admin mb-4">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="form-control admin-search-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ERROR HANDLING: Error variable is now used here */}
      {error && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <div>{error}</div>
        </div>
      )}

      <div className="admin-card">
        <AdminTable
          columns={columns}
          data={users}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.totalPages,
            onPageChange: (newPage) =>
              setPagination((prev) => ({ ...prev, page: newPage })),
          }}
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content admin-modal animate__animated animate__fadeInDown">
            <h4>{editingUser ? "Edit User" : "New User"}</h4>
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label className="form-label text-white-50">Name</label>
                <input
                  type="text"
                  className="form-control admin-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white-50">Email</label>
                <input
                  type="email"
                  className="form-control admin-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label text-white-50">Role</label>
                  <select
                    className="form-select admin-input"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label text-white-50">Status</label>
                  <select
                    className="form-select admin-input"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="mb-4 p-2 bg-dark rounded border border-secondary">
                <label className="form-label text-info small">
                  <FaWallet /> Balance Adjustment
                </label>
                <input
                  type="number"
                  className="form-control admin-input"
                  value={form.balance}
                  onChange={(e) =>
                    setForm({ ...form, balance: e.target.value })
                  }
                  step="0.01"
                />
              </div>
              {!editingUser && (
                <div className="mb-3">
                  <label className="form-label text-white-50">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="form-control admin-input"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>
              )}
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitting}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
