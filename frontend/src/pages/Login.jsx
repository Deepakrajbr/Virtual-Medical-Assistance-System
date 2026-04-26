import React, { useState } from "react";
import "../styles/Login.css"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeButton from "./HomeButton";

export default function Login() {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login button pressed");
  
    if (email === "" || password === "") {
      setError("All fields are required To proceed");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      console.log("Response status:", response.status);
  
      // try to parse json safely
      let data;
      try {
        data = await response.json();
        console.log("Response JSON:", data);
      } catch (parseErr) {
        const text = await response.text();
        console.log("Response not JSON, raw text:", text);
        throw new Error("Server returned non-JSON response: " + text);
      }
  
      if (!response.ok) {
        // show backend message if exists
        const serverMsg = data.msg || data.message || JSON.stringify(data);
        setError(serverMsg || "Login failed (server returned error)");
        return;
      }
  
      // success: store token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user?.role || role);
      localStorage.setItem("name", data.user?.name || "");
      localStorage.setItem("status", data.user?.status);
  
      if (data.user.role === "admin") {
        navigate("/admindashboard");
      
      } else if (data.user.role === "doctor") {
      
        if (data.user.status === "approved") {
          navigate("/doctordashboard");
        } else {
          navigate("/pending");   
        }
      
      } else {
        navigate("/userdashboard");
      }
      
      
  
    } catch (err) {
      console.error("Login request error:", err);
      setError(err.message || "Server error. Check backend.");
    }
  };
  

  return (<div>< HomeButton />
    <div className="login-container">
      <div className="login-card">

        <h2 className="title">HEALTH CARE</h2>
        <p className="subtitle">Medical Assistance</p>

        {/* Role Tabs */}
        <div className="tabs">
          <button
            className={role === "patient" ? "tab active" : "tab"}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            className={role === "doctor" ? "tab active" : "tab"}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form">

          {error && <p className="error">{error}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder={role === "patient" ? "patient@example.com" : "doctor@example.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login as {role === "patient" ? "Patient" : "Doctor"}
          </button>

          <p className="register-text">
            Don’t have an account? <Link to="/Register">Register</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}


