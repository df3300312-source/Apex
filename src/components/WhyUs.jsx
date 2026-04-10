import React from "react";
import {
  FaHeadset,
  FaShieldAlt,
  FaLock,
  FaRocket,
  FaBrain,
  FaHistory,
} from "react-icons/fa";
import "../css/whyus.css";

const WhyUs = () => {
  const features = [
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description:
        "Our customer care service is available at all times to attend to you and offer profitable advice on the best investment programs.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secured Transactions",
      description:
        "Your financial future is secured through our multiple investment packages that are suitable for every class.",
    },
    {
      icon: <FaLock />,
      title: "Strong Security",
      description:
        "The system runs on highly encrypted algorithms to protect and secure our user accounts with experienced security experts.",
    },
    {
      icon: <FaRocket />,
      title: "Quick Returns",
      description:
        "We offer you an unbeatable interest on your investment within the shortest possible time with automated withdrawals.",
    },
    {
      icon: <FaBrain />,
      title: "Our Knowledge",
      description:
        "Our team monitors key market trends and optimizes mining costs to ensure the best possible net cost for Bitcoin.",
    },
    {
      icon: <FaHistory />,
      title: "Our Experience",
      description:
        "Trading since 2016, our team understands Bitcoin pricing mechanisms and monitors all major market trends.",
    },
  ];

  return (
    <section className="whyus-section py-5">
      <div className="container py-4">
        <div className="text-center mb-5 text-white">
          <h2 className="display-6 fw-bold">
            Why <span className="title-span">ApexMarkets?</span>
          </h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
            Experience the next generation of investment technology with our
            industry-leading features.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="feature-card h-100">
                <div className="feature-icon-box">{feature.icon}</div>
                <h4 className="feature-title text-white">{feature.title}</h4>
                <p className="feature-description text-secondary">
                  {feature.description}
                </p>
                <div className="card-accent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
