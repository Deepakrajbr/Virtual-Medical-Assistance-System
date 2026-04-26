import { Navigate } from "react-router-dom";

export default function RoleRedirect() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === "doctor") {
    return <Navigate to="/doctordashboard" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/admindashboard" replace />;
  }

  return <Navigate to="/userdashboard" replace />;
}
