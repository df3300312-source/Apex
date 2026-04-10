import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaFilter, FaDownload, FaCalendarAlt } from "react-icons/fa";
import "../css/transactions.css";

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock transaction data – replace with API call
  useEffect(() => {
    // Simulate fetching transactions from API
    setTimeout(() => {
      const mockTransactions = [
        {
          id: 1,
          date: "2026-04-09 14:30:22",
          type: "deposit",
          amount: 500,
          status: "completed",
          plan: "Silver",
          txid: "0x1a2b3c...",
        },
        {
          id: 2,
          date: "2026-04-09 08:15:03",
          type: "profit",
          amount: 12.5,
          status: "completed",
          plan: "Silver",
          txid: null,
        },
        {
          id: 3,
          date: "2026-04-08 22:45:00",
          type: "deposit",
          amount: 1500,
          status: "completed",
          plan: "Gold",
          txid: "0x4d5e6f...",
        },
        {
          id: 4,
          date: "2026-04-08 16:20:44",
          type: "withdrawal",
          amount: 200,
          status: "pending",
          plan: null,
          txid: null,
        },
        {
          id: 5,
          date: "2026-04-07 09:00:12",
          type: "profit",
          amount: 37.5,
          status: "completed",
          plan: "Gold",
          txid: null,
        },
        {
          id: 6,
          date: "2026-04-06 14:10:55",
          type: "withdrawal",
          amount: 500,
          status: "completed",
          plan: null,
          txid: "0x7g8h9i...",
        },
        {
          id: 7,
          date: "2026-04-05 11:20:33",
          type: "deposit",
          amount: 10000,
          status: "completed",
          plan: "Diamond",
          txid: "0x1j2k3l...",
        },
        {
          id: 8,
          date: "2026-04-04 18:45:22",
          type: "profit",
          amount: 350,
          status: "completed",
          plan: "Diamond",
          txid: null,
        },
        {
          id: 9,
          date: "2026-04-03 09:30:10",
          type: "withdrawal",
          amount: 1200,
          status: "failed",
          plan: null,
          txid: null,
        },
        {
          id: 10,
          date: "2026-04-02 13:15:47",
          type: "deposit",
          amount: 250,
          status: "pending",
          plan: "Starter",
          txid: null,
        },
        {
          id: 11,
          date: "2026-04-01 10:00:00",
          type: "profit",
          amount: 5,
          status: "completed",
          plan: "Starter",
          txid: null,
        },
        {
          id: 12,
          date: "2026-03-31 16:20:00",
          type: "withdrawal",
          amount: 100,
          status: "completed",
          plan: null,
          txid: "0x4m5n6o...",
        },
      ];
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setLoading(false);
    }, 800);
  }, []);

  // Apply filters whenever searchTerm, typeFilter, or statusFilter changes
  useEffect(() => {
    let filtered = [...transactions];

    // Search by plan, txid, or amount
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (tx) =>
          (tx.plan && tx.plan.toLowerCase().includes(term)) ||
          (tx.txid && tx.txid.toLowerCase().includes(term)) ||
          tx.amount.toString().includes(term),
      );
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((tx) => tx.type === typeFilter);
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((tx) => tx.status === statusFilter);
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, typeFilter, statusFilter, transactions]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const formatCurrency = (value) =>
    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <span className="status-badge completed">Completed</span>;
      case "pending":
        return <span className="status-badge pending">Pending</span>;
      case "failed":
        return <span className="status-badge failed">Failed</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "deposit":
        return "📥";
      case "withdrawal":
        return "📤";
      case "profit":
        return "💰";
      default:
        return "💸";
    }
  };

  const handleExport = () => {
    // Simple CSV export
    const headers = [
      "Date",
      "Type",
      "Amount",
      "Status",
      "Plan",
      "Transaction ID",
    ];
    const rows = filteredTransactions.map((tx) => [
      tx.date,
      tx.type,
      tx.amount,
      tx.status,
      tx.plan || "-",
      tx.txid || "-",
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="transactions-page py-5">
        <div className="container text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-white-50 mt-3">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transactions-page py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h1 className="text-white mb-0">Transaction History</h1>
          <button className="btn btn-outline-info" onClick={handleExport}>
            <FaDownload className="me-2" /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="filters-card mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control filter-input"
                  placeholder="Search by plan, amount, or TXID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select filter-input"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="profit">Profits</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select filter-input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setStatusFilter("all");
                }}
              >
                <FaFilter className="me-1" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="transactions-table-wrapper">
          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Plan</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{formatDate(tx.date)}</td>
                      <td className="type-cell">
                        <span className="type-icon">
                          {getTypeIcon(tx.type)}
                        </span>{" "}
                        {tx.type}
                      </td>
                      <td
                        className={
                          tx.type === "withdrawal"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {tx.type === "withdrawal" ? "-" : "+"}
                        {formatCurrency(tx.amount)}
                      </td>
                      <td>{getStatusBadge(tx.status)}</td>
                      <td>{tx.plan || "—"}</td>
                      <td className="txid-cell">
                        {tx.txid ? tx.txid.slice(0, 10) + "..." : "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-wrapper mt-4">
              <button
                className="btn btn-sm btn-outline-info me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-outline-info ms-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
