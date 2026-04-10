import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaLock,
  FaCookieBite,
  FaUserSecret,
} from "react-icons/fa";
import "../css/legal.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <Navbar></Navbar>
      <div className="container py-4">
        <div className="text-center mb-5 text-white">
          <h1 className="display-5 fw-bold texts">
            Privacy <span className="text-span">Policy</span>
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
            Last updated: April 1, 2026
          </p>
        </div>

        <div className="legal-card">
          <div className="legal-section">
            <FaShieldAlt className="section-icon" />
            <h2>1. Information We Collect</h2>
            <p>
              At ApexMarkets, we collect information to provide better services
              to our users. This includes:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, date of birth, government ID (for KYC compliance),
                and wallet addresses.
              </li>
              <li>
                <strong>Transaction Data:</strong> Deposit/withdrawal history,
                investment plan selections, earnings, and referral activity.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                device identifiers, and cookies.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <FaLock className="section-icon" />
            <h2>2. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>Create and manage your investment account.</li>
              <li>
                Process deposits, withdrawals, and daily profit distributions.
              </li>
              <li>
                Verify your identity to comply with Anti‑Money Laundering (AML)
                regulations.
              </li>
              <li>
                Send important notifications (account activity, security
                alerts).
              </li>
              <li>Improve our platform and customer support.</li>
              <li>Prevent fraud and enhance security.</li>
            </ul>
          </div>

          <div className="legal-section">
            <FaUserSecret className="section-icon" />
            <h2>3. Data Sharing & Disclosure</h2>
            <p>
              We do not sell your personal information. However, we may share
              data with:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Payment processors, KYC
                verification services, hosting providers – under strict
                confidentiality agreements.
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law,
                subpoena, or to protect our rights.
              </li>
              <li>
                <strong>Business Transfers:</strong> If ApexMarkets is acquired
                or merges, your data may be transferred with notice.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <FaCookieBite className="section-icon" />
            <h2>4. Cookies & Tracking Technologies</h2>
            <p>
              We use cookies to remember your preferences, analyze site traffic,
              and improve user experience. You can disable cookies in your
              browser settings, but some features may not function properly.
            </p>
            <p className="mt-2">
              Types of cookies we use:
              <ul>
                <li>
                  <strong>Essential:</strong> Login sessions, security tokens.
                </li>
                <li>
                  <strong>Analytics:</strong> Google Analytics to understand
                  usage.
                </li>
                <li>
                  <strong>Preference:</strong> Language and region settings.
                </li>
              </ul>
            </p>
          </div>

          <div className="legal-section">
            <h2>5. Data Security</h2>
            <p>We implement industry‑standard security measures including:</p>
            <ul>
              <li>256‑bit SSL encryption for all data in transit.</li>
              <li>Cold storage for the majority of crypto assets.</li>
              <li>Regular security audits and penetration testing.</li>
              <li>Two‑factor authentication (2FA) for user accounts.</li>
              <li>Access controls and employee background checks.</li>
            </ul>
            <p>
              While we strive to protect your data, no online system is 100%
              secure. You are responsible for keeping your account credentials
              confidential.
            </p>
          </div>

          <div className="legal-section">
            <h2>6. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Correct inaccurate information.</li>
              <li>
                Request deletion of your data (subject to legal retention
                requirements).
              </li>
              <li>Withdraw consent for marketing communications.</li>
              <li>Lodge a complaint with a supervisory authority.</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <strong>privacy@apexmarkets.com</strong>.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is
              active, plus any additional period required by law (e.g.,
              financial transaction records for 5‑7 years). After that, data is
              anonymized or deleted.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Children’s Privacy</h2>
            <p>
              ApexMarkets is not intended for individuals under the age of 18.
              We do not knowingly collect data from minors. If you believe a
              minor has provided us with information, please contact us
              immediately.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries
              outside your residence. We ensure appropriate safeguards (e.g.,
              Standard Contractual Clauses) are in place.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material
              changes will be notified via email or a prominent notice on our
              website. Your continued use of ApexMarketers after changes
              constitutes acceptance.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your data,
              please contact our Data Protection Officer at:
            </p>
            <p>
              <strong>Email:</strong> privacy@apexmarkets.com
              <br />
              <strong>Mail:</strong> ApexMarkets, 123 Blockchain Avenue, New
              York, NY 10001, USA
            </p>
          </div>

          <div className="legal-footer-note mt-4 pt-3 text-center">
            <Link to="/" className="text-decoration-none">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PrivacyPolicy;
