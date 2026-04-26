import { useEffect, useState } from "react";
import { getUserAppointments } from "../../../api/api";
import "./myappointment.css";

export default function MyAppointments() {
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [appointments]);

  const load = async () => {
    const data = await getUserAppointments(token);

    const sorted = (Array.isArray(data) ? data : []).sort((a, b) => {
      return new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`);
    });

    setAppointments(sorted);
  };

  // 🎯 FILTER LOGIC
  const filtered = appointments.filter((a) => {
    const now = new Date();
    const time = new Date(`${a.date} ${a.time}`);

    if (filter === "upcoming") return time >= now && a.status !== "cancelled";
    if (filter === "past") return time < now;
    if (filter === "cancelled") return a.status === "cancelled";

    return true;
  }).filter((a) =>
    a.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 COUNTDOWN
  const updateCountdown = () => {
    const next = appointments.find(
      (a) => a.status === "approved" &&
        new Date(`${a.date} ${a.time}`) > new Date()
    );

    if (!next) return setCountdown("");

    const diff = new Date(`${next.date} ${next.time}`) - new Date();

    if (diff <= 0) return setCountdown("Starting now");

    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    setCountdown(`${mins}m ${secs}s`);
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

    if (res.ok) window.open(data.meetingLink, "_blank");
    else alert(data.msg);
  };

  const cancel = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/appointments/cancel/${id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    alert(data.msg);
    load();
  };

  return (
    <div className="myapp-container">

      <h2 className="myapp-title">My Appointments</h2>

      {/* 🔍 SEARCH */}
      <input
        className="myapp-search"
        placeholder="Search doctor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎯 FILTER */}
      <div className="myapp-filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("upcoming")}>Upcoming</button>
        <button onClick={() => setFilter("past")}>Past</button>
        <button onClick={() => setFilter("cancelled")}>Cancelled</button>
      </div>

      {/* ⏳ COUNTDOWN */}
      {countdown && (
        <div className="myapp-countdown">
          ⏳ Next appointment in: {countdown}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="myapp-empty">📅 No appointments found</p>
      ) : (
        <div className="myapp-table-wrapper">
          <table className="myapp-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Join</th>
                <th>Option</th>
              </tr>
            </thead>

            <tbody>
              {filtered.slice(0, visibleCount).map((a) => {

                const time = new Date(`${a.date} ${a.time}`);
                const now = new Date();

                const canJoin =
                  now >= new Date(time.getTime() - 5 * 60000) &&
                  a.status === "approved";

                const isPast = time < now;

                return (
                  <tr key={a._id}>
                    <td>{a.doctorName}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>

                    <td>
                      <span className={`myapp-status ${a.status}`}>
                        {a.status}
                      </span>
                    </td>

                    <td>
                      {a.meetingLink && (
                        canJoin ? (
                          <button
                            className="myapp-btn join"
                            onClick={() => handleJoin(a._id)}
                          >
                            Join
                          </button>
                        ) : (
                          <button className="myapp-btn disabled" disabled>
                            Join
                          </button>
                        )
                      )}
                    </td>

                    <td>
                      {["pending", "approved"].includes(a.status) && !isPast && (
                        <button
                          className="myapp-btn cancel"
                          onClick={() => cancel(a._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* SHOW MORE */}
      {filtered.length > visibleCount && (
        <div className="myapp-showmore">
          <button onClick={() => setVisibleCount((p) => p + 6)}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
}