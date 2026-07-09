import React from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaWallet,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import InvestmentPlans from "../components/InvestmentPlans";
import WhyUs from "../components/WhyUs";
import "../css/home.css";
import JourneySection from "../components/JourneySection";
import HowItWorks from "../components/HowItWorks";
import JourneySummary from "../components/JourneySummary";
import Services from "../components/Services";
import Abouts from "../components/Abouts";
import Testimonials from "../components/Testimonials";
import CryptoPrices from "../components/CryptoPrices";
import Partners from "../components/Partners";
import Footer from "../components/Footer";

const Home = () => {
  // Mock transaction data (later replace with API)
  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 2500,
      status: "completed",
      date: "2026-03-24 14:32:21",
      user: "j***d",
      plan: "Silver",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: 1250,
      status: "completed",
      date: "2026-03-24 09:15:03",
      user: "s***m",
      plan: null,
    },
    {
      id: 3,
      type: "profit",
      amount: 42.5,
      status: "completed",
      date: "2026-03-24 08:00:12",
      user: "m***k",
      plan: "Gold",
    },
    {
      id: 4,
      type: "deposit",
      amount: 15000,
      status: "pending",
      date: "2026-03-23 22:45:00",
      user: "r***t",
      plan: "Diamond",
    },
    {
      id: 5,
      type: "withdrawal",
      amount: 3200,
      status: "completed",
      date: "2026-03-23 16:20:44",
      user: "a***e",
      plan: null,
    },
    {
      id: 6,
      type: "profit",
      amount: 87.3,
      status: "completed",
      date: "2026-03-23 08:00:05",
      user: "k***n",
      plan: "Institutional",
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "deposit":
        return <FaArrowDown className="type-icon deposit" />;
      case "withdrawal":
        return <FaArrowUp className="type-icon withdrawal" />;
      case "profit":
        return <FaExchangeAlt className="type-icon profit" />;
      default:
        return <FaWallet />;
    }
  };

  const getTypeLabel = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStatusBadge = (status) => {
    if (status === "completed") {
      return <span className="status-badge completed">Completed</span>;
    } else if (status === "pending") {
      return <span className="status-badge pending">Pending</span>;
    } else {
      return <span className="status-badge failed">Failed</span>;
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <section className="highlights-section py-5">
        <div className="container">
          <div className="row g-4 text-center">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="highlight-card h-100">
                <div className="highlight-icon-wrapper mb-3">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h5 className="text-white fw-bold">Steady Growth</h5>
                <p className="text-secondary small">
                  Daily returns backed by professional trading systems.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="highlight-card h-100">
                <div className="highlight-icon-wrapper mb-3">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h5 className="text-white fw-bold">Reliable System</h5>
                <p className="text-secondary small">
                  24/7 expert monitoring and guidance for your assets.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="highlight-card h-100">
                <div className="highlight-icon-wrapper mb-3">
                  <i className="bi bi-lightning-charge"></i>
                </div>
                <h5 className="text-white fw-bold">Maximum Efficiency</h5>
                <p className="text-secondary small">
                  Advanced technology for secure, optimized returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Abouts></Abouts>
      <WhyUs></WhyUs>
      <InvestmentPlans></InvestmentPlans>
      <JourneySection></JourneySection>
      <HowItWorks></HowItWorks>
      <JourneySummary></JourneySummary>
      <Services></Services>
      <CryptoPrices></CryptoPrices>
      <Testimonials></Testimonials>
      <section className="transactions-section py-5">
        <div className="container py-4">
          <div className="text-center mb-5 text-white">
            <h2 className="display-5 fw-bold">
              Recent <span className="title-span">Transactions</span>
            </h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
              Live activity from our global investor community.
            </p>
          </div>

          <div className="transactions-table-wrapper">
            <div className="table-responsive">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="type-cell">
                        <div className="type-info">
                          {getTypeIcon(tx.type)}
                          <span>{getTypeLabel(tx.type)}</span>
                        </div>
                      </td>
                      <td className="amount-cell">
                        $
                        {tx.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>{getStatusBadge(tx.status)}</td>
                      <td>{tx.user}</td>
                      <td>{tx.plan || "—"}</td>
                      <td className="date-cell">
                        {new Date(tx.date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-outline-info btn-sm view-all-btn">
                View All Transactions
              </button>
            </div>
          </div>
        </div>
      </section>
      <Partners></Partners>
    </>
  );
};

export default Home;
