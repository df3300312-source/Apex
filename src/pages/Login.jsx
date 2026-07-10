import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../css/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  // Auto-focus the email field on load
  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError(""); // Clear error when user types
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError("");
    setLoading(true);
    setShowResend(false); // Reset resend state on new attempt
    setResendMessage("");

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      // User object check
      const user = response.user;

      // 1. Check for saved plan (Redirect from InvestmentPlans.jsx)
      const savedPlan = sessionStorage.getItem("selectedPlan");
      if (savedPlan) {
        sessionStorage.removeItem("selectedPlan");
        return navigate("/deposit", {
          state: { selectedPlan: JSON.parse(savedPlan) },
        });
      }

      // 2. Role-based Navigation
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      const status = err.response?.status;
      const message = err.response?.data?.message;

      // ✅ If error is 403 (unverified email), show resend option
      if (status === 403) {
        setError(message || "Please verify your email before logging in.");
        setShowResend(true);
      } else {
        setError(message || "Invalid email or password. Please try again.");
        setShowResend(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendMessage("");
    setResendLoading(true);
    try {
      await api.post("/auth/resend-verification", { email: formData.email });
      setResendMessage("A new verification link has been sent to your email.");
      setShowResend(false); // Optionally hide button after success
    } catch (err) {
      setResendMessage(
        err.response?.data?.message || "Failed to resend verification.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="auth-card">
              <div className="auth-header">
                <h2>Welcome Back</h2>
                <p>Sign in to your ApexMarkets account</p>
              </div>

              {error && (
                <div className="alert alert-danger animate__animated animate__shakeX">
                  {error}
                </div>
              )}

              {/* ✅ Resend Verification Section */}
              {showResend && (
                <div className="mt-2 mb-3">
                  <button
                    className="btn btn-link text-info p-0"
                    onClick={handleResendVerification}
                    disabled={resendLoading}
                  >
                    {resendLoading ? "Sending..." : "Resend Verification Email"}
                  </button>
                  {resendMessage && (
                    <div className="alert alert-success mt-2">
                      {resendMessage}
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div className="input-icon-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      ref={emailInputRef}
                      type="email"
                      name="email"
                      className={`form-control auth-input ${error.includes("email") ? "is-invalid" : ""}`}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-icon-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control auth-input"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    <span
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>

                <div className="form-group d-flex justify-content-between align-items-center">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    <span>Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    style={{
                      color: "#007bff",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-auth w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="auth-footer">
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">Create Account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
