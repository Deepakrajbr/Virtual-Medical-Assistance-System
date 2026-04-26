import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, CheckCircle, XCircle } from "lucide-react";
import "../AdminDashboard.css";

export default function AdminDoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/doctors");
      const data = await res.json();
      setDoctors(data);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    await fetch(`http://localhost:5000/api/admin/approve-doctor/${id}`, { method: "PUT" });
    load();
  };

  const reject = async (id) => {
    await fetch(`http://localhost:5000/api/admin/reject-doctor/${id}`, { method: "PUT" });
    load();
  };

  const filtered = doctors.filter((d) => {
    const matchQuery =
      d.name?.toLowerCase().includes(query.toLowerCase()) ||
      d.email?.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === "all" || d.status === filter;
    return matchQuery && matchFilter;
  });

  const counts = {
    all: doctors.length,
    pending: doctors.filter((d) => d.status === "pending").length,
    approved: doctors.filter((d) => d.status === "approved").length,
    rejected: doctors.filter((d) => d.status === "rejected").length,
  };

  return (
    <div className="page-root">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="page-back" onClick={() => navigate("/admindashboard")}>
            <ArrowLeft size={14} />
            Dashboard
          </button>
          <h1 className="page-title">Doctors</h1>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid",
              borderColor: filter === tab ? "#0f172a" : "var(--border)",
              background: filter === tab ? "#0f172a" : "var(--surface)",
              color: filter === tab ? "#fff" : "var(--muted)",
              fontFamily: "var(--font)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span
              style={{
                marginLeft: 6,
                background: filter === tab ? "rgba(255,255,255,0.2)" : "#f1f5f9",
                color: filter === tab ? "#fff" : "var(--muted)",
                padding: "1px 7px",
                borderRadius: 999,
                fontSize: 11,
              }}
            >
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      <div className="search-row">
        <Search size={15} style={{ color: "var(--muted)", flexShrink: 0 }} />
        <input
          className="search-input"
          placeholder="Search by name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="loading-row"><td colSpan={5}>Loading doctors…</td></tr>
            ) : filtered.length === 0 ? (
              <tr className="loading-row"><td colSpan={5}>No doctors found</td></tr>
            ) : (
              filtered.map((d, i) => (
                <tr key={d._id}>
                  <td style={{ color: "var(--muted)", fontSize: 13 }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "var(--teal-icon-bg)",
                          color: "var(--teal-icon)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 13,
                          flexShrink: 0,
                        }}
                      >
                        {d.name?.[0]?.toUpperCase() ?? "D"}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</p>
                        {d.specialization && (
                          <p style={{ fontSize: 12, color: "var(--muted)" }}>{d.specialization}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--muted)" }}>{d.email}</td>
                  <td>
                    <span className={`badge badge--${d.status ?? "pending"}`}>
                      {d.status ?? "pending"}
                    </span>
                  </td>
                  <td>
                    {d.status === "pending" && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn--approve" onClick={() => approve(d._id)}>
                          <CheckCircle size={13} />
                          Approve
                        </button>
                        <button className="btn btn--reject" onClick={() => reject(d._id)}>
                          <XCircle size={13} />
                          Reject
                        </button>
                      </div>
                    )}
                    {d.status !== "pending" && (
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>—</span>
                    )}
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