import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api"; // 👈 import your API client
import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "../css/verifyEmail.css";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing"); // processing | success | error

  useEffect(() => {
    // If there's no token, show error and redirect
    if (!token) {
      setStatus("error");
      setTimeout(() => navigate("/login?error=missing_token"), 3000);
      return;
    }

    // ✅ Call the backend verification API
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/auth/verify-email?token=${token}`);
        // Backend returns JSON success
        setStatus("success");
        setTimeout(() => navigate("/login?verified=true"), 3000);
      } catch (err) {
        // Error from backend
        setStatus("error");
        const errorMsg = err.response?.data?.message || "Verification failed";
        setTimeout(
          () => navigate(`/login?error=${encodeURIComponent(errorMsg)}`),
          4000,
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="security-verification-page">
      <div className="security-terminal-card">
        <div className="matrix-glow"></div>

        {status === "processing" && (
          <div className="verification-state animate-pulse">
            <div className="icon-wrapper processing">
              <FaShieldAlt className="shield-icon spin-slow" />
            </div>
            <h2 className="terminal-title">
              Establishing <span className="gold-text">Secure Connection</span>
            </h2>
            <p className="terminal-subtitle">
              Authorizing cryptographic token on the ledger network...
            </p>
            <div className="loading-bar-container">
              <div className="loading-bar-progress"></div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="verification-state state-success">
            <div className="icon-wrapper success">
              <FaCheckCircle />
            </div>
            <h2 className="terminal-title">
              Identity <span className="green-text">Authenticated</span>
            </h2>
            <p className="terminal-subtitle">
              Node response 200 OK. Redirecting to your strategic terminal...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="verification-state state-error">
            <div className="icon-wrapper error">
              <FaExclamationTriangle />
            </div>
            <h2 className="terminal-title">
              Handshake <span className="red-text">Rejected</span>
            </h2>
            <p className="terminal-subtitle">
              Verification token is invalid or expired. Re-routing safely...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
