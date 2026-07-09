import api from "./api";

export const initAdminData = () => {
  console.log("Admin API Service Initialized");
  // In a real app with a backend, we don't need to load localStorage
  // but we keep this function here so your Layout doesn't crash.
};
/**
 * ADMIN SERVICE
 * All functions here talk to the Node.js/MySQL Backend
 */

// --- USER MANAGEMENT ---
export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const createAdminUser = async (userData) => {
  const res = await api.post("/admin/users", userData);
  return res.data;
};

export const updateAdminUser = async (id, userData) => {
  const res = await api.put(`/admin/users/${id}`, userData);
  return res.data;
};

export const deleteAdminUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

// --- DEPOSIT MANAGEMENT ---
export const getAllDeposits = async () => {
  const res = await api.get("/admin/deposits");
  return res.data;
};

export const approveDeposit = async (id) => {
  const res = await api.put(`/admin/deposits/${id}/approve`);
  return res.data;
};

export const rejectDeposit = async (id) => {
  const res = await api.put(`/admin/deposits/${id}/reject`);
  return res.data;
};

// --- WITHDRAWAL MANAGEMENT ---
export const getAllWithdrawals = async () => {
  const res = await api.get("/admin/withdrawals");
  return res.data;
};

export const approveWithdrawal = async (id) => {
  const res = await api.put(`/admin/withdrawals/${id}/approve`);
  return res.data;
};

export const rejectWithdrawal = async (id, reason) => {
  const res = await api.put(`/admin/withdrawals/${id}/reject`, { reason });
  return res.data;
};

// --- PLAN MANAGEMENT ---
export const getAllPlans = async () => {
  const res = await api.get("/admin/plans");
  return res.data;
};

export const createPlan = async (planData) => {
  const res = await api.post("/admin/plans", planData);
  return res.data;
};

export const updatePlan = async (id, planData) => {
  const res = await api.put(`/admin/plans/${id}`, planData);
  return res.data;
};

export const deletePlan = async (id) => {
  const res = await api.delete(`/admin/plans/${id}`);
  return res.data;
};

// --- SYSTEM STATS ---
export const getAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};
