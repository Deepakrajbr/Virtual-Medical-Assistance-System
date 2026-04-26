import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Calendar } from "lucide-react";
import "../AdminDashboard.css";

export default function AdminAppointments() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/appointments")
      .then((res) => res.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...data].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateB - dateA; // 🔥 latest first
  });
  
  const filtered = sorted.filter(
    (a) =>
      a.patientName?.toLowerCase().includes(query.toLowerCase()) ||
      a.doctorName?.toLowerCase().includes(query.toLowerCase())
  );

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  const statusColor = (s = "scheduled") => {
    if (s === "completed") return "approved";
    if (s === "cancelled") return "rejected";
    return "pending";
  };

  return (
    <div className="page-root">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="page-back" onClick={() => navigate("/admindashboard")}>
            <ArrowLeft size={14} />
            Dashboard
          </button>
          <h1 className="page-title">Appointments</h1>
        </div>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>
          {filtered.length} records
        </span>
      </div>

      <div className="search-row">
        <Search size={15} style={{ color: "var(--muted)", flexShrink: 0 }} />
        <input
          className="search-input"
          placeholder="Search by patient or doctor name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="loading-row"><td colSpan={6}>Loading appointments…</td></tr>
            ) : filtered.length === 0 ? (
              <tr className="loading-row"><td colSpan={6}>No appointments found</td></tr>
            ) : (
              filtered.map((a, i) => (
                <tr key={a._id}>
                  <td style={{ color: "var(--muted)", fontSize: 13 }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: "var(--violet-icon-bg)",
                          color: "var(--violet-icon)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 12,
                          flexShrink: 0,
                        }}
                      >
                        {a.patientName?.[0]?.toUpperCase() ?? "P"}
                      </div>
                      <span style={{ fontWeight: 600 }}>{a.patientName ?? "—"}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--muted)" }}>{a.doctorName ?? "—"}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Calendar size={13} style={{ color: "var(--muted)" }} />
                      <span style={{ fontSize: 13 }}>{fmtDate(a.date)}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13, color: "var(--muted)" }}>{a.time ?? "—"}</td>
                  <td>
                    <span className={`badge badge--${statusColor(a.status)}`}>
                      {a.status ?? "scheduled"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}