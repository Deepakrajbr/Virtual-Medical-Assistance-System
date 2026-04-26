import { useEffect, useState } from "react";
import "./userreport.css";

export default function UserReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reports/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Error loading reports:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">

      <h2 className="report-title">📄 My Medical Reports</h2>

      {loading ? (
        <p className="loading">Loading reports...</p>
      ) : reports.length === 0 ? (
        <div className="empty">
          <p>No reports yet</p>
          <small>Your doctor reports will appear here</small>
        </div>
      ) : (
        <div className="report-grid">
          {reports.map((r) => (
            <div className="report-card" key={r._id}>

              <div className="report-header">
                <h3>Dr. {r.doctorName}</h3>
                <span className="badge">Report</span>
              </div>

              <div className="report-body">
                <p><strong>Diagnosis:</strong> {r.diagnosis}</p>
                <p><strong>Prescription:</strong> {r.prescription}</p>
              </div>

              <div className="report-actions">
                <button
                  className="view-btn"
                  onClick={() =>
                    window.open(`http://localhost:5000${r.pdfUrl}`)
                  }
                >
                  View PDF
                </button>

                <a
                  href={`http://localhost:5000${r.pdfUrl}`}
                  download
                  className="download-btn"
                >
                  Download
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}