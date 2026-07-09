import React, { useState, useEffect, useCallback } from "react";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import api from "../services/api";
import "../css/transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    total: 0,
  });
  const limit = 10;

  // Fetch transactions from backend
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit,
        type: typeFilter !== "all" ? typeFilter : undefined,
        search: searchTerm || undefined, // Note: Ensure backend supports search
      };

      // Updated path to match userRoutes.js (/api/user/transactions)
      const res = await api.get("/user/transactions", { params });

      // Backend returns { transactions: [], pagination: { total, totalPages... } }
      setTransactions(res.data.transactions || []);
      setPagination({
        totalPages: res.data.pagination?.totalPages || 1,
        total: res.data.pagination?.total || 0,
      });
    } catch (err) {
      console.error("Failed to load transactions", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, typeFilter, searchTerm]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, searchTerm]);

  const handleExport = () => {
    if (transactions.length === 0) return alert("No data to export");

    const headers = ["Date", "Type", "Description", "Amount", "Balance After"];
    const rows = transactions.map((tx) => [
      formatDate(tx.date),
      tx.type.toUpperCase(),
      tx.description || "-",
      tx.amount,
      tx.balance_after || "-",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ApexMarkets_History_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num)
      ? "$0.00"
      : `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "deposit":
        return { color: "#3498db", icon: "📥", label: "Deposit" };
      case "withdrawal":
        return { color: "#e74c3c", icon: "📤", label: "Withdrawal" };
      case "profit":
        return { color: "#2ecc71", icon: "💰", label: "Profit" };
      case "referral_commission":
        return { color: "#f1c40f", icon: "🎁", label: "Commission" };
      default:
        return { color: "#95a5a6", icon: "💸", label: type };
    }
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="transactions-loading text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="text-white-50 mt-3">Fetching your financial history...</p>
      </div>
    );
  }

  return (
    <div className="transactions-page py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-white mb-0">Transaction Ledger</h1>
          <button
            className="btn btn-export"
            onClick={handleExport}
            disabled={transactions.length === 0}
          >
            <FaDownload className="me-2" /> Export
          </button>
        </div>

        {/* Filters */}
        <div className="filters-card mb-4">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="search-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control filter-input"
                  placeholder="Filter by description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select filter-input"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Transactions</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="profit">Profits</option>
                <option value="referral_commission">Commissions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="section-card">
          <div className="table-responsive">
            <table className="table transactions-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Balance After</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => {
                    const style = getTypeStyle(tx.type);
                    return (
                      <tr key={tx.id}>
                        <td className="small text-white-50">
                          {formatDate(tx.date)}
                        </td>
                        <td>
                          <span
                            className="type-badge"
                            style={{ borderLeft: `3px solid ${style.color}` }}
                          >
                            {style.icon} {style.label}
                          </span>
                        </td>
                        <td
                          className="small text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {tx.description}
                        </td>
                        <td
                          className={`fw-bold ${tx.type === "withdrawal" ? "text-danger" : "text-success"}`}
                        >
                          {tx.type === "withdrawal" ? "-" : "+"}
                          {formatCurrency(tx.amount)}
                        </td>
                        <td className="text-white-50">
                          {formatCurrency(tx.balance_after)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-white-50">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
              <button
                className="btn btn-pagination"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <FaArrowLeft />
              </button>
              <span className="text-white-50">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <button
                className="btn btn-pagination"
                disabled={currentPage === pagination.totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
