import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { fetchUserHistory } from "../api/api.js";
import "../styles/MedicalHistoryReport.css";

const MOCK = {
  user: { id: "u1", name: "Deepak", age: 30 },
  appointments: [
    { id: "a1", doctor: "Dr. Meera Nair", date: "2025-10-20T16:30:00Z", status: "Completed", notes: "Follow up in 2 weeks" },
    { id: "a2", doctor: "Dr. Rahul Menon", date: "2025-11-10T11:00:00Z", status: "Scheduled", notes: "" }
  ],
  prescriptions: [
    { id: "p1", title: "Atenolol 25mg", issuedBy: "Dr. Meera Nair", date: "2025-10-20", file: "/files/p1.pdf" }
  ],
  files: [
    { id: "f1", name: "Blood Report - Aug 2025.pdf", url: "/uploads/blood_aug_2025.pdf", date: "2025-08-10" }
  ],
  vitals: {
    bp: [
      { date: "2025-08-01", systolic: 122, diastolic: 80 },
      { date: "2025-09-01", systolic: 125, diastolic: 82 },
      { date: "2025-10-01", systolic: 120, diastolic: 79 },
      { date: "2025-11-01", systolic: 118, diastolic: 77 }
    ],
    sugar: [
      { date: "2025-08-01", value: 95 },
      { date: "2025-09-01", value: 100 },
      { date: "2025-10-01", value: 98 },
      { date: "2025-11-01", value: 96 }
    ],
    weight: [
      { date: "2025-08-01", kg: 72 },
      { date: "2025-09-01", kg: 71.5 },
      { date: "2025-10-01", kg: 71.0 }
    ]
  }
};

export default function MedicalHistoryReport({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        // try real API:
        const res = await fetchUserHistory(userId || "me", token)
          .catch(() => null);
        if (!mounted) return;
        setData(res || MOCK);
      } catch (err) {
        console.error(err);
        if (mounted) setData(MOCK);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, [userId, token]);

  if (loading) return <div className="mr-root"><div className="mr-loading">Loading medical report…</div></div>;

  const vitals = data.vitals || {};
  // prepare combined BP line chart data: date, systolic, diastolic
  const bpData = (vitals.bp || []).map(item => ({ date: item.date.slice(0,10), systolic: item.systolic, diastolic: item.diastolic }));
  const sugarData = (vitals.sugar || []).map(item => ({ date: item.date.slice(0,10), sugar: item.value }));
  const weightData = (vitals.weight || []).map(item => ({ date: item.date.slice(0,10), kg: item.kg }));

  return (
    <div className="mr-root">
      <div className="mr-header">
        <div>
          <h1>Medical History Report</h1>
          <p className="muted">Summary for <strong>{data.user?.name}</strong> · Age: {data.user?.age || "-"}</p>
        </div>
        <div>
          <button className="mr-export" onClick={() => window.print()}>Export / Print</button>
        </div>
      </div>

      <div className="mr-grid">

        {/* Cards */}
        <div className="mr-cards">
          <div className="mr-card">
            <h3>Upcoming Appointments</h3>
            <p className="muted-small">{data.appointments?.filter(a => new Date(a.date) > new Date()).length || 0} upcoming</p>
            <ul className="simple-list">
              {data.appointments?.slice(0,3).map(a => (
                <li key={a.id}>
                  <strong>{a.doctor}</strong><br />
                  <span className="muted-small">{new Date(a.date).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mr-card">
            <h3>Prescriptions</h3>
            <p className="muted-small">{data.prescriptions?.length || 0} total</p>
            <ul className="simple-list">
              {data.prescriptions?.slice(0,3).map(p => (
                <li key={p.id}>
                  <strong>{p.title}</strong> <span className="muted-small">by {p.issuedBy}</span>
                  <div className="mr-file-row">
                    <a href={p.file} target="_blank" rel="noreferrer" className="file-link">Open</a>
                    <span className="muted-small">{p.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mr-card">
            <h3>Uploaded Files</h3>
            <p className="muted-small">{data.files?.length || 0} files</p>
            <ul className="simple-list">
              {data.files?.map(f => (
                <li key={f.id}>
                  <a href={f.url} target="_blank" rel="noreferrer">{f.name}</a>
                  <div className="muted-small">{f.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts column */}
        <div className="mr-charts">
          <div className="chart-card">
            <h3>Blood Pressure (systolic / diastolic)</h3>
            {bpData.length ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={bpData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="systolic" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="diastolic" stroke="#2563EB" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : <p className="muted-small">No BP data available</p>}
          </div>

          <div className="chart-card">
            <h3>Blood Sugar (mg/dL)</h3>
            {sugarData.length ? (
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={sugarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sugar" stroke="#16A34A" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : <p className="muted-small">No sugar data available</p>}
          </div>

          <div className="chart-card">
            <h3>Weight (kg)</h3>
            {weightData.length ? (
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="kg" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : <p className="muted-small">No weight data</p>}
          </div>
        </div>
      </div>

      {/* Full lists */}
      <div className="mr-lists">
        <div className="list-col">
          <h3>Full Appointments</h3>
          <table className="mr-table">
            <thead><tr><th>Date</th><th>Doctor</th><th>Status</th><th>Notes</th></tr></thead>
            <tbody>
              {data.appointments?.map(a => (
                <tr key={a.id}>
                  <td>{new Date(a.date).toLocaleString()}</td>
                  <td>{a.doctor}</td>
                  <td>{a.status}</td>
                  <td>{a.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="list-col">
          <h3>Full Prescriptions</h3>
          <ul className="prescription-list">
            {data.prescriptions?.map(p => (
              <li key={p.id}>
                <strong>{p.title}</strong> — <span className="muted-small">by {p.issuedBy} on {p.date}</span>
                <div><a href={p.file} target="_blank" rel="noreferrer">Open file</a></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
