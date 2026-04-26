import { useEffect, useState, useRef } from "react";
import { socket } from "../pages/socket.jsx";
import "../styles/chatbox.css";

export default function ChatBox({ room, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMsg, setNewMsg] = useState(false);

  const bottomRef = useRef(null);

  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");

  // 🟢 ONLINE USERS
  useEffect(() => {
    socket.emit("joinUser", userId);

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => socket.off("onlineUsers");
  }, [userId]);

  // 📥 LOAD OLD MESSAGES
  useEffect(() => {
    if (!room) return;

    const loadMessages = async () => {
      const res = await fetch(`http://localhost:5000/api/messages/${room}`);
      const data = await res.json();
      setMessages(data || []);
    };

    loadMessages();
  }, [room]);

  // 🔌 SOCKET EVENTS
  useEffect(() => {
    if (!room) return;

    socket.emit("joinRoom", room);

    const receive = (data) => {
      setMessages((prev) => [...prev, data]);

      // 🔔 New message indicator
      const container = document.querySelector(".messages");
      if (container) {
        const isAtBottom =
          container.scrollHeight - container.scrollTop <=
          container.clientHeight + 50;

        if (!isAtBottom) {
          setNewMsg(true);
        }
      }
    };

    const seen = () => {
      setMessages((prev) =>
        prev.map((m) => ({ ...m, seen: true }))
      );
    };

    socket.on("receiveMessage", receive);
    socket.on("seenUpdate", seen);

    return () => {
      socket.off("receiveMessage", receive);
      socket.off("seenUpdate", seen);
    };
  }, [room]);

  // 📤 SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      room,
      sender: name,
      senderId: userId,
      receiverId: user.otherId,
      message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  // 📎 FILE UPLOAD
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/chat-upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const msgData = {
      room,
      sender: name,
      senderId: userId,
      receiverId: user.otherId,
      fileUrl: data.url,
      type: "file",
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", msgData);
  };

  // 👀 MARK SEEN
  useEffect(() => {
    socket.emit("markSeen", { room, userId });
  }, [messages]);

  // 🔽 SCROLL TO BOTTOM
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setNewMsg(false);
  };

  // AUTO SCROLL
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-box">

      {/* HEADER */}
      <div className="chat-header">
        <span>{user?.name || "Chat"}</span>
        <small>
          {onlineUsers.includes(user?.otherId)
            ? "🟢 Online"
            : "⚫ Offline"}
        </small>
      </div>

      {/* MESSAGES */}
      <div className="messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg ${m.sender === name ? "me" : "other"}`}
          >
            {m.type === "file" ? (
              <a href={m.fileUrl} target="_blank" rel="noreferrer">
                📄 Open File
              </a>
            ) : (
              <span>{m.message}</span>
            )}

            <small>
              {m.time} {m.seen && "✓✓"}
            </small>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* 🔔 NEW MESSAGE BUTTON */}
      {newMsg && (
        <div className="new-msg-btn" onClick={scrollToBottom}>
          ⬇ New Messages
        </div>
      )}

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <input type="file" onChange={handleFile} />

        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}