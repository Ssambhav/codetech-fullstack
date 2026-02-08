/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants";
import { spellCheck } from "../utils/spellCheck";
import "../styles/LawBot.css";

export default function LawBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("lawbot-messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(messages.length === 0);
  const [copied, setCopied] = useState(false);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userRawText = input.trim();
    setInput("");

    const { corrected } = await spellCheck(userRawText);
    const finalInput = corrected;

    const userMessage = { role: "user", text: finalInput, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setShowWelcome(false);

    try {
      const thinkingMessage = {
        role: "bot",
        text: "Law Bot is typing...",
        isTyping: true,
        time: new Date(),
      };
      setMessages((prev) => [...prev, thinkingMessage]);

      const response = await axios.post(API_ENDPOINTS.LAW_BOT, {
        question: finalInput,
      });

      setMessages((prev) => prev.slice(0, -1));
      const botMessage = {
        role: "bot",
        text: response.data.answer || "No answer received.",
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "bot",
          text: "❌ Something went wrong. Please try again.",
          error: true,
          time: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    const lastUserInput = [...messages]
      .reverse()
      .find((msg) => msg.role === "user");
    if (lastUserInput) {
      setInput(lastUserInput.text);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
    localStorage.setItem("lawbot-messages", JSON.stringify(messages));
  }, [messages]);

  const formatBotText = (text) => {
    const lines = text.trim().split("\n").filter(Boolean);
    if (lines.length <= 1) return <div className="message-text">{text}</div>;
    return (
      <ul className="message-text formatted-bullets">
        {lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="lawbot-container">
      <div
        className="lawbot-chat-window"
        ref={chatRef}
        role="log"
        aria-live="polite"
      >
        {messages.length > 0 && (
          <button
            className="clear-chat-btn"
            onClick={() => {
              setMessages([]);
              localStorage.removeItem("lawbot-messages");
              setShowWelcome(true);
            }}
            aria-label="Clear chat"
          >
            🗑 Clear Chat
          </button>
        )}

        {showWelcome && (
          <div className="lawbot-welcome-overlay">
            <h3>👋 Welcome to Law Bot</h3>
            <p>
              Ask any legal question in simple language. Law Bot will reply in
              plain terms.
            </p>
            <ul className="suggestion-list">
              <li>📞 Can I record a phone call in India?</li>
              <li>🏠 Can my landlord evict me without notice?</li>
              <li>🧑‍⚖️ What happens if I miss a court date?</li>
              <li>💻 Are online threats punishable?</li>
            </ul>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`lawbot-message ${msg.role}`}>
            {msg.role === "bot" && !msg.isTyping && !msg.error ? (
              formatBotText(msg.text)
            ) : (
              <div className="message-text">{msg.text}</div>
            )}
            <div className="message-meta">
              <span className="timestamp">
                {msg.time &&
                  new Date(msg.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </span>
              {msg.role === "bot" && !msg.isTyping && !msg.error && (
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(msg.text)}
                  aria-label="Copy bot message"
                >
                  Copy
                </button>
              )}
              {msg.error && (
                <button
                  className="retry-btn"
                  onClick={handleRetry}
                  aria-label="Retry sending question"
                >
                  🔁 Retry
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {copied && (
        <div className="copy-toast" role="status" aria-live="polite">
          ✅ Text copied!
        </div>
      )}

      <div className="lawbot-input-section">
        <input
          type="text"
          placeholder="Ask any legal question"
          aria-label="Ask Law Bot"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? <span className="dots">...</span> : "Send"}
        </button>
      </div>
    </div>
  );
}
