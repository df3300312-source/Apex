import React from "react";
import { FaUsers, FaCalendarAlt, FaTrophy, FaGlobe } from "react-icons/fa";
import "../css/journey.css";

const JourneySection = () => {
  const stats = [
    { label: "Active Users", value: "49,800", icon: <FaUsers />, suffix: "+" },
    {
      label: "Running Days",
      value: "2,200",
      icon: <FaCalendarAlt />,
      suffix: "",
    },
    { label: "Awards Won", value: "375", icon: <FaTrophy />, suffix: "" },
    { label: "Global Presence", value: "200", icon: <FaGlobe />, suffix: "+" },
  ];

  return (
    <section className="journey-section py-5">
      <div className="container">
        <div className="journey-glass-wrapper p-5">
          <div className="row text-center align-items-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 mb-4 mb-lg-0 journey-item"
              >
                <div className="stat-content">
                  <div className="stat-icon-mini mb-3">{stat.icon}</div>
                  <h2 className="stat-number fw-bold mb-1">
                    {stat.value}
                    <span>{stat.suffix}</span>
                  </h2>
                  <p className="stat-label text-uppercase small tracking-widest text-secondary">
                    {stat.label}
                  </p>
                </div>
                {/* Vertical divider for desktop */}
                {index !== stats.length - 1 && (
                  <div className="stat-divider d-none d-lg-block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
