import React from "react";
import { Link } from "react-router-dom";
import {
  FaGavel,
  FaUserCheck,
  FaExclamationTriangle,
  FaBan,
} from "react-icons/fa";
import "../css/legal.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <Navbar></Navbar>
      <div className="container py-4">
        <div className="text-center mb-5 text-white">
          <h1 className="display-5 fw-bold mt-5">
            Terms of <span className="text-span">Service</span>
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
            Last updated: April 1, 2026
          </p>
        </div>

        <div className="legal-card">
          <div className="legal-section">
            <FaGavel className="section-icon" />
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using ApexMarkets (the "Platform"), you agree to
              be bound by these Terms of Service ("Terms"). If you do not agree,
              please do not use the Platform.
            </p>
            <p>
              We may modify these Terms at any time. Continued use after changes
              constitutes acceptance. It is your responsibility to review these
              Terms periodically.
            </p>
          </div>

          <div className="legal-section">
            <FaUserCheck className="section-icon" />
            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use ApexMarkets. By
              registering, you confirm that:
            </p>
            <ul>
              <li>
                You have the legal capacity to enter into a binding agreement.
              </li>
              <li>
                You are not located in a jurisdiction where cryptocurrency
                investments are prohibited.
              </li>
              <li>
                You are not a citizen or resident of a sanctioned country (e.g.,
                OFAC list).
              </li>
              <li>
                You will provide accurate and complete information during
                registration.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. Account Registration & Security</h2>
            <ul>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                You agree to notify us immediately of any unauthorized account
                access.
              </li>
              <li>
                We may require KYC (Know Your Customer) verification before
                processing withdrawals.
              </li>
              <li>
                One user may only have one active account. Multiple accounts may
                be suspended.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Investments & Returns</h2>
            <ul>
              <li>
                <strong>Investment Plans:</strong> You may choose from available
                plans. Each plan has a minimum deposit, duration, and daily
                return rate.
              </li>
              <li>
                <strong>Daily Returns:</strong> Profits are calculated and
                credited to your account daily, based on the plan's advertised
                rate. Returns are not guaranteed and depend on market
                conditions.
              </li>
              <li>
                <strong>Compounding:</strong> You may choose to reinvest
                earnings; this will increase your principal and future returns.
              </li>
              <li>
                <strong>Early Withdrawal:</strong> Withdrawing before the
                contract duration ends may result in forfeiture of some or all
                accrued profits.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Deposits & Withdrawals</h2>
            <ul>
              <li>
                <strong>Deposits:</strong> All deposits must be made using
                supported cryptocurrencies or payment methods. Minimum deposit
                amounts apply per plan.
              </li>
              <li>
                <strong>Withdrawals:</strong> Withdrawal requests are processed
                within 24‑48 hours. A minimum withdrawal amount applies. We
                reserve the right to delay withdrawals for security reviews.
              </li>
              <li>
                <strong>Fees:</strong> ApexMarkets may charge nominal withdrawal
                fees. Network (gas) fees for blockchain transactions are borne
                by the user.
              </li>
              <li>
                <strong>Refunds:</strong> Deposits are not refundable. Once
                invested, funds are committed to the chosen plan.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <FaExclamationTriangle className="section-icon" />
            <h2>6. Risk Acknowledgment</h2>
            <p>
              Cryptocurrency and financial market investments involve
              significant risk. You acknowledge that:
            </p>
            <ul>
              <li>Past performance does not guarantee future results.</li>
              <li>
                Market volatility may affect returns; you could lose part or all
                of your investment.
              </li>
              <li>
                ApexMarkets does not provide financial advice; you invest at
                your own discretion.
              </li>
              <li>
                You are solely responsible for tax obligations related to your
                earnings.
              </li>
            </ul>
            <p>
              Please review our full <Link to="/risk">Risk Disclosure</Link> for
              more details.
            </p>
          </div>

          <div className="legal-section">
            <FaBan className="section-icon" />
            <h2>7. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>
                Use the Platform for money laundering, fraud, or any illegal
                activity.
              </li>
              <li>
                Create multiple accounts to exploit bonuses or referral
                programs.
              </li>
              <li>
                Attempt to hack, reverse‑engineer, or disrupt the Platform.
              </li>
              <li>Impersonate another person or provide false information.</li>
              <li>
                Use automated scripts or bots to interact with the Platform.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>8. Account Suspension & Termination</h2>
            <p>We reserve the right to suspend or terminate your account if:</p>
            <ul>
              <li>You violate these Terms or any applicable law.</li>
              <li>We suspect fraudulent activity or security threats.</li>
              <li>You provide false or misleading information.</li>
              <li>We are required to do so by a regulatory authority.</li>
            </ul>
            <p>
              Upon termination, outstanding profits may be forfeited, and you
              must withdraw any remaining principal subject to our withdrawal
              rules.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. Intellectual Property</h2>
            <p>
              All content on ApexMarkets – including text, graphics, logos, and
              software – is the property of ApexMarkets or its licensors and is
              protected by copyright and trademark laws. You may not copy,
              modify, or distribute any part of the Platform without written
              permission.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, ApexMarkets and its
              affiliates shall not be liable for:
            </p>
            <ul>
              <li>
                Any indirect, incidental, or consequential damages arising from
                your use of the Platform.
              </li>
              <li>
                Loss of profits, data, or investment value due to market
                fluctuations.
              </li>
              <li>
                Delays or failures caused by blockchain network congestion,
                cyberattacks, or force majeure.
              </li>
              <li>
                Unauthorized access to your account due to your failure to
                secure your credentials.
              </li>
            </ul>
            <p>
              Our total liability shall not exceed the amount of fees you have
              paid to us in the preceding 12 months.
            </p>
          </div>

          <div className="legal-section">
            <h2>11. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms shall be governed by the laws of the State of New
              York, USA, without regard to conflict of law principles. Any
              dispute arising out of these Terms shall be resolved through
              binding arbitration in New York County, unless otherwise required
              by law.
            </p>
          </div>

          <div className="legal-section">
            <h2>12. Entire Agreement</h2>
            <p>
              These Terms, together with our{" "}
              <Link to="/privacy">Privacy Policy</Link> and{" "}
              <Link to="/risk">Risk Disclosure</Link>, constitute the entire
              agreement between you and ApexMarkets regarding your use of the
              Platform.
            </p>
          </div>

          <div className="legal-section">
            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> legal@apexmarkets.com
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
    </div>
  );
};

export default TermsOfService;
