import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pending() {
  const [status, setStatus] = useState("pending");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 decode token
  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload._id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const userId = getUserIdFromToken();

        if (!userId) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/admin/doctors");
        const doctors = await res.json();

        const doctor = doctors.find((d) => d._id === userId);

        if (!doctor) return;

        setName(doctor.name);

        const currentStatus = doctor.status?.toLowerCase().trim();
        setStatus(currentStatus);

        if (currentStatus === "approved") {
          navigate("/doctordashboard");
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchStatus();

    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);

  }, [navigate]);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="pending-center">
          <div className="pending-loader"></div>
          <p style={{ marginTop: 15 }}>Checking status...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="pending-container">
        <div className="pending-card">

          <div className="pending-icon">
            {status === "pending" && "⏳"}
            {status === "rejected" && "❌"}
          </div>

          <h2 className="pending-title">
            {status === "pending" && "Waiting for Approval"}
            {status === "rejected" && "Request Rejected"}
          </h2>

          <p className="pending-subtitle">
            Hi Dr. <strong>{name}</strong>
          </p>

          <p className="pending-message">
            {status === "pending" &&
              "Your profile is under review. You will be notified shortly."}

            {status === "rejected" &&
              "Your application was not approved. Please contact admin."}
          </p>

          {status === "rejected" && (
            <button
              className="pending-button"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          )}

        </div>
      </div>
    </>
  );
}

const styles = `
.pending-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0f2fe, #f8fafc);
}

.pending-card {
  background: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
  width: 350px;
}

.pending-icon {
  font-size: 50px;
  margin-bottom: 15px;
}

.pending-title {
  margin-bottom: 10px;
  font-size: 22px;
}

.pending-subtitle {
  color: #555;
  margin-bottom: 15px;
}

.pending-message {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.pending-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #ef4444;
  color: #fff;
  cursor: pointer;
}

.pending-center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pending-loader {
  width: 40px;
  height: 40px;
  border: 4px solid #ddd;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: pending-spin 1s linear infinite;
}

@keyframes pending-spin {
  to {
    transform: rotate(360deg);
  }
}
`;