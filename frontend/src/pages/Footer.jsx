import React from 'react'
import "../styles/Footer.css"

function Footer() {
  return (
    <footer className="footer-container">

      <div className="footer-content">

        {/* Left Section */}
        <div className="footer-left">
          <h2 className="footer-title">HEALTHCARE</h2>
          <p>Your Smart AI + Doctor powered health companion.</p>
        </div>

        {/* Center Links */}
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/Doctor">Doctor</a>
          <a href="/Login">Login</a>
          <a href="/Register">Register</a>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <p>© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>

      </div>

    </footer>
  )
}

export default Footer