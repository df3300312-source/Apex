import React from "react";
import {
  FaChartLine,
  FaSeedling,
  FaOilCan,
  FaHome,
  FaUmbrellaBeach,
  FaCoins,
} from "react-icons/fa";
import "../css/services.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Services = () => {
  const services = [
    {
      icon: <FaChartLine />,
      title: "Forex Trading",
      description:
        "Access global currency markets with institutional-grade execution and ultra-low latency tools.",
    },
    {
      icon: <FaSeedling />,
      title: "Agriculture",
      description:
        "Diversify into sustainable farm projects and global commodities with proven long-term yields.",
    },
    {
      icon: <FaOilCan />,
      title: "Energy & Gas",
      description:
        "Strategic investment in crude oil, natural gas, and the evolving renewable energy infrastructure.",
    },
    {
      icon: <FaHome />,
      title: "Real Estate",
      description:
        "Premium property portfolios spanning commercial, industrial, and high-end residential sectors.",
    },
    {
      icon: <FaUmbrellaBeach />,
      title: "Wealth Management",
      description:
        "Bespoke retirement planning and insurance coverage to safeguard your legacy and future.",
    },
    {
      icon: <FaCoins />,
      title: "Precious Metals",
      description:
        "Physical gold and ETF mining options designed to act as a definitive hedge against inflation.",
    },
  ];

  return (
    <section className="services-section py-5" id="services">
      <Navbar></Navbar>
      <div className="text-center mb-5 text-white services-text">
        <h2 className="display-6 fw-bold texts">
          Diverse <span className="text-span">Investment</span> Avenues
        </h2>
        <p className=" mx-auto" style={{ maxWidth: "700px" }}>
          Harness the power of a multi-asset approach with our expertly managed
          investment services.
        </p>
      </div>
      <div className="container py-5">
        <h6 className="text-info fw-bold text-uppercase tracking-widest mb-5 ">
          Our Portfolio
        </h6>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="service-card">
                <div className="service-icon-wrapper">
                  <span className="icon-inner">{service.icon}</span>
                </div>
                <h4 className="service-card-title text-white">
                  {service.title}
                </h4>
                <p className="service-card-text text-secondary">
                  {service.description}
                </p>
                <div className="hover-indicator"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
};

export default Services;
