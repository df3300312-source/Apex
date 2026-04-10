import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaShieldVirus,
  FaRegClock,
  FaGlobe,
} from "react-icons/fa";
import "../css/legal.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RiskDisclosure = () => {
  return (
    <div className="legal-page">
      <Navbar></Navbar>
      <div className="container py-4">
        <div className="text-center mb-5 text-white">
          <h1 className="display-4 fw-bold mt-5">
            Risk <span className="text-span">Disclosure</span>
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
            Last updated: April 1, 2026
          </p>
        </div>

        <div className="legal-card">
          <div className="legal-section">
            <FaChartLine className="section-icon" />
            <h2>1. General Investment Risks</h2>
            <p>
              All investments carry inherent risks. You should never invest
              money that you cannot afford to lose. ApexMarkets does not
              guarantee any returns, and past performance does not predict
              future results.
            </p>
            <p>
              The value of cryptocurrencies and other assets can fluctuate
              significantly due to market conditions, regulatory changes,
              technological developments, and other factors.
            </p>
          </div>

          <div className="legal-section">
            <h2>2. Cryptocurrency‑Specific Risks</h2>
            <ul>
              <li>
                <strong>Extreme Volatility:</strong> Crypto markets can
                experience price swings of 20% or more within a single day. Your
                investment may decrease in value rapidly.
              </li>
              <li>
                <strong>Regulatory Uncertainty:</strong> Governments worldwide
                are still developing crypto regulations. New laws could restrict
                or ban cryptocurrency trading and mining.
              </li>
              <li>
                <strong>Technology Risks:</strong> Blockchain networks may
                suffer from bugs, forks, or 51% attacks. Smart contracts used by
                ApexMarkets could have vulnerabilities.
              </li>
              <li>
                <strong>Liquidity Risks:</strong> Some cryptocurrencies may
                become illiquid, making it difficult to sell at desired prices.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <FaShieldVirus className="section-icon" />
            <h2>3. Platform‑Specific Risks</h2>
            <ul>
              <li>
                <strong>Cybersecurity Threats:</strong> Despite our security
                measures, no system is immune to hacks, phishing attacks, or
                data breaches.
              </li>
              <li>
                <strong>Operational Delays:</strong> Withdrawals may be delayed
                due to security reviews, blockchain congestion, or technical
                issues.
              </li>
              <li>
                <strong>Third‑Party Dependencies:</strong> We rely on payment
                processors, wallet providers, and exchange APIs. Failures at
                these third parties could affect your funds.
              </li>
              <li>
                <strong>Investment Plan Risks:</strong> Daily returns are based
                on our trading and mining activities. If those activities
                underperform, your returns may be lower than expected or zero.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Trading & Mining Risks</h2>
            <ul>
              <li>
                <strong>Leverage Risk:</strong> If we use leverage in trading,
                losses can exceed the initial capital.
              </li>
              <li>
                <strong>Mining Difficulty:</strong> Bitcoin mining profitability
                depends on network difficulty, electricity costs, and hardware
                efficiency. All of these can change rapidly.
              </li>
              <li>
                <strong>Market Manipulation:</strong> Crypto markets are less
                regulated and may be subject to pump‑and‑dump schemes or wash
                trading.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <FaRegClock className="section-icon" />
            <h2>5. No Guarantee of Returns</h2>
            <p>
              ApexMarkets does not promise any specific return on investment.
              The daily return percentages shown on our website are targets
              based on historical performance, not guarantees. Your actual
              returns may be lower, and you could lose your entire principal.
            </p>
            <p>
              We strongly recommend diversifying your investments and not
              allocating more than a small percentage of your net worth to
              high‑risk crypto investments.
            </p>
          </div>

          <div className="legal-section">
            <FaGlobe className="section-icon" />
            <h2>6. Jurisdictional Risks</h2>
            <p>
              Cryptocurrency regulations vary by country. It is your
              responsibility to ensure that using ApexMarkets complies with your
              local laws. We may not be licensed in your jurisdiction, and you
              bear the risk of any legal consequences.
            </p>
            <p>
              If you are a resident of a country where crypto investments are
              banned, do not use our platform.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. No Financial Advice</h2>
            <p>
              ApexMarkets does not provide personal financial advice. Any
              information on our website, including investment plans, market
              analysis, or blog posts, is for informational purposes only and
              should not be considered a recommendation to buy, sell, or hold
              any asset.
            </p>
            <p>
              You should consult with a licensed financial advisor before making
              any investment decisions.
            </p>
          </div>

          <div className="legal-section">
            <h2>8. Tax Liability</h2>
            <p>
              You are solely responsible for reporting and paying any taxes on
              profits earned through ApexMarkets. Cryptocurrency tax rules are
              complex and may treat your earnings as capital gains or ordinary
              income. We recommend consulting a tax professional.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. Force Majeure</h2>
            <p>
              ApexMarkets shall not be liable for delays or failures caused by
              events beyond our reasonable control, including but not limited to
              natural disasters, war, terrorism, internet outages, blockchain
              network failures, or government actions.
            </p>
          </div>

          <div className="legal-section">
            <h2>10. Acknowledgment of Risks</h2>
            <p>By using ApexMarkets, you acknowledge that:</p>
            <ul>
              <li>You have read and understood this Risk Disclosure.</li>
              <li>
                You accept all risks described above, as well as other unknown
                risks.
              </li>
              <li>
                You will not hold ApexMarkets or its team liable for any
                investment losses.
              </li>
              <li>
                You are investing at your own risk and with your own judgment.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these risks, please contact us
              before investing:
            </p>
            <p>
              <strong>Email:</strong> risk@apexmarkets.com
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

export default RiskDisclosure;
