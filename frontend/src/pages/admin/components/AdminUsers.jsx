import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, User2 } from "lucide-react";
import "../AdminDashboard.css";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ SORT (latest first)
  const sorted = [...users].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // ✅ FILTER
  const filtered = sorted.filter(
    (u) =>
      u.name?.toLowerCase().includes(query.toLowerCase()) ||
      u.email?.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ EXPORT CSV
  const exportUsers = () => {
    const csv = users.map((u) => `${u.name},${u.email}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };

  return (
    <div className="page-root">
      {/* HEADER */}
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            className="page-back"
            onClick={() => navigate("/admindashboard")}
          >
            <ArrowLeft size={14} />
            Dashboard
          </button>
          <h1 className="page-title">Users</h1>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            {filtered.length} total
          </span>

          <button className="export-btn" onClick={exportUsers}>
            Export CSV
          </button>
        </div>
      </div>

      {/* MINI CARD */}
      <div className="mini-stats">
        <div className="mini-card">
          <h4>Total Users</h4>
          <p>{users.length}</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-row">
        <Search size={15} style={{ color: "var(--muted)" }} />
        <input
          className="search-input"
          placeholder="Search by name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr className="loading-row">
                <td colSpan={5}>Loading users…</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr className="loading-row">
                <td colSpan={5}>No users found</td>
              </tr>
            ) : (
              filtered.map((u, i) => {
                const isNew =
                  new Date(u.createdAt) >
                  Date.now() - 7 * 24 * 60 * 60 * 1000;

                return (
                  <tr key={u._id}>
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>
                      {i + 1}
                    </td>

                    {/* NAME */}
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: `hsl(${
                              (u.name?.length || 1) * 40
                            }, 70%, 50%)`,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          {u.name?.[0]?.toUpperCase() ?? (
                            <User2 size={14} />
                          )}
                        </div>

                        <span style={{ fontWeight: 600 }}>{u.name}</span>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td
                      style={{ cursor: "pointer", color: "var(--muted)" }}
                      onClick={() => {
                        navigator.clipboard.writeText(u.email);
                        alert("Email copied ✅");
                      }}
                    >
                      {u.email}
                    </td>

                    {/* DATE */}
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString("en-IN")
                        : "—"}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={isNew ? "badge-new" : "badge-old"}
                      >
                        {isNew ? "New" : "User"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}