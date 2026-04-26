import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <h2 className="logo">HealthCare</h2>

      <ul>
        <li className="active">Dashboard</li>
        <li onClick={() => navigate("/myappointments")}>Appointments</li>
        <li onClick={() => navigate("/find-doctors")}>Doctors</li>
        <li>Health Records</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
}