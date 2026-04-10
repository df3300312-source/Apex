import React from "react";
import {
  FaUserPlus,
  FaWallet,
  FaMoneyBillWave,
  FaHandHoldingUsd,
} from "react-icons/fa";
import "../css/howitworks.css";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Sign Up",
      description:
        "Create your free account in minutes. No hidden fees, no complicated paperwork.",
    },
    {
      icon: <FaWallet />,
      title: "Set Wallet",
      description:
        "Connect your preferred crypto wallet to securely manage your funds.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Deposit",
      description:
        "Choose an investment plan and make a deposit. Start earning daily returns instantly.",
    },
    {
      icon: <FaHandHoldingUsd />,
      title: "Withdraw",
      description:
        "Request withdrawals anytime. Your profits are sent directly to your wallet.",
    },
  ];

  return (
    <section className="how-it-works py-5">
      <div className="container py-5">
        <div className="text-center mb-5 text-white">
          <h6 className="text-warning text-uppercase fw-bold tracking-widest mb-2">
            Roadmap
          </h6>
          <h2 className="display-6 fw-bold">How It Works</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            The simple path to starting your crypto investment journey with
            ApexMarkets.
          </p>
        </div>

        <div className="row g-4 position-relative">
          {/* Connecting Line for Desktop */}
          <div className="connecting-line d-none d-lg-block"></div>

          {steps.map((step, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="process-card text-center">
                <div className="icon-badge-wrapper mb-4">
                  <div className="icon-badge">{step.icon}</div>
                  <div className="step-count-circle">{index + 1}</div>
                </div>
                <h4 className="text-white fw-bold mb-3">{step.title}</h4>
                <p className="text-secondary small px-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
