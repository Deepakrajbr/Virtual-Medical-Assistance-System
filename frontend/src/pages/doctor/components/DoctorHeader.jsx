import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./doctorheader.css"

export default function DoctorHeader() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Doctor";

  const [open, setOpen] = useState(false);
  const ref = useRef();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="doc-header">

  <div className="doc-profile" ref={ref}>

    {/* ✅ BLOG HERE */}
    <span className="blog-link" onClick={() => navigate("/blogpage")}>
      📝 Blog
    </span>

    <div
      className="avatar"
      onClick={() => setOpen(!open)}
    >
      {name.charAt(0).toUpperCase()}
    </div>

    <span className="doc-name">Dr. {name}</span>

    {open && (
      <div className="dropdown">
        {/* <button onClick={() => navigate("/home")}>🏠 Home</button> */}
        <button onClick={logout}>🚪 Logout</button>
      </div>
    )}

  </div>
</header>
  );
}