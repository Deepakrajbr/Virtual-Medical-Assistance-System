import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Users,
  Stethoscope,
  CalendarDays,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const stats = [
    { label: "Total Users", value: "2,841", delta: "+12%", color: "blue" },
    { label: "Active Doctors", value: "143", delta: "+3%", color: "teal" },
    { label: "Appointments Today", value: "58", delta: "+8%", color: "violet" },
    { label: "Approval Pending", value: "7", delta: "–2", color: "amber" },
  ];

  const cards = [
    {
      key: "users",
      label: "Users",
      desc: "Manage all registered patients and accounts",
      icon: Users,
      route: "/adminusers",
      color: "blue",
    },
    {
      key: "doctors",
      label: "Doctors",
      desc: "Approve, reject, and oversee doctor profiles",
      icon: Stethoscope,
      route: "/admindoctors",
      color: "teal",
    },
    {
      key: "appointments",
      label: "Appointments",
      desc: "View and track scheduled appointments",
      icon: CalendarDays,
      route: "/adminappointments",
      color: "violet",
    },
    {
      key: "reports",
      label: "Reports",
      desc: "Analyze platform analytics and metrics",
      icon: BarChart3,
      route: "/adminreport",
      color: "coral",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="dash-root">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">⚕</span>
          <span className="brand-name">MediAdmin</span>
        </div>

        <nav className="sidebar-nav">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                className={`sidebar-link sidebar-link--${c.color}`}
                onClick={() => navigate(c.route)}
              >
                <Icon size={16} />
                {c.label}
              </button>
            );
          })}
        </nav>

        {/* 👇 PROFILE FOOTER */}
        <div
          className="sidebar-footer"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <div className="sidebar-avatar">A</div>
          <div>
            <p className="sidebar-user">Admin</p>
            <p className="sidebar-role">Super Admin</p>
          </div>

          {/* Popup */}
          {open && (
            <div
              className="profile-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">
        <header className="dash-header">
          <div>
            <h1 className="dash-heading">Dashboard</h1>
            <p className="dash-subheading">Welcome back, Admin</p>
          </div>
          <div className="dash-header-meta">
            <Clock size={14} />
            <span>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Stats */}
        <section className="stat-grid">
          {stats.map((s) => (
            <div key={s.label} className={`stat-card stat-card--${s.color}`}>
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <span className="stat-delta">
                <TrendingUp size={12} />
                {s.delta} this month
              </span>
            </div>
          ))}
        </section>

        {/* Cards */}
        <section className="nav-grid">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                className={`nav-card nav-card--${c.color}`}
                onClick={() => navigate(c.route)}
              >
                <div className={`nav-card-icon nav-card-icon--${c.color}`}>
                  <Icon size={22} />
                </div>
                <div className="nav-card-body">
                  <h2 className="nav-card-title">{c.label}</h2>
                  <p className="nav-card-desc">{c.desc}</p>
                </div>
                <ArrowRight size={16} className="nav-card-arrow" />
              </button>
            );
          })}
        </section>

        {/* Status */}
        <section className="activity-section">
          <h2 className="section-title">System Status</h2>
          <div className="activity-list">
            {[
              "All API endpoints operational",
              "Database backup completed",
              "Email notifications active",
              "Scheduled jobs running",
            ].map((item) => (
              <div key={item} className="activity-item">
                <CheckCircle size={14} className="activity-check" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}