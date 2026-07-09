import React, { useState, useEffect } from "react";
import api from "../services/api";
import AdminTable from "./AdminTable";
import { FaEnvelopeOpenText, FaTrash } from "react-icons/fa";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      fetchMessages();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const columns = [
    {
      label: "Date",
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Subject", field: "subject" },
    {
      label: "Message",
      render: (row) => (
        <div style={{ maxWidth: "300px", fontSize: "12px", color: "#ccc" }}>
          {row.message}
        </div>
      ),
    },
  ];

  return (
    <div className="admin-manage-page">
      <h1 className="h3 text-white mb-4">
        <FaEnvelopeOpenText className="me-2" /> Support Inbox
      </h1>
      <div className="admin-card">
        <AdminTable
          columns={columns}
          data={messages}
          loading={loading}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ManageMessages;
