import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import HomeButton from "./HomeButton.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    licenseNumber: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ handleChange FIXED
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: role === "doctor" ? "doctor" : "user",
      specialization: role === "doctor" ? formData.specialization : undefined,
      experience: role === "doctor" ? formData.licenseNumber : undefined,
      dob: role === "patient" ? formData.dateOfBirth : undefined,
    };

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.msg || "Registration failed");
      return;
    }

    alert("Registration successful. Please login.");
    navigate("/login");
  } catch (err) {
    console.error(err);
    setError("Server error. Try again.");
  }
};


  return (<div><HomeButton />
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <p className="subtext">Join our Healthcare System</p>

        {/* Role Tabs */}
        <div className="tab-box">
          <button
            className={role === "patient" ? "active-tab" : "tab"}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            className={role === "doctor" ? "active-tab" : "tab"}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="form">

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe / Dr. John"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Patient field */}
          {role === "patient" && (
            <>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </>
          )}

          {/* Doctor fields */}
          {role === "doctor" && (
            <>
              <label>Specialization</label>
              <input
                type="text"
                name="specialization"
                placeholder="Cardiology / Neurology"
                value={formData.specialization}
                onChange={handleChange}
                required
              />

              <label>Medical License Number</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="DOC12345"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            {role === "patient"
              ? "Register as Patient"
              : "Register as Doctor"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
    </div>
  );
}
