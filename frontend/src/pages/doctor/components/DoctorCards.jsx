import "./DoctorCards.css";
import {
  FaCalendarAlt,
  FaComments,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaUserMd,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DoctorCards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Appointments",
      value: 12,
      subtitle: "Upcoming",
      icon: <FaCalendarAlt />,
      action: () => navigate("/AppointmentTable"),
      color: "#22c55e",
    },
    {
      title: "Messages",
      value: 5,
      subtitle: "Unread",
      icon: <FaComments />,
      action: () => navigate("/doctorchatpage"),
      color: "#3b82f6",
    },{
      title: "AI Assistant",
value: "RAG",
subtitle: "Smart Medical Chat",
icon: <FaUserMd />,
action: () => navigate("/aiconsultation"),
color: "#14b8a6",
    },
    {
      title: "Write Blog",
      value: "✍️",
      subtitle: "Create post",
      icon: <FaExclamationTriangle />,
      action: () => navigate("/writeblog"), 
      color: "#ef4444",
    },
    {
      title: "Reports",
      value: 8,
      subtitle: "Uploads",
      icon: <FaFileUpload />,
      action: () => navigate("/writereport"),
      color: "#8b5cf6",
    },
     {
        title: "Upload Knowledge",
        value: 1,
        subtitle: "PDF",
        action: () => navigate("/uploadknowledge"),
        color: "#6366f1",
      },
  ];

  return (
    <div className="doc-cards">
      {cards.map((card, i) => (
        <div
          key={i}
          className="doc-card"
          onClick={card.action ? card.action : undefined} // ✅ safe click
        >
          <div
            className="doc-card-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div className="doc-card-content">
            <h2 className="doc-card-value">{card.value}</h2>
            <p className="doc-card-title">{card.title}</p>
            <p className="doc-card-subtitle">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}