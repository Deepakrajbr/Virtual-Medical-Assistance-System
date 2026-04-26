import { Navigate } from "react-router-dom";

export default function EntryGate() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in → login
  if (!token) {
    return <Navigate to="/home" replace />;
  }

  // Logged in → correct dashboard
  if (role === "doctor") {
    return <Navigate to="/doctordashboard" replace />;
  }

  if (role === "user") {
    return <Navigate to="/userdashboard" replace />;
  }
  if (role === "admin"){
    return <Navigate to ="/admindashboard" replace />
  }

  // fallback
  return <Navigate to="/login" replace />;
}
