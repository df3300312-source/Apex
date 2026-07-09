import React, { useState, useEffect } from "react";
import api from "../services/api";
import { FaPaperPlane, FaRobot, FaTimes, FaCommentDots } from "react-icons/fa";
import "../css/chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you with your crypto investments today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sessionId = "session-" + Math.random().toString(36).slice(2, 9); // Unique for this visit

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await api.post("/chat/message", {
        message: userMsg,
        sessionId,
      });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.response },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I am offline." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          <FaCommentDots />
        </button>
      )}

      {isOpen && (
        <div className="chat-window animate__animated animate__slideInUp">
          <div className="chat-header">
            <span>
              <FaRobot /> ApexMarkets AI
            </span>
            <FaTimes
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-bubble bot">Typing...</div>}
          </div>
          <form className="chat-footer" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask about crypto..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
