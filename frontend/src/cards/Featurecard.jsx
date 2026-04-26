import React from 'react'
import "../styles/Featurecard.css"
import { Link } from 'react-router-dom'

function Featurecard() {
  return (
    <div>
      <section className="card-section">
        <h2 className="card-title">Our Services</h2>

        <div className="card-grid">
          <Link to="/aiconsultation" className="card-link">
          <div className="card">
            <img 
              src="/image/Aiconsultation.jpg"
              alt="AI Consultation"
              className="card-img"
            />
            <h3>AI Consultation</h3>
            <p>Smart virtual medical assistant to guide your health queries instantly.</p>
          </div>
          </Link>

          <Link to="/Doctorconsultation" className="card-link">
          <div className="card">
            <img 
              src="/image/Doctor.jpg"
              alt="Doctor Consultation"
              className="card-img"
            />
            <h3>Doctor Consultation</h3>
            <p>Connect with certified doctors anytime for expert medical guidance.</p>
          </div>
          </Link>
          
          <Link to="/smartreport" className="card-link">
          <div className="card">
            <img 
              src="/image/Report.jpg"
              alt="Health Reports"
              className="card-img"
            />
            <h3>Smart Reports</h3>
            <p>AI-generated and doctor-reviewed health analytics and reports.</p>
          </div>
          </Link>

          {/* ⭐ NEW CARD ADDED HERE */}
          <div className="card">
            <img 
              src="/image/fulltime.jpg"
              alt="24x7 service img"
              className="card-img"
            />
            <h3>24/7 Consultation</h3>
            <p>Connect instantly with qualified doctors anytime.</p>
          </div>
          <div className="card">
            <img 
              src="/image/Report.jpg"
              alt="Health Reports"
              className="card-img"
            />
            <h3>Analytics</h3>
            <p>health analytics.</p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Featurecard
