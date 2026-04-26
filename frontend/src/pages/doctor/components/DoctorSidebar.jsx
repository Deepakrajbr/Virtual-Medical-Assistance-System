import { FaHome, FaCalendar, FaUserInjured, FaComments, FaCog } from "react-icons/fa";
import "./DoctorSidebar.css";

export default function DoctorSidebar() {
  return (
    <div className="doc-sidebar">
      <h2 className="doc-sidebar-logo">DOCTOR PANEL</h2>

      <ul className="doc-sidebar-menu">
        <li className="doc-sidebar-item active"><FaHome /> Dashboard</li>
        <li className="doc-sidebar-item"><FaCalendar /> Appointments</li>
        <li className="doc-sidebar-item"><FaUserInjured /> Patients</li>
        <li className="doc-sidebar-item"><FaComments /> Messages</li>
        <li className="doc-sidebar-item"><FaCog /> Settings</li>
      </ul>
    </div>
  );
}