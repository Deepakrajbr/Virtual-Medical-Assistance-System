import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="logo">HEALTHCARE .ai</div>

      <nav className="nav">
       <Link to="/BlogPage" className="nav-link">Blog</Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/About" className="nav-link">About</Link>
        <Link to="/Contact" className="nav-link">Contact</Link>
      </nav>

      <div className="auth-box">
        {!isLoggedIn && (
        <>
          <Link to="/login" className="auth-link">Login</Link>
          <span className="slash">/</span>
          <Link to="/register" className="auth-link">Register</Link>
        </>
      )}

      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
        
        
      </div>
    </header>
  );
}
