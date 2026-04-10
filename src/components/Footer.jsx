import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import "../css/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-columns">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <Link className="navbar-brand fw-bold fs-3" to="/">
              <span className="brand-apex">Apex</span>
              <span className="brand-markets text-warning">Markets</span>
            </Link>
            <p className="footer-desc">
              Your gateway to secure digital asset management. Join thousands of
              investors worldwide.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/FAQ">Help & FAQ</Link>
              </li>{" "}
              {/* Added FAQ here */}
            </ul>
          </div>

          {/* Column 3: Support & Legal */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li>
                <Link to="/contact">Contact Support</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/risk">Risk Disclosure</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col">
            <h4>Our Office</h4>
            <address className="footer-address">
              123 Business Ave, Suite 100,
              <br />
              New York, NY 10001
            </address>
            <p className="footer-email">
              <a href="mailto:support@apexmarket.net">support@apexmarket.net</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Apex Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
