import { useEffect, useState } from "react";
import ChatBox from "../../ChatBox";
import "./userchat.css";

export default function UserChat() {
  const [appointments, setAppointments] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await fetch(
      "http://localhost:5000/api/appointments/user",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    const uniqueDoctors = Object.values(
      (Array.isArray(data) ? data : []).reduce((acc, curr) => {
        acc[curr.doctorName] = curr;
        return acc;
      }, {})
    );

    setAppointments(uniqueDoctors);
  };

  const openChat = (a) => {
    setSelectedDoctor(a);
    const room = `${a.doctorId}_${a.patientId}`;
    setSelectedChat(room);
  };

  return (
    <div className="user-chat-page">

      {/* LEFT DOCTOR LIST */}
      <div className="doctor-list">
        <h4>Doctors</h4>

        {appointments.map((a) => (
          <div
            key={a._id}
            className="doctor-item"
            onClick={() => openChat(a)}
          >
            <div className="avatar">{a.doctorName[0]}</div>
            <span>{a.doctorName}</span>
          </div>
        ))}
      </div>

      {/* CENTER CHAT BOX */}
      <div className="chat-center">
        <div className="chat-card">

          {selectedChat ? (
            <ChatBox
            room={selectedChat}
            user={{
              name: selectedDoctor?.doctorName,     // ✅ for header
              otherId: selectedDoctor?.doctorId     // ✅ for online status
            }}
          />
          ) : (
            <div className="empty">
              Select a doctor to start chat
            </div>
          )}

        </div>
      </div>

    </div>
  );
}