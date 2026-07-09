import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import api from "../services/api"; // ✅ Use your existing API helper
import "../css/contacts.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const [error, setError] = useState(""); // ✅ Added error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Call the real backend API
      await api.post("/contact", formData);

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      <div className="container py-4">
        <div className="text-center mb-5 text-white">
          <h1 className="display-5 fw-bold texts">
            Contact <span className="title-text text-span">Us</span>
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            Reach out to our team. Your message will be sent directly to our
            admin panel.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="contact-info-card h-100">
              <h3 className="info-title">Get in Touch</h3>
              <p className="info-subtitle">
                Our support team is available 24/7 to assist you.
              </p>
              <div className="info-list">
                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <h5>Support Inbox</h5>
                    <p>support@apexmarkets.com</p>
                    <p>info@apexmarkets.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhoneAlt className="info-icon" />
                  <div>
                    <h5>Call Us</h5>
                    <p>+1 (888) 123-4567</p>
                    <p>+44 20 7946 0123</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <h5>Visit Us</h5>
                    <p>123 Blockchain Avenue</p>
                    <p>New York, NY 10001, USA</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaClock className="info-icon" />
                  <div>
                    <h5>Support Hours</h5>
                    <p>Monday – Friday: 9:00 AM – 6:00 PM (EST)</p>
                    <p>Weekends: 10:00 AM – 4:00 PM (EST)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="contact-form-card">
              <h3 className="form-title">Send Us a Message</h3>

              {submitted && (
                <div className="alert alert-success animate__animated animate__fadeIn">
                  Success! Your message has been sent to the Admin Panel.
                </div>
              )}

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control custom-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control custom-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control custom-input"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-control custom-input"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-submit w-100"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
