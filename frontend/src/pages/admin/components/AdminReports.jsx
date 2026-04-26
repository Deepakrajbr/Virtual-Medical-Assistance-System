import { useEffect, useState } from "react";
import "./AdminReports.css";

export default function AdminReports() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [a, u, d, r] = await Promise.all([
        fetch("http://localhost:5000/api/admin/appointments").then(res => res.json()),
        fetch("http://localhost:5000/api/admin/users").then(res => res.json()).catch(() => []),
        fetch("http://localhost:5000/api/admin/doctors").then(res => res.json()).catch(() => []),
        fetch("http://localhost:5000/api/reports").then(res => res.json()).catch(() => [])
      ]);

      setAppointments(a || []);
      setUsers(u || []);
      setDoctors(d || []);
      setReports(r || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🎯 COUNTS
  const totalAppointments = appointments.length;
  const totalUsers = users.length;
  const totalDoctors = doctors.length;
  const totalReports = reports.length;

  // 🎯 STATUS COUNT
  const completed = appointments.filter(a => a.status === "completed").length;
  const pending = appointments.filter(a => a.status === "pending").length;
  const cancelled = appointments.filter(a => a.status === "cancelled").length;

  const percent = (val) =>
    totalAppointments ? Math.round((val / totalAppointments) * 100) : 0;

  return (
    <div className="report-page">

      <h1 className="report-title">📊 Admin Reports</h1>

      {/* CARDS */}
      <div className="report-cards">
        <div className="report-card">
          <h3>Users</h3>
          <p>{totalUsers}</p>
        </div>

        <div className="report-card">
          <h3>Doctors</h3>
          <p>{totalDoctors}</p>
        </div>

        <div className="report-card">
          <h3>Appointments</h3>
          <p>{totalAppointments}</p>
        </div>

        <div className="report-card">
          <h3>Reports</h3>
          <p>{totalReports}</p>
        </div>
      </div>

      {/* STATUS */}
      <div className="status-box">
        <h2>Appointment Status</h2>

        <div className="status-row">
          <span>Completed ({completed})</span>
          <div className="bar green" style={{ width: percent(completed) + "%" }}></div>
        </div>

        <div className="status-row">
          <span>Pending ({pending})</span>
          <div className="bar yellow" style={{ width: percent(pending) + "%" }}></div>
        </div>

        <div className="status-row">
          <span>Cancelled ({cancelled})</span>
          <div className="bar red" style={{ width: percent(cancelled) + "%" }}></div>
        </div>
      </div>

    </div>
  );
}