import React, { useState, useEffect } from "react";
import api from "../services/api";
import AdminTable from "./AdminTable";

const ManageChats = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await api.get("/admin/chats");
      setChats(res.data);
    };
    fetchChats();
    const interval = setInterval(fetchChats, 5000); // Poll for new messages every 5s
    return () => clearInterval(interval);
  }, []);

  const columns = [
    {
      label: "Time",
      render: (row) => new Date(row.created_at).toLocaleTimeString(),
    },
    { label: "Sender", field: "sender" },
    { label: "Message", field: "message" },
    { label: "Session ID", field: "session_id" },
  ];

  return (
    <div className="admin-manage-page">
      <h1 className="h3 text-white mb-4">Live Chat Monitor</h1>
      <div className="admin-card">
        <AdminTable columns={columns} data={chats} />
      </div>
    </div>
  );
};

export default ManageChats;
