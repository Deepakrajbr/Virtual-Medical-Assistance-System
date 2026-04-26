import { useEffect, useState } from "react";
import ChatBox from "../../ChatBox";
import "./doctorchatpage.css";

export default function DoctorChatPage() {
  const [patients, setPatients] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/appointments/doctor",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const data = await res.json();
  
      // ✅ Use patients array from backend
      setPatients(data.patients || []);
  
    } catch (err) {
      console.error(err);
    }
  };

  const openChat = (p) => {
    setSelectedUser(p);
    setSelectedRoom(`${p.doctorId}_${p.patientId}`);
  };

  return (
    <div className="chat-page">

      {/* LEFT PANEL */}
      <div className="chat-list">
        <h4>Chats</h4>

        {patients.map((p) => (
          <div
            key={p._id}
            className="chat-user"
            onClick={() => openChat(p)}
          >
            <div className="avatar">{p.patientName[0]}</div>

            <div className="user-info">
              <span>{p.patientName}</span>
              <small>{p.date}</small>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div className="chat-wrapper">

  <div className="chat-card">

    {selectedRoom ? (
      <ChatBox
      room={selectedRoom}
      user={{
        name: selectedUser?.patientName,   
        otherId: selectedUser?.patientId   
      }}
    />
    ) : (
      <div className="empty-chat">
        Select a patient to start chat
      </div>
    )}

  </div>

</div>

    </div>
  );
}