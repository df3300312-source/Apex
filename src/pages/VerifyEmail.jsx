import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import "../css/verifyEmail.css";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing"); // processing | success | error

  useEffect(() => {
    const verified = searchParams.get("verified");
    const error = searchParams.get("error");
    const token = searchParams.get("token");

    if (verified === "true") {
      setStatus("success");
      setTimeout(() => navigate("/login?verified=true"), 3000);
    } else if (error) {
      setStatus("error");
      setTimeout(() => navigate(`/login?error=${error}`), 4000);
    } else if (token) {
      setStatus("processing");
    }
  }, [searchParams, navigate]);

  return (
    <div className="security-verification-page">
      <div className="security-terminal-card">
        {/* Decorative background grid matrix lines */}
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
