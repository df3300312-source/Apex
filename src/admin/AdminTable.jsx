import React from "react";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaInbox,
} from "react-icons/fa";

const AdminTable = ({
  columns,
  data,
  loading = false,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  pagination = null, // { currentPage, totalPages, onPageChange }
}) => {
  // 1. Loading State
  if (loading) {
    return (
      <div className="admin-table-loading text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-white-50 mt-2">Fetching records...</p>
      </div>
    );
  }

  // 2. Empty State
  if (!data || data.length === 0) {
    return (
      <div className="admin-table-empty text-center py-5">
        <FaInbox size={40} className="text-white-50 mb-3" />
        <h5 className="text-white-50">No Data Available</h5>
        <p className="small text-muted">
          There are currently no records to display in this section.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="table-responsive">
        <table className="table admin-custom-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} style={{ width: col.width || "auto" }}>
                  {col.label}
                </th>
              ))}
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id || Math.random()}>
                {columns.map((col, idx) => (
                  <td key={idx}>
                    {/* Render custom HTML/Components if render function exists, else raw data */}
                    {col.render ? col.render(row) : row[col.field]}
                  </td>
                ))}

                {/* 3. Action Cells with Icons */}
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    {onApprove &&
                      (row.status === "pending" ||
                        row.status === "processing") && (
                        <button
                          className="btn btn-action btn-success-soft"
                          onClick={() => onApprove(row.id)}
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                      )}

                    {onReject &&
                      (row.status === "pending" ||
                        row.status === "processing") && (
                        <button
                          className="btn btn-action btn-danger-soft"
                          onClick={() => onReject(row.id)}
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      )}

                    {onEdit && (
                      <button
                        className="btn btn-action btn-info-soft"
                        onClick={() => onEdit(row)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    )}

                    {onDelete && (
                      <button
                        className="btn btn-action btn-danger-outline"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this record?",
                            )
                          ) {
                            onDelete(row.id);
                          }
                        }}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Enhanced Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="admin-table-footer d-flex justify-content-between align-items-center mt-4">
          <div className="pagination-info text-white-50 small">
            Showing page <strong>{pagination.currentPage}</strong> of{" "}
            {pagination.totalPages}
          </div>
          <div className="pagination-controls d-flex gap-2">
            <button
              className="btn btn-pagination-nav"
              disabled={pagination.currentPage === 1}
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
            >
              <FaChevronLeft className="me-1" /> Previous
            </button>
            <button
              className="btn btn-pagination-nav"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
            >
              Next <FaChevronRight className="ms-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
