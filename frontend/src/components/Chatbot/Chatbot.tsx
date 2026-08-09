import { useState } from "react";
import "./Chatbot.css";

interface Message {
  sender: "bot" | "user";
  text: string;
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I'm your QueueLess Assistant. How may I help you?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    // Show user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },

        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error: any) {
      console.error("Chatbot Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            error.message ||
            "Sorry, I couldn't process your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Robot */}
      {!isOpen && (
        <div
          className="chatbot-float"
          onClick={() => setIsOpen(true)}
        >
          <div className="robot-icon">🤖</div>
          <p>May I help you?</p>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">

          {/* Header */}
          <div className="chatbot-header">
            <div>
              <span className="chatbot-header-icon">🤖</span>
              <span>QueueLess Assistant</span>
            </div>

            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bot-message">
                🤖 Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
            >
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;