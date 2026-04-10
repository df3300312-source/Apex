// components/FAQ.js
import React, { useState } from "react";
import "../css/faq.css";

const faqData = [
  {
    id: 1,
    question: "What is Apex Market?",
    answer:
      "Apex Market is a trusted investment platform offering profitable investment plans designed to grow your wealth with security and expert guidance.",
  },
  {
    id: 2,
    question: "How do I create my account?",
    answer:
      "Click the 'Register Now' button on our homepage, fill in your details, and verify your email address. Once verified, your account is ready.",
  },
  {
    id: 3,
    question: "How do I make a deposit?",
    answer:
      "Log in to your dashboard, go to the 'Deposit' section, choose your preferred payment method, and follow the instructions. Deposits are usually processed instantly.",
  },
  {
    id: 4,
    question:
      "How long does my deposit take before it can reflect on my Apex Market account dashboard?",
    answer:
      "Deposits are reflected instantly for most methods. Bank transfers may take 1-3 business days depending on your bank.",
  },
  {
    id: 5,
    question: "How do I make a withdrawal?",
    answer:
      "Navigate to the 'Withdrawal' section in your dashboard, enter the amount, and select your withdrawal method. Requests are processed within 24 hours.",
  },
  {
    id: 6,
    question: "How long does it take to process my withdrawal?",
    answer:
      "Withdrawal requests are processed within 24-48 hours after approval. The actual arrival time depends on your payment provider.",
  },
  {
    id: 7,
    question: "What minimum amount can I withdraw from my account balance?",
    answer:
      "The minimum withdrawal amount is $50 (or equivalent in your currency). Please check your dashboard for any updates.",
  },
  {
    id: 8,
    question: "How many times can I make a deposit?",
    answer:
      "There is no limit on the number of deposits. You can fund your account as often as you like, subject to your payment method's limits.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        <p className="faq-subtitle">Have any questions? We’ve got answers.</p>
        <div className="faq-list">
          {faqData.map((item) => (
            <div key={item.id} className="faq-item">
              <div className="faq-question" onClick={() => toggle(item.id)}>
                <h3>{item.question}</h3>
                <span className="faq-icon">
                  {openId === item.id ? "−" : "+"}
                </span>
              </div>
              {openId === item.id && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
