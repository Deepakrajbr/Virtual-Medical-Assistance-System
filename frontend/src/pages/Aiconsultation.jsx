import React, { useState } from "react";
import HomeButton from "./HomeButton";
import "../styles/Aiconsultation.css";

export default function AiConsultation() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm your smart medical assistant. How can I help you today?" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/rag/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.text })
      });

      const data = await response.json();
      console.log("RAG RESPONSE:", data);

      const aiMessage = {
        sender: "ai",
        text: data.answer || "Sorry, I couldn't understand. Try again."
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "Server error. Try again later." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div>
      <HomeButton />

      <div className="ai-container">
        <h2 className="ai-title">Smart AI Medical Consultation</h2>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && <div className="chat-message ai">Thinking...</div>}
        </div>

        <div className="input-area">
        <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Ask your medical question..."
  
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevents new line / refresh
      sendMessage();
    }
  }}
/>

          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
