import React from 'react'
import { Link } from "react-router-dom";
import "../styles/Aicard.css"

function Aicard() {
  
  return (
    <div className="symptom-preview">

      <div className="symptom-card">
        <h2 className="symptom-title">✨ Symptom Checker</h2>

        <p className="symptom-text">
          Describe your symptoms — our AI will assist instantly.
        </p>

        <Link to="/Aiconsultation" className="symptom-btn">
          Try Symptom Checker →
        </Link>
      </div>

    </div>
  );
}


export default Aicard