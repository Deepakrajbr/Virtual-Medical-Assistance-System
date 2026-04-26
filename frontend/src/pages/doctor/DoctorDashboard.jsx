import DoctorHeader from "./components/DoctorHeader";
import DoctorSidebar from "./components/DoctorSidebar";
import DoctorCards from "./components/DoctorCards";
import "./DoctorDashboard.css";

export default function DoctorDashboard() {
  return (
    <div className="doc-layout">

      <DoctorSidebar />

      <div className="doc-main">
        <DoctorHeader />

        <div className="doc-content">

          {/* 🔥 NEW HEADER SECTION */}
          <div className="welcome-box">
            <h1>Welcome back 👋</h1>
            <p>Manage your appointments, patients and activities</p>
          </div>

          {/* CARDS */}
          <DoctorCards />

          {/* 🔥 NEW CONTENT SECTION (fix empty space) */}
          <div className="doc-bottom">

            <div className="doc-section">
              <h3>Recent Activity</h3>

              <div className="activity">
                <p>✔ Appointment approved</p>
                <p>💬 New message received</p>
                <p>📄 Report uploaded</p>
              </div>
            </div>

            <div className="doc-section">
              <h3>Quick Actions</h3>

              <div className="actions">
                <button>View Appointments</button>
                <button>Open Chat</button>
                <button>Upload Report</button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}