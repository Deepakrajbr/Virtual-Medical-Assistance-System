import { useEffect, useState } from "react";

export default function HistoryList() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/appointments/doctor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      // ✅ Only approved = history
      const completed = (Array.isArray(data) ? data : []).filter(
        (a) => a.status === "approved"
      );

      setHistory(completed);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="history-box">
      <h3>History</h3>

      {history.length === 0 ? (
        <div className="empty">No history yet 📋</div>
      ) : (
        history.map((h) => (
          <div key={h._id} className="history-item">
            <p>{h.patientName}</p>
            <small>
              {h.date} · {h.time}
            </small>
          </div>
        ))
      )}
    </div>
  );
}