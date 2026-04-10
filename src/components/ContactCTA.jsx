// components/ContactCTA.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/contact.css"; // adjust path if needed

const ContactCTA = () => {
  // Handle form submission – replace with actual API call
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Captured Data:", data);
    alert(
      `Thank you, ${data.name}! We will contact you at ${data.email} soon.`,
    );

    e.target.reset(); // Clears the form after submission
  };

  return (
    <section className="contact-cta-section">
      <div className="container">
        {/* Left column: Contact form */}
        <div className="form-area">
          <h2>Ready to get started?</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Enter Name *</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Enter Email *</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Enter Subject</label>
              <input type="text" id="subject" name="subject" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows="5" required />
            </div>
            <button type="submit" className="btn-primary">
              Get Started
            </button>
          </form>
        </div>

        {/* Right column: Registration CTA + Contact info */}
        <div className="right-column">
          {/* Registration CTA */}
          <div className="register-cta">
            <h3>Ready to start investing?</h3>
            {/* Investment CTA inside the form */}
            <div className="cta-text">
              <p>Looking for a Profitable Investment Plan?</p>
              <p>Search no! Click on the button below to get started.</p>
            </div>
            <p>Don't have an account yet?</p>
            <Link to="/register" className="btn-register">
              Register Now
            </Link>
          </div>

          {/* Contact information */}
          <div className="contact-info">
            <h3>Our Headquarters</h3>
            <address>
              123 Business Ave, Suite 100,
              <br />
              New York, NY 10001
            </address>
            <p>
              Email:{" "}
              <a href="mailto:support@apexmarket.net">support@apexmarket.net</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
