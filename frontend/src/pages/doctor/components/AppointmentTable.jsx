import { useEffect, useState } from "react";
import VideoCall from "../../VideoCall";
import "./appointmenttable.css"

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState([]);
  const [room, setRoom] = useState(null);
  const [now, setNow] = useState(new Date());

  const token = localStorage.getItem("token");

  useEffect(() => {
    load();

    // 🔄 AUTO REFRESH EVERY 5s
    const interval = setInterval(() => {
      load();
      setNow(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const load = async () => {
    const res = await fetch(
      "http://localhost:5000/api/appointments/doctor",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    console.log("Appointments:", data); 
    setAppointments(data.appointments || []);
  };

  const update = async (id, status) => {
    await fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    load();
  };

  const handleJoin = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/appointments/join/${id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  
    const data = await res.json();
  
    console.log(data);
  
    if (!res.ok) {
      alert(data.msg);
      return;
    }
  
    window.open(data.meetingLink, "_blank");
  };

  // ⏱ TIME HELPER
  const getCountdown = (date, time) => {
    const appointmentTime = new Date(`${date} ${time}`);
    const diff = appointmentTime - now;

    if (diff <= 0) return "Started";

    const mins = Math.floor(diff / 60000);
    return `${mins} min`;
  };

  // 🎯 NEXT APPOINTMENT
  const nextAppointment = [...appointments]
    .filter(a => new Date(`${a.date} ${a.time}`) > now)
    .sort((a, b) =>
      new Date(`${a.date} ${a.time}`) -
      new Date(`${b.date} ${b.time}`)
    )[0];

    const pending = appointments.filter(a => a.status === "pending").length;
    const approved = appointments.filter(a => a.status === "approved").length;
    const rejected = appointments.filter(a => a.status === "rejected").length;

    const [filter, setFilter] = useState("all");

const filteredAppointments =
  filter === "today"
    ? appointments.filter(
        (a) =>
          new Date(a.date).toDateString() ===
          new Date().toDateString()
      )
    : appointments;

return (
  <div className="page">

    {/* HEADER */}
    <div className="top">
      <div>
        <h2>Appointments</h2>
        <p className="sub">Manage your consultations</p>
      </div>

      {/* FILTER */}
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "today" ? "active" : ""}
          onClick={() => setFilter("today")}
        >
          Today
        </button>
      </div>
    </div>

    {/* SUMMARY */}
    <div className="summary">
      <div className="box pending">Pending: {pending}</div>
      <div className="box approved">Approved: {approved}</div>
      <div className="box rejected">Rejected: {rejected}</div>
    </div>

    {/* TABLE */}
    <div className="table-box">
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th> {/* ✅ NEW */}
            <th>Time</th>
            <th>Countdown</th>
            <th>Symptoms</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAppointments.map((a) => {
            const appointmentTime = new Date(`${a.date} ${a.time}`);
            const enableTime = new Date(
              appointmentTime.getTime() - 5 * 60000
            );

            const canStart =
              now >= enableTime && a.status === "approved";

            return (
              <tr key={a._id}>
                
                {/* PATIENT */}
                <td className="patient-cell">
                  <div className="avatar">
                    {a.patientName?.charAt(0)}
                  </div>
                  {a.patientName}
                </td>

                {/* DATE */}
                <td>
                  {new Date(a.date).toLocaleDateString("en-IN")}
                </td>

                <td>{a.time}</td>

                {/* COUNTDOWN */}
                <td>
                  <span className="countdown">
                    {getCountdown(a.date, a.time)}
                  </span>
                </td>

                {/* DESCRIPTION */}
                <td className="desc">
                  {a.description
                    ? a.description.slice(0, 35) + "..."
                    : "No details"}
                </td>

                {/* STATUS */}
                <td>
                  <span className={`status ${a.status}`}>
                    {a.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="actions">
                  {a.status === "pending" && (
                    <>
                      <button
                        className="approve"
                        onClick={() => update(a._id, "approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="reject"
                        onClick={() => update(a._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    className="join"
                    disabled={!canStart}
                    onClick={() => handleJoin(a._id)}
                  >
                    Join
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
)}