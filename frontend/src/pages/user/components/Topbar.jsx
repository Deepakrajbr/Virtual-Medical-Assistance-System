import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./topbar.css"


export default function Topbar() {
  const name = localStorage.getItem("name") || "User";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="topbar">
      <input placeholder="Search" />
      <span className="blog-link" onClick={() => navigate("/blogpage")}>
      📝 Blog
       </span>

      <div className="profile">
        <div
          className="avatar"
          onClick={() => setOpen(!open)}
        >
          {name.charAt(0).toUpperCase()}
        </div>

        {open && (
          <div className="dropdown">
            <p>{name}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}