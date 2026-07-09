import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import "../css/auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, call your backend forgot-password API here
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="auth-card">
              <div className="auth-header">
                <h2>Reset Password</h2>
                <p>Enter your email to receive a reset link</p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className="input-icon-wrapper">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        className="form-control auth-input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-auth w-100">
                    Send Reset Link
                  </button>
                </form>
              ) : (
                <div className="text-center text-white">
                  <div className="alert alert-success">
                    Reset link sent! Please check your email inbox.
                  </div>
                </div>
              )}

              <div className="auth-footer">
                <Link to="/login" className="text-white-50">
                  <FaArrowLeft className="me-2" /> Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
