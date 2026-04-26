import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/roleredirect" replace />;
  }

  return children;
}